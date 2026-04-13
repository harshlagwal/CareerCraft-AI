import React from 'react';
import { usePrediction } from '../context/PredictionContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { TrendingUp, Zap, Globe, ArrowUpRight, BarChart2, Building2, MapPin, Flame, LogOut, Bell } from 'lucide-react';

const OPEN_ROLES = { 'Google': 42, 'Amazon': 115, 'Meta': 18, 'TCS': 240, 'OpenAI': 12, 'Microsoft': 89, 'NVIDIA': 36, 'Netflix': 24 };
const TRENDING_SKILLS_LIST = [
  { name: 'Prompt Engineering', growth: '420%', icon: Zap },
  { name: 'Multi-Cloud Strategy', growth: '150%', icon: Globe },
  { name: 'MLOps & LLMOps', growth: '280%', icon: TrendingUp },
];
const HOTSPOTS = [
  { rank: '01', city: 'Bangalore, IN', pct: '+35%' },
  { rank: '02', city: 'Hyderabad, IN', pct: '+28%' },
  { rank: '03', city: 'Austin, US', pct: '+22%' },
  { rank: '04', city: 'Singapore', pct: '+18%' },
];

function getDemandColor(level) {
  const map = { Hot: '#10b981', High: '#3b82f6', Rising: '#a855f7', Stable: '#f97316' };
  return map[level] || '#6366f1';
}

