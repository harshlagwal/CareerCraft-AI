import React, { useState } from 'react';
import { usePrediction } from '../context/PredictionContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Map, Check, Lock, Zap, Trophy, Star, Bell, LogOut, ChevronRight } from 'lucide-react';

// Step data builder from prediction data
function buildSteps(missing, courses, role) {
  const skillList = missing?.slice(0, 6) || ['Machine Learning', 'Python', 'TensorFlow'];
  const courseList = Array.isArray(courses) ? courses.slice(0, 3) : [];

  return [
    {
      num: '01',
      title: 'Learn Core Skills',
      desc: `Master the foundational principles of ${role} through structured learning modules.`,
      tags: skillList.slice(0, 3),
      status: 'active',
      cta: 'Review Modules',
      color: '#6366f1',
    },
    {
      num: '02',
      title: 'Build Projects',
      desc: 'Apply your knowledge to real-world scenarios. Build a comprehensive portfolio of 3 major AI-integrated applications.',
      tags: [],
      status: 'in-progress',
      progress: 35,
      cta: 'Continue Building',
      color: '#06b6d4',
    },
    {
      num: '03',
      title: 'Get Certified',
      desc: `Validate your expertise in ${role}. Earn an industry-recognized credential from top-tier tech partners.`,
      tags: [],
      status: 'locked',
      note: 'Unlock this stage by completing Step 02 with a 90% score.',
      cta: 'Locked Content',
      color: '#8b949e',
    },
  ];
}

