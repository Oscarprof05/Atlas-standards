import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, MessageSquare, ShieldCheck, Layers, Users } from 'lucide-react';

export const WhyAtlas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  const principles = [
    {
      num: '01',
      title: 'CLEAR COMMUNICATION & GUIDANCE',
      subtitle: 'One single point of contact. Zero endless email chains.',
      description:
        'You never have to navigate multiple factories, dye mills, and print shops on your own. A dedicated technical lead coordinates every detail, providing regular progress updates, clear timelines, and transparent pricing.',
      points: ['Single dedicated point of contact', 'Clear milestone updates', 'Itemized cost transparency'],
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '02',
      title: 'STANDARDIZED QUALITY INSPECTION',
      subtitle: 'Consistent tolerances from the first sample to the final batch.',
      description:
        'We enforce disciplined inspection standards across every production run. Fabric density, color fastness, seam strength, and dimensional shrinkage are verified before garments are approved for dispatch.',
      points: ['Standardized inline inspection', 'Color fastness & wash tests', 'Dimensional shrinkage verification'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '03',
      title: 'PRODUCT DEVELOPMENT LAB',
      subtitle: 'Bridging ideas and manufacturing reality.',
      description:
        'Whether starting from a rough concept sketch or an exact CAD drawing, we help refine your tech pack, choose suitable fabric weights, select proper trims, and calibrate fit blocks before mass cutting.',
      points: ['Pattern grading & CAD tech packs', 'Pantone color calibration', 'Fabric weight & yarn consultation'],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      num: '04',
      title: 'FLEXIBLE SCALE & INSTITUTIONAL SUPPORT',
      subtitle: 'Solutions for emerging brands and large-scale organizations.',
      description:
        'We support emerging brands and creators with accessible initial runs, while also managing large-scale bulk orders for companies, universities, and institutions with budget-conscious options where needed.',
      points: ['Accessible minimum batch options', 'Scale support for large organizations', 'Budget-conscious institutional solutions'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <section
      id="why-atlas"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20 sm:mb-24"
        >
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            SECTION 07 — WHY ATLAS STANDARDS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            WE REMOVE COMPLEXITY.
            <span className="block font-light text-neutral-400">YOU GAIN PEACE OF MIND.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
            Finding reliable apparel manufacturing shouldn’t feel like guesswork. While we might not always be the cheapest option on paper, our clients choose us for reliability, honest guidance, and a smoother process from start to finish.
          </p>
        </motion.div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {principles.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition-all duration-500"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                <img
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-syncopate text-[10px] tracking-widest text-white/90 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
                  STANDARD {p.num}
                </div>
              </div>

              <div className="p-8 sm:p-10 space-y-4">
                <h3 className="font-cinzel text-xl sm:text-2xl tracking-[0.04em] text-white">
                  {p.title}
                </h3>
                <p className="font-cinzel text-xs sm:text-sm text-neutral-300 font-light italic">
                  {p.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {p.description}
                </p>

                <div className="pt-4 border-t border-neutral-900 space-y-2">
                  {p.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                      <Check className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
