import { Link, useLocation } from 'react-router-dom';
import { User, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinks = isAuthenticated ? [
    { name: 'Analyze Skills', path: '/form' },
    { name: 'Dashboard', path: '/dashboard' }
  ] : [];

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-full shadow-lg">
        <div className="flex items-center justify-between px-6 py-3 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-logo font-black tracking-widest flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">CAREERCRAFT</span> 
              <span className="text-tertiary group-hover:text-tertiary/80 transition-colors ml-1">AI</span>
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-all ${
                    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-background'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-high transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-on-surface-variant hover:text-on-background" />
              ) : (
                <Moon size={20} className="text-on-surface-variant hover:text-on-background" />
              )}
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-sm font-semibold text-on-surface-variant hover:text-on-background transition-colors hidden sm:block">
                  Login
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white text-sm font-semibold hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md shadow-primary/25">
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={logout} className="text-sm font-semibold text-on-surface-variant hover:text-red-500 transition-colors">
                  Logout
                </button>
                <div className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant/20 ring-2 ring-primary/20 shadow-sm">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
                    alt="User Avatar" 
                    className="w-full h-full object-cover bg-surface-low"
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
