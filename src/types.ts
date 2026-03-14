export interface RadarDataPoint {
  category: string;
  score: number;
}

export interface RewriteSuggestion {
  original: string;
  improved: string;
  reason: string;
}

export interface KeywordCoverage {
  keyword: string;
  coverage: number;
}

export interface Verdict {
  status: "STRONG MATCH" | "MODERATE MATCH" | "NEEDS IMPROVEMENT";
  confidence: number;
  topReason: string;
}

export interface ScoreBreakdown {
  keywordMatch: number;
  skillStrength: number;
  experienceImpact: number;
  formatting: number;
}

export interface AnalysisResult {
  resumeScore: number;
  atsMatchScore: number;
  interviewProbability: number;
  skillsDetected: string[];
  missingSkills: string[];
  radarData: RadarDataPoint[];
  weakSections: string[];
  strongSections: string[];
  improvementSuggestions: string[];
  professionalSummary: string[];
  rewriteSuggestions: RewriteSuggestion[];
  keywordCoverage: KeywordCoverage[];
  verdict: Verdict;
  scoreBreakdown: ScoreBreakdown;
  readinessLabel: string;
}

export interface RecentAnalysis {
  id: string;
  date: string;
  jobTitle: string;
  score: number;
  verdict: string;
  result: AnalysisResult;
}

