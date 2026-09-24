'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, BarChart3, Layers, Sparkles } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0b0f17] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-accent text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{project.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {project.title}
            </h3>
          </div>

          {/* Project Preview Banner */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
            
            {/* Overlay Metric Badges */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              {project.metrics && project.metrics.map((metric, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-dark-bg/85 border border-cyan-500/30 text-cyan-accent text-xs font-mono font-semibold backdrop-blur-md"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-accent" />
              <span>Architectural Overview</span>
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.fullDesc}
            </p>
          </div>

          {/* Feature List */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Key Engineering Highlights</span>
              </h4>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-accent" />
              <span>Technologies Deployed</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions: Live Demo & GitHub */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-accent to-violet-accent text-slate-950 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Live Demonstration</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>Inspect Source Code</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
