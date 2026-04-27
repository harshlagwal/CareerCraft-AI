import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = isAuthenticated ? [
    { name: 'Analyze Skills', path: '/form' },
    { name: 'Dashboard', path: '/dashboard' }
  ] : [];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/20 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-logo font-black tracking-tighter text-white flex items-center gap-1">
              CAREERCRAFT <span className="text-primary group-hover:text-tertiary transition-colors">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <Link to="/signup">
                <button className="px-5 py-2 rounded-full bg-white text-background text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={logout} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors">
                  Logout
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 ring-2 ring-primary/20">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
