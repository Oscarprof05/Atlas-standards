import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { GlobalKaapuScrollCanvas } from './components/GlobalKaapuScrollCanvas';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { RequirementsSection } from './components/RequirementsSection';
import { ApproachTimeline } from './components/ApproachTimeline';
import { BrandDesk } from './components/BrandDesk';
import { NetworkMap } from './components/NetworkMap';
import { WhyAtlas } from './components/WhyAtlas';
import { PhilosophySection } from './components/PhilosophySection';
import { FounderSection } from './components/FounderSection';
import { ConnectSection } from './components/ConnectSection';
import { Footer } from './components/Footer';
import { AudioAmbience } from './components/AudioAmbience';
import { LookbookVideoStudio } from './components/LookbookVideoStudio';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [isLookbookStudioOpen, setIsLookbookStudioOpen] = useState(false);

  // Initialize Lenis Smooth Scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  const handleStartProject = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo('#connect');
    } else {
      const contactElem = document.getElementById('connect') || document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExplore = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo('#problem');
    } else {
      const problemElem = document.getElementById('problem');
      if (problemElem) {
        problemElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white font-sans antialiased overflow-x-hidden relative">
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-subtle-grid pointer-events-none opacity-20 z-0" />

      {/* Ambient Audio Synth */}
      <AudioAmbience isMuted={isMuted} />

      {/* FIXED 3D KAAPU SCROLL-DRIVEN ENGINE */}
      {/* The Kaapu travels dynamically across all sections as you scroll using GSAP ScrollTrigger */}
      <GlobalKaapuScrollCanvas />

      {/* Fixed Luxury Navigation */}
      <Navbar
        onStartProject={handleStartProject}
        onOpenLookbookStudio={() => setIsLookbookStudioOpen(true)}
        isMuted={isMuted}
        onToggleSound={toggleSound}
      />

      {/* Main Experience Flow */}
      <main className="relative z-20 w-full">
        {/* HERO SECTION */}
        <HeroSection
          onStartProject={handleStartProject}
          onExplore={handleExplore}
          onOpenLookbookStudio={() => setIsLookbookStudioOpen(true)}
        />

        {/* SECTION 01 — THE PROBLEM: SUPPLY CHAIN COMPLEXITY */}
        <ProblemSection />

        {/* SECTION 02 — WHAT WE DO & FABRIC SPECIFICATION SHOWCASE */}
        <WhatWeDoSection onStartProject={handleStartProject} />

        {/* SECTION 03 — REQUIREMENTS FOR EVERY SCALE */}
        <RequirementsSection onStartProject={handleStartProject} />

        {/* SECTION 04 — THE ATLAS 5-PHASE PIPELINE */}
        <ApproachTimeline />

        {/* SECTION 05 — BRAND DESK: SPECIFICATION & ENGINEERING CALCULATOR */}
        <BrandDesk />

        {/* SECTION 06 — SOURCING & MANUFACTURING NETWORK MAP */}
        <NetworkMap onStartProject={handleStartProject} />

        {/* SECTION 07 — WHY ATLAS STANDARDS COMPARISON */}
        <WhyAtlas />

        {/* ⭐ FINAL TRUST / PHILOSOPHY STATEMENT */}
        <PhilosophySection />

        {/* SECTION 08 — MEET THE FOUNDER */}
        <FounderSection />

        {/* SECTION 09 — CONNECT WITH US: PROJECT INQUIRY & MANUFACTURING PARTNERS */}
        <ConnectSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* AI LOOKBOOK MOTION STUDIO MODAL (Veo Video Generation) */}
      <LookbookVideoStudio
        isOpen={isLookbookStudioOpen}
        onClose={() => setIsLookbookStudioOpen(false)}
      />
    </div>
  );
}
