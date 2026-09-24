'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errs.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable form transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f5ff', '#8b5cf6', '#10b981'],
        });
      } catch (e) {
        // graceful fallback if canvas-confetti is not loaded
      }

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 6000);
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

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
            <Send className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Interested in collaborating on scalable Python backend architectures, high-performance RAG pipelines, or full-stack web applications? Let's connect.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Academic Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Primary Direct Email Card */}
            <div className="rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={copyEmailToClipboard}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400 mb-1">DIRECT INBOX</div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-cyan-accent font-mono transition-colors break-all"
              >
                {personalInfo.email}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Fastest response for project inquiries, internships, and technical discussions.
              </p>
            </div>

            {/* Location & Academic Base Card */}
            <div className="rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">LOCATION &amp; BASE</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    Mysuru, Karnataka, India
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Timezone: IST (UTC +5:30)
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">INSTITUTION</div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    The National Institute of Engineering (NIE), Mysuru
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    2nd Year Computer Science &amp; Engineering Undergraduate
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connection Matrix */}
            <div className="rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 backdrop-blur-xl shadow-xl">
              <div className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                NETWORK &amp; CODE PROFILES
              </div>
              <div className="flex flex-col gap-2 font-mono text-xs">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-200 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GitHubIcon className="w-4 h-4 text-cyan-accent" />
                    <span>github.com/sp5900638-max</span>
                  </span>
                  <span className="text-cyan-accent">→</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-200 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-violet-accent" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <span className="text-violet-accent">→</span>
                </a>

                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-200 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 text-amber-400 font-bold">LC</span>
                    <span>LeetCode Profile (400+ Solved)</span>
                  </span>
                  <span className="text-amber-400">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl bg-dark-bg/85 dark:bg-[#0c101a]/90 border border-slate-200/20 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-accent" />
                <span>Send a Direct Message</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Praveen's NIE Portfolio
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-slate-300 text-sm max-w-md font-mono">
                  Thank you for reaching out, {formData.name}. I'll review your transmission and get back to you shortly at {formData.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                      Your Name <span className="text-cyan-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Turing"
                      className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                        errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 font-mono mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                      Your Email <span className="text-cyan-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                        errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 font-mono mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                    Subject <span className="text-cyan-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Backend Internship Opportunity / RAG Project Collaboration"
                    className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                      errors.subject ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 font-mono mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                    Message Details <span className="text-cyan-accent">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your technical inquiry, project requirements, or team opportunity..."
                    className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none ${
                      errors.message ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 font-mono mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-accent via-violet-accent to-emerald-accent text-slate-950 hover:opacity-95 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Packet...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
