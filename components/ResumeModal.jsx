'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle2, GraduationCap, Briefcase, Code2, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text/markdown or trigger PDF download
    const element = document.createElement('a');
    const resumeText = `
PRAVEEN
Email: ${personalInfo.email} | Location: ${personalInfo.location}
GitHub: ${personalInfo.github} | LeetCode: ${personalInfo.leetcode}

EDUCATION:
- The National Institute of Engineering (NIE), Mysuru
  Bachelor of Engineering in Computer Science & Engineering (2023 - 2027)
  Core Coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks

TECHNICAL SKILLS:
- Languages: Python 3.11+, C++, JavaScript, TypeScript, SQL, Bash
- Frameworks: FastAPI, Flask, Next.js, React, Node.js, Express
- Databases: Qdrant Vector DB, MySQL, MongoDB, SQLite, Redis
- Tools & DevOps: Docker, Git/GitHub, Linux (Debian/Ubuntu), Postman

PROJECTS:
1. Autonomous Qdrant RAG Vector Engine
   - Engineered sub-35ms vector retrieval pipeline across 100k+ document chunks.
   - Integrated FastAPI, Qdrant Vector DB, and dynamic chunking algorithms.

2. CloudScale Microservice REST Gateway
   - Developed asynchronous API gateway handling 10k+ req/sec with < 38ms P99 latency.
   - Built distributed token-bucket rate limiter, JWT auth, and MySQL connection pooling.

3. OmniDev AI Multi-File Code Intelligence
   - Next.js and FastAPI developer tool with client-side AST syntax parsing and streaming LLM chat.

ACHIEVEMENTS:
- Solved 400+ problems on LeetCode focusing on Graphs, DP, Trees, and Heaps.
- Finalist at NIE Mysuru Annual Campus Hackathon 2024.
    `;
    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Praveen_Resume_NIE_Mysuru.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0b0f17] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-cyan-accent uppercase tracking-wider">
                CURRICULUM VITAE // PRAVEEN (NIE MYSURU)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                title="Print Resume"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                onClick={handleDownload}
                title="Download Resume"
                className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-accent font-mono text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content Container */}
          <div className="bg-[#080b12] border border-white/10 rounded-xl p-6 sm:p-8 text-slate-200 font-sans space-y-6">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
                PRAVEEN
              </h2>
              <p className="text-cyan-accent font-mono text-xs sm:text-sm mt-1">
                Computer Science &amp; Engineering Undergraduate • Backend &amp; RAG Systems Engineer
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-accent" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-violet-accent" />
                  {personalInfo.location}
                </span>
                <span>GitHub: github.com/sp5900638-max</span>
                <span>LeetCode: 400+ Solved</span>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-accent font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>EDUCATION</span>
              </h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-white text-sm sm:text-base">
                    The National Institute of Engineering (NIE), Mysuru
                  </span>
                  <span className="text-xs font-mono text-slate-400">2023 — 2027</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Bachelor of Engineering in Computer Science &amp; Engineering (Current: 2nd Year)
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  <strong>Core Coursework:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Architecture, Discrete Mathematics.
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-violet-accent font-bold mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>TECHNICAL COMPETENCIES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="text-slate-400 font-mono block text-[11px]">LANGUAGES &amp; RUNTIMES</span>
                  <span className="text-white font-medium">Python 3.11+, C++, JavaScript, TypeScript, SQL, Bash</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="text-slate-400 font-mono block text-[11px]">BACKEND &amp; APIS</span>
                  <span className="text-white font-medium">FastAPI, Flask, Node.js, Express, REST APIs, AsyncIO</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="text-slate-400 font-mono block text-[11px]">DATABASES &amp; VECTOR RETRIEVAL</span>
                  <span className="text-white font-medium">Qdrant Vector DB, MySQL, MongoDB, SQLite, Redis</span>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <span className="text-slate-400 font-mono block text-[11px]">DEVOPS &amp; TOOLS</span>
                  <span className="text-white font-medium">Docker, Docker Compose, Git/GitHub, Linux, Nginx</span>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>PROJECT HIGHLIGHTS</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>Autonomous Qdrant RAG Vector Engine</span>
                    <span className="text-cyan-accent font-mono">&lt; 35ms Latency</span>
                  </div>
                  <p className="text-slate-300">
                    Engineered an enterprise RAG retrieval pipeline with FastAPI, Qdrant Vector DB, and dense vector embeddings across 100k+ chunks with sub-35ms response times.
                  </p>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>CloudScale Microservice REST Gateway</span>
                    <span className="text-cyan-accent font-mono">10k+ Req/Sec</span>
                  </div>
                  <p className="text-slate-300">
                    Asynchronous gateway featuring distributed token-bucket rate limiting, RS256 JWT validation, and automated MySQL connection pooling.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-2">
                KEY ACHIEVEMENTS
              </h3>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Solved 400+ problems on LeetCode covering Graph Theory, DP, and Trees.</li>
                <li>Finalist at the Annual NIE Mysuru Campus Hackathon 2024.</li>
                <li>Certified in Generative AI &amp; Vector Search by DeepLearning.AI.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
