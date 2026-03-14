import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function analyzeResume(
  fileData: string,
  mimeType: string,
  jobDescription: string
): Promise<AnalysisResult> {
  // Ensure the base64 string does not contain the data URL prefix
  const cleanFileData = fileData.includes("base64,") ? fileData.split("base64,")[1] : fileData;

  const prompt = `
Act as a senior technical recruiter and an advanced ATS (Applicant Tracking System).
Analyze the provided resume against the following job description.

Job Description:
${jobDescription || "General Software Engineering Role (No specific JD provided)"}

Provide a comprehensive evaluation including:
1. Resume Score (0-10): Overall quality, impact, and formatting.
2. ATS Match Score (0-100): Keyword match percentage against the job description.
3. Skills Detected: List of technical and soft skills found in the resume.
4. Missing Skills: Critical skills from the job description missing in the resume.
5. Radar Data: Scores (0-100) for 5 categories: Technical, Soft Skills, Experience, Formatting, Impact.
6. Weak Sections: Areas of the resume that need improvement.
7. Strong Sections: Areas where the candidate excels.
8. Improvement Suggestions: Actionable advice to improve the resume.
9. Professional Summary: A 2-line professional summary generated based on the resume.
10. Rewrite Suggestions: Specific examples of how to rewrite weak bullet points into strong, impact-driven statements. The 'reason' MUST be exactly one short, punchy sentence explaining why the change matters.
11. Keyword Coverage: List 4-6 key skills from the JD and their coverage percentage (0-100) in the resume.
12. Verdict: Recruiter decision simulation (STRONG MATCH, MODERATE MATCH, or NEEDS IMPROVEMENT), confidence score (0-100), and the top reason. The 'topReason' MUST be a short, decisive hiring note (e.g., "Missing modern frontend frameworks." or "Strong backend experience but lacks cloud exposure.").
13. Score Breakdown: Explainability metrics (0-100) for Keyword Match, Skill Strength, Experience Impact, and Formatting.
14. Readiness Label: A short label like "High", "Moderate", or "Low" indicating recruiter readiness.
15. Interview Probability: A predictive score (0-100) representing the likelihood of getting an interview based on ATS match, skill coverage, and experience strength.

Be brutally honest but constructive, like a judge who has eliminated 500 hackathon projects before lunch.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanFileData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resumeScore: { type: Type.NUMBER, description: "Score out of 10 (e.g., 8.2)" },
            atsMatchScore: { type: Type.NUMBER, description: "Match score percentage (0-100)" },
            interviewProbability: { type: Type.NUMBER, description: "Predictive probability of getting an interview (0-100)" },
            skillsDetected: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            radarData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  score: { type: Type.NUMBER, description: "Score out of 100" },
                },
              },
              description: "Exactly 5 categories: Technical, Soft Skills, Experience, Formatting, Impact",
            },
            weakSections: { type: Type.ARRAY, items: { type: Type.STRING } },
            strongSections: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            professionalSummary: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A 2-line professional summary" },
            rewriteSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  improved: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
              },
            },
            keywordCoverage: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  coverage: { type: Type.NUMBER, description: "0-100" },
                },
              },
            },
            verdict: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING, enum: ["STRONG MATCH", "MODERATE MATCH", "NEEDS IMPROVEMENT"] },
                confidence: { type: Type.NUMBER, description: "0-100" },
                topReason: { type: Type.STRING },
              },
            },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                keywordMatch: { type: Type.NUMBER, description: "0-100" },
                skillStrength: { type: Type.NUMBER, description: "0-100" },
                experienceImpact: { type: Type.NUMBER, description: "0-100" },
                formatting: { type: Type.NUMBER, description: "0-100" },
              },
            },
            readinessLabel: { type: Type.STRING, description: "High, Moderate, or Low" },
          },
          required: [
            "resumeScore",
            "atsMatchScore",
            "skillsDetected",
            "missingSkills",
            "radarData",
            "weakSections",
            "strongSections",
            "improvementSuggestions",
            "professionalSummary",
            "rewriteSuggestions",
            "keywordCoverage",
            "verdict",
            "scoreBreakdown",
            "readinessLabel"
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check for rate limit / quota errors
    if (error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED") || error?.status === 429) {
      throw new Error("API Rate Limit Exceeded. The AI is currently experiencing high demand. Please try again in a minute, or use the 'Try with Sample Resume' button to view a demo analysis.");
    }
    
    throw new Error("Failed to analyze resume. Please ensure the file is readable and try again.");
  }
}
