import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Scale, Layers, Sliders, Sparkles, DollarSign, Clock } from 'lucide-react';

export const BrandDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Fabrics');

  const topics = [
    {
      id: 'Fabrics',
      name: 'Fabric & Weight',
      short: 'Fabric Selection',
      icon: Scale,
      tagline: 'Understanding Fabric Weight & Drape',
      summary:
        'Selecting the right fabric involves balancing density, hand-feel, breathability, and structural drape suited to your garment silhouette.',
      considerations: [
        'Lightweight vs Heavyweight drape considerations',
        'Natural cottons and blended compositions',
        'Knitted versus woven fabric behaviors',
        'Wash durability and long-term retention',
      ],
    },
    {
      id: 'Construction',
      name: 'Construction & Fit',
      short: 'Garment Proportions',
      icon: Sliders,
      tagline: 'Silhouette & Seam Construction',
      summary:
        'Garment fit is determined by proportions: chest width, shoulder drops, sleeve pitch, and reinforced collar ribbing.',
      considerations: [
        'Regular, relaxed, and boxy silhouette blocks',
        'Collar rib width and recovery tension',
        'Shoulder-to-shoulder taping and seam strength',
        'Sizing grading across production batches',
      ],
    },
    {
      id: 'Sampling',
      name: 'Sampling & Approvals',
      short: 'Review Workflow',
      icon: Sparkles,
      tagline: 'Digital Approvals & Physical Review',
      summary:
        'Digital specification sheets and artwork approvals keep projects moving efficiently, with physical pre-production samples available where required.',
      considerations: [
        'Digital artwork placement and color proofs',
        'Pantone-referenced color matching',
        'Physical sample review on request',
        'Clear sign-off prior to bulk production',
      ],
    },
    {
      id: 'Customization',
      name: 'Customization',
      short: 'Branding Techniques',
      icon: Layers,
      tagline: 'Printing, Embroidery & Trims',
      summary:
        'Choosing the right branding method depends on garment fabric, graphic complexity, desired hand-feel, and run quantity.',
      considerations: [
        'Screen printing and dimensional puff techniques',
        'Direct embroidery and patch applications',
        'Custom woven labels and neck tags',
        'Individual presentation and protective packing',
      ],
    },
    {
      id: 'Costing',
      name: 'Costing & Economics',
      short: 'Production Economics',
      icon: DollarSign,
      tagline: 'Understanding Production Variables',
      summary:
        'Apparel manufacturing costs reflect fabric choice, cut-and-sew complexity, print or embroidery passes, trims, and overall batch scale.',
      considerations: [
        'Fabric yield and raw material consumption',
        'Number of print colors and setup screens',
        'Custom trim and branding tooling',
        'Batch quantity economies',
      ],
    },
    {
      id: 'MOQ',
      name: 'Batch Quantities',
      short: 'Production Quantities',
      icon: Clock,
      tagline: 'Practical Production Minimums',
      summary:
        'Production routes are identified based on feasibility. Batch sizes generally begin around 50 units, with certain specialized products or materials requiring higher minimums.',
      considerations: [
        'Standard apparel batch feasibility',
        'Custom fabric development requirements',
        'Specialized outerwear production thresholds',
        'Scaling for institutional and team allocations',
      ],
    },
  ];

  const currentTopic = topics.find((t) => t.id === activeTab) || topics[0];

  const handleLearnClick = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brand-desk"
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: 12 BRAND DESK */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase">
            12 — THE ATLAS BRAND DESK
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            KNOW WHAT YOU’RE BUILDING
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Starting a product or merchandise line involves decisions around fabric, construction, sampling, customization, costing and manufacturing.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            The Atlas Brand Desk is built to help founders understand those decisions before committing to production.
          </p>

          <div className="pt-6">
            <button
              onClick={handleLearnClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-700 bg-neutral-950 text-white font-cinzel text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
            >
              <span>LEARN WITH ATLAS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Floating Parameter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto mb-12">
          {topics.map((t) => {
            const isActive = t.id === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2 rounded-full font-cinzel text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2 ${
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
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto bg-neutral-950 border border-neutral-800 rounded-sm p-8 sm:p-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-900 pb-4 mb-6">
              <div>
                <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                  {currentTopic.short}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-medium tracking-[0.04em] text-white mt-1">
                  {currentTopic.tagline}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
              {currentTopic.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentTopic.considerations.map((c, i) => (
                <div key={i} className="p-3 bg-neutral-900/50 border border-neutral-800/80 rounded-sm text-xs text-neutral-300 font-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
