"use client";

import { useState, useEffect, useRef } from "react";
import { uploadToS3 } from "@/utils/uploadToS3";
import {
  FiUpload,
  FiFileText,
  FiLogOut,
  FiList,
  FiHome,
  FiX,
  FiCopy,
} from "react-icons/fi";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const { data: session } = await authClient.getSession();
      if (!session?.user) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "queued" | "pending" | "done"
  >("idle");
  const [summary, setSummary] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [dropFile, setDropFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    try {
      const uploadedUrl = await uploadToS3(file);
      setFileUrl(uploadedUrl);
      setStatus("queued");

      await fetch("/api/queue-job", {
        method: "POST",
        body: JSON.stringify({ fileUrl: uploadedUrl }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  const handleFileAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDropFile(true);
  };

  const handleDragLeave = () => {
    setDropFile(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropFile(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
    }
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login");
        },
      },
    });
  };

  useEffect(() => {
    if (status !== "queued" || !fileUrl) return;

    const interval = setInterval(async () => {
      const res = await fetch(
        `/api/summary-status?fileUrl=${encodeURIComponent(fileUrl)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.status === "done") {
          setSummary(data.summary);
          setStatus("done");
          clearInterval(interval);
        } else {
          setStatus("pending");
        }
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [status, fileUrl]);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0FF] font-sans">
      <nav className="bg-[#0D1117] border-b border-[#1C2333] shadow-[0_4px_20px_rgba(0,221,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-[#131620] border border-[#2F3B54] rounded-md flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#00EEFF] opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                  <FiFileText className="h-4 w-4 text-[#00EEFF] relative z-10" />
                </div>
                <span className="ml-3 text-xl font-bold text-[#00EEFF] tracking-wider">
                  SUMMIZE
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex md:space-x-8">
                <a
                  href="#"
                  className="text-[#00EEFF] flex items-center px-1 pt-1 text-sm font-medium border-b border-[#00EEFF]"
                >
                  <FiHome className="mr-1.5" /> Home
                </a>
                <a
                  href="#"
                  className="text-[#8B9AC0] hover:text-[#00EEFF] flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 border-b border-transparent hover:border-[#8B9AC0]"
                >
                  <FiList className="mr-1.5" /> My Summaries
                </a>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm px-4 py-1.5 rounded-md text-[#00EEFF] border border-[#1C2333] hover:border-[#00EEFF] hover:bg-[#00EEFF]/5 transition-all duration-200"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4 tracking-tight relative inline-block">
            <span className="bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
              Neural Document Synthesis
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent"></div>
          </h1>
          <p className="text-[#8B9AC0] max-w-2xl mx-auto text-lg">
            Upload your PDF documents and get AI-powered summaries in seconds
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-[#0D1117] p-8 rounded-xl border border-[#1C2333] shadow-[0_8px_32px_rgba(0,221,255,0.1)] backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00EEFF] opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="mb-6 relative z-10">
              <div className="flex items-center mb-4">
                <div className="h-1 w-1 rounded-full bg-[#00EEFF] mr-2"></div>
                <label className="text-base font-medium text-[#E0E0FF]">
                  Upload Document
                </label>
              </div>

              <div
                onClick={handleFileAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-1 flex justify-center px-6 pt-8 pb-8 border ${
                  dropFile ? "border-[#00EEFF]" : "border-[#1C2333]"
                } ${
                  dropFile ? "bg-[#00EEFF]/5" : "bg-[#131620]"
                } rounded-lg transition-all duration-200 hover:border-[#00EEFF] cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00EEFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="space-y-3 text-center relative z-10">
                  <div className="mx-auto h-14 w-14 rounded-lg flex items-center justify-center bg-[#1C2333] group-hover:bg-[#1C2333]/80 transition-all duration-200 border border-[#2F3B54] group-hover:border-[#00EEFF]/50">
                    <FiUpload
                      className={`h-6 w-6 ${
                        dropFile
                          ? "text-[#00EEFF]"
                          : "text-[#8B9AC0] group-hover:text-[#00EEFF]"
                      } transition-all duration-200`}
                    />
                  </div>
                  <div className="flex text-sm text-[#8B9AC0] justify-center">
                    <span className="relative cursor-pointer rounded-md font-medium text-[#00EEFF] hover:text-[#00EEFF]/80 focus-within:outline-none">
                      Upload a file
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-[#8B9AC0]/70">
                    PDF files up to 10MB
                  </p>
                </div>
              </div>

              {file && (
                <div className="mt-3 flex items-center justify-between bg-[#131620] px-3 py-2 rounded-md border border-[#1C2333]">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-md bg-[#1C2333] border border-[#2F3B54] flex items-center justify-center mr-2">
                      <FiFileText className="h-4 w-4 text-[#00EEFF]" />
                    </div>
                    <span className="font-medium text-[#E0E0FF] truncate max-w-[260px] text-sm">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-[#8B9AC0] hover:text-[#E0E0FF] bg-[#1C2333] h-6 w-6 rounded-md flex items-center justify-center"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || status === "uploading"}
              className="w-full flex justify-center items-center px-4 py-3 bg-[#131620] text-[#00EEFF] font-medium rounded-lg hover:bg-[#1C2333] focus:outline-none border border-[#1C2333] hover:border-[#00EEFF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00EEFF]/0 via-[#00EEFF]/5 to-[#00EEFF]/0 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300"></div>

              {status === "uploading" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#00EEFF]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="relative z-10">Processing Upload...</span>
                </>
              ) : (
                <>
                  <FiFileText className="mr-2 relative z-10" />{" "}
                  <span className="relative z-10">Generate Summary</span>
                </>
              )}
            </button>
          </div>

          {status === "pending" && (
            <div className="mt-10 bg-[#0D1117] p-8 rounded-lg border border-[#1C2333] shadow-[0_8px_32px_rgba(0,221,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00EEFF] opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex flex-col items-center relative z-10">
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full border border-[#1C2333] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#00EEFF] animate-spin"></div>
                    <div className="h-12 w-12 rounded-full bg-[#131620] border border-[#1C2333] flex items-center justify-center">
                      <FiFileText className="h-5 w-5 text-[#00EEFF]" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-[#E0E0FF] mb-2">
                  Synthesizing Content
                </h3>
                <p className="text-[#8B9AC0] text-center max-w-sm mb-6">
                  Neural networks analyzing document structure and extracting
                  key information
                </p>

                <div className="w-full h-1 bg-[#131620] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] animate-pulse"
                    style={{ width: "60%" }}
                  ></div>
                </div>

                <div className="mt-4 grid grid-cols-4 w-full gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 bg-[#131620] rounded-full overflow-hidden"
                    >
                      <div
                        className={`h-full bg-[#00EEFF]/40 ${
                          i === 0 || i === 2 ? "animate-pulse" : ""
                        }`}
                        style={{ width: i < 2 ? "100%" : "30%" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {status === "done" && summary && (
            <div className="mt-10 bg-[#0D1117] rounded-lg border border-[#1C2333] shadow-[0_8px_32px_rgba(0,221,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00EEFF] opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

              <div className="p-5 border-b border-[#1C2333] flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-[#131620] border border-[#1C2333] flex items-center justify-center mr-3">
                    <FiFileText className="h-4 w-4 text-[#00EEFF]" />
                  </div>
                  <h2 className="text-lg font-medium text-[#E0E0FF]">
                    Summary Output
                  </h2>
                </div>

                <button className="flex items-center text-xs px-3 py-1.5 rounded-md text-[#00EEFF] border border-[#1C2333] hover:border-[#00EEFF] hover:bg-[#00EEFF]/5 transition-all duration-200">
                  <FiCopy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </button>
              </div>

              <div className="p-6 bg-[#0D1117] relative z-10">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {summary}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#131620] border-t border-[#1C2333] flex items-center">
                <div className="h-2 w-2 rounded-full bg-[#00EEFF] mr-2"></div>
                <span className="text-xs text-[#8B9AC0]">
                  AI synthesis complete • {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-xs text-[#8B9AC0]/60 tracking-wider">
              NEURAL ENGINE v2.3.4 • CYBERNETIC SYNTHESIS
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
