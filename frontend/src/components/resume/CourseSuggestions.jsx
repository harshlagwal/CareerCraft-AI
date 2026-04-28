import React from 'react';
import { ExternalLink, PlayCircle, BookOpen, GraduationCap } from 'lucide-react';

export default function CourseSuggestions({ missingSkills = [] }) {
  const dummyCourses = [
    { skill: "TensorFlow", course: "Deep Learning Specialization (Coursera)" },
    { skill: "System Design", course: "Grokking the System Design Interview" },
    { skill: "Neural Hub V4", course: "Enterprise Vector Architect Certification" }
  ];

  const suggestions = missingSkills.length > 0 
    ? missingSkills.slice(0, 3).map(s => ({ skill: s, course: `${s} Advanced Mastery Certification` }))
    : dummyCourses;

  return (
    <div className="bg-surface rounded-[32px] p-10 border border-primary/20 shadow-2xl relative overflow-hidden group mt-10 transition-colors duration-300">
       <div className="absolute top-0 right-0 p-10 opacity-10"><GraduationCap size={100} /></div>
       
       <div className="relative z-10 space-y-8">
          <div className="space-y-2">
             <h4 className="text-xl font-bold text-on-background tracking-tight">Growth Bridge: Skill-to-Course mapping</h4>
             <p className="text-xs text-on-surface-variant opacity-80">Bridge your strategic gaps with these targeted learning vectors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {suggestions.map((s, i) => (
                <div key={i} className="p-6 rounded-2xl bg-background border border-outline-variant/20 group/course hover:border-primary/40 transition-all flex flex-col justify-between h-[160px] cursor-pointer">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-primary uppercase tracking-[0.2em]">
                         <PlayCircle size={14} /> Recommended Sync
                      </div>
                      <h5 className="text-[13px] font-bold text-on-background leading-snug group-hover/course:text-primary transition-colors">
                         {s.course}
                      </h5>
                   </div>
                   <div className="flex justify-between items-center text-[9px] font-black text-on-surface-variant uppercase tracking-widest pt-4 group-hover/course:text-on-background transition-colors">
                      Learn {s.skill} <ExternalLink size={12} />
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
