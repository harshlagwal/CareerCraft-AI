import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Rocket } from 'lucide-react';

const mockLineData = [
  { v: 10 }, { v: 25 }, { v: 18 }, { v: 45 }, { v: 38 }, { v: 70 }, { v: 62 }, { v: 85 }
];

export default function GrowthChart({ growth = "+28%", explanation }) {
  return (
    <div className="bg-[#161b22] rounded-[24px] p-8 border border-white/5 shadow-xl space-y-8 group hover:bg-[#1c2128] transition-all h-full">
      <div className="flex justify-between items-start">
         <h4 className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em]">Annual Growth</h4>
         <Rocket size={14} className="text-[#8b949e] group-hover:text-primary transition-colors" />
      </div>

      <div className="flex items-center justify-between gap-6">
         <div className="text-5xl font-bold text-white tracking-tighter transition-transform group-hover:scale-110">
            {growth}
         </div>
         <div className="h-[50px] flex-1 opacity-60">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockLineData}>
                  <Line 
                     type="monotone" 
                     dataKey="v" 
                     stroke="#7c3aed" 
                     strokeWidth={3} 
                     dot={false} 
                     className="drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                  />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      <p className="text-[11px] text-[#8b949e] leading-relaxed italic border-l border-white/10 pl-4">
         "{explanation || "Surging demand in generative intelligence implementation and cloud-native architecture adoption globally."}"
      </p>
    </div>
  );
}
