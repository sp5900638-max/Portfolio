'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, X, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function Certificates() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const tabs = ['All', 'Technical', 'Competitions'];

  const filteredCerts = activeTab === 'All'
    ? certifications
    : certifications.filter((c) => c.category === activeTab);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-accent text-xs font-mono font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIALS &amp; RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            Certifications &amp; Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Verified credentials in Generative AI, high-dimensional vector search, algorithm problem-solving, and hackathons.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-accent to-cyan-accent text-slate-950 font-semibold shadow-md shadow-violet-500/20'
                  : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 overflow-hidden backdrop-blur-xl shadow-xl hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Certificate Image Preview */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-dark-bg/85 border border-white/10 text-violet-accent font-mono text-[11px] font-semibold backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>

                  {/* View Full Resolution Overlay hint */}
                  <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
                    <Eye className="w-4 h-4 text-cyan-accent" />
                    <span>View Certificate</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-cyan-accent font-semibold">{cert.issuer}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="text-lg sm:text-xl font-bold text-white font-display mb-2 group-hover:text-violet-accent transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills Learned Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono text-[10px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-mono text-cyan-accent hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Full-Res</span>
                </button>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3 text-violet-accent" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Certificate Full-Res Image Popup Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-2xl bg-[#0b0f17] border border-violet-500/30 p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-accent">
                    Issued by: {selectedCert.issuer} ({selectedCert.date})
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full-resolution certificate presentation */}
              <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-slate-950">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-400 font-mono">
                  {selectedCert.description}
                </p>
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-500/20 text-violet-accent border border-violet-500/30 hover:bg-violet-500/30 transition-all shrink-0 ml-4"
                >
                  <span>Official Verification</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
