'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Layers, Terminal } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

// Custom SVG Icons for Tech Stack
function TechIcon({ name, className = "w-6 h-6" }) {
  switch (name) {
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M11.91 2c-5.26 0-4.94 2.28-4.94 2.28l.01 2.37h5.03v.71H4.95S2 7.02 2 12.3c0 5.27 2.58 5.09 2.58 5.09h1.54v-2.17s-.08-2.58 2.54-2.58h4.37s2.47.04 2.47-2.42V4.47S15.86 2 11.91 2zm-1.4 1.45a.96.96 0 1 1 0 1.93.96.96 0 0 1 0-1.93z" fill="#387EB8"/>
          <path d="M12.09 22c5.26 0 4.94-2.28 4.94-2.28l-.01-2.37h-5.03v-.71h7.06S22 16.98 22 11.7c0-5.27-2.58-5.09-2.58-5.09h-1.54v2.17s.08 2.58-2.54 2.58h-4.37s-2.47-.04-2.47 2.42v8.05s-.36 2.47 3.59 2.47zm1.4-1.45a.96.96 0 1 1 0-1.93.96.96 0 0 1 0 1.93z" fill="#FFE052"/>
        </svg>
      );
    case 'cpp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#00599C">
          <path d="M22.394 6.007l-9.356-5.4a2.078 2.078 0 0 0-2.076 0L1.606 6.007A2.078 2.078 0 0 0 .568 7.806v10.8a2.078 2.078 0 0 0 1.038 1.8l9.356 5.4a2.078 2.078 0 0 0 2.076 0l9.356-5.4a2.078 2.078 0 0 0 1.038-1.8v-10.8a2.078 2.078 0 0 0-1.038-1.8zm-11.43 12.637a5.244 5.244 0 1 1 0-10.488 5.2 5.2 0 0 1 3.655 1.488l-1.39 1.39a3.278 3.278 0 1 0 0 5.22l1.39 1.39a5.2 5.2 0 0 1-3.655 1zM19 13.5h-1.5V15h-1v-1.5H15v-1h1.5V11h1v1.5H19v1zm3.5 0H21V15h-1v-1.5h-1.5v-1H20V11h1v1.5h1.5v1z"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F7DF1E">
          <path d="M3 3h18v18H3V3zm13.7 14.5c1.6 0 2.6-.9 2.6-2.3 0-1.6-1.1-2.1-2.4-2.7l-.4-.2c-.7-.3-1-.6-1-1.1 0-.5.4-.9 1-.9.6 0 1 .3 1.3.8l1.4-.9c-.6-1-1.5-1.5-2.7-1.5-1.5 0-2.5.9-2.5 2.2 0 1.4 1 2 2.3 2.5l.4.2c.8.3 1.2.6 1.2 1.2 0 .6-.5 1-1.2 1-.8 0-1.3-.4-1.7-1.1l-1.4.9c.7 1.3 1.7 1.9 3 1.9zm-6.8-.2c.4.2.8.3 1.3.3.9 0 1.6-.4 1.9-1.2.2-.6.2-1.3.2-2.3V8.8h-1.8v5.3c0 .8 0 1.2-.4 1.4-.2.1-.5.1-.8 0l-.4 1.8z"/>
        </svg>
      );
    case 'typescript':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#3178C6">
          <path d="M3 3h18v18H3V3zm7.8 7.3H6.7v1.8h1.6v6.4h2v-6.4h1.6v-1.8h-1.1zm6 4.3c0-.6-.3-1-1.1-1.3l-.4-.2c-1-.4-1.7-.8-1.7-1.8 0-1.1.9-1.9 2.2-1.9 1.1 0 1.9.4 2.4 1.1l-1.3 1c-.3-.4-.7-.6-1.1-.6-.4 0-.7.2-.7.5 0 .4.3.7 1.1 1l.4.2c1.2.5 1.7 1 1.7 2 0 1.2-1 2-2.3 2-1.3 0-2.2-.6-2.7-1.4l1.3-1c.4.5.8.8 1.4.8.5 0 .8-.3.8-.6z"/>
        </svg>
      );
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case 'nextjs':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 18.066l-5.84-8.08v8.08H10.1V6.934h1.726l5.84 8.08V6.934h1.726v11.132h-1.726z" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case 'fastapi':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#009688">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.83 4.24l.11.02a.84.84 0 0 1 .68.96L12.3 11h3.36a.84.84 0 0 1 .64 1.38l-5.6 7.14a.84.84 0 0 1-1.48-.72l1.32-5.8H7.16a.84.84 0 0 1-.64-1.38l5.6-7.14a.84.84 0 0 1 .71-.24z"/>
        </svg>
      );
    case 'docker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.959 11.5a4.7 4.7 0 00-2.316-2.073c-.11-.05-.224-.01-.274.084-.257.48-.68 1.15-1.42 1.15h-.265c-.13 0-.236.105-.236.236v1.36c0 1.637-.932 3.106-2.43 3.824a6.76 6.76 0 01-2.98.67c-4.482 0-8.318-3.08-9.458-7.394a.208.208 0 00-.203-.153H1.81a.208.208 0 00-.206.236c.642 4.49 4.14 8.016 8.653 8.64a13.3 13.3 0 005.158-.293c4.545-1.127 7.91-4.996 8.544-9.69a.208.208 0 00-.106-.21"/>
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.126 0L8.808 2.585l3.22 3.22a1.78 1.78 0 012.28 2.29l3.09 3.09a1.776 1.776 0 11-1.07 1.05l-2.88-2.88a1.78 1.78 0 01-1.63.46l-2.45 2.45a1.78 1.78 0 11-1.06-.99l2.42-2.42a1.78 1.78 0 01.44-1.69L9.93 6.953 2.12 14.764a1.5 1.5 0 000 2.126l10.48 10.48a1.5 1.5 0 002.125 0l8.82-8.82a1.5 1.5 0 000-2.126z"/>
        </svg>
      );
    case 'vector':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#DC2626">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <path d="M8.5 7.5l7 0M7.5 8.5l3.5 7M16.5 8.5l-3.5 7" stroke="#DC2626" strokeWidth="2" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#4479A1">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-6h2v6zm0-8h-2V7h2v3z"/>
        </svg>
      );
    case 'linux':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#FCC624">
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.3 3-.8 1-1.3 2.3-1.3 3.7 0 2.1 1.2 3.9 3 4.7-.2.7-.5 1.4-1 2-.3.3-.2.8.2.9.2.1.4 0 .6-.1 1.3-.8 2-2.1 2.3-3.7.3 1.6 1 2.9 2.3 3.7.2.1.4.2.6.1.4-.1.5-.6.2-.9-.5-.6-.8-1.3-1-2 1.8-.8 3-2.6 3-4.7 0-1.4-.5-2.7-1.3-3.7.8-.7 1.3-1.8 1.3-3C16.5 4 14.5 2 12 2z"/>
        </svg>
      );
    default:
      return <Cpu className={className} />;
  }
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-accent text-xs font-mono font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            Interactive Skills &amp; Tech Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Categorized competency stack spanning systems programming, async REST APIs, vector embeddings, and container deployment.
          </p>
        </motion.div>

        {/* Categorized Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-accent shadow-glow-cyan" />
                    <span>{category.name}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {category.skills.length} TECHNOLOGIES
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    return (
                      <motion.div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`relative rounded-xl p-3 border transition-all duration-200 cursor-pointer flex flex-col items-start justify-between ${
                          isHovered
                            ? 'bg-white/10 border-cyan-500/50 shadow-glow-cyan'
                            : 'bg-white/[0.03] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <TechIcon name={skill.icon} className="w-5 h-5" />
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white font-mono truncate w-full">
                          {skill.name}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clustered Floating Tech Cloud Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-emerald-500/10 border border-white/10 p-6 sm:p-8 backdrop-blur-xl text-center"
        >
          <div className="text-xs font-mono text-cyan-accent uppercase tracking-widest font-semibold mb-2">
            RAPID TOOLCHAIN REPOSITORY
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white font-display mb-6">
            Primary Production Engineering Stack
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Python 3.11+", "FastAPI", "Qdrant Vector DB", "Docker", "AsyncIO", 
              "Next.js App Router", "Tailwind CSS", "MySQL 8.0", "MongoDB", "Linux/Bash", 
              "Framer Motion", "C++ Algorithms", "Git CI/CD", "Redis", "REST APIs"
            ].map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-dark-bg/85 border border-white/10 text-xs sm:text-sm font-mono text-slate-200 hover:text-cyan-accent hover:border-cyan-500/40 hover:scale-105 transition-all shadow-sm cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
