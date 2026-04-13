import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-tertiary/10 border border-tertiary/20">
            <FileText className="w-8 h-8 text-tertiary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing CareerCraft AI, you agree to abide by these terms. Our service provides AI-generated career guidance based on historical data and current market trends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Service Disclaimer</h2>
            <p>
              While our AI models are highly accurate, predictions should be taken as guidance and not as absolute professional advice. CareerCraft AI is not responsible for any career decisions made based on its outputs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. User Conduct</h2>
            <p>
              Users are responsible for the accuracy of the data they provide. Any attempt to exploit the AI models or scrape data from the platform is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              All AI models, algorithms, and interface designs are the intellectual property of CareerCraft AI.
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
