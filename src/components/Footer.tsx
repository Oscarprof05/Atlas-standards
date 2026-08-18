import React from 'react';
import { AtlasLogo } from './AtlasLogo';
import { ArrowUp, Mail, MessageCircle, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-black text-white pt-28 pb-16 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden">
      {/* Background Radial Sheen */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Massive Centered Atlas Standards Brand Emblem */}
        <div className="py-12 sm:py-16 text-center w-full">
          <AtlasLogo size="hero" showTagline={true} withLightSweep={true} />
        </div>

        {/* Minimalist Grid Navigation & Contacts */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 pt-16 pb-20 border-t border-neutral-900/80 text-center sm:text-left">
          {/* Col 1: Sourcing Operating System */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              OPERATING SYSTEM
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Product Development, Fabric Formulation & Apparel Sourcing for Brands, Startups, and Organizations.
            </p>
            <div className="pt-2 text-[10px] text-neutral-500 font-syncopate tracking-[0.2em]">
              GLOBAL ENQUIRIES WELCOME
            </div>
          </div>

          {/* Col 2: Hub Locations */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              MANUFACTURING HUBS
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                <span>Tiruppur — Cotton & Heavy Knits</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                <span>Bengaluru — Development & CAD</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                <span>Chennai — Wovens & Specialty</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Desks */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs tracking-[0.25em] uppercase text-white font-medium">
              DIRECT DESK
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <a
                href="mailto:inquiries@atlasstandards.com"
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>inquiries@atlasstandards.com</span>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span>WhatsApp Sourcing Desk</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-neutral-500 pt-1 text-[11px]">
                <Globe className="w-3 h-3" />
                <span>Worldwide Delivery Support</span>
              </div>
            </div>
          </div>

          {/* Col 4: Scroll To Top & Legal */}
          <div className="flex flex-col items-center sm:items-end justify-between space-y-6">
            <button
              onClick={scrollToTop}
              className="group p-3 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-300 flex items-center gap-2"
              aria-label="Scroll to top"
            >
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase">TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
            <div className="text-[10px] text-neutral-600 font-syncopate tracking-[0.2em] text-center sm:text-right">
              © {new Date().getFullYear()} ATLAS STANDARDS.<br />PRODUCT DEVELOPMENT & SOURCING.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
