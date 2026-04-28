import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-on-background p-8 md:p-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-all hover:underline mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-on-background">Privacy Policy</h1>
        </div>

        <div className="space-y-8 text-on-surface-variant leading-relaxed bg-surface p-8 md:p-12 rounded-[32px] border border-outline-variant/20 shadow-2xl">
          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">1. Data Collection</h2>
            <p>
              We collect minimal data necessary to provide AI-driven career insights. This includes your professional background, skills, and aspirations that you voluntarily provide through our quiz or profile setup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">2. AI Processing</h2>
            <p>
              Your data is processed using local and cloud-based neural networks. We do not sell your personal data to third parties. Our primary goal is to provide you with accurate career roadmap predictions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">3. Security</h2>
            <p>
              We employ industry-standard encryption and security protocols to protect your information. Your account credentials are encrypted and never stored in plain text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">4. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and remember your preferences. No tracking cookies for advertising are used.
            </p>
          </section>
        </div>

        <footer className="mt-12 pt-8 text-center text-xs font-semibold uppercase tracking-widest text-on-surface-variant/40">
          Last updated: April 2026
        </footer>
      </div>
    </div>
  );
}
