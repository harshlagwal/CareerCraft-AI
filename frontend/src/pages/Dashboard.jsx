import React, { Component } from 'react';
import { AlertCircle, Sparkles, ArrowRight, Target, Lightbulb, Map, BookOpen, ChevronRight, TrendingUp, Zap, Search, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePrediction } from '../context/PredictionContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';


// --- Error Boundary ---
class DashboardErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0b1326] min-h-screen text-center p-10">
        <AlertCircle className="w-16 h-16 text-red-400 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
        <button onClick={() => window.location.reload()} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest">Reload</button>
      </div>
    );
    return this.props.children;
  }
}

// --- Confidence color helper ---
function getConfidenceStyle(pct) {
  if (pct >= 70) return { color: '#10b981', label: 'Job Ready', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' };
  if (pct >= 35) return { color: '#3b82f6', label: 'Moderate Match', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' };
  return { color: '#f97316', label: 'Early Stages', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)' };
}

// --- Best Match Card ---
function BestMatchCard({ career, domain }) {
  if (!career) return null;
  const pct = Math.round((career.confidence || 0) * 100);
  const style = getConfidenceStyle(pct);

  return (
    <div className="bg-[#1b2234] rounded-2xl p-8 border border-white/5 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" 
            style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}>
            Best Match
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 uppercase tracking-widest">
            {domain || 'Tech'} Domain
          </span>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-white leading-none">{pct}%</div>
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Confidence</div>
        </div>
      </div>

      <h2 className="text-3xl font-black text-white mb-3 leading-tight">{career.role || 'N/A'}</h2>
      <p className="text-sm text-[#8b949e] leading-relaxed mb-6">
        {career.description || 'Your skill profile and academic background create a strong alignment with this role.'}
      </p>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Alignment Progress</span>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: style.color }}>
            {pct}% Synced
          </span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${style.color}60, ${style.color})` }}
          />
        </div>
      </div>
    </div>
  );
}

// --- Alternative Career Card ---
function AltCareerCard({ career, onNavigate }) {
  const pct = Math.round((career.confidence || 0) * 100);
  return (
    <div className="bg-[#1b2234] rounded-2xl p-6 border border-white/5 shadow-lg flex flex-col justify-between group hover:border-primary/30 transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-white leading-tight">{career.role}</h3>
          <span className="text-2xl font-black text-white/70 ml-4 shrink-0">{pct}%</span>
        </div>
        <p className="text-xs text-[#8b949e] leading-relaxed">
          {career.description || 'A strong alternative path that aligns with several of your core skills and interests.'}
        </p>
      </div>
      <button
        onClick={onNavigate}
        className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
      >
        View Roadmap <ArrowRight size={12} />
      </button>
    </div>
  );
}

// --- Why This Career Panel ---
function WhyThisCareer({ explanation, skills }) {
  const missingSkills = Array.isArray(skills) ? skills.slice(0, 4) : [];
  return (
    <div className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-lg space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Lightbulb size={16} className="text-primary" />
        </div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Why This Career?</h4>
      </div>
      <p className="text-sm text-[#8b949e] leading-relaxed italic">
        "{explanation || 'Your history of building scalable projects combined with your technical depth creates a rare hybrid profile ideal for this role.'}"
      </p>

      {missingSkills.length > 0 && (
        <div>
          <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Skills Gap</div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold flex items-center gap-1.5">
                <Zap size={10} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Learning Roadmap Panel ---
function LearningRoadmap({ courses }) {
  const items = Array.isArray(courses) && courses.length > 0
    ? courses.slice(0, 3).filter(c => c !== null).map((c, i) => {
        const title = c.skill || (typeof c === 'object' ? (c.title || 'Specialized Module') : c);
        const desc = typeof c === 'object' 
          ? (c.description || (Array.isArray(c.courses) && c.courses[0]?.platform) || c.platform || 'Strengthen your foundation in this area.') 
          : 'Core module training.';
        return {
          step: String(i + 1).padStart(2, '0'),
          title: title,
          desc: desc,
        };
      })
    : [
        { step: '01', title: 'Core Foundations', desc: 'Master the fundamental skills required for this career path.' },
        { step: '02', title: 'Advanced Specialization', desc: 'Deep-dive into specialized tools and industry frameworks.' },
        { step: '03', title: 'Real-World Projects', desc: 'Build a portfolio of production-grade projects.' },
      ];
  return (
    <div className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
          <Map size={16} className="text-secondary" />
        </div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Learning Roadmap</h4>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.step} className="flex gap-4">
            <div className="text-[10px] font-black text-primary/50 w-6 shrink-0 mt-0.5">{item.step}</div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
              <div className="text-[11px] text-[#8b949e] leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Notification Component ---
function NotificationPanel({ isOpen, onClose }) {
  const notifications = [
    { id: 1, title: 'AI Insights Ready', message: 'Aapka career roadmap analyze ho chuka hai! Click karke latest trends check karein.', type: 'prediction', time: '2m ago', icon: Sparkles, color: 'text-primary' },
    { id: 2, title: 'Market Trend Alert', message: 'Aapke domain mein 15% salary hike dekhi gayi hai. Market Insights check karein.', type: 'market', time: '1h ago', icon: TrendingUp, color: 'text-tertiary' },
    { id: 3, title: 'Skill Gap Reminder', message: "Humein lagta hai aapki profile mein 'Cloud Computing' ki kami hai. Ise add karein.", type: 'skill', time: '3h ago', icon: Zap, color: 'text-primary-container' },
    { id: 4, title: 'Beta News', message: 'CareerCraft V2.4 is now stable! Humne naye Prediction engine ko upgrade kiya hai.', type: 'system', time: '1d ago', icon: Target, color: 'text-white/60' }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-3 w-80 md:w-96 bg-[#1b2234] border border-white/10 rounded-2xl shadow-2xl p-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xs font-black text-white uppercase tracking-widest">Notifications</h3>
        <button onClick={onClose} className="text-[10px] font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors">Mark all read</button>
      </div>
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.map((notif) => (
          <div key={notif.id} className="p-4 hover:bg-white/5 rounded-xl transition-all cursor-pointer group flex gap-4 items-start border-b border-white/5 last:border-0">
            <div className={`mt-1 w-8 h-8 rounded-lg bg-surface-lowest flex items-center justify-center border border-white/5 shrink-0 ${notif.color}`}>
              <notif.icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-xs font-bold text-white truncate">{notif.title}</h4>
                <span className="text-[9px] font-bold text-white/20 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-[11px] text-[#8b949e] leading-relaxed line-clamp-2">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center border-t border-white/5">
        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All Notifications</button>
      </div>
    </div>
  );
}

// --- Main Dashboard Content ---
function DashboardContent() {
  const { user, logout } = useAuth();
  const { predictionData } = usePrediction();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);

  const results = predictionData?.top_roles || [];
  const mainCareer = results[0] || { role: 'N/A', confidence: 0 };
  const altCareers = results.slice(1, 3);

  if (!predictionData) {
    return (
      <div className="flex h-screen bg-[#0b1326] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
            <Sparkles className="w-9 h-9 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Start Your Career Analysis</h2>
          <p className="text-[#8b949e] mb-10 max-w-sm text-center text-sm leading-relaxed">
            Fill in your profile to get AI-powered career recommendations tailored to your skills and background.
          </p>
          <button
            onClick={() => navigate('/form')}
            className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Analyze My Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0b1326] overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-50 h-20 px-10 flex items-center justify-between border-b border-white/5 bg-[#0b1326]">
          <div />

          <div className="flex items-center gap-5">
            <div className="relative">
              <div 
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center relative cursor-pointer hover:border-white/20 transition-all"
              >
                <Bell size={16} className={`transition-colors ${notifOpen ? 'text-primary' : 'text-white/40'}`} />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(192,193,255,0.8)]" />
              </div>
              <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-3 border-l border-white/10 pl-5 group"
              >
                <div className="text-right">
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">{user?.name || 'User'}</div>
                </div>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  className="w-10 h-10 rounded-full border border-white/10 bg-surface-lowest group-hover:border-primary/40 transition-all"
                  alt="avatar"
                />
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-44 bg-[#1b2234] border border-white/10 rounded-2xl shadow-2xl p-2 z-60">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-10 lg:p-12">
          {/* Page Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-white mb-2">Your Career Match Results</h1>
            <p className="text-sm text-[#8b949e] max-w-2xl">
              Our neural engine has synthesized your skills, values, and experience. Here are your high-probability career paths.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN — Main Results */}
            <div className="lg:col-span-8 space-y-6">
              {/* Best Match Card */}
              <BestMatchCard career={mainCareer} domain={predictionData?.domain} />

              {/* Alternative Career Cards */}
              {altCareers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {altCareers.map((career, i) => (
                    <AltCareerCard key={i} career={career} onNavigate={() => navigate('/roadmap')} />
                  ))}
                </div>
              )}

              {/* Re-Analyze CTA */}
              <div className="flex justify-start">
                <button
                  onClick={() => navigate('/form')}
                  className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all"
                >
                  <Sparkles size={14} />
                  Re-Analyze Profile
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN — Intelligence Panels */}
            <div className="lg:col-span-4 space-y-6">
              <WhyThisCareer
                explanation={predictionData?.explanation}
                skills={predictionData?.skill_gap}
              />

              {/* Learning Roadmap */}
              <LearningRoadmap courses={predictionData?.recommended_courses} />
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="px-12 py-6 border-t border-white/5 flex items-center justify-between opacity-30 select-none">
          <span className="text-[10px] font-logo font-bold text-[#8b949e] uppercase tracking-widest">© 2026 CareerCraft AI</span>
          <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Premium Dashboard</span>
        </footer>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardErrorBoundary>
      <DashboardContent />
    </DashboardErrorBoundary>
  );
}
