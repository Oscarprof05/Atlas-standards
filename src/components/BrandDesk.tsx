import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sliders, Layers, Sparkles, Scale, DollarSign, Clock } from 'lucide-react';

export const BrandDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('GSM');

  const topics = [
    {
      id: 'GSM',
      name: 'GSM & Weight',
      short: 'Fabric Density',
      icon: Scale,
      tagline: 'Understanding Grams per Square Meter',
      summary:
        'GSM dictates the structural stiffness, opacity, drape, and seasonal weight of your apparel. Higher GSM is not always better — it must match the intended silhouette.',
      specs: [
        { label: '180–220 GSM', desc: 'Standard everyday weight with soft fluid drape, suitable for lightweight layering.' },
        { label: '260–300 GSM', desc: 'Mid-heavyweight standard. Provides clean structured drape with zero transparency.' },
        { label: '320–380 GSM', desc: 'Heavy single jersey. Clean boxy drape that holds silhouette shape away from the body.' },
        { label: '450–520 GSM', desc: 'Heavyweight French Terry loopback. Structured hoodies and substantial sweatpants.' },
      ],
      proTip: 'For boxy tees, 280–320 GSM combed cotton prevents collar warping and holds clean shoulder lines.',
    },
    {
      id: 'Fabric',
      name: 'Yarn & Combing',
      short: 'Textile Composition',
      icon: Layers,
      tagline: 'Yarn Count, Combing & Fiber Staple',
      summary:
        'The difference between a garment that pills quickly and one that holds up for years lies in fiber staple length and spinning technique.',
      specs: [
        { label: 'Carded Cotton', desc: 'Short fibers, fuzzy surface, prone to pilling and shrinkage. We avoid using low-grade carded yarns.' },
        { label: 'Combed Ring-Spun', desc: 'Fibers are combed to remove short fibers and impurities, resulting in a smoother, stronger yarn.' },
        { label: 'Siro-Spun / Compact', desc: 'Two strands spun together under tension to minimize surface hairiness and create a clean print surface.' },
        { label: 'Loopback vs. Fleece', desc: 'Loopback terry provides breathable interior comfort; brushed fleece adds warmer interior softness.' },
      ],
      proTip: 'Combed 24s/1 and 30s/1 yarns offer an optimal balance of softness and dimensional stability.',
    },
    {
      id: 'Fit',
      name: 'Fit & Patterning',
      short: 'Silhouette Engineering',
      icon: Sliders,
      tagline: 'Drop Shoulder, Boxy, and Regular Blocks',
      summary:
        'Pattern engineering is about proportion: shoulder drop, sleeve pitch, chest width, and collar height calibrated to the body.',
      specs: [
        { label: 'Boxy / Dropped Shoulder', desc: 'Wider chest width and dropped shoulder line paired with balanced body length.' },
        { label: 'Contemporary Regular Block', desc: 'Standard shoulder placement with clean sleeve pitch and balanced drape.' },
        { label: 'High-Density Collar Ribbing', desc: 'Rib collar with elastane recovery that prevents sagging after multiple washes.' },
        { label: 'Seam Reinforcements', desc: 'Shoulder-to-shoulder neck taping and twin-needle hems for structural durability.' },
      ],
      proTip: 'Reviewing digital 2D pattern tech sheets first ensures proportions are accurate before any fabric is cut.',
    },
    {
      id: 'Sampling',
      name: 'Sampling Protocols',
      short: 'Review & Approvals',
      icon: Sparkles,
      tagline: 'Digital-First Approvals & Physical Sampling',
      summary:
        'Digital approvals are our default workflow for speed, clarity, and cost efficiency. Physical pre-production samples are created on request and are chargeable.',
      specs: [
        { label: 'Digital Review (Default)', desc: 'Detailed CAD tech sheets, vector print placement proofs, and color specifications reviewed digitally first.' },
        { label: 'Pantone Lab Dips', desc: 'Spectral dye formulations evaluated under standard lighting conditions for precise color matching.' },
        { label: 'Physical Sample (Chargeable)', desc: 'Pre-production physical sample produced on the actual mass line, available upon client request.' },
        { label: 'Bulk Production Handover', desc: 'Production proceeds only after client sign-off on digital specifications or physical sample.' },
      ],
      proTip: 'Digital reviews save 10–14 days in initial lead time; physical samples are recommended when testing entirely new proprietary silhouettes.',
    },
    {
      id: 'Costing',
      name: 'Cost Factors',
      short: 'Unit Economics',
      icon: DollarSign,
      tagline: 'Understanding Apparel Production Costs',
      summary:
        'Apparel manufacturing costs depend on yarn weight (GSM), fabric consumption, dye complexity, embellishment passes, and order quantity.',
      specs: [
        { label: 'Fabric & Dyeing', desc: 'Fabric raw material and dyeing typically account for the largest share of unit cost.' },
        { label: 'Cutting & Stitching', desc: 'Sewing labor, seam reinforcement, specialized machines (e.g. flatlock vs standard overlock).' },
        { label: 'Embellishments & Prints', desc: 'Number of print colors, screen setups, embroidery stitch counts, or specialty inks.' },
        { label: 'Trims & Packaging', desc: 'Neck labels, wash care tags, hangtags, and optional custom packaging.' },
      ],
      proTip: 'Standardizing fabric colorways across multiple garment styles helps reach better batch economics.',
    },
    {
      id: 'MOQ',
      name: 'Batch Quantities',
      short: 'Minimums & Scaling',
      icon: Clock,
      tagline: 'Accessible Starting Minimums',
      summary:
        'Minimum order quantity generally starts from 50 pieces, but certain products, premium constructions, specialized garments, custom developments or prototype-based manufacturing may require higher minimum quantities, typically 150 pieces or more, depending on the manufacturing process.',
      specs: [
        { label: 'Standard Catalog Apparel', desc: 'Starting from 50 pieces per style across standard size distributions.' },
        { label: 'Custom Fabrications & Dye Lots', desc: 'Typically 150+ pieces depending on minimal batch dyeing vat volumes and knitting setup.' },
        { label: 'Specialized Construction / Outerwear', desc: '150 to 300 pieces depending on complex patterning and custom trim tooling.' },
        { label: 'Institutional & Enterprise Batches', desc: 'From 500 to 10,000+ units with volume efficiencies.' },
      ],
      proTip: 'MOQ is project-dependent: starting from 50 units gives flexibility to launch, while complex bespoke fabrications scale naturally around 150+ pieces.',
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
            BRAND DESK • SOURCING INTELLIGENCE
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            KNOW WHAT YOU'RE BUILDING
            <span className="block font-light text-neutral-400">BEFORE SPENDING CAPITAL.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Practical knowledge directly from fabric mills, pattern makers, and apparel technicians. Select a parameter below to understand the variables.
          </p>
        </div>

        {/* Floating Parameter Buttons */}
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
                GUIDE 0{topics.findIndex((t) => t.id === currentTopic.id) + 1}
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

            {/* Pro Tip Box */}
            <div className="p-5 bg-neutral-900/40 border border-neutral-800 rounded-sm flex items-start gap-4">
              <div className="p-2 bg-neutral-800 rounded-full text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-syncopate text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
                  SOURCING NOTE
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
