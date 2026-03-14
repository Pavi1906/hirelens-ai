/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import UploadSection from "./components/UploadSection";
import Dashboard from "./components/Dashboard";
import LoadingScreen from "./components/LoadingScreen";
import RecentAnalyses from "./components/RecentAnalyses";
import { analyzeResume } from "./services/geminiService";
import { AnalysisResult, RecentAnalysis } from "./types";
import { AlertCircle, Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import { sampleResumeText, sampleJobDescription, mockAnalysisResult } from "./sampleData";

export default function App() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // User state (Mock Auth)
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hirelens-user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Recent analyses state
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hirelens-history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hirelens-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hirelens-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hirelens-theme', 'light');
    }
  }, [isDarkMode]);

  // Persist user and history
  useEffect(() => {
    if (user) localStorage.setItem('hirelens-user', JSON.stringify(user));
    else localStorage.removeItem('hirelens-user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hirelens-history', JSON.stringify(recentAnalyses));
  }, [recentAnalyses]);

  const handleLogin = () => {
    setUser({ name: "Demo User", email: "demo@hirelens.ai" });
  };

  const handleLogout = () => {
    setUser(null);
    setResults(null);
  };

  const saveToHistory = (analysis: AnalysisResult, jobDescription: string) => {
    const jobTitle = jobDescription 
      ? jobDescription.split('\n')[0].substring(0, 40) + (jobDescription.length > 40 ? '...' : '')
      : "Software Engineer Role";
      
    const newAnalysis: RecentAnalysis = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      jobTitle,
      score: analysis.resumeScore,
      verdict: analysis.verdict.status,
      result: analysis,
    };
    
    setRecentAnalyses(prev => [newAnalysis, ...prev].slice(0, 10)); // Keep last 10
  };

  const handleAnalyze = async (fileData: string, mimeType: string, jobDescription: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeResume(fileData, mimeType, jobDescription);
      setResults(analysis);
      if (user) saveToHistory(analysis, jobDescription);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeSample = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      // Simulate API delay for the pipeline animation
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResults(mockAnalysisResult);
      if (user) saveToHistory(mockAnalysisResult, "Frontend Developer (Sample)");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectRecent = (analysis: RecentAnalysis) => {
    setResults(analysis.result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 selection:text-indigo-900 dark:selection:text-indigo-100 pb-24 transition-colors duration-300 relative overflow-hidden">
      {/* Professional Grid Background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)] dark:[mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">HireLens</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:block text-sm font-medium text-slate-500 dark:text-slate-400">
              AI Recruiter Simulator
            </div>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
                    <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-slate-500 hover:text-slate-700 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {error && (
          <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-rose-800 dark:text-rose-300">Analysis Failed</h3>
              <p className="text-sm text-rose-600 dark:text-rose-400/80 mt-1">{error}</p>
            </div>
          </div>
        )}

        {isAnalyzing ? (
          <LoadingScreen />
        ) : !results ? (
          <>
            <UploadSection onAnalyze={handleAnalyze} onAnalyzeSample={handleAnalyzeSample} isAnalyzing={isAnalyzing} />
            {user && recentAnalyses.length > 0 && (
              <RecentAnalyses analyses={recentAnalyses} onSelect={handleSelectRecent} />
            )}
          </>
        ) : (
          <Dashboard results={results} onReset={handleReset} isDarkMode={isDarkMode} />
        )}
      </main>
      </div>
    </div>
  );
}
