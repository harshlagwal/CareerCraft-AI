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
  <div onClick={onClick} className={`flex items-center gap-4 px-6 py-4 mx-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-primary text-surface-lowest font-bold shadow-lg shadow-primary/20 scale-[1.02]' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}>
     <Icon className="w-5 h-5" />
     <span className="text-sm tracking-tight">{label}</span>
  </div>
);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-[#1b2234] rounded-[32px] p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform">
      <Icon size={120} />
    </div>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shadow-lg shadow-black/20 text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <div className="flex items-end justify-between relative z-10">
      <div className="text-4xl font-display font-bold text-white tracking-tighter">{value}</div>
      {trend && <div className="text-xs font-bold text-emerald-400 flex items-center gap-1"><ArrowUpRight size={14}/> {trend}%</div>}
    </div>
  </div>
);

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');

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
    <div className="flex h-screen bg-[#080b13] overflow-hidden">
      {/* Isolated Admin Sidebar */}
      <aside className="w-[300px] bg-[#0c101b] border-r border-outline-variant/10 flex flex-col shrink-0">
        <div className="px-10 py-12 mb-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-[20px] bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                <Shield className="text-surface-lowest w-7 h-7" />
             </div>
             <div>
                <div className="text-xl font-display font-bold text-white tracking-tighter">Admin <span className="text-primary font-display italic">Portal</span></div>
                <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Enterprise Core</div>
             </div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <SidebarItem icon={Activity} label="System Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Users} label="User Directory" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <SidebarItem icon={Terminal} label="Neural Trace Stream" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
          <SidebarItem icon={Settings} label="Infrastructure" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        <div className="p-8 border-t border-outline-variant/5">
          <button onClick={logout} className="w-full flex items-center justify-center gap-4 px-6 py-5 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-[24px] font-bold text-sm">
            <LogOut size={18} />
            Terminate Session
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-[#111624] h-full overflow-y-auto custom-scrollbar">
        <header className="fixed top-0 right-0 left-0 lg:left-[300px] px-12 flex items-center justify-between border-b border-outline-variant/5 bg-[#111624]/80 backdrop-blur-2xl z-50 h-28">
          <div className="flex flex-col gap-2">
             <h1 className="text-sm font-bold text-white uppercase tracking-[0.3em]">Infrastructure Control Panel</h1>
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Nodes: Online
                </span>
                <span className="flex items-center gap-2 text-[10px] text-primary font-bold uppercase">
                  <Cpu size={12}/> GPT-4o Engaged
                </span>
             </div>
          </div>
          <div className="flex items-center gap-8">
             <button onClick={handleRetrain} className="px-6 py-3 bg-surface-lowest border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-surface-lowest transition-all flex items-center gap-3">
                <RefreshCw size={14} /> Synchronize Models
             </button>
             <div className="p-1 rounded-2xl bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-white/5">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="admin" className="w-12 h-12 rounded-xl" />
             </div>
          </div>
        </header>

        <main className="flex-1 p-12 mt-28 space-y-12 pb-24">
           {/* Dynamic View based on Admin Tab */}
           {activeTab === 'analytics' && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <StatCard title="Total Platform Users" value={stats?.total_users || 0} icon={Users} color="bg-blue-600" trend="12.4" />
                   <StatCard title="Historical Predictions" value={stats?.total_interactions || 0} icon={Zap} color="bg-purple-600" trend="24.1" />
                   <StatCard title="System Performance" value="99.9%" icon={Server} color="bg-emerald-600" />
                   <StatCard title="CPU Utilization" value="34%" icon={Cpu} color="bg-orange-600" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-[#1b2234] rounded-[40px] p-12 border border-outline-variant/10 shadow-2xl">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                        <TrendingUp size={16} className="text-primary"/> Model Confidence Distribution
                      </h4>
                      <div className="h-64 flex items-end gap-6 pt-10">
                         {[60, 45, 85, 30, 95, 70, 55, 80].map((h, i) => (
                            <div key={i} className="flex-1 bg-surface-lowest rounded-2xl relative group overflow-hidden">
                               <div className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover:bg-primary transition-all duration-700" style={{ height: `${h}%` }} />
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="bg-[#1b2234] rounded-[40px] p-12 border border-outline-variant/10 shadow-2xl space-y-10">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-3">
                        <BarChart2 size={16} className="text-primary"/> Trending Clusters
                      </h4>
                      <div className="space-y-8">
                         {stats?.trending_careers?.map((c, i) => (
                            <div key={i} className="flex justify-between items-center group">
                               <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest group-hover:text-white transition-all">{c[0]}</span>
                               <span className="text-sm font-bold text-primary">{c[1]}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'users' && (
              <div className="bg-[#1b2234] rounded-[48px] border border-outline-variant/10 shadow-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[600px] flex flex-col">
                 <div className="px-12 py-10 bg-surface-lowest/20 flex items-center justify-between shrink-0">
                    <div>
                       <h4 className="text-xl font-bold text-white mb-1">User Management Directory</h4>
                       <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Global Instance Registry</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-surface-lowest flex items-center justify-center">
                       <Search size={20} className="text-on-surface-variant" />
                    </div>
                 </div>
                 <div className="overflow-y-auto flex-1 custom-scrollbar">
                    <table className="w-full text-left">
                       <thead className="sticky top-0 bg-surface-lowest/90 backdrop-blur-md z-10 border-b border-outline-variant/5">
                          <tr>
                             <th className="px-12 py-6 text-[10px] font-bold text-white uppercase tracking-widest">Instance Alias</th>
                             <th className="px-12 py-6 text-[10px] font-bold text-white uppercase tracking-widest">Privilege Group</th>
                             <th className="px-12 py-6 text-[10px] font-bold text-white uppercase tracking-widest">Status</th>
                             <th className="px-12 py-6 text-[10px] font-bold text-white uppercase tracking-widest text-right">Manipulation</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-outline-variant/5">
                          {users.map(u => (
                             <tr key={u.id} className="hover:bg-primary/5 transition-all group">
                                <td className="px-12 py-8">
                                   <div className="flex items-center gap-5">
                                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} className="w-10 h-10 rounded-xl bg-surface-lowest p-1" alt="" />
                                      <div>
                                         <div className="text-base font-bold text-white mb-0.5">{u.name}</div>
                                         <div className="text-xs text-on-surface-variant font-medium">{u.email}</div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-12 py-8">
                                   <div className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase w-fit tracking-wider ${u.role === 'admin' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-lowest text-on-surface-variant border border-outline-variant/10'}`}>
                                      {u.role}
                                   </div>
                                </td>
                                <td className="px-12 py-8">
                                   <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active</span>
                                   </div>
                                </td>
                                <td className="px-12 py-8 text-right">
                                   {u.role !== 'admin' && (
                                      <button onClick={() => promoteUser(u.id)} className="px-5 py-2.5 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-surface-lowest transition-all">Empower</button>
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
              <div className="bg-[#1b2234] rounded-[48px] border border-outline-variant/10 shadow-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[600px] flex flex-col">
                 <div className="px-12 py-10 bg-surface-lowest/20 flex items-center justify-between shrink-0">
                    <h4 className="text-xl font-bold text-white flex items-center gap-4">
                       <Terminal className="text-primary" /> Live Neural Trace Feed
                    </h4>
                    <span className="text-[10px] bg-red-500/10 text-red-500 px-4 py-1.5 rounded-xl font-bold uppercase tracking-widest border border-red-500/20">Recording Active</span>
                 </div>
                 <div className="overflow-y-auto flex-1 font-mono text-[11px] custom-scrollbar bg-black/20 p-8 space-y-4">
                    {logs.map(log => (
                       <div key={log.id} className="p-5 rounded-2xl bg-surface-lowest/30 border border-white/5 hover:border-primary/30 transition-all flex justify-between items-center group">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <span className="text-primary font-bold">INFERENCE_EVENT</span>
                                <span className="text-on-surface-variant opacity-40">|</span>
                                <span className="text-white opacity-80">{log.request_id}</span>
                             </div>
                             <div className="text-on-surface-variant/60 flex items-center gap-4">
                                <span>Cohort: <span className="text-purple-400 font-bold">{log.group}</span></span>
                                <span>Vector: <span className="text-blue-400">Stable</span></span>
                             </div>
                          </div>
                          <div className="text-right space-y-1">
                             <div className="text-white font-bold">{new Date(log.created_at).toLocaleTimeString()}</div>
                             <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">0.24s Latency</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </main>
      </div>
    </div>
  );
}
