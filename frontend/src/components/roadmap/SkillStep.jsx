import React from 'react';
import { BookOpen, CheckCircle2, PlayCircle, Zap } from 'lucide-react';

export default function SkillStep({ skills = [], completed = false }) {
  return (
    <div className={`relative bg-surface rounded-[32px] p-8 border border-outline-variant/20 shadow-2xl transition-colors duration-500 hover:bg-outline-variant/5 ${completed ? 'border-emerald-500/20' : ''}`}>
       {/* Illustration Placeholder - Right Side style */}
       <div className="absolute top-0 right-0 w-40 h-full opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity p-8">
          <BookOpen size={120} />
       </div>

       <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">STEP 01</div>
                <h3 className="text-3xl font-bold text-on-background tracking-tight">Learn Core Skills</h3>
             </div>
             {completed && <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 w-6 h-6" />}
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm opacity-80">
             Master the foundational principles and algorithmic vectors required for your target role through targeted learning modules.
          </p>

          <div className="flex flex-wrap gap-2">
             {skills.map((skill, i) => (
                <div key={i} className="px-4 py-2 rounded-xl bg-outline-variant/5 border border-outline-variant/30 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-on-background transition-colors cursor-default">
                   {skill}
                </div>
             ))}
          </div>

          <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
             Review Learning Modules <PlayCircle size={14} />
          </button>
       </div>
    </div>
  );
}
