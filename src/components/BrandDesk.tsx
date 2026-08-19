import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Scale, Layers, Sliders, Sparkles, DollarSign, Clock } from 'lucide-react';

export const BrandDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('GSM');

  const topics = [
    {
      id: 'GSM',
      name: 'GSM & Weight',
      short: 'Fabric Weight',
      icon: Scale,
      tagline: 'Understanding Fabric Weight & Thickness',
      summary:
        'GSM (Grams per Square Meter) measures the weight and density of the fabric. Choosing the right GSM depends on the desired drape, structure, climate, and intended use of the garment.',
      specs: [
        { label: 'Light-to-Mid Weight', desc: 'Comfortable everyday fabrics suitable for regular wear and standard drape.' },
        { label: 'Mid-to-Heavy Weight', desc: 'Substantial fabric with balanced structure, zero transparency, and clean drape.' },
        { label: 'Heavyweight', desc: 'Dense fabric holding a defined shape away from the body for structured silhouettes.' },
        { label: 'Fleece & Loopback', desc: 'Heavyweight knits with looped or brushed interiors for hoodies and sweatshirts.' },
      ],
      proTip: 'Heavier is not always better — the right weight depends on the silhouette and purpose you are creating.',
    },
    {
      id: 'Fabric',
      name: 'Yarn & Combing',
      short: 'Fabric Quality',
      icon: Layers,
      tagline: 'Fiber Quality & Feel',
      summary:
        'The touch, durability, and wash performance of a garment begin with the yarn. Combed cotton removes shorter fibers and impurities, resulting in a cleaner, softer, and more durable surface.',
      specs: [
        { label: 'Carded Cotton', desc: 'Standard fiber quality with more surface hairiness, commonly used in basic garments.' },
        { label: 'Combed Cotton', desc: 'Combed to remove short fibers, creating a smoother hand-feel and better longevity.' },
        { label: 'Cotton Blends', desc: 'Blended with polyester or elastane for specific stretch, durability, or performance needs.' },
        { label: 'Interior Finishes', desc: 'Loopback terry for breathable interior texture or brushed fleece for softer warmth.' },
      ],
      proTip: 'Using quality combed cotton improves print clarity and helps garments hold up across multiple washes.',
    },
    {
      id: 'Fit',
      name: 'Fit & Patterning',
      short: 'Silhouette & Proportions',
      icon: Sliders,
      tagline: 'Proportions & Silhouette Calibration',
      summary:
        'Garment fit is determined by proportions: chest width, shoulder drop, sleeve length, body length, and collar fit. We help align your patterns with your intended look.',
      specs: [
        { label: 'Regular Fit', desc: 'Balanced proportions following standard body measurements.' },
        { label: 'Boxy & Relaxed', desc: 'Wider body proportions with dropped shoulders and balanced length.' },
        { label: 'Collar Construction', desc: 'Ribbed collar width and tension designed to prevent sagging.' },
        { label: 'Reinforced Seams', desc: 'Neck taping and durable stitch finishes for structural longevity.' },
      ],
      proTip: 'Starting with a clear reference garment or tech sheet helps ensure sizing and fit are accurate.',
    },
    {
      id: 'Sampling',
      name: 'Sampling Protocols',
      short: 'Review & Approvals',
      icon: Sparkles,
      tagline: 'Digital Approvals & Physical Samples',
      summary:
        'Digital reviews and approvals serve as our default workflow for speed, clarity, and cost efficiency. Physical pre-production samples are created on the actual manufacturing line and are available upon request.',
      specs: [
        { label: 'Digital Review (Default)', desc: 'Detailed specification sheets, artwork placements, and color references approved digitally.' },
        { label: 'Color Matching', desc: 'Pantone-referenced color matching to align with your brand standards.' },
        { label: 'Physical Samples (Chargeable)', desc: 'Pre-production physical samples created on the factory line upon client request.' },
        { label: 'Production Sign-off', desc: 'Bulk production commences only after full sign-off on specifications.' },
      ],
      proTip: 'Digital reviews keep development moving quickly; physical samples give hands-on validation for new styles.',
    },
    {
      id: 'Costing',
      name: 'Cost Factors',
      short: 'Production Costs',
      icon: DollarSign,
      tagline: 'Understanding Production Economics',
      summary:
        'Apparel manufacturing costs depend on fabric type and weight, pattern complexity, printing and embroidery requirements, trim choices, and batch quantity.',
      specs: [
        { label: 'Fabric & Dyeing', desc: 'Fabric weight, composition, and custom dyeing account for the core of the unit cost.' },
        { label: 'Cut & Sew Labor', desc: 'Sewing complexity, specialized seams, and garment construction requirements.' },
        { label: 'Branding & Prints', desc: 'Number of print colors, embroidery size, stitch counts, and finish techniques.' },
        { label: 'Trims & Packaging', desc: 'Custom neck labels, wash tags, hangtags, and presentation packaging.' },
      ],
      proTip: 'Consolidating fabrics or colors across multiple styles can optimize overall batch production costs.',
    },
    {
      id: 'MOQ',
      name: 'Batch Quantities',
      short: 'Minimum Orders',
      icon: Clock,
      tagline: 'Production Batch Quantities',
      summary:
        'Projects generally begin from around 50 units. Certain products, materials or manufacturing methods may require higher minimum quantities depending on production feasibility.',
      specs: [
        { label: 'Standard Apparel Orders', desc: 'Core styles generally start from around 50 units across standard size assortments.' },
        { label: 'Custom Fabrications', desc: 'Specialized fabric blends or custom dye runs may require higher minimums.' },
        { label: 'Specialized Construction', desc: 'Complex jackets or specialized outerwear may need higher batch thresholds.' },
        { label: 'Institutional Volumes', desc: 'Scalable production capacity for organizations, events, and large teams.' },
      ],
      proTip: 'We always evaluate your specific requirement to determine the most practical starting quantity.',
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTab) || topics[0];

  return (
    <section
      id="brand-desk"
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase">
            BRAND DESK • SOURCING GUIDANCE
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            KNOW WHAT YOU'RE BUILDING
            <span className="block font-light text-neutral-400">BEFORE YOU BEGIN.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Practical guidance on apparel variables, fabrics, fit, and production economics to help you make informed decisions.
          </p>
        </div>

        {/* Parameter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
          {topics.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-black/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                }`}
              >
                <t.icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTopic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto bg-black border border-neutral-800 rounded-sm p-8 sm:p-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-900 pb-6 mb-8">
              <div>
                <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                  {currentTopic.short}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-[0.04em] text-white mt-1">
                  {currentTopic.tagline}
                </h3>
              </div>
              <span className="font-syncopate text-[10px] tracking-[0.2em] text-neutral-500">
                TOPIC 0{topics.findIndex((t) => t.id === currentTopic.id) + 1}
              </span>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-10 max-w-3xl">
              {currentTopic.summary}
            </p>

            {/* Spec Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {currentTopic.specs.map((item, idx) => (
                <div key={idx} className="p-5 bg-neutral-950 border border-neutral-900 rounded-sm">
                  <h4 className="font-cinzel text-sm sm:text-base font-semibold text-white tracking-[0.05em] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                    {item.label}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Note Box */}
            <div className="p-5 bg-neutral-900/40 border border-neutral-800 rounded-sm flex items-start gap-4">
              <div className="p-2 bg-neutral-800 rounded-full text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-syncopate text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
                  PRACTICAL NOTE
                </p>
                <p className="text-xs sm:text-sm text-neutral-200 font-light mt-1">
                  {currentTopic.proTip}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
