import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function Terms() {
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
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-on-background">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-on-surface-variant leading-relaxed bg-surface p-8 md:p-12 rounded-[32px] border border-outline-variant/20 shadow-2xl">
          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing CareerCraft AI, you agree to abide by these terms. Our service provides AI-generated career guidance based on historical data and current market trends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">2. Service Disclaimer</h2>
            <p>
              While our AI models are highly accurate, predictions should be taken as guidance and not as absolute professional advice. CareerCraft AI is not responsible for any career decisions made based on its outputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">3. User Conduct</h2>
            <p>
              Users are responsible for the accuracy of the data they provide. Any attempt to exploit the AI models or scrape data from the platform is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-on-background mb-4">4. Intellectual Property</h2>
            <p>
              All AI models, algorithms, and interface designs are the intellectual property of CareerCraft AI.
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
