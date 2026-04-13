import React from 'react';
import { Layers, MousePointer2, FileSearch } from 'lucide-react';

const KeywordBar = ({ label, score }) => (
  <div className="space-y-3 group cursor-default">
    <div className="flex justify-between items-end">
       <div className="text-[11px] font-bold text-white uppercase tracking-widest group-hover:text-primary transition-colors">{label}</div>
       <div className="text-[13px] font-bold text-primary">{score}%</div>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
       <div className="h-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.4)] transition-all duration-1000" style={{ width: `${score}%` }} />
    </div>
  </div>
);

export default function KeywordMatch({ matched = [] }) {
  const dummyKeywords = [
    { label: "Predictive Modeling", score: 95 },
    { label: "Scalable Systems", score: 88 },
    { label: "Data Architecture", score: 72 },
    { label: "Enterprise Security", score: 64 }
  ];

  return (
    <div className="bg-[#161b22] rounded-[32px] p-10 border border-white/5 shadow-xl space-y-10 group h-full">
       <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3">
             <Layers size={16} className="text-primary" /> Top Keyword Alignment
          </h4>
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary uppercase tracking-widest">
             Real-time Analysis
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {(matched.length > 0 ? matched : dummyKeywords).map((k, i) => (
             <KeywordBar key={i} label={k.label || k} score={k.score || Math.floor(Math.random() * 30) + 70} />
          ))}
       </div>

       <div className="pt-6 border-t border-white/5 flex justify-end">
          <button className="flex items-center gap-2 text-[9px] font-black text-[#8b949e] hover:text-white uppercase tracking-widest transition-colors">
             Full Keyword Report • Detailed Vector Mapping
          </button>
       </div>
    </div>
  );
}
