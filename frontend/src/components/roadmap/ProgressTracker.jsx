import React from 'react';
import { Target, TrendingUp, Award, Zap, Layout } from 'lucide-react';

const Milestone = ({ title, desc, done }) => (
  <div className={`p-6 rounded-2xl border flex flex-col justify-between h-[160px] transition-all cursor-pointer group ${done ? 'bg-primary/5 border-primary/20' : 'bg-white/2 border-white/5 opacity-50 hover:opacity-80'}`}>
     <div>
        <div className="flex justify-between items-start mb-4">
           {done ? <Layout size={18} className="text-primary" /> : <Zap size={18} className="text-[#8b949e]" />}
           {done && <div className="text-[7px] font-black bg-primary text-surface-lowest px-1.5 py-0.5 rounded uppercase tracking-widest">UNLOCKED</div>}
        </div>
        <h5 className="text-[13px] font-bold text-white mb-1 group-hover:text-primary transition-colors">{title}</h5>
        <p className="text-[9px] text-[#8b949e] leading-relaxed opacity-80">{desc}</p>
     </div>
  </div>
);

export default function ProgressTracker({ role }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
       <div className="flex items-center gap-3">
          <Target size={18} className="text-primary" />
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Career Milestones & AI Rewards</h4>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Milestone 
             title="Cognitive Core" 
             desc="Completed the foundational neural training series for target vector alignment."
             done={true}
          />
          <Milestone 
             title="The Architect" 
             desc="Earned via the successful deployment of 3 significant portfolio projects."
             done={false}
          />
          <Milestone 
             title="Market Lead" 
             desc="Post-certification terminal reward. Access to exclusive hiring networks."
             done={false}
          />
       </div>
    </div>
  );
}
