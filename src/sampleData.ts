import { AnalysisResult } from "./types";

export const sampleResumeText = `
JOHN DOE
Software Engineer
Email: john.doe@example.com
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Software engineering student with experience in web development. Looking for a backend engineering role to apply my skills.

EXPERIENCE
Software Engineering Intern | TechCorp | Summer 2023
- Built a website for college students to share notes.
- Used HTML, CSS, and JavaScript.
- Fixed bugs in the backend.
- Worked with a team of 5 interns.

EDUCATION
B.S. Computer Science | University of Technology | 2020 - 2024
GPA: 3.5

PROJECTS
Task Manager App
- Created a to-do list application.
- Used React and Node.js.
- Deployed on Heroku.

SKILLS
Programming: Python, Java, JavaScript, HTML, CSS
Frameworks: React, Node.js
`;

export const sampleJobDescription = `
Senior Backend Engineer

We are looking for a Backend Engineer to join our core infrastructure team. You will be responsible for building scalable APIs and microservices.

Requirements:
- 3+ years of experience in backend development.
- Strong proficiency in Python or Go.
- Experience with containerization and orchestration (Docker, Kubernetes).
- Familiarity with CI/CD pipelines (GitHub Actions, Jenkins).
- Experience building scalable REST APIs.
- Cloud experience (AWS or GCP).
- Strong understanding of system design and database architecture (PostgreSQL, MongoDB).
`;

export const mockAnalysisResult: AnalysisResult = {
  resumeScore: 6.5,
  atsMatchScore: 35,
  interviewProbability: 43,
  skillsDetected: ["Python", "Java", "JavaScript", "HTML", "CSS", "React", "Node.js"],
  missingSkills: ["Go", "Docker", "Kubernetes", "CI/CD", "AWS", "GCP", "PostgreSQL", "MongoDB"],
  radarData: [
    { category: "Technical", score: 45 },
    { category: "Soft Skills", score: 60 },
    { category: "Experience", score: 30 },
    { category: "Formatting", score: 75 },
    { category: "Impact", score: 40 },
  ],
  weakSections: ["Experience", "Professional Summary"],
  strongSections: ["Education", "Formatting"],
  improvementSuggestions: [
    "Quantify your achievements with metrics (e.g., 'Fixed 15 bugs, improving uptime by 10%').",
    "Add modern backend technologies like Docker or AWS to align with the job description.",
    "Rewrite the professional summary to highlight specific backend achievements rather than being a 'student looking for a role'."
  ],
  professionalSummary: [
    "Software Engineer with experience in full-stack web development using React and Node.js.",
    "Seeking to leverage Python and JavaScript skills to build scalable backend infrastructure."
  ],
  rewriteSuggestions: [
    {
      original: "Built a website for college students to share notes.",
      improved: "Architected and deployed a full-stack note-sharing platform serving 500+ college students using React and Node.js.",
      reason: "Adds scale (500+ students) and specifies the technology stack used."
    },
    {
      original: "Fixed bugs in the backend.",
      improved: "Resolved 20+ critical backend bugs, reducing system downtime by 15% and improving API response times.",
      reason: "Quantifies the impact of the bug fixes on system performance."
    },
    {
      original: "Worked with a team of 5 interns.",
      improved: "Collaborated in an agile environment with a 5-person engineering team to deliver features 2 weeks ahead of schedule.",
      reason: "Demonstrates teamwork methodology (agile) and a measurable positive outcome."
    }
  ],
  keywordCoverage: [
    { keyword: "Python", coverage: 100 },
    { keyword: "Docker", coverage: 0 },
    { keyword: "REST APIs", coverage: 20 },
    { keyword: "AWS/GCP", coverage: 0 },
    { keyword: "System Design", coverage: 10 }
  ],
  verdict: {
    status: "NEEDS IMPROVEMENT",
    confidence: 88,
    topReason: "Missing critical cloud and containerization skills (Docker, AWS) required for a Senior Backend role."
  },
  scoreBreakdown: {
    keywordMatch: 35,
    skillStrength: 45,
    experienceImpact: 30,
    formatting: 75
  },
  readinessLabel: "Low"
};
