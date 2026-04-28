import React, { useState } from 'react';
import {
  LayoutDashboard, History, Settings, Globe, FileText,
  Map, Target, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative bg-surface-lowest border-r border-outline-variant/20 flex flex-col shrink-0 h-full hidden lg:flex transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[66px] z-10 w-7 h-7 rounded-full bg-surface-high border border-outline-variant/30 flex items-center justify-center shadow-lg hover:border-primary/40 transition-all group"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={13} className="text-on-surface-variant group-hover:text-primary transition-colors" />
          : <ChevronLeft size={13} className="text-on-surface-variant group-hover:text-primary transition-colors" />
        }
      </button>

      <div className={`flex items-center transition-all duration-300 h-20 shrink-0 border-b border-outline-variant/20 ${collapsed ? 'px-4 justify-center' : 'px-8'}`}>
        <Link to="/" className="flex flex-col no-underline group shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-logo font-black tracking-widest transition-all ${collapsed ? 'hidden' : 'block'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">CAREERCRAFT</span> 
              <span className="text-tertiary group-hover:text-tertiary/80 transition-colors ml-1">AI</span>
            </span>
            {collapsed && (
               <span className="text-base font-logo font-black text-tertiary italic">AI</span>
            )}
          </div>
          {!collapsed && (
            <div className="text-[6px] text-on-surface-variant/40 font-black uppercase tracking-[0.4em] mt-1.5 leading-none whitespace-nowrap">
              Lumina Intelligence Hub
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
                        ? 'bg-primary/10 text-on-background border border-primary/20 shadow-sm'
                        : 'text-on-surface-variant hover:text-on-background hover:bg-outline-variant/10'
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

      {/* Theme Toggle Footer */}
      <div className={`p-4 border-t border-outline-variant/20 transition-all ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 w-full rounded-xl transition-colors ${
            collapsed ? 'p-3 justify-center' : 'px-4 py-3'
          } text-on-surface-variant hover:text-on-background hover:bg-outline-variant/10 bg-surface-high border border-outline-variant/30`}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
          {!collapsed && <span className="text-[13px] tracking-tight font-semibold">Toggle Theme</span>}
        </button>
      </div>

    </aside>
  );
}
