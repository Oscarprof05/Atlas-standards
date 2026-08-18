import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface RequirementsSectionProps {
  onStartProject: () => void;
}

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const tiers = [
    {
      id: 'brands',
      label: 'PRIMARY FOCUS // BRANDS, STARTUPS & FOUNDERS',
      title: 'BUILDING A BRAND?\nSTART WITH THE RIGHT PRODUCT.',
      description:
        'Your brand identity is defined by the feel of the fabric, the drape of the silhouette, and the durability of the construction. We guide emerging and scaling labels through yarn formulation, tech pack creation, and production with accessible starting quantities.',
      metrics: [
        { label: 'Initial Production Batches', value: 'From 50 Units*' },
        { label: 'Digital Fit & Tech Review', value: 'Included' },
        { label: 'Physical Sampling (On Request)', value: 'Chargeable' },
      ],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'institutions',
      label: 'ORGANIZATIONAL APPAREL // INSTITUTIONS & TEAMS',
      title: 'CONSISTENT MERCHANDISE\nFOR TEAMS & INSTITUTIONS.',
      description:
        'We support universities, corporate teams, student bodies, and community organizations with durable merchandise. We provide both premium and budget-conscious solutions tailored to your allocation, with centralized delivery coordination.',
      metrics: [
        { label: 'Batch Scalability', value: '50 to 10,000+ Units' },
        { label: 'Budget-Conscious Tiers', value: 'Available' },
        { label: 'Quality Verification', value: 'Standardized' },
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'custom-development',
      label: 'CUSTOM APPAREL // NON-STANDARD REQUIREMENTS',
      title: 'SPECIFIC FABRICATIONS.\nCUSTOM PATTERNS & EMBELLISHMENTS.',
      description:
        'Need a specific yarn blend, custom Pantone lab dip, heavy outerwear construction, or non-standard trim? Minimum quantities generally start from 50 pieces, but specialized custom developments, proprietary fabrications, or prototype-based manufacturing may require 150 pieces or more depending on factory processes.',
      metrics: [
        { label: 'Pantone Dye Matching', value: 'Lab Dip D65' },
        { label: 'Pattern Engineering', value: 'CAD Vector Blocks' },
        { label: 'Embellishment Options', value: 'Screen, Puff, Embroidery' },
      ],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
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
            SECTION 03 — WHO WE WORK WITH
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4">
            CALIBRATED FOR YOUR GOALS.
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
            Whether you are launching your first apparel release, developing proprietary silhouettes, or outfitting an entire organization, our sourcing process adapts to your requirements.
          </p>
        </motion.div>

        {/* Alternating Tiers */}
        <div className="space-y-32">
          {tiers.map((tier, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={tier.id} className="relative">
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
                      {tier.label}
                    </span>

                    <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.05em] uppercase text-white whitespace-pre-line leading-tight">
                      {tier.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                      {tier.description}
                    </p>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
                      {tier.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-cinzel text-sm sm:text-base text-white font-medium">
                            {m.value}
                          </p>
                          <p className="font-syncopate text-[8px] sm:text-[9px] tracking-[0.2em] text-neutral-500 uppercase mt-0.5">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={onStartProject}
                        className="group inline-flex items-center gap-2 font-cinzel text-xs tracking-[0.25em] uppercase text-white border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-400 transition-all"
                      >
                        <span>Initiate Project Inquiry</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                        src={tier.image}
                        alt={tier.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    </div>
                  </motion.div>
                </div>

                {/* Soft Gradient Divider between sections */}
                {idx < tiers.length - 1 && (
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