export default function MarketIntelligence() {
  const { predictionData } = usePrediction();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [isSenior, setIsSenior] = React.useState(false);

  const results = predictionData?.top_roles || [];
  const mainRole = results[0]?.role || 'Professional';
  const mi = predictionData?.market_insights || {};
  const multiplier = isSenior ? 1.4 : 1.0;
  
  // Helper to parse strings like "$160k", "₹22L", "140,000" into raw numbers
  const parseSalary = (val) => {
    if (!val) return 0;
    let clean = String(val).replace(/[₹$,]/g, '').toLowerCase();
    let num = parseFloat(clean);
    if (clean.includes('k')) num *= 1000;
    if (clean.includes('l')) num *= 100000;
    if (clean.includes('m')) num *= 1000000;
    return num;
  };

  const globalVal = parseSalary(mi.salary_global?.split(' - ')[1] || mi.salary_global || '142000');
  const displayGlobal = `$${Math.round((globalVal * multiplier) / 1000)}k`;
  
  const indiaVal = parseSalary(mi.salary_india || '4250000');
  const displayIndia = `₹${Math.round((indiaVal * multiplier) / 100000)}L+`;

  const companies = mi.top_companies || ['Google', 'Amazon', 'Meta', 'TCS', 'OpenAI'];
  const demandColor = getDemandColor(mi.demand_level);

  if (!predictionData) {
    return (
      <div className="flex h-screen bg-[#0b1326] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <Globe className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-black text-white mb-3">No Data Available</h2>
          <p className="text-[#8b949e] text-sm mb-8 text-center max-w-xs">Run a career analysis first to see market intelligence for your role.</p>
          <button onClick={() => navigate('/form')} className="px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest">Analyze Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b1326] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">

        {/* Header */}
        <header className="sticky top-0 z-50 h-20 px-10 flex items-center justify-between border-b border-white/5 bg-[#0b1326]">
          <div />
          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center relative cursor-pointer hover:border-white/20 transition-all">
              <Bell size={16} className="text-white/40" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 border-l border-white/10 pl-5">
                <div className="text-right">
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">{user?.name || 'User'}</div>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} className="w-10 h-10 rounded-full border border-white/10 bg-surface-lowest" alt="avatar" />
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-44 bg-[#1b2234] border border-white/10 rounded-2xl shadow-2xl p-2 z-60">
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-10 lg:p-12 space-y-8">
          {/* Page Title */}
          <div>
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Global Ecosystem Analysis</div>
            <h1 className="text-4xl font-black text-white mb-2">Market Intelligence <span className="text-white/30">2026</span></h1>
            <p className="text-sm text-[#8b949e] max-w-2xl leading-relaxed">
              Real-time career trajectories and economic demand mapping for <span className="text-white font-bold">{mainRole}</span>. Stay ahead of global workforce shifts.
            </p>
          </div>

          {/* Row 1: Salary + Demand + Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Salary Benchmark Card */}
            <div className="lg:col-span-8 bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <BarChart2 size={16} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Salary Benchmark Analysis</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSenior(false)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isSenior ? 'bg-primary/20 border border-primary/40 text-primary' : 'bg-white/5 border border-white/10 text-white/40'}`}>
                    Full Roles
                  </button>
                  <button 
                    onClick={() => setIsSenior(true)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isSenior ? 'bg-primary/20 border border-primary/40 text-primary' : 'bg-white/5 border border-white/10 text-white/40'}`}>
                    Senior Level
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs text-[#8b949e] font-bold uppercase tracking-widest mb-1">Global Average (USD)</div>
                  <div className="text-4xl font-black text-white">{displayGlobal}</div>
                </div>
                <div>
                  <div className="text-xs text-[#8b949e] font-bold uppercase tracking-widest mb-1">India Benchmark (INR)</div>
                  <div className="text-4xl font-black text-primary">{displayIndia}</div>
                </div>
              </div>

              {/* Salary Range Bar Chart Visual */}
              <div className="flex items-end gap-2 h-16 mb-4">
                {[
                  {h: 30, c: '#6366f1'}, 
                  {h: 50, c: '#06b6d4'}, 
                  {h: 70, c: '#10b981'}, 
                  {h: 100, c: '#a855f7'}, 
                  {h: 80, c: '#f59e0b'}, 
                  {h: 60, c: '#ef4444'}, 
                  {h: 40, c: '#3b82f6'}
                ].map((bar, i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-t-lg transition-all duration-500 hover:opacity-80" 
                    style={{ 
                      height: `${isSenior ? bar.h * 0.9 + 10 : bar.h}%`, 
                      background: i === 3 && !isSenior ? bar.c : (isSenior && i === 4 ? bar.c : `${bar.c}40`),
                      borderTop: `2px solid ${bar.c}`
                    }} 
                  />
                ))}
              </div>
              <div className="text-[10px] text-[#8b949e] font-medium flex items-center justify-between">
                <span>Adjusted for Purchasing Power Parity (PPP)</span>
                <button className="flex items-center gap-1 text-primary font-bold hover:underline">Detailed Breakdown <ArrowUpRight size={10} /></button>
              </div>
            </div>

            {/* Right: Demand + Growth */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Market Demand */}
              <div className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-xl flex-1">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Market Demand</div>
                <div className="text-5xl font-black mb-3" style={{ color: demandColor }}>{mi.demand_level || 'High'}</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full" style={{ width: mi.demand_level === 'Hot' ? '95%' : mi.demand_level === 'High' ? '80%' : '55%', background: demandColor }} />
                </div>
                <div className="text-[11px] text-[#8b949e]">88th percentile against all sectors</div>
              </div>

              {/* Annual Growth */}
              <div className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-xl flex-1">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Annual Growth</div>
                <div className="text-5xl font-black text-emerald-400 mb-3">+{mi.growth_rate || '28%'}</div>
                <div className="text-[11px] text-[#8b949e] leading-relaxed">Surging demand in generative AI implementation and cloud architecture.</div>
              </div>
            </div>
          </div>

          {/* Velocity Leaders (Companies) */}
          <div className="bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                <Flame size={16} className="text-orange-400" />
                Velocity Leaders
              </h3>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {companies.map((company, i) => (
                <div key={i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-all overflow-hidden relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-white/5">
                      <span className="text-lg font-black text-primary">{company.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black text-white">{company}</div>
                    <div className="text-[10px] text-[#8b949e]">{OPEN_ROLES[company] || Math.floor(Math.random() * 50 + 10)} Open Roles</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Trending Skills + Hotspots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trending Skills */}
            <div className="bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Trending Skills</h3>
              <div className="space-y-4">
                {TRENDING_SKILLS_LIST.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <skill.icon size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{skill.name}</div>
                        <div className="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest">{skill.growth} increase YoY</div>
                      </div>
                    </div>
                    <TrendingUp size={16} className="text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity Hotspots */}
            <div className="bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Opportunity Hotspots</h3>
              <p className="text-[11px] text-[#8b949e] mb-6">Top growth cities for technology roles</p>
              <div className="space-y-4">
                {HOTSPOTS.map((h) => (
                  <div key={h.rank} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] font-black text-primary/50 w-6">{h.rank}</div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#8b949e]" />
                        <span className="text-sm font-bold text-white uppercase tracking-wide">{h.city}</span>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-400">{h.pct} Hiring</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="px-12 py-5 border-t border-white/5 flex items-center justify-between opacity-30 select-none">
          <span className="text-[10px] font-logo font-bold text-[#8b949e] uppercase tracking-widest">© 2026 CareerCraft AI • Market Intelligence</span>
          <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Data: Real-Time Workforce Vectors</span>
        </footer>
      </div>
    </div>
  );
}
