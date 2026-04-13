import React from 'react';
import { MapPin, Globe, ArrowUpRight, CheckCircle2, Layout } from 'lucide-react';

export default function Hotspots() {
  const geoData = [
    { city: "Bangalore, IN", growth: "+35%" },
    { city: "Austin, US", growth: "+22%" },
    { city: "Hyderabad, IN", growth: "+28%" }
  ];

  return (
    <div className="bg-[#161b22] rounded-[32px] p-10 border border-white/5 shadow-xl space-y-8 h-full">
      <div className="flex justify-between items-start">
         <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3">
            <Globe size={16} className="text-primary" /> Opportunity Hotspots
         </h4>
         <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
            Remote Active
         </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {geoData.map((g, i) => (
           <div key={i} className="p-6 rounded-2xl bg-white/2 border border-white/5 group hover:bg-white/5 transition-all">
              <div className="text-[9px] font-bold text-[#8b949e] uppercase tracking-[0.2em] mb-2">{i+1 < 10 ? `0${i+1}` : i+1}. {g.city}</div>
              <div className="text-2xl font-bold text-white tracking-tight">{g.growth} Hiring</div>
           </div>
        ))}
        <div className="p-6 rounded-2xl border border-white/5 border-dashed flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
           <div className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">Explore 50+ Cities <ArrowUpRight size={14}/></div>
        </div>
      </div>
    </div>
  );
}

export function MarketEntryStrategy() {
  const steps = [
    { title: "Calibrate Key Skill Taxonomy", desc: "Focus on High-Growth vectors like Neural Modeling and Cloud Scale." },
    { title: "Architect Portfolio Vectors", desc: "Build enterprise-grade projects that demonstrate core capability." },
    { title: "Inbound Pipeline Sync", desc: "Position profile for direct exposure to Hiring Velocity Leaders." }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-[32px] p-10 border border-white/5 shadow-2xl space-y-10">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/10">
            <Layout size={20} className="text-primary" />
         </div>
         <h4 className="text-xl font-bold text-white tracking-tight">Market Entry Strategy</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
           <div key={i} className="space-y-4 relative p-6 bg-white/2 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0d1117] border border-white/5 flex items-center justify-center text-[10px] font-bold text-primary shadow-lg ring-4 ring-[#0d1117]">
                 {i+1}
              </div>
              <div className="flex items-center gap-3">
                 <CheckCircle2 size={16} className="text-primary" />
                 <h5 className="text-[13px] font-bold text-white tracking-tight">{s.title}</h5>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed opacity-80">{s.desc}</p>
           </div>
        ))}
      </div>
    </div>
  );
}
