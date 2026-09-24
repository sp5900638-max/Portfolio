'use client';

import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Certificates from '../components/Certificates';
import LifeBeyondTech from '../components/LifeBeyondTech';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      {/* 1. Orientation / Preloader Screen */}
      <Preloader onLoaded={() => setIsLoaded(true)} />

      {/* Main Single-Page Content */}
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* 2. Sticky Floating Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main className="relative z-10">
          {/* 3. Hero Section */}
          <Hero />

          {/* 4. About Me & Stats Grid */}
          <About />

          {/* 5. Projects Showcase */}
          <Projects />

          {/* 6. Interactive Skills & Tech Stack */}
          <Skills />

          {/* 7. Experience & Education Timeline */}
          <ExperienceTimeline onOpenResume={() => setResumeOpen(true)} />

          {/* 8. Certifications & Achievements */}
          <Certificates />

          {/* 9. Life Beyond Tech (Photo Gallery) */}
          <LifeBeyondTech />

          {/* 10. Contact Section */}
          <Contact />
        </main>

        {/* Minimalist Footer */}
        <Footer />

        {/* Global Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </>
  );
}
