import { useState, useEffect } from 'react';
import { History as HistoryIcon, Search, Calendar, CheckCircle2, ExternalLink, TrendingUp, Bell, LogOut, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

function getConfidenceStyle(val) {
  if (val >= 70) return { label: 'High', color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' };
  if (val >= 35) return { label: 'Moderate', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)' };
  return { label: 'Beginner', color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.25)' };
}

export default function History() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [journey, setJourney] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:8003/journey', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setJourney(data);
        }
      } catch (e) {
        console.error('Failed to fetch journey', e);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchJourney();
    else setLoading(false);
  }, [user]);

  const filtered = journey
    .slice()
    .reverse()
    .filter(
      (item) =>
        item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex h-screen bg-[#0b1326] overflow-hidden">
      {/* ✅ Same Sidebar as Dashboard */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">

        {/* ✅ Same Header style as Dashboard */}
        <header className="sticky top-0 z-50 h-20 px-10 flex items-center justify-between border-b border-white/5 bg-[#0b1326]">
          <div />

          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-xl py-2 pl-11 pr-5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-primary/30 transition-all w-52 font-bold tracking-wider"
              />
            </div>

            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center relative cursor-pointer hover:border-white/20 transition-all">
              <Bell size={16} className="text-white/40" />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
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
            <h1 className="text-3xl font-black text-white mb-2">Prediction History</h1>
            <p className="text-sm text-[#8b949e] max-w-2xl">
              Review your career progression and all previous neural match results.
            </p>
          </div>

          {/* Mobile Search */}
          <div className="relative mb-6 lg:hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-11 pr-5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/30 transition-all font-bold"
            />
          </div>

          {/* Summary Stats */}
          {journey.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {[
                { label: 'Total Analyses', val: journey.length, color: '#6366f1' },
                { label: 'Best Match Score', val: `${Math.max(...journey.map((j) => j.confidence))}%`, color: '#10b981' },
                { label: 'Unique Roles Found', val: new Set(journey.map((j) => j.role)).size, color: '#3b82f6' },
                { label: 'Latest Analysis', val: journey[journey.length - 1]?.date?.split(' ')[0] || '—', color: '#a855f7' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1b2234] rounded-2xl p-6 border border-white/5 shadow-lg">
                  <div className="text-2xl font-black text-white mb-1">{stat.val}</div>
                  <div className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">{stat.label}</div>
                  <div className="mt-3 h-1 rounded-full" style={{ background: `${stat.color}30` }}>
                    <div className="h-full rounded-full w-3/4" style={{ background: stat.color }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* History List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-[#8b949e] text-sm font-bold uppercase tracking-widest animate-pulse">Retrieving Journey...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((item, idx) => {
                const style = getConfidenceStyle(item.confidence);
                const skillList = item.skills?.split(',').map((s) => s.trim()).filter(Boolean) || [];
                return (
                  <div
                    key={item.id || idx}
                    className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 hover:border-primary/25 transition-all shadow-lg group"
                  >
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                      {/* Left: Role Info */}
                      <div className="flex items-start gap-5 flex-1 min-w-0">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                          style={{ background: style.bg, borderColor: style.border }}
                        >
                          <CheckCircle2 size={22} style={{ color: style.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <h3 className="text-xl font-black text-white">{item.role}</h3>
                            <span
                              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                              style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
                            >
                              {item.confidence}% {style.label}
                            </span>
                          </div>

                          {/* Date */}
                          <div className="flex items-center gap-2 text-[11px] text-[#8b949e] font-bold mb-4">
                            <Calendar size={12} />
                            {item.date}
                          </div>

                          {/* Skills chips */}
                          {skillList.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {skillList.slice(0, 6).map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-bold text-white/50"
                                >
                                  {skill}
                                </span>
                              ))}
                              {skillList.length > 6 && (
                                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-bold text-white/30">
                                  +{skillList.length - 6} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Confidence bar + CTA */}
                      <div className="flex flex-col items-end gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-3xl font-black text-white leading-none">{item.confidence}%</div>
                          <div className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest mt-1">Confidence</div>
                        </div>
                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${item.confidence}%`, background: style.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[#1b2234] rounded-2xl p-20 border border-white/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">No Predictions Yet</h3>
              <p className="text-[#8b949e] text-sm max-w-sm leading-relaxed mb-8">
                {searchTerm
                  ? `No results found for "${searchTerm}". Try a different search.`
                  : "You haven't run any career analyses yet. Start your journey to see results here."}
              </p>
              {!searchTerm && (
                <Link
                  to="/form"
                  className="px-8 py-3.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  Start Analysis
                </Link>
              )}
            </div>
          )}
        </main>

        <footer className="px-12 py-5 border-t border-white/5 flex items-center justify-between opacity-30 select-none">
          <span className="text-[10px] font-logo font-bold text-[#8b949e] uppercase tracking-widest">© 2026 CareerCraft AI • Prediction History</span>
          <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">Neural Vault • Encrypted</span>
        </footer>
      </div>
    </div>
  );
}
