"use client";

import { useState, useEffect } from 'react';
import {
  FiFileText,
  FiClock,
  FiEye,
  FiDownload,
  FiTrash2,
  FiSearch,
  FiRefreshCw,
  FiArrowLeft
} from "react-icons/fi";
import Link from "next/link";

interface PdfSummary {
  id: string;
  fileUrl: string;
  userId: string;
  summary: string;
  createdAt: string;
}

interface SummariesResponse {
  summaries: PdfSummary[];
}

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<PdfSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSummary, setSelectedSummary] = useState<PdfSummary | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/summary', {
        method: "GET"
      });
      const data: SummariesResponse = await response.json();
      
      if (!response.ok) {
        throw new Error((data as SummariesResponse & { error?: string }).error || 'Failed to fetch summaries');
      }
      
      setSummaries(data.summaries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  console.log(summaries);

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await fetchSummaries();
    setRefreshing(false);
  };

  const handleViewSummary = (summary: PdfSummary): void => {
    setSelectedSummary(summary);
  };

  const handleCloseSummary = (): void => {
    setSelectedSummary(null);
  };

  const handleDeleteSummary = async (summaryId: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this summary?')) return;
    
    try {
      const response = await fetch(`/api/summary/${summaryId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setSummaries(summaries.filter(s => s.id !== summaryId));
      }
    } catch (err) {
      console.error('Failed to delete summary:', err);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileName = (fileUrl: string): string => {
    return fileUrl.split('/').pop() || 'Document';
  };

  const filteredSummaries = summaries.filter(summary =>
    summary.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getFileName(summary.fileUrl).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C10] text-[#E0E0FF] font-sans">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#00EEFF] border-t-transparent mx-auto mb-4"></div>
            <p className="text-[#8B9AC0]">Loading your summaries...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E0E0FF] font-sans">
      <nav className="bg-[#0D1117] border-b border-[#1C2333] shadow-[0_4px_20px_rgba(0,221,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 bg-[#131620] border border-[#2F3B54] rounded-md flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#00EEFF] opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                  <FiFileText className="h-4 w-4 text-[#00EEFF] relative z-10" />
                </div>
                <span className="ml-3 text-xl font-bold text-[#00EEFF] tracking-wider">
                  SUMMIZE
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <button className="flex items-center text-sm px-4 py-2 text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200">
                  <FiArrowLeft className="mr-2" /> Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] bg-clip-text text-transparent">
                Your Document Summaries
              </h1>
              <p className="text-[#8B9AC0]">
                {summaries.length} {summaries.length === 1 ? 'summary' : 'summaries'} processed
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-[#131620] border border-[#2F3B54] rounded-lg text-[#00EEFF] hover:border-[#00EEFF] transition-all duration-200 disabled:opacity-50"
            >
              <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B9AC0] h-4 w-4" />
              <input
                type="text"
                placeholder="Search summaries or documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#1C2333] rounded-lg text-[#E0E0FF] placeholder-[#8B9AC0] focus:border-[#00EEFF] focus:outline-none transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {!loading && filteredSummaries.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="h-16 w-16 bg-[#131620] border border-[#2F3B54] rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFileText className="h-6 w-6 text-[#8B9AC0]" />
            </div>
            <h3 className="text-xl font-medium text-[#E0E0FF] mb-2">
              {searchTerm ? 'No summaries found' : 'No summaries yet'}
            </h3>
            <p className="text-[#8B9AC0] mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Upload your first document to get started with AI-powered summaries'
              }
            </p>
            {!searchTerm && (
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] text-[#0A0C10] font-medium rounded-lg hover:shadow-[0_0_15px_rgba(0,221,255,0.5)] transition-all duration-300">
                  Upload Document
                </button>
              </Link>
            )}
          </div>
        )}

        {filteredSummaries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSummaries.map((summary) => (
              <div
                key={summary.id}
                className="bg-[#0D1117] border border-[#1C2333] rounded-xl p-6 hover:border-[#00EEFF]/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00EEFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 bg-[#131620] border border-[#2F3B54] rounded-lg flex items-center justify-center">
                      <FiFileText className="h-4 w-4 text-[#00EEFF]" />
                    </div>
                    <div className="flex items-center text-xs text-[#8B9AC0]">
                      <FiClock className="mr-1 h-3 w-3" />
                      {formatDate(summary.createdAt)}
                    </div>
                  </div>

                  <h3 className="font-medium text-[#E0E0FF] mb-2 truncate">
                    {getFileName(summary.fileUrl)}
                  </h3>

                  <p className="text-sm text-[#8B9AC0] mb-4 line-clamp-3">
                    {summary.summary.substring(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleViewSummary(summary)}
                      className="flex items-center text-sm text-[#00EEFF] hover:text-[#00A3FF] transition-colors duration-200"
                    >
                      <FiEye className="mr-1 h-3 w-3" />
                      View Full
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          const blob = new Blob([summary.summary], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${getFileName(summary.fileUrl)}-summary.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="p-1 text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
                        title="Download Summary"
                      >
                        <FiDownload className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSummary(summary.id)}
                        className="p-1 text-[#8B9AC0] hover:text-red-400 transition-colors duration-200"
                        title="Delete Summary"
                      >
                        <FiTrash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0D1117] border border-[#1C2333] rounded-xl max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#1C2333]">
              <div>
                <h2 className="text-xl font-bold text-[#E0E0FF]">
                  {getFileName(selectedSummary.fileUrl)}
                </h2>
                <p className="text-sm text-[#8B9AC0]">
                  Created {formatDate(selectedSummary.createdAt)}
                </p>
              </div>
              <button
                onClick={handleCloseSummary}
                className="p-2 text-[#8B9AC0] hover:text-[#00EEFF] transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="prose prose-invert max-w-none">
                <p className="text-[#E0E0FF] leading-relaxed whitespace-pre-wrap">
                  {selectedSummary.summary}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-[#1C2333]">
              <button
                onClick={() => {
                  const blob = new Blob([selectedSummary.summary], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${getFileName(selectedSummary.fileUrl)}-summary.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center px-4 py-2 bg-[#131620] border border-[#2F3B54] rounded-lg text-[#00EEFF] hover:border-[#00EEFF] transition-all duration-200"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                Download
              </button>
              <button
                onClick={handleCloseSummary}
                className="px-4 py-2 bg-gradient-to-r from-[#00EEFF] to-[#00A3FF] text-[#0A0C10] font-medium rounded-lg hover:shadow-[0_0_15px_rgba(0,221,255,0.5)] transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}