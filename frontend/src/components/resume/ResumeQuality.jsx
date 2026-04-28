import React from 'react';
import { FileText, Type, BarChart4, CheckCircle2, AlertCircle } from 'lucide-react';

const QualityCard = ({ icon: Icon, title, desc, rating, status = 'success' }) => (
  <div className="bg-surface rounded-3xl p-8 border border-outline-variant/20 shadow-xl space-y-5 transition-colors duration-300 hover:bg-outline-variant/5">
     <div className="flex justify-between items-start">
        <Icon size={20} className={status === 'success' ? 'text-primary' : 'text-amber-500 dark:text-amber-400'} />
        <div className="text-[10px] font-black text-on-background uppercase tracking-widest">{rating}</div>
     </div>
     <div className="space-y-2">
        <h5 className="text-[13px] font-bold text-on-background tracking-tight">{title}</h5>
        <p className="text-[10px] text-on-surface-variant leading-relaxed opacity-80">{desc}</p>
     </div>
  </div>
);

export default function ResumeQuality() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <QualityCard 
          icon={FileText} 
          title="Formatting Check" 
          desc="Neural parser verified. Clean structure detected with zero incompatible table artifacts." 
          rating="PASSED"
       />
       <QualityCard 
          icon={Type} 
          title="Vector Density" 
          desc="Profile length sits at ~720 words. Optimized for high-fidelity scanning depth." 
          rating="OPTIMAL"
       />
       <QualityCard 
          icon={BarChart4} 
          title="Impact Velocity" 
          desc="Presence of quantitative metrics detected. 8/10 bullets contain specific achievement vectors." 
          rating="ELITE"
       />
    </div>
  );
}
