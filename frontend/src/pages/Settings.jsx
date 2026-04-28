import React, { useState } from 'react';
import { User, Shield, Database, Save, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const SettingsCard = ({ icon: Icon, title, description, children }) => (
  <div className="bg-surface rounded-3xl p-8 border border-outline-variant/20 relative overflow-hidden group transition-colors duration-300">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-outline-variant/10 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform" />
    <div className="flex items-start gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-outline-variant/10 flex items-center justify-center border border-outline-variant/20 shrink-0 group-hover:border-outline-variant/40 transition-all">
        <Icon className="w-5 h-5 text-on-surface-variant group-hover:text-on-background transition-colors" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-on-background mb-1 tracking-tight">{title}</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

export default function Settings() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-50 h-20 px-10 flex items-center justify-between border-b border-outline-variant/20 bg-background/80 backdrop-blur-md">
          <div />

          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-xl bg-outline-variant/10 border border-outline-variant/20 flex items-center justify-center relative cursor-pointer hover:border-outline-variant/40 transition-all">
              <Bell size={16} className="text-on-surface-variant" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-background" />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 border-l border-outline-variant/30 pl-5">
                <div className="text-right">
                  <div className="text-[10px] font-black text-on-background uppercase tracking-widest">{user?.name || 'User'}</div>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} className="w-10 h-10 rounded-full border border-outline-variant/30 bg-surface-lowest" alt="avatar" />
              </button>
              
              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-44 bg-surface border border-outline-variant/30 rounded-2xl shadow-2xl p-2 z-60">
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-xs font-bold uppercase tracking-widest">
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
            <div className="inline-flex px-3 py-1 rounded-full bg-outline-variant/10 border border-outline-variant/20 text-[9px] font-black text-on-surface-variant uppercase tracking-[0.3em] mb-4">Configuration</div>
            <h1 className="text-4xl font-black text-on-background mb-3 tracking-tight">System <span className="text-on-background/40">Settings</span></h1>
            <p className="text-sm text-on-surface-variant leading-relaxed">
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
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Full Name</label>
                  <input type="text" value={user?.name || ''} readOnly className="w-full bg-outline-variant/5 border border-outline-variant/20 rounded-2xl py-3.5 px-5 text-sm font-medium text-on-surface-variant outline-none transition-all cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest pl-1">Email Address</label>
                  <input type="email" value={user?.email || ''} readOnly className="w-full bg-outline-variant/5 border border-outline-variant/20 rounded-2xl py-3.5 px-5 text-sm font-medium text-on-surface-variant outline-none transition-all cursor-not-allowed" />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard 
              icon={Shield} 
              title="Privacy & Security" 
              description="Control how your data is used for model training and match analysis."
            >
               <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-outline-variant/5 border border-outline-variant/20 group-hover:border-outline-variant/40 transition-all">
                     <div>
                        <div className="text-sm font-bold text-on-background tracking-tight">Anonymized Training</div>
                        <p className="text-xs text-on-surface-variant mt-1">Allow your matches to improve AI accuracy for others.</p>
                     </div>
                     <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" />
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-outline-variant/5 border border-outline-variant/20 group-hover:border-outline-variant/40 transition-all">
                     <div>
                        <div className="text-sm font-bold text-on-background tracking-tight">Match Sensitivity</div>
                        <p className="text-xs text-on-surface-variant mt-1">Prioritize strictly accurate matches over broad explorations.</p>
                     </div>
                     <div className="w-12 h-6 bg-outline-variant/20 rounded-full relative cursor-pointer shadow-inner">
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
                  <button className="px-6 py-3 rounded-xl bg-outline-variant/10 border border-outline-variant/20 text-[11px] font-black text-on-background hover:bg-outline-variant/20 hover:border-outline-variant/40 uppercase tracking-widest transition-all">
                    Export My Data
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-red-500/5 border border-red-500/20 text-[11px] font-black text-red-500 hover:bg-red-500/10 hover:border-red-500/30 uppercase tracking-widest transition-all">
                    Reset All Discovery
                  </button>
                </div>
            </SettingsCard>

          </div>

          <div className="max-w-4xl mt-10 mb-8 border-t border-outline-variant/20 pt-8 flex justify-end">
             <button className="px-8 py-4 rounded-xl bg-primary text-white hover:bg-primary/90 font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                <Save className="w-4 h-4" />
                Save Preferences
             </button>
          </div>

        </main>
      </div>
    </div>
  );
}
