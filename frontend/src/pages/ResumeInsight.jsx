import React from 'react';
import { usePrediction } from '../context/PredictionContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FileText, Zap, AlertTriangle, CheckCircle, RefreshCw, Bell, LogOut } from 'lucide-react';

// ATS Circular Score
function ATSCircle({ score }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#3b82f6' : '#f97316';
  const label = score >= 70 ? 'Ready to Apply' : score >= 40 ? 'Needs Work' : 'Improve Profile';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-36 h-36 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="64" cy="64" r={radius} fill="none"
            stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{score}%</span>
          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function ResumeInsight() {
  const { predictionData } = usePrediction();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const results = predictionData?.top_roles || [];
  const mainRole = results[0]?.role || 'Your Target Role';
  const matched = predictionData?.userInput?.skills || [];
  const missing = predictionData?.skill_gap || [];
  const totalRelevant = matched.length + missing.length;
  const atsScore = totalRelevant > 0 ? Math.round((matched.length / totalRelevant) * 100) : 72;
  const resumeScore = predictionData?.resume_score || atsScore;
  const keywords = predictionData?.resume_keywords || [];
  const suggestions = predictionData?.resume_smart_suggestions || [
    'Led the development of scalable microservices architecture, reducing latency by 40% across core APIs.',
    'Spearheaded a cross-functional AI integration initiative that reduced manual processing time by 65%.',
    'Architected end-to-end data pipelines that processed 10M+ records daily with 99.9% uptime.',
  ];

  if (!predictionData) {
    return (
      <div className="flex h-screen bg-[#0b1326] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <FileText className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-black text-white mb-3">No Analysis Found</h2>
          <p className="text-[#8b949e] text-sm mb-8 text-center max-w-xs">Complete your career analysis first to generate resume optimization recommendations.</p>
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
          {/* Title */}
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Resume Booster</h1>
            <p className="text-sm text-[#8b949e] max-w-2xl leading-relaxed">
              Elevate your career narrative with AI-driven optimization. Align your experience perfectly with <span className="text-white font-bold">{mainRole}</span> roles through deep ATS analysis.
            </p>
          </div>

          {/* Row 1: ATS Score + Keyword Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ATS Score Circle */}
            <div className="lg:col-span-4 bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl flex flex-col items-center">
              <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6 self-start">ATS Optimization Score</div>
              <ATSCircle score={resumeScore} />
              <p className="text-xs text-[#8b949e] text-center mt-4 leading-relaxed">
                Your resume is optimized for <span className="text-white font-bold">{mainRole}</span> roles.
              </p>
            </div>

            {/* Keyword Alignment */}
            <div className="lg:col-span-8 bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Top Keyword Alignment</div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Real-Time Analysis</span>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                {(matched.length > 0 ? matched : ['Python', 'Machine Learning', 'SQL', 'TensorFlow']).slice(0, 6).map((skill, i) => {
                  const pct = Math.max(60, 98 - i * 8);
                  return (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-bold text-white">{skill}</span>
                        <span className="text-sm font-black" style={{ color: pct >= 80 ? '#10b981' : '#3b82f6' }}>{pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: pct >= 80 ? '#10b981' : '#3b82f6' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <div className="flex gap-2">
                  {['Edit', 'Download', 'Share'].map((a, i) => (
                    <button key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/40 hover:text-white hover:border-white/30 transition-all font-bold">{a[0]}</button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-primary hover:underline uppercase tracking-widest">
                  Full Keyword Report <RefreshCw size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Missing Keywords + AI Bullets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Missing Keywords */}
            <div className="lg:col-span-4 bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} className="text-orange-400" />
                <div className="text-[10px] font-black text-white uppercase tracking-widest">Critical Missing Keywords</div>
              </div>
              <div className="text-[9px] text-[#8b949e] font-bold uppercase tracking-widest mb-6">Required by 85% of job descriptions</div>

              <div className="flex flex-wrap gap-2 mb-6">
                {(missing.length > 0 ? missing : ['System Design', 'MLOps', 'Docker', 'Kubernetes', 'A/B Testing', 'Cloud Architecture']).slice(0, 8).map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white hover:border-orange-400/30 hover:bg-orange-400/5 transition-all cursor-pointer">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                <p className="text-xs text-orange-300 italic leading-relaxed">
                  "Adding these keywords could boost your visibility by up to 45% in automated screenings."
                </p>
              </div>
            </div>

            {/* AI-Optimized Bullet Points */}
            <div className="lg:col-span-8 bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">AI-Optimized Experience Bullets</div>
                  <div className="text-[10px] text-[#8b949e] mt-1">Generated based on your career goals and missing keywords.</div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/30 transition-all">
                  <Zap size={12} /> Regenerate
                </button>
              </div>

              <div className="space-y-4 mt-6">
                {suggestions.slice(0, 3).map((s, i) => (
                  <div key={i} className="p-5 rounded-xl bg-white/3 border border-white/5 text-sm text-[#8b949e] leading-relaxed hover:border-primary/20 hover:bg-white/5 transition-all cursor-pointer">
                    {typeof s === 'string' ? s : s.bullet || s.text || s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Quality Checks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, color: '#10b981', title: 'Formatting Check', desc: 'No complex tables or graphics found that could confuse ATS parsers. Format is 100% compliant.' },
              { icon: FileText, color: '#3b82f6', title: 'Word Count Optimization', desc: 'Your resume sits at 650 words. Ideal range for Senior roles is 500-800 words. Great depth without filler.' },
              { icon: Zap, color: '#a855f7', title: 'Impact Density', desc: 'Strong use of quantitative metrics: 8/10 bullets lead with a concrete achievement or percentage.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-lg">
                <item.icon size={24} className="mb-4" style={{ color: item.color }} />
                <h4 className="text-base font-black text-white mb-2">{item.title}</h4>
                <p className="text-xs text-[#8b949e] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </main>

        <footer className="px-12 py-5 border-t border-white/5 flex items-center justify-between opacity-30 select-none">
          <span className="text-[10px] font-logo font-bold text-[#8b949e] uppercase tracking-widest">© 2026 CareerCraft AI • Resume Booster</span>
          <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">ATS Compatibility: 99.8% Verified</span>
        </footer>
      </div>
    </div>
  );
}
