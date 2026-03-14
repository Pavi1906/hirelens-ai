
```markdown
# HireLens AI

HireLens AI is an AI-powered resume analysis platform that simulates how modern Applicant Tracking Systems (ATS) and technical recruiters evaluate resumes.

The system analyzes resumes against job descriptions and produces structured insights, scoring, and improvement recommendations.

---

## 🚀 Live Demo

https://hirelens-ai-kappa.vercel.app/

---

##🚀 Demo Link

https://drive.google.com/file/d/1DFGYBDY8wbKs9PjczPRs9k7D7WNgJtfn/view?usp=share_link

---

## 🎯 Problem

Recruiters spend only a few seconds scanning a resume.  
Many candidates are filtered out by automated ATS systems before a human ever reviews their profile.

Job seekers often don't know:
- How well their resume matches a job description
- Which skills are missing
- How to improve weak resume bullet points

---

## ⚠️ API Limit Notice

This project uses the Google Gemini API to analyze resumes and simulate ATS screening.

Because the app currently runs on the **free API tier**, requests may sometimes reach the API rate limit.

If this happens, you may see the message:

API Rate Limit Exceeded

To still explore the system and view the full analysis dashboard:

👉 Click **"Try with Sample Resume"**

This will load a **pre-generated demo analysis** so that all features can still be viewed, including:

- ATS Match Score
- Resume Strength Analysis
- Recruiter Decision Simulation
- Interview Probability
- Improvement Suggestions

This demo option ensures the platform can always be evaluated even when the API quota is temporarily exceeded.

---

## 💡 Solution

HireLens AI simulates the same evaluation pipeline used in modern hiring systems.

The system analyzes resumes and provides:

- Resume Score
- ATS Match Score
- Skill Gap Analysis
- Keyword Coverage
- Recruiter Decision Simulation
- Resume Improvement Suggestions

This helps candidates optimize resumes before applying.

---

## ✨ Key Features

### Resume Score
Rates overall resume quality from **0–10**.

### ATS Match Score
Measures keyword match percentage against the job description.

### Skill Detection
Identifies technical and soft skills present in the resume.

### Missing Skills
Highlights important skills from the job description that are absent.

### Radar Chart
Visualizes candidate strengths across:
- Technical Skills
- Soft Skills
- Experience
- Formatting
- Impact

### Keyword Coverage Analysis
Shows percentage coverage of important skills.

### Recruiter Decision Simulation
Outputs recruiter verdict:

- STRONG MATCH
- MODERATE MATCH
- NEEDS IMPROVEMENT

### AI Resume Rewrite Engine
Transforms weak resume bullet points into stronger professional statements.

Example:

Before:
```

Built a website for college project

```

After:
```

Developed a responsive web application using React and Node.js that improved student engagement by 40%.

```

---

## 🏗 Architecture

```

Resume PDF
↓
Gemini AI Analysis
↓
Skill Extraction
↓
ATS Keyword Matching
↓
Scoring Engine
↓
Insights Dashboard

```

---

## 🛠 Tech Stack

Frontend
- React
- TypeScript
- Vite
- TailwindCSS

Visualization
- Recharts

AI Engine
- Google Gemini API

Deployment
- Vercel

Version Control
- Git + GitHub

---

## ⚙️ Installation

Clone the repository:

```

git clone [https://github.com/Pavi1906/hirelens-ai.git](https://github.com/Pavi1906/hirelens-ai.git)
cd hirelens-ai

```

Install dependencies:

```

npm install

```

Create environment file:

```

.env

```

Add your Gemini API key:

```

VITE_GEMINI_API_KEY=your_api_key_here

```

Run the development server:

```

npm run dev

```

Open in browser:

```

[http://localhost:3000](http://localhost:3000)

```

---

## 🌐 Deployment

Deploy using Vercel:

```

vercel --prod

```

---

## 📹 Demo Video

(Add your Loom demo video link here)

---

## 👩‍💻 Author

Pavithra P

GitHub:  
https://github.com/Pavi1906

---

## 📜 License

MIT License
```

