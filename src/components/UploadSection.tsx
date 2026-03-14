import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from "react";
import { UploadCloud, FileText, AlertCircle, Loader2, Sparkles, PlayCircle } from "lucide-react";

interface UploadSectionProps {
  onAnalyze: (fileData: string, mimeType: string, jobDescription: string) => void;
  onAnalyzeSample: () => void;
  isAnalyzing: boolean;
}

export default function UploadSection({ onAnalyze, onAnalyzeSample, isAnalyzing }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selected);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selected = e.dataTransfer.files?.[0];
    if (selected) {
      if (selected.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selected);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a resume.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        onAnalyze(base64String, file.type, jobDescription);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to read file.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {/* Floating Blur Glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="text-center space-y-4 mb-12 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent pb-2">
          HireLens AI
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Simulate ATS screening and recruiter decision-making to optimize your resume for the job you want.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8 bg-white/80 dark:bg-slate-900/60 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-xl">
        {/* File Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            1. Upload Resume (PDF)
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
              ${file ? "border-indigo-500 dark:border-indigo-500/50 bg-indigo-50 dark:bg-indigo-900/20" : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500/50 bg-slate-50 dark:bg-slate-800/40"}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            {file ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-indigo-900 dark:text-indigo-100 font-medium">{file.name}</p>
                <p className="text-indigo-500 dark:text-indigo-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium text-lg">Click to upload or drag and drop</p>
                  <p className="text-slate-500 dark:text-slate-500 mt-1">PDF files only (max 5MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            2. Target Job Description (Optional)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to get an ATS Match Score..."
            className="w-full h-48 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500/50 focus:border-transparent transition-all resize-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 p-4 rounded-xl border border-rose-100 dark:border-rose-500/20">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isAnalyzing || !file}
            className={`
              flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${isAnalyzing || !file
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5"
              }
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Run AI Analysis
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onAnalyzeSample}
            disabled={isAnalyzing}
            className="flex-1 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlayCircle className="w-6 h-6" />
            Try with Sample Resume
          </button>
        </div>
      </form>
    </div>
  );
}
