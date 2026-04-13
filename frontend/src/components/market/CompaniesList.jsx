import React from 'react';
import { ExternalLink, Target, Building2 } from 'lucide-react';

const CompanyCard = ({ name, roles, trend = "up" }) => {
  return (
    <div className="bg-[#1b2234]/40 border border-white/5 rounded-2xl p-6 hover:bg-[#1b2234]/60 hover:border-primary/30 transition-all cursor-pointer group text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 mx-auto border border-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
         <Building2 size={24} className="text-[#8b949e] group-hover:text-primary" />
      </div>
      <div>
         <div className="text-[13px] font-bold text-white mb-1">{name}</div>
         <div className="text-[10px] text-[#8b949e] font-bold uppercase tracking-tight">
            {roles} Active Vectors
         </div>
      </div>
    </div>
  );
};

export default function CompaniesList() {
  const companies = [
    { name: "Google", roles: "42", trend: "up" },
    { name: "Amazon", roles: "115", trend: "up" },
    { name: "Microsoft", roles: "88", trend: "down" },
    { name: "TCS", roles: "240", trend: "up" },
    { name: "OpenAI", roles: "12", trend: "up" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-4">
         <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Hiring Velocity Leaders</h4>
         <button className="flex items-center gap-2 text-[9px] font-bold text-[#8b949e] hover:text-white uppercase tracking-widest transition-colors">
            View All 250+ <ExternalLink size={12} />
         </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {companies.map((c, i) => (
          <CompanyCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
}
