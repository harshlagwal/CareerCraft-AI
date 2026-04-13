import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';
import { Coins, Globe, MapPin, ChevronRight } from 'lucide-react';

const mockChartData = [
  { name: 'P25', value: 40, fill: '#8b949e' },
  { name: 'P50', value: 65, fill: '#8b949e' },
  { name: 'P75', value: 90, fill: '#7c3aed' },
  { name: 'P90', value: 70, fill: '#8b949e' },
];

export default function SalaryCard({ role, indiaSalary, globalSalary }) {
  const [level, setLevel] = useState('Senior');

  return (
    <div className="bg-[#161b22] rounded-[32px] p-10 border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                 <Coins size={16} className="text-primary" />
              </div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Salary Benchmark Analysis</h4>
           </div>
           <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              {['Entry', 'Mid', 'Senior'].map((l) => (
                <button 
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${level === l ? 'bg-primary text-surface-lowest shadow-lg' : 'text-[#8b949e] hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
           <div className="space-y-8">
              <div className="group/item">
                 <div className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Globe size={11} /> Global Average (USD)
                 </div>
                 <div className="text-4xl font-bold text-white tracking-tighter group-hover/item:text-primary transition-colors">
                    {globalSalary || "$142,000"}
                 </div>
              </div>
              <div className="group/item">
                 <div className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <MapPin size={11} /> India Benchmark (INR)
                 </div>
                 <div className="text-4xl font-bold text-white tracking-tighter group-hover/item:text-emerald-400 transition-colors">
                    {indiaSalary || "₹42,50,000"}
                 </div>
              </div>
           </div>

           <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} className="transition-all duration-500 opacity-60 hover:opacity-100" />
                    ))}
                  </Bar>
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '10px' }}
                     cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-white/5">
         <span className="text-[9px] font-bold text-[#8b949e] uppercase tracking-widest opacity-60 italic">
            Adjusted for Purchasing Power Parity (PPP)
         </span>
         <button className="flex items-center gap-2 text-[10px] font-bold text-white hover:text-primary transition-all group/btn">
            Detailed Breakdown <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}
