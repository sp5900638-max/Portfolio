'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, 
  FolderGit2, 
  Clock, 
  ShieldCheck, 
  Camera, 
  Compass, 
  Headphones, 
  Activity,
  CheckCircle2,
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';
import { personalInfo, stats, beyondCodeInterests } from '../data/portfolioData';

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    const incrementTime = (duration * 1000) / end;
    const step = Math.max(1, Math.floor(end / 40));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime * step);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      {count}{suffix}
    </span>
  );
}

const iconMap = {
  Code2: Code2,
  FolderGit2: FolderGit2,
  Clock: Clock,
  ShieldCheck: ShieldCheck,
  Camera: Camera,
  Compass: Compass,
  Headphones: Headphones,
  Activity: Activity,
};

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-accent text-xs font-mono font-semibold mb-3">
            <span>ENGINEERING IDENTITY &amp; PASSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            About Me &amp; Core Philosophy
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Grounded in rigorous computer science principles, algorithmic optimization, and modern systems architecture.
          </p>
        </motion.div>

        {/* Top Bento Row: Detailed Bio & Technical Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-accent" />
                  <span className="font-mono text-xs font-semibold text-cyan-accent uppercase tracking-wider">
                    Software Philosophy // Algorithmic Precision
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">CLASS OF 2027</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-4 leading-snug">
                Engineering high-concurrency systems at The National Institute of Engineering, Mysuru.
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {personalInfo.bio}
              </p>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {personalInfo.detailedBio}
              </p>
            </div>

            {/* Quick Core Strengths Pills */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sub-35ms Latency</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0" />
                <span>AsyncIO Event Loops</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-violet-accent shrink-0" />
                <span>Vector Embeddings</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Docker Microservices</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Clean Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0" />
                <span>10k+ Concurrent Req</span>
              </div>
            </div>
          </motion.div>

          {/* Academic Grounding Matrix Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs font-semibold text-violet-accent uppercase tracking-wider mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>IDENTITY MATRIX</span>
                <Cpu className="w-4 h-4 text-violet-accent" />
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">INSTITUTION</div>
                  <div className="text-white font-semibold">The National Institute of Engineering (NIE), Mysuru</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">DEGREE / PROGRAM</div>
                  <div className="text-cyan-accent font-semibold">B.E. Computer Science &amp; Engineering</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">CURRENT YEAR</div>
                  <div className="text-slate-200">2nd Year Undergraduate (2023 - 2027)</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">LOCATION</div>
                  <div className="text-slate-200">Mysuru, Karnataka, India</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">ALGORITHMIC MASTERY</div>
                  <div className="text-amber-400 font-semibold">400+ LeetCode Solved • Top 15%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-amber-400/40 transition-colors"
              >
                <span>Verify LeetCode Profile</span>
                <span className="text-amber-400">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Animated Counter Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((item, idx) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-dark-bg/80 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 backdrop-blur-xl shadow-lg hover:border-cyan-500/40 transition-all overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-full blur-xl transition-all" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-accent group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    METRIC 0{idx + 1}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-1 group-hover:text-cyan-accent transition-colors">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>

                <div className="text-sm font-semibold text-slate-200 font-display">
                  {item.label}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {item.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Beyond the Code" Interest Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-dark-bg/60 dark:bg-[#0c101a]/70 border border-white/10 p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-cyan-accent uppercase tracking-wider font-semibold">
                LIFE BEYOND CODE // CREATIVE BALANCE
              </div>
              <h4 className="text-lg font-bold text-white font-display mt-1">
                Personal Passions &amp; Creative Pursuits
              </h4>
            </div>
            <p className="text-xs text-slate-400 font-mono max-w-xs">
              Diverse disciplines fuel innovative algorithmic thinking and endurance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {beyondCodeInterests.map((interest) => {
              const Icon = iconMap[interest.icon] || Camera;
              return (
                <div
                  key={interest.name}
                  className="rounded-xl bg-white/[0.03] border border-white/5 p-4 hover:border-violet-500/40 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-accent mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-semibold text-white font-display mb-1">
                    {interest.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {interest.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
