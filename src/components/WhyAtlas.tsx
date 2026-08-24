import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const WhyAtlas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const points = [
    {
      num: '01',
      title: 'ONE POINT OF CONTACT',
      description: 'Work through Atlas instead of coordinating multiple disconnected suppliers yourself.',
    },
    {
      num: '02',
      title: 'SOURCING AROUND THE REQUIREMENT',
      description: 'We look at the product first and identify the appropriate manufacturing route.',
    },
    {
      num: '03',
      title: 'PRODUCT UNDERSTANDING',
      description: 'We can work from specifications, references, samples, designs or early-stage ideas.',
    },
    {
      num: '04',
      title: 'CLEAR COMMUNICATION',
      description: 'Requirements, approvals, changes and next steps should remain clear throughout the process.',
    },
    {
      num: '05',
      title: 'QUALITY CONSIDERATION',
      description: 'Products are reviewed against the agreed requirements before completion and delivery.',
    },
    {
      num: '06',
      title: 'FLEXIBLE APPROACH',
      description: 'Different clients have different products, quantities, budgets and expectations. The approach is built around the project.',
    },
  ];

  return (
    <section
      id="why-atlas"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: 09 WHY ATLAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            09 — WHY ATLAS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            LESS COMPLEXITY
            <span className="block font-light text-neutral-400">MORE CONFIDENCE</span>
          </h2>
        </motion.div>

        {/* Practical Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((p) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="bg-neutral-950 border border-neutral-900 rounded-sm p-8 flex flex-col justify-between group hover:border-neutral-700 transition-all duration-300"
            >
              <div className="space-y-4">
                <span className="font-syncopate text-xs text-neutral-500 font-mono">
                  [{p.num}]
                </span>
                <h3 className="font-cinzel text-base sm:text-lg font-semibold tracking-wide text-white">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 13 — ABOUT ATLAS SHORT STATEMENT */}
        <div className="mt-28 p-8 sm:p-12 bg-neutral-950/80 border border-neutral-900 rounded-sm">
          <div className="max-w-3xl space-y-4">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              13 — ABOUT ATLAS
            </span>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-medium uppercase text-white">
              BUILT TO MAKE SOURCING SIMPLER
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              <strong className="text-white font-medium">ATLAS STANDARDS</strong> is a merchandise, product development and sourcing partner working with brands, startups, institutions and organizations.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We connect requirements with manufacturing capabilities, help develop products where needed, coordinate the production process and stay involved through delivery.
            </p>
            <div className="pt-2 border-t border-neutral-900">
              <p className="font-cinzel text-xs sm:text-sm text-white tracking-wide uppercase font-medium">
                Our goal is straightforward: To make the process of getting the right product made clearer, more reliable and easier to manage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
