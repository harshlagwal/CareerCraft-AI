import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
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
      <div className="h-[88px] w-full shrink-0"></div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b1326]/70 backdrop-blur-xl border-b border-white/5 shadow-lg">
        <div className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full relative z-10">
          <Link to="/" className="flex items-center group">
        <span className="text-xl font-logo font-black tracking-tight text-white flex items-center gap-2">
          CareerCraft <span className="text-primary italic">AI</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary"></span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        {!isAuthenticated ? (
          <Link to="/signup" className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Get Started
          </Link>
        ) : (
           <button onClick={logout} className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-red-400 transition-colors">
            Logout
          </button>
        )}
        {isAuthenticated && (
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white/5 border border-white/10 hidden sm:block">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        </div>
        </div>
      </nav>
    </>
  );
}
