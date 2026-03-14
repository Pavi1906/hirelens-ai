import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const steps = [
  "Parsing Resume Data...",
  "Extracting Entities & Skills...",
  "Running ATS Keyword Matching...",
  "Calculating Competency Scores...",
  "Generating Rewrite Suggestions...",
  "Finalizing Insights..."
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-10 bg-white dark:bg-slate-900/60 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 mb-4">
          <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Analysis in Progress</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Simulating recruiter and ATS evaluation...</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div 
              key={step} 
              className={`flex items-center gap-4 transition-all duration-500 ${
                isActive ? 'opacity-100 translate-x-2' : isPending ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-6 h-6 text-indigo-500 dark:text-indigo-400 animate-spin shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700 shrink-0" />
              )}
              <span 
                className={`font-medium ${
                  isActive ? 'text-indigo-700 dark:text-indigo-300' : isCompleted ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
