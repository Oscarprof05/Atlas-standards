import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const problemPoints = [
    {
      code: 'DECISION_01',
      title: 'The Right Fabric',
      detail: 'Finding materials that deliver the right weight, drape, hand-feel, and longevity without endless trial and error.',
    },
    {
      code: 'DECISION_02',
      title: 'The Right Construction',
      detail: 'Establishing balanced proportions, durable stitching, and clean collar construction so the garment holds its shape.',
    },
    {
      code: 'DECISION_03',
      title: 'The Right Manufacturer',
      detail: 'Connecting with specialized facilities suited to your exact product category rather than generic workshops.',
    },
    {
      code: 'DECISION_04',
      title: 'The Right Finish',
      detail: 'Executing dyeing, washing, printing, embroidery, and trims with clean detail and dependable consistency.',
    },
    {
      code: 'DECISION_05',
      title: 'The Right Budget',
      detail: 'Balancing quality expectations, order quantities, and production costs with transparent commercial clarity.',
    },
    {
      code: 'DECISION_06',
      title: 'The Right Timeline',
      detail: 'Navigating development, reviews, production runs, and delivery schedules smoothly and predictably.',
    },
  ];

  const storyMedia = [
    {
      title: 'Material Evaluation & Swatches',
      stage: 'FABRIC SELECTION',
      src: '/products/prob-fabric-selection.jpg',
      caption: 'Assessing tactile texture, natural drape, and weave structure before entering production.',
      note: 'Evaluating weight, hand-feel & durability',
    },
    {
      title: 'Pattern & Proportion Review',
      stage: 'GARMENT CONSTRUCTION',
      src: '/products/prob-garment-construction.jpg',
      caption: 'Aligning silhouettes, shoulder drops, collar ribbing, and seam placements with clarity.',
      note: 'Ensuring balanced fit & structural permanence',
    },
    {
      title: 'Production & Dedicated Assembly',
      stage: 'FACILITY SELECTION',
      src: '/products/fabric-textiles.jpg',
      caption: 'Directing your project to experienced workshops equipped for your specific product type.',
      note: 'Matching requirements with specialized facilities',
    },
    {
      title: 'Sample Review & Quality Inspection',
      stage: 'FINISHING & CHECKS',
      src: '/products/performance-apparel.jpg',
      caption: 'Reviewing physical samples, print placements, embroidery clarity, and stitching details.',
      note: 'Inspecting color, prints & finishing details',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % storyMedia.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [storyMedia.length]);

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Exact Positioning Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
            <span className="font-syncopate text-[9px] tracking-[0.35em] text-neutral-400 uppercase">
              THE POSITIONING
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.06em] uppercase text-white leading-tight">
            GETTING A PRODUCT MADE
            <span className="block font-medium text-steel-gradient mt-1">
              SHOULDN’T FEEL LIKE A SECOND JOB.
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
            Finding the right product, supplier and production route can become complicated quickly. Atlas brings those moving parts together — helping you move from requirement to product with greater clarity and confidence.
          </p>
          <div className="mt-4 inline-block font-syncopate text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neutral-400 border-l-2 border-white pl-3 py-0.5">
            ONE REQUIREMENT. ONE PARTNER TO WORK THROUGH IT WITH.
          </div>
        </motion.div>

        {/* Core Interactive Comparison & Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: 6 Decisions */}
          <div className="lg:col-span-7 space-y-4">
            {problemPoints.map((p, idx) => {
              const isCurrent = activeMediaIndex === idx % storyMedia.length;
              return (
                <motion.div
                  key={p.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveMediaIndex(idx % storyMedia.length)}
                  className={`group relative p-5 rounded-sm border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-neutral-950/90 border-neutral-600 shadow-[0_0_25px_rgba(255,255,255,0.04)]'
                      : 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-700 hover:bg-neutral-950/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-500 font-mono">
                          [{p.code}]
                        </span>
                        <h3 className="font-cinzel text-sm sm:text-base font-medium tracking-[0.05em] uppercase text-white group-hover:text-neutral-200">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed pl-12">
                        {p.detail}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isCurrent
                            ? 'border-white bg-white text-black'
                            : 'border-neutral-800 text-neutral-600 group-hover:border-neutral-600'
                        }`}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Studio Imagery & Story Card */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-sm overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-2xl p-4 space-y-4"
            >
              {/* Image Stage */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black border border-neutral-900">
                <img
                  src={storyMedia[activeMediaIndex].src}
                  alt={storyMedia[activeMediaIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Stage Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-neutral-800 rounded-sm text-[9px] font-syncopate tracking-[0.2em] text-neutral-300">
                  <span>{storyMedia[activeMediaIndex].stage}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="font-syncopate text-[8px] tracking-[0.25em] text-neutral-500 uppercase block">
                    STAGE // 0{activeMediaIndex + 1}
                  </span>
                  <h4 className="font-cinzel text-sm sm:text-base text-white font-medium tracking-wide uppercase mt-0.5">
                    {storyMedia[activeMediaIndex].title}
                  </h4>
                </div>
              </div>

              {/* Story Overview */}
              <div className="p-3 bg-neutral-900/40 border border-neutral-900 rounded-sm space-y-2">
                <div className="flex items-center justify-between text-[9px] font-syncopate tracking-[0.2em] text-neutral-500">
                  <span>KEY FOCUS</span>
                  <span className="text-white font-sans">{storyMedia[activeMediaIndex].note}</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                  {storyMedia[activeMediaIndex].caption}
                </p>
              </div>

              {/* Visual pagination bar */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-900">
                <span className="text-[9px] font-syncopate tracking-[0.25em] text-neutral-500">
                  OVERVIEW [0{activeMediaIndex + 1} / 0{storyMedia.length}]
                </span>
                <div className="flex gap-1.5">
                  {storyMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMediaIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeMediaIndex ? 'w-6 bg-white' : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
