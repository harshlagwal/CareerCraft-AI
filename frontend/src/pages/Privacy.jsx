import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
        </div>

        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Data Collection</h2>
            <p>
              We collect minimal data necessary to provide AI-driven career insights. This includes your professional background, skills, and aspirations that you voluntarily provide through our quiz or profile setup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. AI Processing</h2>
            <p>
              Your data is processed using local and cloud-based neural networks. We do not sell your personal data to third parties. Our primary goal is to provide you with accurate career roadmap predictions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Security</h2>
            <p>
              We employ industry-standard encryption and security protocols to protect your information. Your account credentials are encrypted and never stored in plain text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and remember your preferences. No tracking cookies for advertising are used.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-white/5 text-xs text-on-surface-variant">
          Last updated: April 2026
        </footer>
      </div>
    </div>
  );
}
