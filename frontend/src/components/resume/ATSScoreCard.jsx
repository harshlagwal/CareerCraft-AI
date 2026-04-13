import React from 'react';
import { Target, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export default function ATSScoreCard({ score, role }) {
  const getStatus = () => {
    if (score >= 70) return { label: 'High / Ready to Apply', color: 'text-emerald-400', bar: 'stroke-emerald-400', text: 'Highly Optimized' };
    if (score >= 40) return { label: 'Moderate / Improvement Ready', color: 'text-amber-400', bar: 'stroke-amber-400', text: 'Growing Match' };
    return { label: 'Low / Foundational', color: 'text-rose-400', bar: 'stroke-rose-400', text: 'Critical Gaps Detected' };
  };

  const status = getStatus();
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#161b22] rounded-[32px] p-10 border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col items-center justify-center text-center">
       <div className="absolute top-8 left-8">
          <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.3em]">ATS Optimization Score</h4>
       </div>

       <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <svg className="w-full h-full -rotate-90">
             <circle cx="96" cy="96" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
             <circle 
                cx="96" cy="96" r={radius} fill="transparent" 
                className={`${status.bar} transition-all duration-1000 ease-out`} 
                strokeWidth="12" strokeDasharray={circumference} strokeDashoffset={offset} 
                strokeLinecap="round" 
             />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="text-6xl font-bold text-white tracking-tighter">{score}%</div>
             <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${status.color}`}>{status.text}</div>
          </div>
       </div>

       <div className="space-y-4">
          <p className="text-xs text-[#8b949e] max-w-[200px] leading-relaxed mx-auto">
             Your profile is {status.text.toLowerCase()} for <br/><span className="text-white font-bold">{role}</span> positions.
          </p>
          <div className={`px-4 py-2 rounded-xl bg-white/2 border border-white/5 text-[9px] font-bold uppercase tracking-widest ${status.color}`}>
             {status.label}
          </div>
       </div>
    </div>
  );
}
