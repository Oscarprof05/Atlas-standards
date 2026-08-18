import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2, ArrowDown } from 'lucide-react';

export const ApproachTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activePhase, setActivePhase] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const phases = [
    {
      num: '01',
      code: 'PHASE 01',
      title: 'CONCEPT & SPECIFICATION',
      stage: 'Formulation & Requirements',
      description:
        'You share your concept, sketches, target price, or sample references. We review your requirements and translate them into clear specifications for fabric weight, silhouette, and construction.',
      deliverables: ['Specification Review', 'Fabric & Yarn Formulation', 'Cost Guidance', 'Production Timeline'],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '02',
      code: 'PHASE 02',
      title: 'DEVELOPMENT & CALIBRATION',
      stage: 'Lab Dips & Patterning',
      description:
        'We develop fabric swatches, match colors using Pantone references, and engineer fit patterns. Everything is calibrated for drape, shrinkage, and durability before production begins.',
      deliverables: ['Pantone Color Matching', 'Fabric Swatches', 'Fit Pattern Grading', 'Shrinkage & Wash Calibration'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '03',
      code: 'PHASE 03',
      title: 'SAMPLING & APPROVAL',
      stage: 'Digital & Physical Review',
      description:
        'Digital review and approvals serve as the default workflow for speed and clarity. Physical pre-production samples are created on the actual manufacturing line and are available upon request.',
      deliverables: ['Digital Spec Approval', 'Print & Embroidery Proofs', 'Physical Sample (Chargeable / Optional)', 'Fitting & Wash Review'],
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '04',
      code: 'PHASE 04',
      title: 'PRODUCTION & QUALITY CHECKS',
      stage: 'Manufacturing & Inspection',
      description:
        'Manufacturing is managed across vetted partner facilities. We oversee inline cutting, stitching, and finishing with standardized quality inspections throughout the run.',
      deliverables: ['Dedicated Production Lead', 'Inline Quality Inspections', 'AQL 1.5 Quality Standards', 'Final Batch Verification'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '05',
      code: 'PHASE 05',
      title: 'DELIVERY & OPTIONAL PACKAGING',
      stage: 'Fulfillment & Handover',
      description:
        'Garments are neatly packed, labeled, and shipped directly to your location. Custom branded packaging and specialized presentation boxes are available upon specific client request.',
      deliverables: ['Direct Delivery & Shipping', 'Standard Protective Packing', 'Custom Packaging (Upon Request)', 'Final Handover Documentation'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  // Calculate scroll progress within this specific section to drive the glowing vertical line
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height - windowHeight;
      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      setScrollProgress(progress);

      const activeIdx = Math.min(Math.floor(progress * phases.length), phases.length - 1);
      setActivePhase(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phases.length]);

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center py-12 sm:py-16 border-b border-neutral-900">
          <motion.div
            initial={{ opacity: 0.8, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 15 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase block mb-3">
              SECTION 04 — THE APPROACH
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              ONE REQUIREMENT.
              <span className="block font-medium text-steel-gradient mt-1">
                A CLEAR, CONNECTED JOURNEY.
              </span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
              From the initial idea to finished delivery. We coordinate the entire process so you don’t have to chase multiple vendors.
            </p>
          </motion.div>
        </div>

        {/* Interactive Phase Indicator Tabs */}
        <div className="sticky top-20 z-30 py-4 bg-black/90 backdrop-blur-md border-b border-neutral-900 my-8 hidden md:block">
          <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
            {phases.map((p, idx) => {
              const isCompleted = idx < activePhase;
              const isCurrent = idx === activePhase;
              return (
                <div
                  key={p.num}
                  className={`flex items-center gap-2 text-[10px] font-syncopate tracking-[0.2em] uppercase transition-all duration-500 ${
                    isCurrent
                      ? 'text-white font-semibold'
                      : isCompleted
                      ? 'text-neutral-400'
                      : 'text-neutral-600'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition-all ${
                      isCurrent
                        ? 'border-white bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                        : isCompleted
                        ? 'border-neutral-700 bg-neutral-900 text-neutral-300'
                        : 'border-neutral-800 bg-transparent text-neutral-600'
                    }`}
                  >
                    {isCompleted ? '✓' : p.num}
                  </span>
                  <span>{p.code}</span>
                  {idx < phases.length - 1 && (
                    <span className="w-6 h-[1px] bg-neutral-800 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Vertical Connected Timeline */}
        <div className="mt-16 sm:mt-24 relative">
          {/* Glowing Vertical Guide Line (Tracks scroll within this section) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-neutral-900">
            <div
              className="w-full bg-gradient-to-b from-neutral-200 via-white to-neutral-400 shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300"
              style={{ height: `${Math.max(scrollProgress * 100, 4)}%` }}
            />
          </div>

          <div className="space-y-28 sm:space-y-36">
            {phases.map((p, idx) => {
              const isEven = idx % 2 === 0;
              const isCurrent = idx === activePhase;
              const isCompleted = idx < activePhase;

              return (
                <div
                  key={p.num}
                  className={`relative transition-opacity duration-700 ${
                    isCurrent ? 'opacity-100' : isCompleted ? 'opacity-80' : 'opacity-40'
                  }`}
                >
                  {/* Center Node Pin with Glow */}
                  <div className="hidden lg:flex absolute left-1/2 top-12 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-neutral-700 items-center justify-center z-20 transition-all duration-500">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        isCurrent
                          ? 'bg-white shadow-[0_0_16px_#FFFFFF] scale-125'
                          : isCompleted
                          ? 'bg-neutral-400'
                          : 'bg-neutral-800'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Content Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`lg:col-span-6 space-y-6 ${
                        isEven ? 'lg:pr-12 lg:text-left' : 'lg:order-2 lg:pl-12 lg:text-left'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-syncopate text-3xl sm:text-4xl text-neutral-500 font-light">
                          {p.num}
                        </span>
                        <span className="font-syncopate text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-neutral-400 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full">
                          {p.stage}
                        </span>
                      </div>

                      <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.05em] uppercase text-white">
                        {p.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {p.description}
                      </p>

                      {/* Deliverables tags */}
                      <div className="pt-4 border-t border-neutral-900">
                        <p className="font-syncopate text-[8px] tracking-[0.25em] text-neutral-500 uppercase mb-2">
                          WHAT WE DELIVER
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.deliverables.map((item) => (
                            <span
                              key={item}
                              className="text-[11px] font-light text-neutral-300 px-3 py-1 bg-neutral-950 border border-neutral-800/90 rounded-sm flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Image Column (100% Macro / Engineering / No Faces) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.8, delay: idx * 0.12 }}
                      className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-neutral-950 border border-neutral-900 group">
                        <img
                          src={p.image}
                          alt={p.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-103 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <div className="absolute bottom-4 left-4 font-syncopate text-[9px] tracking-[0.25em] text-neutral-400">
                          {p.code} // VERIFICATION
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
