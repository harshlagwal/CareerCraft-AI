import React from 'react';
import { Zap, TrendingUp, Cpu, Cloud, Database, BarChart3, Binary } from 'lucide-react';

const SkillItem = ({ label, growth, icon: Icon }) => (
  <div className="flex items-center justify-between p-5 rounded-2xl bg-outline-variant/5 border border-outline-variant/20 hover:bg-outline-variant/10 hover:border-primary/20 transition-all group cursor-default">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-outline-variant/10 border border-outline-variant/20 shadow-sm group-hover:border-primary/20">
         <Icon size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
      </div>
      <div>
         <div className="text-[13px] font-bold text-on-background mb-1">{label}</div>
         <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight opacity-60">
            {growth} Increase YoY
         </div>
      </div>
    </div>
    <TrendingUp size={16} className="text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all" />
  </div>
);

export default function TrendingSkills({ skills }) {
  const mockSkills = [
    { label: "TensorFlow Engine", growth: "420%", icon: Binary },
    { label: "Cloud Scalability", growth: "150%", icon: Cloud },
    { label: "Deep Learning Logic", growth: "88%", icon: Cpu }
  ];

  return (
    <div className="bg-surface rounded-[32px] p-10 border border-outline-variant/20 shadow-xl space-y-8 h-full transition-colors duration-300">
      <div className="flex justify-between items-start">
         <h4 className="text-[10px] font-bold text-on-background uppercase tracking-[0.3em] flex items-center gap-3">
            <Zap size={16} className="text-primary animate-pulse" /> Trending Skill Taxonomy
         </h4>
      </div>

      <div className="flex flex-col gap-4">
        {(skills || mockSkills).map((s, i) => (
          <SkillItem key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
