import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function DemandMeter({ demand = "High", percentile = 88 }) {
  const getStatus = () => {
    if (demand === "Low") return { color: 'text-rose-500', bar: 'bg-rose-500', label: 'LOW' };
    if (demand === "Medium") return { color: 'text-amber-500', bar: 'bg-amber-500', label: 'MEDIUM' };
    return { color: 'text-emerald-400', bar: 'bg-emerald-400', label: 'HIGH' };
  };

  const status = getStatus();

  return (
    <div className="bg-[#161b22] rounded-[24px] p-8 border border-white/5 shadow-xl space-y-8 group hover:bg-[#1c2128] transition-all">
      <div className="flex justify-between items-start">
         <h4 className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em]">Market Demand</h4>
         <Activity size={14} className="text-[#8b949e] group-hover:text-primary transition-colors" />
      </div>

      <div className="space-y-4 text-center">
         <div className={`text-6xl font-black italic tracking-tighter ${status.color} filter drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
            {status.label}
         </div>
         
         <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center text-[10px] font-bold text-[#8b949e] uppercase tracking-widest px-1">
               <span>Volume Index</span>
               <span className="text-white">{percentile}% Rank</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
               <div 
                  className={`h-full ${status.bar} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                  style={{ width: `${percentile}%` }}
               />
            </div>
         </div>
      </div>

      <p className="text-[9px] text-[#8b949e] italic leading-relaxed text-center opacity-60 font-medium">
         {percentile}% percentile growth momentum against all active sectors in the current fiscal quarter.
      </p>
    </div>
  );
}
