import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export const PhilosophySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white py-32 sm:py-44 px-6 sm:px-12 border-t border-b border-neutral-900 overflow-hidden"
    >
      {/* Background subtle radial sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.03),transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-syncopate text-[9px] sm:text-[10px] tracking-[0.4em] text-neutral-500 uppercase block mb-4">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white leading-[1.15] max-w-3xl mx-auto">
            PAYING MORE IS CHEAPER THAN GETTING IT WRONG.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-sans text-sm sm:text-base md:text-lg text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Because when quality, consistency, and reliability matter, the cheapest quote often becomes the most expensive mistake. We build products meant to represent your brand—not compromise it.
        </motion.p>
      </div>
    </section>
  );
};
