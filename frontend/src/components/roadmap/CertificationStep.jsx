import React from 'react';
import { Award, Lock, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export default function CertificationStep({ locked = true }) {
  return (
    <div className={`relative bg-surface rounded-[32px] p-8 border border-outline-variant/20 shadow-2xl transition-all duration-500 ${locked ? 'group' : 'hover:bg-outline-variant/5 border-emerald-500/30'}`}>
       {/* High-fidelity Lock Overlay if locked */}
       {locked && (
          <div className="absolute inset-x-0 bottom-0 top-[60%] flex items-center justify-center z-20">
             <div className="px-6 py-2.5 rounded-full bg-surface border border-outline-variant/30 text-[10px] font-black text-on-surface-variant uppercase tracking-widest backdrop-blur-xl shadow-2xl">
                Stage Locked • Complete Projects to Unlock
             </div>
          </div>
       )}

       <div className="absolute top-0 right-0 w-48 h-full opacity-[0.03] pointer-events-none p-10 group-hover:opacity-[0.1] transition-opacity">
          <Award size={160} />
       </div>

       <div className="relative z-10 space-y-8">
          <div className="flex justify-between items-start">
             <div className="space-y-1">
                <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.3em]">STEP 03</div>
                <h3 className="text-3xl font-bold text-on-background tracking-tight">Get Certified</h3>
             </div>
             {locked ? <Lock className="text-on-surface-variant w-6 h-6" /> : <ShieldCheck className="text-emerald-400 w-6 h-6 animate-pulse" />}
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm opacity-60">
             Validate your expertise through our final rigorous assessment. Earn the "CareerCraft Professional" credential, recognized by top-tier tech partners.
          </p>

          <div className="p-8 rounded-2xl bg-outline-variant/5 border border-outline-variant/20 space-y-4 opacity-50 italic">
             <p className="text-[11px] text-on-surface-variant">
               "Unlock this stage by completing your final portfolio project and achieving a 90% score in the Neural Core Proficiency test."
             </p>
          </div>

          <button className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all transform ${locked ? 'bg-outline-variant/10 text-on-surface-variant cursor-not-allowed border border-outline-variant/20' : 'bg-emerald-500 text-white hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20'}`}>
             {locked ? 'Locked Content' : 'Start Final Assessment'} 
             {!locked && <ChevronRight size={16} />}
          </button>
       </div>
    </div>
  );
}
