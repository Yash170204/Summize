import {
  FiFileText,
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiLayers,
  FiClock,
} from "react-icons/fi";
import Link from "next/link";

export default function LandingPage() {
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
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="px-4 py-2 text-sm text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="flex items-center text-sm px-4 py-2 rounded-md text-[#00EEFF] border border-[#1C2333] hover:border-[#00EEFF] hover:bg-[#00EEFF]/5 transition-all duration-200">
                  Get Started <FiArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-28 lg:pt-52 lg:pb-44">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-[#00EEFF] opacity-5 blur-[100px] rounded-full"></div>
          <div className="absolute right-1/3 bottom-1/3 w-64 h-64 bg-[#00A3FF] opacity-5 blur-[80px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight relative inline-block mb-6">
              <span className="bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
                Transform Documents Into <br /> Instant Insights
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent"></div>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[#8B9AC0] max-w-2xl mx-auto leading-relaxed">
              Summize uses advanced neural networks to analyze and synthesize
              your PDF documents into clear, concise summaries within seconds.
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <svg
            className="animate-bounce w-6 h-6 text-[#00A3FF]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </header>

      <section className="py-16 relative">
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-[#00EEFF] opacity-5 blur-[80px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight relative inline-block">
              <span className="bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
                Advanced Neural Document Processing
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent"></div>
            </h2>
            <p className="text-[#8B9AC0] max-w-2xl mx-auto text-lg">
              Powered by cutting-edge AI to deliver intelligent document
              synthesis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0D1117] p-8 rounded-xl border border-[#1C2333] hover:border-[#00EEFF]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00EEFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="h-12 w-12 rounded-lg bg-[#131620] border border-[#2F3B54] group-hover:border-[#00EEFF]/30 flex items-center justify-center mb-6 relative z-10 transition-all duration-300">
                <FiCpu className="h-5 w-5 text-[#00EEFF]" />
              </div>

              <h3 className="text-xl font-medium text-[#E0E0FF] mb-3 relative z-10">
                Neural Processing
              </h3>
              <p className="text-[#8B9AC0] relative z-10">
                Our advanced AI models analyze document structure and extract
                key information with near-human accuracy.
              </p>

              <ul className="mt-6 space-y-2 relative z-10">
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Semantic
                  understanding
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Multi-language
                  support
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Context-aware
                  synthesis
                </li>
              </ul>
            </div>

            <div className="bg-[#0D1117] p-8 rounded-xl border border-[#1C2333] hover:border-[#00EEFF]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00EEFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="h-12 w-12 rounded-lg bg-[#131620] border border-[#2F3B54] group-hover:border-[#00EEFF]/30 flex items-center justify-center mb-6 relative z-10 transition-all duration-300">
                <FiLayers className="h-5 w-5 text-[#00EEFF]" />
              </div>

              <h3 className="text-xl font-medium text-[#E0E0FF] mb-3 relative z-10">
                Document Intelligence
              </h3>
              <p className="text-[#8B9AC0] relative z-10">
                Process complex documents including academic papers, legal
                contracts, and technical manuals.
              </p>

              <ul className="mt-6 space-y-2 relative z-10">
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Format
                  preservation
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Citation tracking
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Key point
                  extraction
                </li>
              </ul>
            </div>

            <div className="bg-[#0D1117] p-8 rounded-xl border border-[#1C2333] hover:border-[#00EEFF]/30 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00EEFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="h-12 w-12 rounded-lg bg-[#131620] border border-[#2F3B54] group-hover:border-[#00EEFF]/30 flex items-center justify-center mb-6 relative z-10 transition-all duration-300">
                <FiClock className="h-5 w-5 text-[#00EEFF]" />
              </div>

              <h3 className="text-xl font-medium text-[#E0E0FF] mb-3 relative z-10">
                Lightning Fast
              </h3>
              <p className="text-[#8B9AC0] relative z-10">
                Get comprehensive summaries in seconds, not minutes, saving you
                valuable research time.
              </p>

              <ul className="mt-6 space-y-2 relative z-10">
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Parallel
                  processing
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Instant delivery
                </li>
                <li className="flex items-center text-sm text-[#8B9AC0]">
                  <FiCheck className="text-[#00EEFF] mr-2" /> Batch processing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight relative inline-block">
              <span className="bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
                How Summize Works
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent"></div>
            </h2>
            <p className="text-[#8B9AC0] max-w-2xl mx-auto text-lg">
              A simple three-step process to transform your documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-[#131620] border border-[#1C2333] flex items-center justify-center text-2xl font-bold text-[#00EEFF]">
                1
              </div>
              <div className="bg-[#0D1117] p-8 pt-16 rounded-xl border border-[#1C2333] h-full">
                <h3 className="text-xl font-medium text-[#E0E0FF] mb-3">
                  Upload Your Document
                </h3>
                <p className="text-[#8B9AC0]">
                  Simply drag and drop your PDF file into our secure platform.
                  We support documents up to 10MB in size.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-[#131620] border border-[#1C2333] flex items-center justify-center text-2xl font-bold text-[#00EEFF]">
                2
              </div>
              <div className="bg-[#0D1117] p-8 pt-16 rounded-xl border border-[#1C2333] h-full">
                <h3 className="text-xl font-medium text-[#E0E0FF] mb-3">
                  Neural Processing
                </h3>
                <p className="text-[#8B9AC0]">
                  Our AI engine analyzes the document, identifying key concepts,
                  arguments, and conclusions.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-[#131620] border border-[#1C2333] flex items-center justify-center text-2xl font-bold text-[#00EEFF]">
                3
              </div>
              <div className="bg-[#0D1117] p-8 pt-16 rounded-xl border border-[#1C2333] h-full">
                <h3 className="text-xl font-medium text-[#E0E0FF] mb-3">
                  Receive Summary
                </h3>
                <p className="text-[#8B9AC0]">
                  Get a clear, concise summary that captures the essence of your
                  document, ready to share or save.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/2 w-96 h-96 bg-[#00EEFF] opacity-5 blur-[100px] rounded-full"></div>
          <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-[#00A3FF] opacity-5 blur-[80px] rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0D1117] rounded-2xl border border-[#1C2333] overflow-hidden shadow-[0_8px_32px_rgba(0,221,255,0.1)]">
            <div className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
                Start Synthesizing Your Documents Today
              </h2>
              <p className="text-[#8B9AC0] max-w-2xl mx-auto text-lg mb-10">
                Join thousands of professionals who save hours every week with
                Summize&quot;s neural document synthesis.
              </p>

              <Link href="/signup">
                <button className="px-8 py-4 bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] text-[#0A0C10] font-medium rounded-lg hover:shadow-[0_0_15px_rgba(0,221,255,0.5)] transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started Free <FiArrowRight className="ml-2" />
                  </span>
                </button>
              </Link>

              <p className="mt-6 text-[#8B9AC0] text-sm">
                No credit card required • Free plan available • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0D1117] border-t border-[#1C2333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 bg-[#131620] border border-[#2F3B54] rounded-md flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00EEFF] opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                <FiFileText className="h-4 w-4 text-[#00EEFF] relative z-10" />
              </div>
              <span className="ml-3 text-xl font-bold text-[#00EEFF] tracking-wider">
                SUMMIZE
              </span>
            </div>

            <div className="flex space-x-8">
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>

          <div className="border-t border-[#1C2333] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#8B9AC0] text-sm mb-4 md:mb-0">
              © 2025 Summize. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-[#8B9AC0]/60 tracking-wider">
              NEURAL ENGINE v2.3.4 • CYBERNETIC SYNTHESIS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
