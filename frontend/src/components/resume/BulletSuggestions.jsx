import React, { useState } from 'react';
import { Copy, RefreshCw, Sparkles, Check } from 'lucide-react';

const Bullet = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-[#1b2234]/40 border border-white/5 rounded-2xl p-6 hover:bg-[#1b2234]/60 hover:border-primary/30 transition-all relative">
       <p className="text-[13px] text-[#8b949e] leading-relaxed pr-10 group-hover:text-white transition-colors">
          {text}
       </p>
       <button 
          onClick={handleCopy}
          className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 border border-white/5 text-[#8b949e] hover:text-primary hover:border-primary/20 transition-all opacity-0 group-hover:opacity-100"
       >
          {copied ? <Check size={14} /> : <Copy size={14} />}
       </button>
    </div>
  );
};

export default function BulletSuggestions({ suggestions = [] }) {
  const dummyBullets = [
    "Led the migration of a multi-domain Cloud Architecture, reducing latency by 45% and ensuring 99.9% uptime across enterprise web platforms.",
    "Orchestrated global data pipelines using Python and AWS, processing 50TB+ of neural vector data monthly for real-time career insights.",
    "Spearheaded stakeholder alignment workshops for strategic roadmap integration, accelerating feature deployment by two quarters."
  ];

  return (
    <div className="bg-[#161b22] rounded-[32px] p-10 border border-white/5 shadow-2xl space-y-8 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
          <Sparkles size={160} />
       </div>

       <div className="flex justify-between items-center relative z-10">
          <div className="space-y-2">
             <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3">
                AI-Optimized Experience Bullets
             </h4>
             <p className="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest opacity-60">Generated based on target role vectors</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all group/regen">
             <RefreshCw size={14} className="group-hover/regen:rotate-180 transition-transform duration-700" /> Regenerate
          </button>
       </div>

       <div className="space-y-4 relative z-10">
          {(suggestions.length > 0 ? suggestions : dummyBullets).map((s, i) => (
             <Bullet key={i} text={s} />
          ))}
       </div>
    </div>
  );
}
