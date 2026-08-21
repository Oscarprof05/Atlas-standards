import React from 'react';
import { AtlasLogo } from './AtlasLogo';
import { ArrowUp, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(`#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full bg-black text-white pt-28 pb-16 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Massive Centered Atlas Standards Brand Emblem */}
        <div className="py-12 sm:py-16 text-center w-full">
          <AtlasLogo size="hero" showTagline={true} withLightSweep={true} />
        </div>

        {/* Minimalist Grid Navigation & Contacts (17) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 pt-16 pb-20 border-t border-neutral-900/80 text-center sm:text-left">
          {/* Col 1: About & Slogan */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              ATLAS STANDARDS
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Premium Merchandise · Product Development · Sourcing
            </p>
          </div>

          {/* Col 2: Contact */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              CONTACT
            </h4>
            <div className="space-y-2 text-xs text-neutral-400 font-light">
              <a
                href="tel:+917550080450"
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-neutral-500" />
                <span>+91 75500 80450</span>
              </a>
              <a
                href="mailto:hello@atlasstandards.com"
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3 text-neutral-500" />
                <span>hello@atlasstandards.com</span>
              </a>
            </div>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              CONNECT
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400 font-light">
              <a
                href="https://www.linkedin.com/company/atlas-standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 text-neutral-400 hover:text-white transition-colors group"
              >
                <Linkedin className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
                <span>LinkedIn</span>
                <span className="text-[10px] text-neutral-600 group-hover:text-neutral-300 transition-colors">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Explore */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              EXPLORE
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => scrollToSection('what-we-do')} className="hover:text-white transition-colors">
                  What We Do
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('requirements')} className="hover:text-white transition-colors">
                  For Brands
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('brand-desk')} className="hover:text-white transition-colors">
                  Brand Desk
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('connect')} className="hover:text-white transition-colors">
                  Manufacturing Partners
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-atlas')} className="hover:text-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('connect')} className="hover:text-white transition-colors">
                  Start a Project
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Scroll To Top & Legal */}
        <div className="w-full pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-syncopate tracking-[0.2em]">
          <div>
            © {new Date().getFullYear()} ATLAS STANDARDS. INFINITE STANDARDS. ENDLESS COMMITMENT
          </div>
          <button
            onClick={scrollToTop}
            className="group p-2.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all flex items-center gap-2"
          >
            <span className="font-cinzel text-[9px]">BACK TO TOP</span>
            <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
