import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, LayoutGrid, BarChart2, Map, CheckCircle2, ShieldCheck, FileKey2, FileText, Aperture, Wand2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import LottieLibrary from 'lottie-react';
import animationData from '../assets/ChatAi.json';
import aiIntelligenceAnim from '../assets/ai-intelligence.json';

const Lottie = LottieLibrary.default || LottieLibrary;

function NeuralNetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 40;
    const connectionDistance = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 900; 
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.15)'; 
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 0.8;

      particles.forEach((p, i) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.globalAlpha = (1 - dist / connectionDistance) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-[900px] pointer-events-none z-0"
    />
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden pt-12 pb-24 text-on-background">
      
      {/* Background ethereal vibes */}
      <NeuralNetworkBackground />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Hero Left Content */}
        <motion.div variants={fadeInUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.1em]">Next-Gen Career Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
            Discover Your<br/>
            Ideal <br className="hidden md:block" />
            <span className="text-white">Career </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-primary-container">with AI</span>
          </h1>
          
          <p className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
            Harness the power of neural networks to navigate your professional future with precision-engineered pathfinding and skill analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link to="/login">
              <button className="px-6 py-3 rounded-lg bg-primary text-surface-lowest font-semibold hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(192,193,255,0.2)]">
                Get Started
              </button>
            </Link>
            <button className="px-6 py-3 rounded-lg bg-surface-high border border-outline-variant/30 text-white font-medium hover:bg-surface-highest transition-colors flex items-center gap-2">
              <span className="p-1 rounded-full bg-white text-surface-lowest">
                <Play className="w-3 h-3 fill-current" />
              </span>
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Right Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl flex justify-center items-center drop-shadow-2xl transition-opacity duration-1000">
            <Lottie 
              animationData={animationData} 
              loop={true} 
              renderConfig={{
                preserveAspectRatio: 'xMidYMid slice'
              }}
              style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.5))' }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10"
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <div className="text-xs font-bold text-tertiary uppercase tracking-[0.15em] mb-3">Engineering Excellence</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Precision Guided Career Scaling</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards wrapped in motion.div */}
          {[
            { icon: LayoutGrid, title: "AI Recommendations", desc: "Deep learning algorithms analyze your unique profile to predict the roles where you'll thrive most.", color: "text-primary", bg: "bg-surface-highest", link: "Explore Neural Logic" },
            { icon: BarChart2, title: "Skill Analysis", desc: "Identify critical skill gaps and receive tailored learning paths to reach the next tier of your career.", color: "text-tertiary", bg: "bg-tertiary/20", link: "View Data Metrics" },
            { icon: Map, title: "Career Roadmap", desc: "Visualize your long-term progression with interactive timelines and milestone tracking.", color: "text-primary-container", bg: "bg-primary-container/20", link: "Trace Your Path" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#1b2234] p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all flex flex-col items-start group shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-1">
                {feature.desc}
              </p>
              <a href="#" className="mt-auto text-xs font-bold text-on-surface-variant hover:text-white transition-colors flex items-center gap-2 group-hover:gap-3 uppercase tracking-wider">
                {feature.link} <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-[#0c101a] py-24 w-full mb-32 border-y border-white/5 relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight mb-4">How It Works</h2>
            <p className="text-sm text-on-surface-variant">The Ethereal Architecture orchestrates your journey in three simple steps.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
            {[
              { icon: FileText, title: "Enter Details", desc: "Upload your CV or input your professional background and aspirations manually.", accent: "text-white/90" },
              { icon: Aperture, title: "AI Analyzes", desc: "Our deep neural networks process your data against 10M+ job descriptions.", accent: "text-[#c0c1ff]" },
              { icon: Wand2, title: "Get Recommendations", desc: "Receive a curated dashboard of opportunities and personalized learning paths.", accent: "text-tertiary" }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#162035] flex items-center justify-center mb-8 shadow-inner border border-white/5 group relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <step.icon className={`w-8 h-8 ${step.accent} relative z-10`} />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed max-w-[240px] mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Built for the Modern Workforce Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mb-6 leading-tight">
              Built for the <br className="hidden lg:block"/> Modern Workforce
            </h2>
            <p className="text-base text-on-surface-variant mb-14 max-w-lg leading-relaxed">
              We combine cutting-edge data science with intuitive design to provide a career advisor that never sleeps and always knows the latest market shifts.
            </p>

            <div className="flex flex-col gap-10">
              {[
                { icon: Zap, title: "Fast AI Analysis", desc: "Real-time processing ensures you never wait for your next career move.", accent: "text-white" },
                { icon: CheckCircle2, title: "Accurate Predictions", desc: "98% accuracy in skill gap identification using proprietary LLMs.", accent: "text-primary" },
                { icon: BarChart2, title: "Data-driven Insights", desc: "Insights derived from billions of data points across global markets.", accent: "text-tertiary" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                    <div className={`mt-1 w-10 h-10 shrink-0 rounded-lg bg-surface-high flex items-center justify-center border border-white/5 ${item.accent} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image/Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <Lottie 
                animationData={aiIntelligenceAnim} 
                loop={true} 
                style={{ width: '120%', height: 'auto', filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.5))' }}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Bento Layout Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main big CTA block */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 bg-[#1b2234] rounded-2xl p-10 md:p-14 relative overflow-hidden flex flex-col justify-center min-h-[320px]">
            <div className="absolute right-0 top-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, var(--color-tertiary), transparent 40%)" }} />
            <div className="relative z-10 max-w-sm">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4 leading-tight">
                Ready to redefine your trajectory?
              </h2>
              <p className="text-sm text-on-surface-variant mb-8">
                Be among the first to experience our next-generation AI career engine.
              </p>
              <Link to="/signup">
                <button className="px-6 py-3 rounded-lg bg-primary text-surface-lowest font-bold shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:bg-primary-container transition-all">
                  Join the Beta
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[#1b2234] rounded-2xl p-10 flex flex-col items-center justify-center border border-outline-variant/10 text-center">
            <div className="text-6xl font-bold text-tertiary tracking-tighter mb-2">24/7</div>
            <div className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">Market Intelligence</div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[#1b2234] rounded-2xl p-8 border border-outline-variant/10 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex flex-col items-center justify-center mb-6">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <blockquote className="text-lg text-white font-medium italic mb-6 flex-1">
              "CareerCraft AI was engineered to replace guesswork with data science, providing elite career guidance to everyone."
            </blockquote>
            <div className="text-xs text-on-surface-variant">
              — The CareerCraft Team
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2 bg-[#1b2234] rounded-2xl p-8 border border-outline-variant/10 flex items-center gap-6">
            <div className="flex -space-x-3">
               <img className="w-12 h-12 rounded-full border-2 border-[#1b2234] bg-surface-high" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane&backgroundColor=ffdfbf" alt="User 1" />
               <img className="w-12 h-12 rounded-full border-2 border-[#1b2234] bg-surface-high" src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4" alt="User 2" />
               <img className="w-12 h-12 rounded-full border-2 border-[#1b2234] bg-surface-high" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mary&backgroundColor=cddc39" alt="User 3" />
               <div className="w-12 h-12 rounded-full border-2 border-[#1b2234] bg-surface-highest flex items-center justify-center text-[10px] uppercase font-black tracking-widest text-white z-10 relative">
                 Beta
               </div>
            </div>
            <div className="text-sm font-medium text-on-surface-variant max-w-[200px] leading-relaxed">
              Join an exclusive community of early adopters shaping the future.
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-outline-variant/20 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div className="text-sm font-logo font-black tracking-widest text-white uppercase mb-2">CareerCraft AI</div>
          <div className="text-[10px] text-on-surface-variant">© 2026 CareerCraft AI. The Ethereal Architect Experience.</div>
        </div>
        
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <a href="https://www.linkedin.com/in/harshlagwal/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
          <FileKey2 className="w-3 h-3" />
          <span>V2.4.0-Stable</span>
        </div>
      </footer>
    </div>
  );
}
