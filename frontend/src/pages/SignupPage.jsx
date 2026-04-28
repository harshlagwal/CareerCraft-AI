import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Loader2, Eye, EyeOff, CheckCircle2, Circle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Password Validation Rules
  const hasMinLength = password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[@$!%*#?&]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber && hasSpecial;

  // Strength Calculation
  const getStrength = () => {
    let score = 0;
    if (hasMinLength) score++;
    if (hasLetter) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    
    if (score === 0) return { label: 'None', color: 'bg-slate-200' };
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (score === 3) return { label: 'Medium', color: 'bg-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrength();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/form');
    }
  }, [isAuthenticated, navigate]);

  const BACKEND_URL = 'http://127.0.0.1:8003';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!isPasswordValid) {
      setError('Password must be at least 6 characters and include letters, numbers, and special characters');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || 'Signup failed');
      }
      
      // Success Signup, redirect to login
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative transition-colors duration-300 bg-background overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-[100]">
        <button 
          onClick={toggleTheme}
          className="p-3.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-outline-variant/30 text-on-surface-variant hover:text-on-background hover:bg-surface-high transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center group"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun size={20} className="group-hover:rotate-45 transition-transform duration-500" />
          ) : (
            <Moon size={20} className="group-hover:-rotate-12 transition-transform duration-500" />
          )}
        </button>
      </div>

      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-tertiary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-surface p-8 md:p-10 rounded-3xl border border-outline-variant/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden z-10 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-on-background mb-2 tracking-tight">
              Create an account
            </h2>
            <p className="text-sm text-on-surface-variant">
              Begin your intelligent professional journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Full Name</label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-high border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary/50 focus:bg-surface transition-colors placeholder:text-on-surface-variant/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-high border border-outline-variant/30 rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary/50 focus:bg-surface transition-colors placeholder:text-on-surface-variant/50"
                placeholder="you@example.com"
              />
            </div>
            
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-surface-high border ${password && !isPasswordValid ? 'border-red-400' : 'border-outline-variant/30'} rounded-xl px-4 py-3 text-on-background focus:outline-none focus:border-primary/50 focus:bg-surface transition-colors pr-12 placeholder:text-on-surface-variant/50`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-background transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Real-time Validation Feedback */}
              {password && (
                <div className="mt-3 flex flex-col gap-3 p-4 rounded-xl bg-surface-high border border-outline-variant/30">
                  {/* Strength Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-on-surface-variant">Strength</span>
                      <span className={strength.label === 'Strong' ? 'text-emerald-500' : strength.label === 'Medium' ? 'text-amber-500' : 'text-red-500'}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 ? strength.color : ''}`} />
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 && (strength.label === 'Medium' || strength.label === 'Strong') ? strength.color : 'bg-outline-variant/20'}`} />
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 && strength.label === 'Strong' ? strength.color : 'bg-outline-variant/20'}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasMinLength ? 'text-emerald-500' : 'text-on-surface-variant/50'}`}>
                      {hasMinLength ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Min 6 characters
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasLetter ? 'text-emerald-500' : 'text-on-surface-variant/50'}`}>
                      {hasLetter ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Letters
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasNumber ? 'text-emerald-500' : 'text-on-surface-variant/50'}`}>
                      {hasNumber ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Numbers
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasSpecial ? 'text-emerald-500' : 'text-on-surface-variant/50'}`}>
                      {hasSpecial ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Special (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm p-3 rounded-lg border bg-red-50 border-red-100 text-red-600 flex items-center">
                {error}
              </div>
            )}

            <button disabled={loading} type="submit" className="mt-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:text-primary/80 hover:underline transition-all">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
