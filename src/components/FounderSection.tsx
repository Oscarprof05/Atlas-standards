import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section
      id="founder"
      ref={containerRef}
      className="relative w-full bg-black text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      {/* Background Subtle Radial Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(255,255,255,0.03),transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            ATLAS STANDARDS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            MEET THE FOUNDER
          </h2>
        </motion.div>

        {/* Two-Column Responsive Layout (50 / 50) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Column: Founder Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none aspect-[4/5] rounded-sm overflow-hidden bg-neutral-950 border border-neutral-850 group shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src="/founder.jpg"
                alt="Nithish S — Founder, Atlas Standards"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-102"
              />
              {/* Subtle Luxury Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 font-syncopate text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
                FOUNDER // NITHISH S
              </div>
            </div>
          </motion.div>

          {/* Right Column: Biography Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Name and Role */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-medium tracking-[0.06em] uppercase text-white leading-tight">
                NITHISH S
              </h3>
              <p className="font-syncopate text-[10px] sm:text-xs tracking-[0.25em] text-neutral-400 uppercase">
                Founder, Atlas Standards · Co-Founder, Drip Syndicate
              </p>
            </div>

            {/* Biography Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed font-sans">
              <p>
                I build businesses around <strong className="text-white font-medium">products, sourcing, and manufacturing</strong>.
              </p>

              <p>
                My journey began with Drip Syndicate, giving me hands-on experience across the apparel value chain.
              </p>

              <p>
                Today, I'm building Atlas Standards across <strong className="text-white font-medium">product development, B2B merchandise, and manufacturing</strong>.
              </p>

              <p>
                I'm focused on understanding products from <strong className="text-white font-medium">concept to production and market</strong>.
              </p>

              <p>
                The long-term vision is to connect <strong className="text-white font-medium">Indian manufacturing with global demand</strong>.
              </p>

              <p>
                Starting with apparel, with the ambition to expand across <strong className="text-white font-medium">multiple products, markets, and international trade</strong>.
              </p>
            </div>

            {/* LinkedIn CTA Button */}
            <div className="pt-4">
              <a
                href="https://www.linkedin.com/company/atlas-standards/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-neutral-700 bg-neutral-950 text-white font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
              >
                <span>CONNECT ON LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
