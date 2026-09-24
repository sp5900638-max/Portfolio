'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  ExternalLink, 
  Code2, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Terminal, 
  Cpu, 
  Camera 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodeforcesIcon } from './SocialIcons';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState('/praveen.png');
  const [hasAvatarError, setHasAvatarError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('praveen_custom_avatar');
    if (saved) {
      setAvatarSrc(saved);
    }
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setAvatarSrc(result);
          setHasAvatarError(false);
          try {
            localStorage.setItem('praveen_custom_avatar', result);
          } catch (err) {
            console.warn('Storage limit reached for custom avatar');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic typewriter effect
  useEffect(() => {
    const currentRole = personalInfo.roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const socialLinks = [
    { name: 'GitHub', icon: GitHubIcon, href: personalInfo.github, color: 'hover:text-[#ffffff] hover:border-white/40' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: personalInfo.linkedin, color: 'hover:text-[#0a66c2] hover:border-[#0a66c2]/40' },
    { name: 'LeetCode (400+)', icon: LeetCodeIcon, href: personalInfo.leetcode, color: 'hover:text-[#ffa116] hover:border-[#ffa116]/40' },
    { name: 'Codeforces', icon: CodeforcesIcon, href: personalInfo.codeforces, color: 'hover:text-[#0074d9] hover:border-[#0074d9]/40' },
    { name: 'Direct Email', icon: Mail, href: `mailto:${personalInfo.email}`, color: 'hover:text-cyan-accent hover:border-cyan-accent/40' },
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Neon Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/10 via-violet-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Stylized Avatar Card & Social Media Dock */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
              {/* Outer Glowing Gradient Ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-accent via-violet-accent to-emerald-accent opacity-50 group-hover:opacity-100 blur-xl transition-all duration-700 animate-pulse-slow" />
              
              {/* Card Container */}
              <div className="relative rounded-2xl bg-dark-bg/90 dark:bg-[#0c101a]/95 border border-white/15 dark:border-white/10 p-5 shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 font-semibold">Available for Internships</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">NIE MYSURU</span>
                </div>

                {/* Stylized Avatar Frame */}
                <div className="relative w-full aspect-[4/4.4] rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-500">
                  {/* Photo / Avatar Graphic or Fallback Holographic Monogram */}
                  {!hasAvatarError ? (
                    <img
                      src={avatarSrc}
                      alt="Praveen - Developer Portrait"
                      onError={() => {
                        if (avatarSrc !== 'https://github.com/sp5900638-max.png') {
                          setAvatarSrc('https://github.com/sp5900638-max.png');
                        } else {
                          setHasAvatarError(true);
                        }
                      }}
                      className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    /* Futuristic Holographic Monogram */
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#090d16] p-6 text-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#00f5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                      <div className="absolute w-36 h-36 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
                      
                      <div className="relative w-28 h-28 rounded-full border border-cyan-500/30 flex items-center justify-center mb-3 shadow-glow-cyan">
                        <div className="absolute inset-1 rounded-full border-t border-violet-500/60 animate-spin-slow" />
                        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-accent to-violet-accent font-display">
                          P
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                        PRAVEEN // CS ENG
                      </div>
                      <div className="text-[10px] font-mono text-cyan-accent mt-0.5">
                        NIE MYSURU • CLASS OF 2027
                      </div>
                    </div>
                  )}

                  {/* Photo Upload Trigger Button on Hover */}
                  <label
                    title="Upload or Change Portrait Photo"
                    className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-dark-bg/85 hover:bg-dark-bg border border-white/20 hover:border-cyan-500/50 text-slate-200 hover:text-white rounded-lg px-2.5 py-1 text-[11px] font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-accent" />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* High-tech HUD Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  {/* Corner Accent marks */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-accent pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-accent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-violet-accent pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-violet-accent pointer-events-none" />

                  {/* Floating Floating Micro Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-dark-bg/85 border border-white/10 rounded-lg p-2.5 backdrop-blur-md flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-accent" />
                      <div className="text-[11px] font-mono leading-tight">
                        <div className="text-white font-semibold">PYTHON &amp; FASTAPI</div>
                        <div className="text-slate-400 text-[9px]">RAG VECTOR PIPELINES</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono font-bold text-cyan-accent">
                      &lt;38ms
                    </div>
                  </div>
                </div>

                {/* Location & Academic Meta */}
                <div className="mt-4 pt-3 flex flex-col gap-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-accent" />
                    <span>2nd-Year CSE • NIE Mysuru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-violet-accent" />
                    <span>Mysuru, Karnataka, India</span>
                  </div>
                </div>
              </div>

              {/* Social Media Icon Dock */}
              <div className="mt-4 flex items-center justify-between bg-dark-surface/80 dark:bg-white/[0.03] border border-slate-200/20 dark:border-white/10 rounded-xl p-2 backdrop-blur-md shadow-lg">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      className={`p-2.5 rounded-lg text-slate-400 hover:bg-white/10 border border-transparent transition-all duration-200 ${item.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Introduction Headline, Typewriter, Bio & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-accent text-xs font-mono font-semibold mb-6 shadow-sm shadow-cyan-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HIGH-PERFORMANCE FULL-STACK &amp; BACKEND</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1] mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent via-violet-accent to-emerald-accent">{personalInfo.name}</span>
            </h1>

            {/* Dynamic Rotating Subtitle / Typewriter */}
            <div className="flex items-center gap-2 h-10 mb-6">
              <span className="text-slate-400 font-mono text-base sm:text-lg">&gt;</span>
              <span className="font-mono text-lg sm:text-2xl font-semibold text-cyan-accent border-r-2 border-cyan-accent pr-1 animate-pulse">
                {displayedText}
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              Second-year Computer Science & Engineering undergraduate at <strong>The National Institute of Engineering (NIE), Mysuru</strong>. Building deterministic <strong>REST APIs</strong>, sub-35ms <strong>Qdrant RAG vector retrieval pipelines</strong>, and containerized <strong>Docker</strong> microservices designed for zero downtime under high concurrency.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-accent to-violet-accent text-slate-950 hover:opacity-95 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-white/[0.05] border border-slate-300/60 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/20 active:scale-[0.98] transition-all"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4 text-cyan-accent" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium bg-transparent border border-slate-300/60 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-white hover:border-white/30 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub Repos</span>
              </a>
            </div>

            {/* Mini Tech Highlight Chips */}
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Primary Core:</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Python 3.11+</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">FastAPI</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Qdrant Vector DB</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Next.js</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">Docker</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
