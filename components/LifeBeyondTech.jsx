'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { photoGallery } from '../data/portfolioData';

export default function LifeBeyondTech() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') setSelectedPhotoIndex((prev) => (prev + 1) % photoGallery.length);
      if (e.key === 'ArrowLeft') setSelectedPhotoIndex((prev) => (prev - 1 + photoGallery.length) % photoGallery.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const activePhoto = selectedPhotoIndex !== null ? photoGallery[selectedPhotoIndex] : null;

  return (
    <section id="beyond" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>MOMENTS &amp; PERSPECTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mb-4">
            Life Beyond Tech
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Snapshots of campus hackathons at NIE Mysuru, landscape photography across Karnataka, treks in the Western Ghats, and personal milestones.
          </p>
        </motion.div>

        {/* Masonry / Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photoGallery.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-dark-card border border-slate-200/20 dark:border-white/10 aspect-[4/3] shadow-lg hover:border-emerald-400/40 hover:shadow-emerald-500/10 transition-all"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-dark-bg/80 border border-white/15 text-emerald-400 font-mono text-[10px] font-semibold backdrop-blur-md">
                  {photo.category}
                </span>
              </div>

              {/* Expand Hint Icon */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-dark-bg/75 border border-white/10 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Card Meta */}
              <div className="absolute bottom-4 inset-x-4">
                <h3 className="text-base font-bold text-white font-display leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhotoIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg"
            />

            {/* Lightbox Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full z-10 flex flex-col items-center"
            >
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 text-emerald-400">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedPhotoIndex + 1} of {photoGallery.length}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Frame */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-w-full max-h-[72vh] object-contain"
                />

                {/* Left Navigation Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIndex((prev) => (prev - 1 + photoGallery.length) % photoGallery.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-bg/80 border border-white/20 text-white flex items-center justify-center hover:bg-dark-bg hover:scale-110 transition-all backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIndex((prev) => (prev + 1) % photoGallery.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-bg/80 border border-white/20 text-white flex items-center justify-center hover:bg-dark-bg hover:scale-110 transition-all backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption & Location Bottom Bar */}
              <div className="w-full mt-3 p-4 rounded-xl bg-dark-surface/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 backdrop-blur-md">
                <div>
                  <h4 className="text-lg font-bold text-white font-display">
                    {activePhoto.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {activePhoto.caption}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
