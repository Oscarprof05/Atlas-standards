import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

export const ApproachTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [activePhase, setActivePhase] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const steps = [
    {
      num: '01',
      code: 'STEP 01',
      title: 'UNDERSTAND',
      stage: 'Requirement & Scope',
      description:
        'We understand what you’re trying to build, your requirements, quantity and timeline.',
      image: '/products/prob-fabric-selection.jpg',
    },
    {
      num: '02',
      code: 'STEP 02',
      title: 'DEVELOP',
      stage: 'Materials & Approach',
      description:
        'Where needed, we help determine the product, materials, customization and production approach.',
      image: '/products/fabric-textiles.jpg',
    },
    {
      num: '03',
      code: 'STEP 03',
      title: 'SAMPLE',
      stage: 'Review & Refine',
      description:
        'For projects requiring development, the product is reviewed and refined before production.',
      image: '/products/product-development.jpg',
    },
    {
      num: '04',
      code: 'STEP 04',
      title: 'PRODUCE',
      stage: 'Manufacturing Partner',
      description:
        'The approved requirement moves into production through the appropriate manufacturing partner.',
      image: '/products/prob-garment-construction.jpg',
    },
    {
      num: '05',
      code: 'STEP 05',
      title: 'DELIVER',
      stage: 'Verification & Handover',
      description:
        'The finished product is checked against the agreed requirement and prepared for delivery.',
      image: '/products/institutional-merchandise.jpg',
    },
  ];

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

      const activeIdx = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActivePhase(activeIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: 10 HOW WE WORK */}
        <div className="text-center py-12 sm:py-16 border-b border-neutral-900">
          <motion.div
            initial={{ opacity: 0.8, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 15 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase block mb-3">
              10 — HOW WE WORK
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase text-white leading-tight">
              FROM REQUIREMENT
              <span className="block font-medium text-steel-gradient mt-1">
                TO DELIVERY.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Interactive Step Indicator Tabs */}
        <div className="sticky top-20 z-30 py-4 bg-black/90 backdrop-blur-md border-b border-neutral-900 my-8 hidden md:block">
          <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
            {steps.map((p, idx) => {
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
                  <span>{p.title}</span>
                  {idx < steps.length - 1 && (
                    <span className="w-6 h-[1px] bg-neutral-800 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Vertical Timeline */}
        <div className="mt-16 sm:mt-24 relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-neutral-900">
            <div
              className="w-full bg-gradient-to-b from-neutral-200 via-white to-neutral-400 shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300"
              style={{ height: `${Math.max(scrollProgress * 100, 4)}%` }}
            />
          </div>

          <div className="space-y-28 sm:space-y-36">
            {steps.map((p, idx) => {
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

                      <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                        {p.description}
                      </p>
                    </motion.div>

                    {/* Image Column */}
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
                          {p.code} // STAGE
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