function RoadmapStep({ step, index }) {
  const isActive = step.status === 'active';
  const isLocked = step.status === 'locked';
  const isInProgress = step.status === 'in-progress';

  return (
    <div className={`relative flex gap-8 ${isLocked ? 'opacity-60' : ''}`}>
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-3 h-3 rounded-full shadow-lg z-10 mt-10 ring-4 ring-[#0b1326] ${isActive ? 'bg-primary shadow-primary/40' : isInProgress ? 'bg-cyan-400 shadow-cyan-400/40' : 'bg-white/20'}`} />
        {index < 2 && <div className="w-[2px] flex-1 mt-1" style={{ background: isActive ? 'linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))' : 'rgba(255,255,255,0.05)' }} />}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-16 bg-[#1b2234] rounded-2xl border shadow-xl overflow-hidden ${isActive ? 'border-primary/20' : 'border-white/5'}`}>
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: step.color }}>Step {step.num}</div>
              <h3 className="text-2xl font-black text-white">{step.title}</h3>
            </div>
            {isActive && <Check size={20} className="text-primary mt-1 shrink-0" />}
            {isLocked && <Lock size={18} className="text-white/20 mt-1 shrink-0" />}
          </div>

          <p className="text-sm text-[#8b949e] leading-relaxed mb-5">{step.desc}</p>

          {/* Tags */}
          {step.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {step.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-bold text-white/60">{tag}</span>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {isInProgress && (
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Current Progress</span>
                <span className="text-[10px] font-black text-cyan-400">{step.progress}% Complete</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-cyan-400 transition-all duration-1000" style={{ width: `${step.progress}%` }} />
              </div>
              {/* Mini project tiles */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {['Project 1', 'Project 2', 'Project 3'].map((p, i) => (
                  <div key={i} className={`p-3 rounded-xl border text-center text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-primary/20 border-primary/30 text-primary' : i === 1 ? 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400' : 'bg-white/3 border-white/5 text-white/20'}`}>
                    {i === 2 ? <Lock size={12} className="mx-auto" /> : p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Note */}
          {isLocked && step.note && (
            <p className="text-xs text-[#8b949e] italic leading-relaxed mb-5 border-l-2 border-white/10 pl-4">"{step.note}"</p>
          )}

          {/* CTA Button */}
          <button
            disabled={isLocked}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              isLocked
                ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                : isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105'
                  : 'bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20'
            }`}
          >
            {step.cta}
            {!isLocked && <ChevronRight size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CareerRoadmap() {
  const { predictionData } = usePrediction();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const results = predictionData?.top_roles || [];
  const mainRole = results[0]?.role || 'Your Career Path';
  const missing = predictionData?.skill_gap || [];
  const courses = predictionData?.recommended_courses || [];
  const steps = buildSteps(missing, courses, mainRole);

  const milestones = [
    { icon: Star, title: 'Core Certified', desc: `Completed the foundational training series for ${mainRole}.`, unlocked: true, color: '#10b981' },
    { icon: Trophy, title: 'Project Builder', desc: 'Earned via 2 projects', unlocked: false, color: '#3b82f6' },
    { icon: Zap, title: 'Market Lead', desc: 'Post certification milestone', unlocked: false, color: '#a855f7' },
  ];

  if (!predictionData) {
    return (
      <div className="flex h-screen bg-[#0b1326] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <Map className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-black text-white mb-3">No Roadmap Generated</h2>
          <p className="text-[#8b949e] text-sm mb-8 text-center max-w-xs">Complete your career analysis to generate your personalized learning roadmap.</p>
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

        <main className="flex-1 p-10 lg:p-12">
          {/* Title */}
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-4">Learning Architecture</div>
            <h1 className="text-4xl font-black text-white mb-3">CareerCraft <span className="text-white/40">Roadmap</span></h1>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              Your AI-generated vertical progression path for <span className="text-white font-bold">{mainRole}</span>. Each step is engineered to maximize your market value through rigorous skill acquisition.
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="relative pl-8">
                {steps.map((step, i) => (
                  <RoadmapStep key={i} step={step} index={i} />
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* AI Guidance */}
              <div className="bg-[#1b2234] rounded-2xl p-7 border border-primary/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Zap size={14} className="text-primary animate-pulse" />
                  </div>
                  <div className="text-[10px] font-black text-white uppercase tracking-widest">Next Best Action</div>
                </div>
                <p className="text-sm text-[#8b949e] italic leading-relaxed">
                  "Focus on mastering <span className="text-white font-bold">{missing[0] || 'your core skills'}</span> to unlock Step 02. Your profile shows strong potential for growth in the <span className="text-white font-bold">{mainRole}</span> track."
                </p>
              </div>

              {/* Course Recommendations */}
              {courses.length > 0 && (
                <div className="bg-[#1b2234] rounded-2xl p-7 border border-white/5 shadow-xl">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Recommended Courses</div>
                  <div className="space-y-3">
                    {courses.slice(0, 3).map((item, i) => {
                      const course = Array.isArray(item.courses) ? item.courses[0] : (typeof item === 'object' ? item : null);
                      const title = item.skill || (typeof item === 'string' ? item : (course?.title || 'Advanced Training'));
                      const platform = course?.platform || (typeof item === 'object' ? item.platform : 'E-Learning');
                      
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-black text-primary">{i + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white truncate">{title}</div>
                            <div className="text-[10px] text-[#8b949e]">{platform}</div>
                          </div>
                          <ChevronRight size={14} className="text-white/20 group-hover:text-primary transition-colors shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Career Milestones */}
          <div className="mt-4">
            <h3 className="text-base font-black text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-black text-primary">i</span>
              Career Milestones & AI Rewards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {milestones.map((m, i) => (
                <div key={i} className={`bg-[#1b2234] rounded-2xl p-7 border shadow-lg relative overflow-hidden ${m.unlocked ? 'border-emerald-500/20' : 'border-white/5 opacity-60'}`}>
                  {m.unlocked && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-widest">Unlocked</span>
                  )}
                  {!m.unlocked && <Lock size={20} className="absolute top-4 right-4 text-white/10" />}
                  <m.icon size={24} className="mb-4" style={{ color: m.unlocked ? m.color : 'rgba(255,255,255,0.15)' }} />
                  <h4 className="text-base font-black text-white mb-1">{m.title}</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">{m.desc}</p>
                  {m.unlocked && (
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="px-12 py-5 border-t border-white/5 flex items-center justify-between opacity-30 select-none">
          <span className="text-[10px] font-logo font-bold text-[#8b949e] uppercase tracking-widest">© 2026 CareerCraft AI • Career Roadmap</span>
          <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">AI Pathing: Multi-Domain Architecture</span>
        </footer>
      </div>
    </div>
  );
}
