import { GraduationCap, Briefcase, User, ChevronDown, X, Lock, ArrowLeft, ArrowRight, Loader2, Info } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePrediction } from '../context/PredictionContext';

const AVAILABLE_INTERESTS = ['Analytics', 'Cloud', 'Coding', 'Design', 'Finance', 'Gaming', 'Hardware', 'Management', 'Mobile', 'Music', 'Networking', 'Reading', 'Security', 'Sports', 'Travel'];

export default function QuizForm() {
  const navigate = useNavigate();
  const { setPredictionData, setIsSubmitting } = usePrediction();
  
  // Form State
  const SPECS_BY_DEGREE = {
    'B.Tech': ['Computer Science', 'AI/ML', 'Data Science', 'Web Development', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    'M.Tech': ['Computer Science', 'AI/ML', 'Data Science', 'Embedded Systems'],
    'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'M.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'MBA': ['Marketing', 'Finance', 'HR', 'Operations'],
    'BBA': ['Marketing', 'Finance', 'HR', 'Operations'],
    'Diploma': ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
  };

  const [formData, setFormData] = useState({
    degree: '',
    specialization: '',
    interests: [],
    skills: ['React', 'Python', 'SQL'],
    marks: 8.5,
    certifications: 1
  });

  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!formData.skills.some(s => s.toLowerCase() === newSkill.toLowerCase())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.degree || !formData.specialization) {
      setError('Please select both Degree and Specialization.');
      setLoading(false);
      return;
    }

    // Signal that a submission is in progress — prevents ProtectedRoute from
    // redirecting away before predictionData has been written to context.
    setIsSubmitting(true);

    try {
      const payload = {
        degree: formData.degree,
        specialization: formData.specialization,
        interests: formData.interests.join(', '),
        skills: formData.skills,
        marks: parseFloat(formData.marks),
        certifications: parseInt(formData.certifications)
      };

      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const fetchPromise = fetch('http://127.0.0.1:8003/predict/top', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      const minWait = new Promise(resolve => setTimeout(resolve, 4000));
      const [res] = await Promise.all([fetchPromise, minWait]);

      if (!res.ok) {
        throw new Error('Failed to get prediction from server');
      }

      const data = await res.json();

      // Store data in context FIRST, then navigate
      setPredictionData({
        ...data,
        userInput: payload
      });

      // Use a microtask to ensure state is committed before navigation
      await new Promise(resolve => setTimeout(resolve, 0));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-12 pb-24 text-on-background bg-background pb-32">
        <div className="loader">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <mask id="clipping">
                <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                <polygon points="35,35 65,35 50,65" fill="white"></polygon>
              </mask>
            </defs>
          </svg>
          <div className="box"></div>
        </div>
        <h2 className="mt-12 text-xl md:text-2xl font-bold tracking-widest text-[#ffbf48] uppercase animate-pulse">Running CareerCraft AI...</h2>
        <p className="mt-2 text-on-surface-variant font-medium">Processing your data against 10M+ job descriptions</p>
      </div>
    );
  }

  return (
    <div className="relative pt-12 pb-24 text-on-background px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Intro */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight leading-tight"
        >
          Design Your Future
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-on-surface-variant max-w-lg mx-auto leading-relaxed"
        >
          Our AI-driven architect maps your unique skills to the world's most innovative career paths.
        </motion.p>
      </div>

      {/* Stepper */}
      <div className="flex justify-center items-center mb-16 px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(192,193,255,0.15)]">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Education</span>
        </div>
        
        <div className="w-24 md:w-32 h-[1px] bg-outline-variant/30 mb-8 mx-4" />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface-highest flex flex-col items-center justify-center text-on-surface-variant">
            <Briefcase className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Expertise</span>
        </div>

        <div className="w-24 md:w-32 h-[1px] bg-outline-variant/30 mb-8 mx-4" />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface-highest flex flex-col items-center justify-center text-on-surface-variant">
            <User className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Profile</span>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-[#1b2234] rounded-2xl p-8 md:p-12 shadow-2xl border border-outline-variant/10">
        
        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Major Degree</label>
            <div className="relative">
              <select 
                value={formData.degree}
                onChange={(e) => setFormData({...formData, degree: e.target.value, specialization: ''})}
                className="w-full appearance-none bg-surface-lowest text-white border border-outline-variant/10 rounded-xl px-5 py-4 outline-none hover:border-primary/30 transition-colors"
                required
              >
                <option value="">Select your degree</option>
                <option value="B.Tech">B.Tech (Engineering)</option>
                <option value="M.Tech">M.Tech (Engineering Masters)</option>
                <option value="B.Sc">B.Sc (Science)</option>
                <option value="M.Sc">M.Sc (Science Masters)</option>
                <option value="MBA">MBA (Management)</option>
                <option value="BBA">BBA (Management)</option>
                <option value="Diploma">Diploma / Others</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Specialization</label>
              <div className="group relative">
                <Info className="w-3 h-3 text-on-surface-variant/50 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-surface-lowest border border-outline-variant/30 rounded-lg text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                  Select your academic focus area or professional niche.
                </div>
              </div>
            </div>
            <div className="relative">
              <select 
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                className="w-full appearance-none bg-surface-lowest text-white border border-outline-variant/10 rounded-xl px-5 py-4 outline-none hover:border-primary/30 transition-colors"
                required
              >
                <option value="">Select specialization</option>
                {(SPECS_BY_DEGREE[formData.degree] || []).map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Core Interests (Select multiple)</label>
            <div className="group relative">
              <Info className="w-3 h-3 text-on-surface-variant/50 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-surface-lowest border border-outline-variant/30 rounded-lg text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Choose domains you are truly passionate about working in.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {AVAILABLE_INTERESTS.map(interest => (
              <button 
                type="button"
                key={interest}
                onClick={() => handleToggleInterest(interest)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  formData.interests.includes(interest)
                  ? 'bg-[#9900ff] text-white shadow-[0_0_15px_rgba(153,0,255,0.4)]'
                  : 'bg-transparent text-on-surface-variant border border-outline-variant/30 hover:text-white hover:border-outline-variant/60'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          {formData.interests.length === 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
               <Info className="w-3.5 h-3.5" />
               Selecting interests improves multi-domain accuracy.
            </div>
          )}
        </div>

        {/* Technical Skills */}
        <div className="mb-10">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Technical Skills (Press Enter to add)</label>
          <div className="w-full min-h-[60px] bg-[#0c1222] border border-outline-variant/10 rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-tertiary/50 bg-[#162738]/50 text-tertiary">
                <span className="text-sm font-medium">{skill}</span>
                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <input 
              type="text" 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Add more..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-on-surface-variant/50 ml-2" 
            />
          </div>
        </div>

        {/* Bottom Metrics/Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-outline-variant/10 mb-10">
          
          {/* GPA Slider */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Current Marks / GPA</label>
              <span className="font-bold text-white tracking-wide">{formData.marks}/10</span>
            </div>
            <div className="relative w-full h-1.5 bg-[#0c1222] rounded-full">
              <input 
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={formData.marks}
                onChange={(e) => setFormData({...formData, marks: e.target.value})}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div 
                className="absolute top-0 left-0 h-full bg-primary/60 rounded-full" 
                style={{ width: `${formData.marks * 10}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none"
                style={{ left: `calc(${formData.marks * 10}% - 8px)` }}
              />
            </div>
          </div>

          {/* Certifications Toggle Box */}
          <div className="bg-[#242b3d] border border-outline-variant/10 p-5 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm mb-1">Certifications</div>
              <div className="text-xs text-on-surface-variant">Do you have active industry certs?</div>
            </div>
            <button 
              type="button"
              onClick={() => setFormData({...formData, certifications: formData.certifications === 1 ? 0 : 1})}
              className={`w-11 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${formData.certifications === 1 ? 'bg-primary-container' : 'bg-surface-highest'}`}
            >
              <motion.div 
                layout 
                className="bg-white w-4 h-4 rounded-full shadow-sm"
                animate={{ x: formData.certifications === 1 ? 20 : 0 }}
              />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-4">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant hover:text-white font-medium transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <button 
            disabled={loading}
            type="submit" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-container)] text-surface-lowest font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                Proceed to Analysis
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Security Badge */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b2234] border border-outline-variant/10">
          <Lock className="w-3.5 h-3.5 text-tertiary" />
          <span className="text-xs font-semibold text-on-surface-variant">Your data is secured with AES-256 encryption.</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-outline-variant/10 pt-8 pb-12 flex flex-col md:flex-row justify-center items-center text-center">
        <div>
          <div className="text-sm font-logo font-black tracking-widest text-white uppercase mb-2">CareerCraft AI</div>
          <div className="text-[10px] text-on-surface-variant uppercase">© 2026 CareerCraft AI. The Ethereal Architect Experience.</div>
        </div>
      </footer>
    </div>
  );
}
