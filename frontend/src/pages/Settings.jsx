import React, { useState } from 'react';
import { User, Shield, Database, Save, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const SettingsCard = ({ icon: Icon, title, description, children }) => (
  <div className="bg-white/5 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform" />
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 group-hover:border-white/20 transition-all">
        <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-1 tracking-tight">{title}</h4>
        <p className="text-sm text-[#8b949e] leading-relaxed">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

export default function Settings() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0b1326] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-50 h-20 px-10 flex items-center justify-between border-b border-white/5 bg-[#0b1326]">
          <div />

          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center relative cursor-pointer hover:border-white/20 transition-all">
              <Bell size={16} className="text-white/40" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-[#0b1326]" />
            </div>

            {/* Profile Dropdown */}
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

        {/* Main Content */}
        <main className="flex-1 p-10 lg:p-12">
          
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Configuration</div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">System <span className="text-white/40">Settings</span></h1>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Manage your personal preferences, Neural AI configurations, and account security parameters.
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            
            <SettingsCard 
              icon={User} 
              title="Profile Information" 
              description="Update your personal details and career base-layer."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Full Name</label>
                  <input type="text" value={user?.name || ''} readOnly className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-5 text-sm font-medium text-white/50 outline-none transition-all cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">Email Address</label>
                  <input type="email" value={user?.email || ''} readOnly className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 px-5 text-sm font-medium text-white/50 outline-none transition-all cursor-not-allowed" />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard 
              icon={Shield} 
              title="Privacy & Security" 
              description="Control how your data is used for model training and match analysis."
            >
               <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                     <div>
                        <div className="text-sm font-bold text-white tracking-tight">Anonymized Training</div>
                        <p className="text-xs text-[#8b949e] mt-1">Allow your matches to improve AI accuracy for others.</p>
                     </div>
                     <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                     <div>
                        <div className="text-sm font-bold text-white tracking-tight">Match Sensitivity</div>
                        <p className="text-xs text-[#8b949e] mt-1">Prioritize strictly accurate matches over broad explorations.</p>
                     </div>
                     <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full shadow-md" />
                     </div>
                  </div>
               </div>
            </SettingsCard>

            <SettingsCard 
              icon={Database} 
              title="Data Management" 
              description="Export or permanently remove your career journey history."
            >
                <div className="flex flex-wrap gap-4 mt-6">
                  <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-black text-white hover:bg-white/10 hover:border-white/20 uppercase tracking-widest transition-all">
                    Export My Data
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-red-500/5 border border-red-500/10 text-[11px] font-black text-red-400 hover:bg-red-500/20 hover:border-red-500/30 uppercase tracking-widest transition-all">
                    Reset All Discovery
                  </button>
                </div>
            </SettingsCard>

          </div>

          <div className="max-w-4xl mt-10 mb-8 border-t border-white/5 pt-8 flex justify-end">
             <button className="px-8 py-4 rounded-xl bg-white text-black hover:bg-white/90 font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center gap-3">
                <Save className="w-4 h-4" />
                Save Preferences
             </button>
          </div>

        </main>
      </div>
    </div>
  );
}
