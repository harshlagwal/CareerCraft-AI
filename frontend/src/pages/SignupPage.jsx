import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Loader2, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();
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
    
    if (score === 0) return { label: 'None', color: 'bg-white/10' };
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (score === 3) return { label: 'Medium', color: 'bg-yellow-500' };
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#161c2a] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-primary)]/10 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
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
                className="w-full bg-[#0c101b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
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
                className="w-full bg-[#0c101b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors"
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
                  className={`w-full bg-[#0c101b] border ${password && !isPasswordValid ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors pr-12`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Real-time Validation Feedback */}
              {password && (
                <div className="mt-3 flex flex-col gap-3 p-4 rounded-xl bg-[#0c101b]/50 border border-white/5">
                  {/* Strength Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className="text-on-surface-variant/60">Strength</span>
                      <span className={strength.label === 'Strong' ? 'text-emerald-400' : strength.label === 'Medium' ? 'text-yellow-500' : 'text-red-400'}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 ? strength.color : ''}`} />
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 && (strength.label === 'Medium' || strength.label === 'Strong') ? strength.color : 'bg-white/5'}`} />
                      <div className={`h-full flex-1 transition-all duration-500 ${password.length > 0 && strength.label === 'Strong' ? strength.color : 'bg-white/5'}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasMinLength ? 'text-emerald-400' : 'text-on-surface-variant/60'}`}>
                      {hasMinLength ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Min 6 characters
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasLetter ? 'text-emerald-400' : 'text-on-surface-variant/60'}`}>
                      {hasLetter ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Letters
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasNumber ? 'text-emerald-400' : 'text-on-surface-variant/60'}`}>
                      {hasNumber ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Numbers
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold ${hasSpecial ? 'text-emerald-400' : 'text-on-surface-variant/60'}`}>
                      {hasSpecial ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                      Special (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm p-3 rounded-lg border bg-red-500/10 border-red-500/20 text-red-400 flex items-center">
                {error}
              </div>
            )}

            <button disabled={loading} type="submit" className="mt-2 w-full px-6 py-4 rounded-xl bg-[var(--color-primary)] text-surface-lowest font-bold hover:bg-[var(--color-primary-container)] hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all flex items-center justify-center gap-2">
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
            <Link to="/login" className="text-[var(--color-primary)] font-bold hover:underline transition-all">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
