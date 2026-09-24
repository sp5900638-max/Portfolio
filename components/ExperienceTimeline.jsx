'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Code2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MapPin, 
  Download, 
  FileText,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { experienceTimeline } from '../data/portfolioData';

export default function ExperienceTimeline({ onOpenResume }) {
  const [expandedId, setExpandedId] = useState(0); // first item expanded by default

  const toggleExpand = (idx) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-5 h-5 text-cyan-accent" />;
      case 'Experience':
        return <Briefcase className="w-5 h-5 text-violet-accent" />;
      case 'Milestone':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-accent" />;
    }
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Download Resume Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-accent text-xs font-mono font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>CAREER PROGRESSION &amp; ACADEMICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-3">
              Experience &amp; Education
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl">
              Chronological milestones tracing academic training at NIE Mysuru, independent backend architecture projects, and algorithmic problem-solving.
            </p>
          </motion.div>

          {/* Prominent Download Resume Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => onOpenResume && onOpenResume()}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-semibold bg-gradient-to-r from-cyan-accent to-violet-accent text-slate-950 hover:opacity-95 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download / Preview Resume</span>
            </button>
          </motion.div>
        </div>

        {/* Vertical Timeline with Connected Glowing Nodes */}
        <div className="relative border-l-2 border-slate-200/40 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          
          {experienceTimeline.map((item, idx) => {
            const isExpanded = expandedId === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Connected Glowing Timeline Node */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-dark-bg border-2 border-cyan-accent flex items-center justify-center shadow-glow-cyan z-20 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
                </div>

                {/* Timeline Card */}
                <div
                  className={`rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border transition-all duration-300 backdrop-blur-xl shadow-xl overflow-hidden ${
                    isExpanded
                      ? 'border-cyan-500/40 shadow-cyan-500/10'
                      : 'border-slate-200/20 dark:border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Card Header (Clickable to Expand/Collapse) */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-accent border border-cyan-500/30">
                            {item.period}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {item.type}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                          {item.role}
                        </h3>
                        <div className="text-xs sm:text-sm text-slate-300 font-mono flex items-center gap-2 mt-0.5">
                          <span>{item.organization}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-violet-accent" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Expand Details'}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-2 border-t border-white/10"
                      >
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                          Key Deliverables &amp; Core Highlights:
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {item.highlights.map((point, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technology / Coursework Tags */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                          {item.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-[11px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
