import React from 'react';
import { Rocket, Zap, Clock, Lock, CheckCircle2 } from 'lucide-react';

const ProjectCard = ({ title, active, done, locked }) => (
  <div className={`flex-1 p-5 rounded-2xl border transition-all ${locked ? 'bg-white/2 border-white/5 opacity-40' : active ? 'bg-primary/10 border-primary/30 shadow-lg' : 'bg-white/5 border-white/10 opacity-80'}`}>
     <div className="flex justify-between items-start mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
           {done ? <CheckCircle2 size={16} className="text-emerald-400" /> : locked ? <Lock size={14} className="text-[#8b949e]" /> : <Clock size={16} className="text-primary" />}
        </div>
     </div>
     <div className={`text-[11px] font-bold tracking-tight mb-1 ${locked ? 'text-[#8b949e]' : 'text-white'}`}>{title}</div>
     <div className="text-[8px] font-black uppercase tracking-widest text-[#8b949e]">PROJECT {done ? 'COMPLETE' : locked ? 'LOCKED' : 'ACTIVE'}</div>
  </div>
);

export default function ProjectStep({ projects = [], progress = 35, locked = false }) {
  const dummyProjects = [
    { title: "Neural Vector Explorer", active: false, done: true },
    { title: "Enterprise Pipeline X", active: true, done: false },
    { title: "Market Momentum App", active: false, done: false, locked: true }
  ];

  return (
    <div className={`relative bg-[#161b22] rounded-[32px] p-8 border border-white/5 shadow-2xl transition-all duration-500 ${locked ? 'opacity-40 grayscale pointer-events-none' : 'hover:bg-[#1c2128]'}`}>
       <div className="absolute top-0 right-0 w-40 h-full opacity-[0.03] pointer-events-none p-8">
          <Rocket size={120} />
       </div>

       <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                   STEP 02 <Zap size={14} className="text-primary animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Build Projects</h3>
             </div>
             {locked && <Lock className="text-[#8b949e] w-6 h-6" />}
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed max-w-sm opacity-80">
             Apply your vector knowledge to real-world scenarios. Build a comprehensive portfolio of 3 major AI-integrated applications.
          </p>

          <div className="space-y-3">
             <div className="flex justify-between items-center text-[9px] font-bold text-[#8b949e] uppercase tracking-widest px-1">
                <span>Current Phase Progress</span>
                <span className="text-primary">{progress}% Complete</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.4)] transition-all duration-1000" style={{ width: `${progress}%` }} />
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             {(projects.length > 0 ? projects : dummyProjects).map((p, i) => (
                <ProjectCard key={i} {...p} />
             ))}
          </div>

          {!locked && (
             <button className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-primary text-surface-lowest rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                Continue Building <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
             </button>
          )}
       </div>
    </div>
  );
}
