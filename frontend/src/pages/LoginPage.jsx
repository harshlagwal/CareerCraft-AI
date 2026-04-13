import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role if already authenticated
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/form');
      }
    }
    // Check if redirecting from signup with success message
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [isAuthenticated, user, navigate, location]);

  const BACKEND_URL = 'http://127.0.0.1:8003';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }
      
      // Success Login
      login(data.access_token, data.user);
      
      // Navigate based on role
      if (data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/form');
      }
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
              Welcome back
            </h2>
            <p className="text-sm text-on-surface-variant">
              Access your AI career navigator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  className="w-full bg-[#0c101b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)]/50 transition-colors pr-12"
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
            </div>

            {error && (
              <div className="text-sm p-3 rounded-lg border bg-red-500/10 border-red-500/20 text-red-400 flex items-center">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm p-3 rounded-lg border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 flex items-center">
                {success}
              </div>
            )}

            <button disabled={loading} type="submit" className="mt-2 w-full px-6 py-4 rounded-xl bg-[var(--color-primary)] text-surface-lowest font-bold hover:bg-[var(--color-primary-container)] hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[var(--color-primary)] font-bold hover:underline transition-all">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
