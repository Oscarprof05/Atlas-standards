import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface RequirementsSectionProps {
  onStartProject: () => void;
}

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const segments = [
    {
      id: 'brands-startups',
      tag: '07 — WHAT WE DO / BRANDS & STARTUPS',
      title: 'FOR BRANDS & STARTUPS',
      subtitle: 'BUILD THE PRODUCT.\nPROTECT THE BRAND.',
      description:
        'For emerging and established brands, we help with sourcing, product development, sampling, manufacturing coordination and product finishing. Whether you’re developing a new product or looking for a more reliable production partner, Atlas helps bring structure to the process.',
      cta: 'BUILD WITH ATLAS',
      image: '/products/heavyweight-tees.jpg',
    },
    {
      id: 'institutions-organizations',
      tag: '06 — WHAT WE DO / INSTITUTIONAL & ORGANIZATION MERCHANDISE',
      title: 'INSTITUTIONAL & ORGANIZATION MERCHANDISE',
      subtitle: 'PRACTICAL PRODUCTS.\nWELL EXECUTED.',
      description:
        'We work with colleges, student organizations, events, corporate teams, clubs, NGOs and other institutions on merchandise across different quantities and budgets. From straightforward event merchandise to more customized products, we help identify the right balance between product, quantity, customization and cost.',
      cta: 'PLAN YOUR MERCHANDISE',
      image: '/products/institutional-merchandise.jpg',
    },
  ];

  return (
    <section
      id="requirements"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            SECTION 03 — CLIENT CATEGORIES
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            SERVING BOTH ELEVATED & PRACTICAL REQUIREMENTS.
          </h2>
        </motion.div>

        {/* Segments */}
        <div className="space-y-32">
          {segments.map((seg, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={seg.id} className="relative">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <span className="font-syncopate text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                      {seg.title}
                    </span>

                    <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.05em] uppercase text-white whitespace-pre-line leading-tight">
                      {seg.subtitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      {seg.description}
                    </p>

                    <div className="pt-4">
                      <button
                        onClick={onStartProject}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.2em] uppercase font-semibold hover:bg-neutral-200 transition-all"
                      >
                        <span>{seg.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Image Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-neutral-950 border border-neutral-900 group">
                      <img
                        src={seg.image}
                        alt={seg.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    </div>
                  </motion.div>
                </div>

                {idx < segments.length - 1 && (
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent mt-28 sm:mt-36" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
