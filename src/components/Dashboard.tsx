import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { AnalysisResult } from "../types";
import { CheckCircle2, XCircle, AlertCircle, Sparkles, TrendingUp, ShieldCheck, HelpCircle, Activity } from "lucide-react";

interface DashboardProps {
  results: AnalysisResult;
  onReset: () => void;
  isDarkMode: boolean;
}

export default function Dashboard({ results, onReset, isDarkMode }: DashboardProps) {
  const getVerdictColor = (status: string) => {
    switch (status) {
      case "STRONG MATCH": return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
      case "MODERATE MATCH": return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
      case "NEEDS IMPROVEMENT": return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20";
      default: return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700";
    }
  };
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Analysis Complete</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is your comprehensive resume evaluation.</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors shadow-sm"
        >
          Analyze Another Resume
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Verdict Card */}
        <div className={`group transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-2xl p-6 shadow-sm border ${getVerdictColor(results.verdict.status)} flex flex-col justify-between backdrop-blur-xl`}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-bold uppercase tracking-wider opacity-80">Recruiter Decision</p>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50 dark:bg-black/20" title="Simulated hiring decision based on overall profile strength">
                <HelpCircle className="w-3.5 h-3.5 opacity-70" />
              </div>
            </div>
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
              {results.verdict.status === "STRONG MATCH" && <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>}
              {results.verdict.status === "MODERATE MATCH" && <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>}
              {results.verdict.status === "NEEDS IMPROVEMENT" && <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>}
              {results.verdict.status}
            </h3>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/60 dark:bg-black/20 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              Confidence: {results.verdict.confidence}%
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Hiring Note</p>
            <p className="text-sm font-medium italic">"{results.verdict.topReason}"</p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white/80 dark:bg-white/5 rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-white/10 flex items-center justify-between backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall Score</p>
              <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-help" title="Weighted average of impact, formatting, and clarity metrics">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">{results.resumeScore}</span>
              <span className="text-xl text-slate-400 dark:text-slate-500">/ 10</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Based on impact, formatting, and clarity.</p>
          </div>
          <div className="h-24 w-24 rounded-full border-8 border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                className="text-indigo-600 dark:text-indigo-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${(results.resumeScore / 10) * 289} 289`}
              />
            </svg>
          </div>
        </div>

        {/* ATS Match Score */}
        <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white dark:bg-slate-900/60 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 flex items-center justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">ATS Match Score</p>
              <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-help" title="Measures keyword and semantic alignment between your resume and the job description">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">{results.atsMatchScore}%</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Keyword alignment with job description.</p>
          </div>
          <div className="h-24 w-24 rounded-full border-8 border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                className="text-emerald-500 dark:text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${(results.atsMatchScore / 100) * 289} 289`}
              />
            </svg>
          </div>
        </div>

        {/* Interview Probability */}
        <div className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md bg-white/80 dark:bg-white/5 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Interview Probability</p>
              <div className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-help" title="Predictive likelihood of securing an interview based on historical ATS pass rates and skill matches">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">{results.interviewProbability}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mt-4 mb-2">
              <div 
                className={`h-2.5 rounded-full ${
                  results.interviewProbability >= 70 ? 'bg-emerald-500' : 
                  results.interviewProbability >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                }`} 
                style={{ width: `${results.interviewProbability}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {results.interviewProbability >= 70 ? 'High likelihood. Strong match across all areas.' : 
               results.interviewProbability >= 40 ? 'Moderate chance. Improve missing skills to increase probability.' : 
               'Low likelihood. Significant gaps detected.'}
            </p>
          </div>
        </div>
      </div>

      {/* Strength Meter */}
      <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            Resume Strength
          </h3>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Recruiter Readiness: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{results.readinessLabel}</span></span>
        </div>
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: `${results.resumeScore * 10}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart & Explainability */}
        <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 lg:col-span-1 flex flex-col space-y-8 backdrop-blur-xl">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Competency Profile</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results.radarData}>
                  <PolarGrid stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                  <PolarAngleAxis dataKey="category" tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              Why this score?
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Keyword Match</span>
                <span className="font-medium text-slate-900 dark:text-white">{results.scoreBreakdown.keywordMatch}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Skill Strength</span>
                <span className="font-medium text-slate-900 dark:text-white">{results.scoreBreakdown.skillStrength}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Experience Impact</span>
                <span className="font-medium text-slate-900 dark:text-white">{results.scoreBreakdown.experienceImpact}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">Formatting</span>
                <span className="font-medium text-slate-900 dark:text-white">{results.scoreBreakdown.formatting}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Analysis & Coverage */}
        <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 lg:col-span-2 space-y-8 backdrop-blur-xl">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              ATS Keyword Coverage
            </h3>
            <div className="space-y-4">
              {results.keywordCoverage.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.keyword}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{item.coverage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.coverage > 75 ? 'bg-emerald-500' : item.coverage > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                      style={{ width: `${item.coverage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                Detected Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.skillsDetected.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-md text-xs font-medium border border-emerald-100 dark:border-emerald-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                Missing Critical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.missingSkills.length > 0 ? (
                  results.missingSkills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-md text-xs font-medium border border-rose-100 dark:border-rose-500/20">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 text-sm italic">No critical missing skills.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-8 shadow-lg text-white border border-slate-800">
        <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          AI Generated Professional Summary
        </h3>
        <div className="space-y-2">
          {results.professionalSummary.map((line, i) => (
            <p key={i} className="text-xl font-light leading-relaxed text-slate-100">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Feedback Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            Strong Sections
          </h3>
          <ul className="space-y-3">
            {results.strongSections.map((section, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {results.improvementSuggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Rewrite Engine */}
      <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            AI Resume Rewrite Engine
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Transforming passive descriptions into quantified impact statements.</p>
        </div>

        <div className="space-y-4">
          {results.rewriteSuggestions.map((suggestion, i) => (
            <div key={i} className="flex flex-col gap-3 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-2">
                    <XCircle className="w-4 h-4" /> Before
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-through decoration-rose-200 dark:decoration-rose-500/30">{suggestion.original}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" /> After
                  </div>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{suggestion.improved}</p>
                </div>
              </div>
              <div className="mt-2 pt-3 border-t border-slate-200/60 dark:border-slate-700/50">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="font-medium">Signal:</span> {suggestion.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
