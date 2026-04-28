import React from 'react';
import { AlertTriangle, Zap, ArrowRight } from 'lucide-react';

export default function MissingSkills({ skills = [] }) {
  return (
    <div className="bg-surface rounded-[32px] p-10 border border-outline-variant/20 shadow-xl space-y-8 h-full transition-colors duration-300">
       <div className="space-y-2">
          <div className="flex items-center gap-3">
             <AlertTriangle size={16} className="text-orange-500 dark:text-orange-400" />
             <h4 className="text-[10px] font-bold text-on-background uppercase tracking-[0.3em]">Critical Missing Keywords</h4>
          </div>
          <p className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest opacity-60">Required by 85% of job descriptions in your niche</p>
       </div>

       <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? skills.map((skill, i) => (
             <div key={i} className="px-5 py-3 rounded-2xl bg-outline-variant/5 border border-outline-variant/30 text-on-background text-[11px] font-bold hover:bg-outline-variant/10 hover:border-outline-variant/40 transition-all cursor-default">
                {skill}
             </div>
          )) : (
             <div className="text-[11px] text-on-surface-variant italic opacity-60 pl-2">All primary vectors accounted for.</div>
          )}
       </div>

       <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 relative group cursor-pointer overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4"><Zap size={48} className="text-orange-500" /></div>
          <p className="text-[11px] text-orange-800 dark:text-orange-100 italic leading-relaxed opacity-90 relative z-10">
             "Adding these strategic keywords could boost your visibility by up to <span className="text-orange-600 dark:text-orange-400 font-black">45% in automated screenings</span>."
          </p>
       </div>
    </div>
  );
}
