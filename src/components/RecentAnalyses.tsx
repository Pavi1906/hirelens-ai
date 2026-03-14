import { Clock, ChevronRight, ShieldCheck } from "lucide-react";
import { RecentAnalysis } from "../types";

interface RecentAnalysesProps {
  analyses: RecentAnalysis[];
  onSelect: (analysis: RecentAnalysis) => void;
}

export default function RecentAnalyses({ analyses, onSelect }: RecentAnalysesProps) {
  if (analyses.length === 0) return null;

  const getVerdictColor = (status: string) => {
    switch (status) {
      case "STRONG MATCH":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "MODERATE MATCH":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
      case "NEEDS IMPROVEMENT":
        return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
      default:
        return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/20";
    }
  };

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Analyses</h2>
      </div>
      
      <div className="grid gap-4">
        {analyses.map((analysis) => (
          <button
            key={analysis.id}
            onClick={() => onSelect(analysis)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/80 dark:bg-white/5 rounded-2xl shadow-sm border border-slate-200/50 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left"
          >
            <div className="flex flex-col gap-1 mb-4 sm:mb-0">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {new Date(analysis.date).toLocaleDateString(undefined, { 
                  year: 'numeric', month: 'short', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">
                {analysis.jobTitle}
              </h3>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Score</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{analysis.score}<span className="text-sm text-slate-400">/10</span></span>
              </div>
              
              <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${getVerdictColor(analysis.verdict)}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {analysis.verdict}
              </div>
              
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
