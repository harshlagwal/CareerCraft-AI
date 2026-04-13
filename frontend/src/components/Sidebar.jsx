import React, { useState } from 'react';
import {
  LayoutDashboard, History, Settings, Globe, FileText,
  Map, Target, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const NAV_SECTIONS = [
  {
    label: 'Core Interface',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
      { icon: History, label: 'Prediction History', to: '/history' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { icon: Globe, label: 'Market Insights', to: '/market' },
      { icon: FileText, label: 'Resume Booster', to: '/resume' },
      { icon: Map, label: 'Career Roadmap', to: '/roadmap' },
    ],
  },
  {
    label: 'System',
    items: [
      { icon: Settings, label: 'Settings', to: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative bg-surface-lowest border-r border-white/5 flex flex-col shrink-0 h-full hidden lg:flex transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[66px] z-10 w-7 h-7 rounded-full bg-[#1b2234] border border-white/10 flex items-center justify-center shadow-lg hover:border-primary/40 hover:shadow-primary/10 transition-all group"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={13} className="text-white/40 group-hover:text-primary transition-colors" />
          : <ChevronLeft size={13} className="text-white/40 group-hover:text-primary transition-colors" />
        }
      </button>

      <div className={`flex items-center transition-all duration-300 h-20 shrink-0 border-b border-white/5 ${collapsed ? 'px-4 justify-center' : 'px-8'}`}>
        <Link to="/" className="flex flex-col no-underline group shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-logo font-black tracking-tight text-white transition-all ${collapsed ? 'hidden' : 'block'}`}>
              CareerCraft <span className="text-primary italic">AI</span>
            </span>
            {collapsed && (
               <span className="text-xl font-logo font-black text-primary italic">AI</span>
            )}
          </div>
          {!collapsed && (
            <div className="text-[7px] text-on-surface-variant/40 font-black uppercase tracking-[0.3em] mt-1 leading-none whitespace-nowrap">
              Intelligence Hub
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar overflow-x-hidden pt-4 pb-4">
        {NAV_SECTIONS.map((section, sIdx) => (
          <React.Fragment key={section.label || sIdx}>

            {/* Nav Items */}
            {section.items.map(({ icon: Icon, label, to }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  title={collapsed ? label : undefined}
                  className="no-underline block"
                >
                  <div
                    className={`flex items-center gap-4 transition-all mx-3 rounded-2xl cursor-pointer ${
                      collapsed ? 'px-0 py-3.5 justify-center' : 'px-5 py-3.5'
                    } ${
                      active
                        ? 'bg-primary/10 text-white border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.12)]'
                        : 'text-on-surface-variant/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`shrink-0 ${collapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} ${active ? 'text-primary' : ''}`}
                    />
                    {!collapsed && (
                      <span className="text-[13px] tracking-tight font-semibold whitespace-nowrap overflow-hidden">
                        {label}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </nav>

    </aside>
  );
}
