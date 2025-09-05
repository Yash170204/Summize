import { Worker } from "bullmq";
import { PrismaClient } from "@prisma/client";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { redis } from "../lib/redis";

const prisma = new PrismaClient();

const worker = new Worker(
  "pdf-summarization",
  async (job) => {
    const { fileUrl, userId } = job.data;

    if (!fileUrl) throw new Error("Missing fileUrl");

    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error("Failed to download PDF from S3");
    
    const buffer = await res.arrayBuffer();
    const tempFilename = path.join("/tmp", `${uuidv4()}.pdf`);
    await fs.writeFile(tempFilename, Buffer.from(buffer));

    try {
      const loader = new PDFLoader(tempFilename);
      const docs = await loader.load();
      const text = docs.map(doc => doc.pageContent).join("\n");
      const cleanedText = text.replace(/\s+/g, ' ').trim();

      const model = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        temperature: 0.7,
        apiKey: process.env.GOOGLE_API_KEY!,
      });

      const response = await model.invoke([
        {
          role: "user",
          content: `
            You are a seasoned document summarization assistant with extensive experience in understanding and synthesizing complex content. Your goal is to provide a comprehensive, detailed, and well-organized summary of the following document. The summary should be crafted to serve users who have not read the original content, delivering clarity, insights, and actionable takeaways. Add necessary spaces between the words and sentences to make it more readable.
            
            **Instructions:**
            - **Do not include any instructions or prompt text in the output.** The response should solely contain the summary.
            - The summary must be in **rich, visually appealing Markdown format** with proper spacing, formatting, and organization.
            - You must be concise, but retain all the key details, relevant insights, and meaningful points.
            - Focus on clarity, ensuring each section of the summary is easy to read and follow.
            - Ensure the summary is **well-organized**, detailed, and highlights **critical points**, including actionable or thought-provoking insights where applicable.
            
            **Enhanced Markdown Formatting:**
            - Use level 1 heading (# ) for the document title
            - Use level 2 headings (## ) for major sections
            - Use level 3 headings (### ) for subsections
            - Use **bold text** for emphasis on important points and key terms
            - Use *italics* for definitions or nuanced concepts
            - Use > blockquotes for notable quotes from the document
            - Use proper bullet points (- ) and numbered lists (1. ) with consistent indentation
            - Use br for line breaks to separate sections and paragraphs for better readability
            - Use emojis to enhance the visual appeal of the summary (e.g., 📋, 🔍, 💡, 📊, 📚, 🔑)
            
            **Summary Structure:**
            
            # [Document Title]
            
            ## 📋 Executive Summary
            
            Provide a high-level overview of the document's main themes, purpose, and conclusions. This should be written in a concise yet informative manner, summarizing the essence of the document for busy readers who need to grasp the document's intent quickly.
            
            ## 🔍 Section-wise Breakdown
            
            ### [Section 1 Title]
            
            A brief description of the section's content, highlighting the key points, arguments, or findings. If applicable, mention any sub-sections or specific points within each section that are particularly notable or crucial.

            ### [Section 2 Title]
            
            [Continue with all major sections from the document]
            
            ## 💡 Key Highlights & Takeaways
            
            - **[Highlight 1]**: Explanation and importance
            - **[Highlight 2]**: Explanation and importance
            - **[Highlight 3]**: Explanation and importance
            [Include 5-10 key insights, findings, or takeaways, focusing on actionable, thought-provoking, or data-backed points]
            
            ## 📊 Notable Quotes, Data, or Figures
            
            > "[Direct quote from the document]"
            
            **Important Statistic**: Context and explanation
            
            **Key Figure**: Description and significance
            
            ## 📚 Glossary of Complex Terms
            
            **Term 1**: Clear, concise definition in simple language
            
            **Term 2**: Clear, concise definition in simple language
            
            ## 🔑 Final Summary or Conclusion
            
            Offer a final concluding statement or reflection on the document's content. This should reinforce the main message or takeaway from the document.
            
            If the document provides any actionable steps, strategies, or concluding thoughts, summarize them here.
            
            **Formatting Rules:**
            - Use **clear, neutral, and professional language** at all times.
            - Do not invent information or make any speculative statements. Stick to what is directly in the document.
            - Use **Markdown** formatting (headings, bullet points, bold text, etc.) to structure the summary and make it easy to read.
            - Focus on brevity without sacrificing necessary details—be concise but not overly simplistic.
            - Ensure proper spacing between sections and paragraphs for readability.
            - Make the document visually scannable with clear headings and formatting.
            
            **Document Content:**
            ${cleanedText.slice(0, 12000)}
          `,
        },
      ]);

      const summary = (response?.content as string) ?? "Summary failed";

      await prisma.pdfSummary.create({
        data: {
          fileUrl,
          summary,
          userId,
        },
      });

      console.log(`✅ Job ${job.id} processed successfully`);
    } finally {
      await fs.unlink(tempFilename);
    }
  },
  { connection: redis }
);

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});