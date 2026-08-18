import React from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartProject: () => void;
  onExplore: () => void;
  onOpenLookbookStudio?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExplore,
  onOpenLookbookStudio,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 sm:px-12 md:px-20 overflow-hidden z-20"
    >
      {/* Top Subtle Identification Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md text-[10px] font-syncopate tracking-[0.35em] text-neutral-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          ATLAS STANDARDS • PRODUCT DEVELOPMENT & SOURCING
        </div>

        {onOpenLookbookStudio && (
          <button
            onClick={onOpenLookbookStudio}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-white/5 backdrop-blur-md text-[10px] font-syncopate tracking-[0.25em] text-neutral-400 hover:text-white hover:border-neutral-600 transition-all pointer-events-auto"
          >
            <Sparkles className="w-3 h-3 text-neutral-400" />
            <span>AI LOOKBOOK MOTION STUDIO</span>
          </button>
        )}
      </div>

      {/* Main Luxury Editorial Stage — Balanced & Expansive */}
      <div className="my-auto py-16 text-center max-w-5xl mx-auto space-y-8 pointer-events-none">
        {/* Massive Luxury Editorial Typography */}
        <div className="space-y-4">
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.06em] uppercase text-white leading-[1.04]">
            YOU HAVE THE IDEA.
            <span className="block font-medium text-steel-gradient mt-2 sm:mt-3">
              WE BUILD THE PRODUCT.
            </span>
          </h1>
        </div>

        {/* Focused Audience & Value Proposition */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl mx-auto tracking-wide leading-relaxed">
          Guiding brands, startups, and product creators from initial concept and fabric formulation to finished apparel and reliable manufacturing.
        </p>

        {/* Primary Interactive CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 pointer-events-auto">
          <button
            onClick={onStartProject}
            className="group relative px-9 py-4 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] flex items-center gap-3"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-full border border-neutral-700 bg-neutral-950/80 backdrop-blur-md text-white font-cinzel text-xs tracking-[0.2em] uppercase hover:bg-neutral-900 hover:border-neutral-500 transition-colors flex items-center gap-2"
          >
            <span>VIEW OUR APPROACH</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Subtle Navigation & Scroll Hint */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-900/80 text-[11px] font-light text-neutral-500">
        <div className="flex items-center gap-6">
          <span>For Brands & Startups</span>
          <span className="text-neutral-700">•</span>
          <span>Merchandise & Apparel</span>
          <span className="text-neutral-700">•</span>
          <span>Institutions & Organizations</span>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onExplore}
          className="flex items-center gap-2 text-[9px] font-syncopate tracking-[0.3em] text-neutral-400 hover:text-white uppercase transition-colors pointer-events-auto"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
