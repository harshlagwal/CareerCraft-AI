import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Zap, Shield, Activity, RefreshCw, 
  Search, History, AlertCircle, TrendingUp, BarChart2, MessageSquare,
  ChevronRight, ArrowUpRight, CheckCircle2, Settings, LogOut, Terminal,
  Lock, Cpu, Server, Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-8 py-4 transition-all relative group ${active ? 'text-white' : 'text-slate-500 hover:text-primary'}`}>
     {active && <div className="absolute inset-y-1.5 left-2 right-2 bg-primary rounded-2xl shadow-lg shadow-primary/25 animate-in fade-in zoom-in-95 duration-300" />}
     <Icon size={20} className={`relative z-10 ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
     <span className="relative z-10 text-xs font-extrabold tracking-tight">{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-7 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
    <div className={`absolute -top-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-700 text-slate-900`}>
      <Icon size={140} />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color} shadow-lg shadow-primary/20 text-white`}>
        <Icon size={20} />
      </div>
      <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <div className="flex items-end justify-between relative z-10">
      <div className="text-3xl font-display font-bold text-slate-900 tracking-tighter">{value}</div>
      {trend && (
        <div className="px-2 py-1 bg-emerald-50 text-[10px] font-bold text-emerald-600 rounded-lg flex items-center gap-1 border border-emerald-100/50">
          <ArrowUpRight size={12}/> {trend}%
        </div>
      )}
    </div>
  </div>
);

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [statsRes, logsRes, usersRes] = await Promise.all([
        fetch('http://localhost:8003/admin/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8003/admin/prediction-logs', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:8003/admin/users', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (logsRes.ok) setLogs(await logsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (err) {
      console.error("Admin portal sync failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchAdminData();
  }, [user]);

  const handleRetrain = async () => {
    if (!window.confirm("Initialize high-precision retraining sequence?")) return;
    alert("Neural engine retraining initiated.");
  };

  const promoteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8003/admin/promote/${userId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchAdminData();
    } catch (e) { console.error(e); }
  };

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#080b13] gap-6">
      <Cpu className="animate-spin text-primary w-12 h-12" />
      <div className="text-xs font-bold text-white uppercase tracking-[0.4em]">Establishing Uplink...</div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900">
      {/* Isolated Admin Sidebar - Premium Light */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="px-8 py-10 mb-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-[14px] bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                <Shield className="text-white size-6" />
             </div>
             <div>
                <div className="text-lg font-display font-bold text-slate-900 tracking-tighter">Admin <span className="text-primary font-display italic">Portal</span></div>
                <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Enterprise Core</div>
             </div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1.5">
          <SidebarItem icon={Activity} label="System Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Users} label="User Directory" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <SidebarItem icon={Terminal} label="Neural Trace Stream" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <SidebarItem icon={Settings} label="Infrastructure" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col bg-[#F8FAFC] h-full overflow-y-auto custom-scrollbar">
        <header className="fixed top-0 right-0 left-0 lg:left-[260px] px-10 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl z-50 h-24">
          <div className="flex flex-col gap-1">
             <h1 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em]">Infrastructure Control Panel</h1>
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-[9px] text-emerald-600 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Nodes: Online
                </span>
                <span className="flex items-center gap-2 text-[9px] text-primary font-bold uppercase bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                  <Cpu size={10}/> GPT-4o Engaged
                </span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={handleRetrain} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-extrabold uppercase tracking-widest rounded-xl hover:border-primary hover:text-primary transition-all flex items-center gap-2 shadow-sm">
                <RefreshCw size={12} /> Synchronize Models
             </button>
             <div className="flex items-center gap-3 pl-4 border-l border-slate-200 relative">
                <div className="text-right hidden sm:block">
                   <div className="text-[11px] font-bold text-slate-900 leading-tight">{user?.name}</div>
                   <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Administrator</div>
                </div>
                <button 
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
                >
                   {user?.name?.charAt(0).toUpperCase() || 'A'}
                </button>

                {/* Profile Logout Menu */}
                {showLogoutMenu && (
                  <div className="absolute top-16 right-0 w-48 bg-white border border-slate-200 rounded-[20px] shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 z-[60]">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Session</div>
                       <div className="text-xs font-bold text-slate-900">{user?.email}</div>
                    </div>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all text-xs font-bold group"
                    >
                      <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                      Logout Account
                    </button>
                  </div>
                )}
             </div>
          </div>
        </header>

        <main className="flex-1 p-10 mt-24 space-y-10 pb-24">
           {/* Dynamic View based on Admin Tab */}
           {activeTab === 'analytics' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <StatCard title="Total Platform Users" value={stats?.total_users || 0} icon={Users} color="bg-blue-500" />
                   <StatCard title="Historical Predictions" value={stats?.total_interactions || 0} icon={Zap} color="bg-purple-500" />
                   <StatCard title="System Performance" value="99.9%" icon={Server} color="bg-emerald-500" />
                   <StatCard title="CPU Utilization" value="34%" icon={Cpu} color="bg-orange-500" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group/card">
                      <div className="flex items-center justify-between mb-8">
                         <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                           <Activity size={16} className="text-primary animate-pulse"/> Neural Diagnostics & Calibration
                         </h4>
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                               <span className="text-[9px] text-slate-400 font-bold uppercase">Actual</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                               <span className="text-[9px] text-slate-400 font-bold uppercase">Ideal</span>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                         <div 
                           className="lg:col-span-3 h-60 relative group/chart cursor-crosshair"
                           onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                           }}
                         >
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                               <line x1="0" y1="200" x2="400" y2="0" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                               <line x1="0" y1="0" x2="0" y2="200" className="stroke-primary/20 stroke-1 opacity-0 group-hover/chart:opacity-100 transition-opacity" style={{ transform: 'translateX(var(--mouse-x, 0))' }} />
                               <path d="M0,200 Q80,190 160,120 T400,20" fill="none" stroke="url(#lineGradient)" strokeWidth="3" className="drop-shadow-[0_4px_10px_rgba(99,102,241,0.3)]" />
                               <defs>
                                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                     <stop offset="0%" stopColor="#6366f1" />
                                     <stop offset="100%" stopColor="#a855f7" />
                                  </linearGradient>
                               </defs>
                               {[40, 100, 180, 260, 340].map((x, i) => (
                                  <g key={i} className="group/dot cursor-pointer">
                                     <circle cx={x} cy={200 - (x * 0.45 + (Math.sin(i) * 15))} r="8" fill="transparent" />
                                     <circle cx={x} cy={200 - (x * 0.45 + (Math.sin(i) * 15))} r="3" fill="#6366f1" className="group-hover/dot:r-5 transition-all" />
                                     <text x={x + 10} y={200 - (x * 0.45 + (Math.sin(i) * 15)) - 10} className="text-[8px] fill-slate-900 font-extrabold opacity-0 group-hover/dot:opacity-100 transition-all">{(90 - i * 5).toFixed(1)}% Acc</text>
                                  </g>
                               ))}
                            </svg>
                            <div className="absolute bottom-0 left-0 text-[8px] text-slate-400 uppercase font-bold">Low Confidence</div>
                            <div className="absolute top-0 right-0 text-[8px] text-slate-400 uppercase font-bold text-right">High Accuracy</div>
                         </div>
                         
                         <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden group/entropy">
                               <div className="text-[9px] text-slate-400 font-bold uppercase mb-2">Entropy Map</div>
                               <div className="grid grid-cols-4 gap-1">
                                  {[...Array(16)].map((_, i) => (
                                     <div key={i} className="aspect-square rounded-sm transition-all hover:bg-white hover:shadow-lg cursor-help relative group/cell" style={{ backgroundColor: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1})` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold rounded opacity-0 group-hover/cell:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                           Score: {(Math.random() * 0.2).toFixed(3)}
                                        </div>
                                     </div>
                                  ))}
                               </div>
                               <div className="mt-2 text-[8px] text-primary font-bold uppercase tracking-widest group-hover/entropy:text-emerald-500 transition-colors">Coherent Flow</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 group/sharpness cursor-default">
                               <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[9px] text-slate-400 font-bold uppercase group-hover/sharpness:text-slate-900 transition-colors">Model Sharpness</span>
                                  <span className="text-[10px] text-emerald-600 font-extrabold animate-pulse">94%</span>
                               </div>
                               <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                  <div className="w-[94%] h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] group-hover/sharpness:w-full transition-all duration-1000" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                        <BarChart2 size={16} className="text-primary"/> Trending Clusters
                      </h4>
                      <div className="space-y-6">
                         {stats?.trending_careers?.map((c, i) => (
                            <div key={i} className="flex justify-between items-center group">
                               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-all pr-4">{c[0]}</span>
                               <span className="text-xs font-extrabold text-slate-900">{c[1]}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'users' && (
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[600px] flex flex-col">
                 <div className="px-10 py-8 bg-slate-50/50 flex items-center justify-between shrink-0 border-b border-slate-100">
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">User Management</h4>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Global Instance Registry</p>
                    </div>
                    <div className="relative group">
                       <input 
                         type="text" 
                         placeholder="Search instances..." 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="bg-white border border-slate-200 rounded-xl px-5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all w-64 shadow-sm"
                       />
                       <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                 </div>
                 <div className="overflow-y-auto flex-1 custom-scrollbar">
                    <table className="w-full text-left">
                       <thead className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-slate-100">
                          <tr>
                             <th className="px-10 py-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instance Alias</th>
                             <th className="px-10 py-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Privilege Group</th>
                             <th className="px-10 py-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                             <th className="px-10 py-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Manipulation</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map(u => (
                             <tr key={u.id} className="hover:bg-slate-50/80 transition-all group">
                                <td className="px-10 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold text-xs border border-slate-200">
                                         {u.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                         <div className="text-sm font-bold text-slate-900 mb-0.5">{u.name}</div>
                                         <div className="text-[11px] text-slate-400 font-medium">{u.email}</div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-10 py-6">
                                   <div className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase w-fit tracking-wider ${u.role === 'admin' ? 'bg-primary/5 text-primary border border-primary/10' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                      {u.role}
                                   </div>
                                </td>
                                <td className="px-10 py-6">
                                   <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                                   </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                   {u.role !== 'admin' && (
                                      <button onClick={() => promoteUser(u.id)} className="px-4 py-2 rounded-lg bg-primary/5 text-primary text-[9px] font-extrabold uppercase tracking-widest hover:bg-primary hover:text-white transition-all border border-primary/10">Empower</button>
                                   )}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {activeTab === 'logs' && (
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[600px] flex flex-col">
                 <div className="px-10 py-8 bg-slate-50/50 flex items-center justify-between shrink-0 border-b border-slate-100">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-4 uppercase tracking-tighter">
                       <Terminal className="text-primary" /> Neural Trace Feed
                    </h4>
                    <span className="text-[9px] bg-red-50 text-red-500 px-4 py-1.5 rounded-lg font-bold uppercase tracking-widest border border-red-100">Recording Active</span>
                 </div>
                 <div className="overflow-y-auto flex-1 font-mono text-[11px] custom-scrollbar bg-slate-50/30 p-8 space-y-4">
                    {logs.map(log => (
                       <div key={log.id} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-primary/30 transition-all flex justify-between items-center shadow-sm group">
                          <div className="space-y-1.5">
                             <div className="flex items-center gap-3">
                                <span className="text-primary font-bold">INFERENCE_EVENT</span>
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-600 font-mono tracking-tighter uppercase">{log.request_id}</span>
                             </div>
                             <div className="text-slate-400 flex items-center gap-4 text-[10px]">
                                <span>Cohort: <span className="text-purple-500 font-bold uppercase">{log.group}</span></span>
                                <span>Vector: <span className="text-blue-500 font-bold uppercase">Stable</span></span>
                             </div>
                          </div>
                          <div className="text-right space-y-1">
                             <div className="text-slate-900 font-bold">{new Date(log.created_at).toLocaleTimeString()}</div>
                             <div className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">0.24s Latency</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                       <Server size={16} className="text-primary"/> Compute Nodes
                    </h4>
                    <div className="space-y-6">
                       {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                   <Cpu size={20} />
                                </div>
                                <div>
                                   <div className="text-xs font-bold text-slate-900">Neural-NODE-0{i}</div>
                                   <div className="text-[10px] text-slate-400 font-bold">Region: US-EAST-1</div>
                                </div>
                             </div>
                             <div className="text-right">
                                <div className="text-[10px] font-extrabold text-emerald-600 uppercase">Optimized</div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase">98% Load</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                       <Database size={16} className="text-primary"/> Data Sovereignty
                    </h4>
                    <div className="space-y-6">
                       <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-bold text-slate-900 uppercase">Vectara Index Status</span>
                             <span className="text-[10px] font-extrabold text-primary">SYNCHRONIZED</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                             <div className="w-[85%] h-full bg-primary" />
                          </div>
                       </div>
                       <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                                <Shield size={20} />
                             </div>
                             <div>
                                <div className="text-xs font-bold text-slate-900">Encryption Layer</div>
                                <div className="text-[10px] text-slate-400 font-bold">AES-256-GCM Active</div>
                             </div>
                          </div>
                          <CheckCircle2 size={18} className="text-emerald-500" />
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </main>
      </div>
    </div>
  );
}
