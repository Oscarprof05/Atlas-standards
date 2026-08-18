import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ProductItem, CustomizationTech } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Layers, Sliders, Scissors, Cpu, Box } from 'lucide-react';

export const WhatWeDoSection: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const products: ProductItem[] = [
    {
      id: 'oversized-heavyweight-tee',
      category: 'T-Shirts',
      name: 'Architectural Heavyweight Tee',
      gsm: '300–340 GSM',
      composition: '100% Ring-Spun Combed Organic Cotton',
      silhouette: 'Structured boxy block, dropped shoulder, 1.25" rib collar',
      description: 'Engineered for structural permanence and high-density drape. Zero neck sag with twin-needle reinforced collar binding and reactive dye fixation.',
      features: ['Compact Siro-Spun 28/2 Yarn', 'Silicone Emulsion Softener', 'Twin-Needle Blind Stitch Hem', 'Pre-Shrunk Dimensional Tolerance < 1.5%'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      macroDetail: '32s/2 Double Jersey weave with ultra-smooth optical plane for microscopic print adhesion.',
    },
    {
      id: 'hoodie-french-terry',
      category: 'Hoodies',
      name: '500 GSM Dual-Loopback Architectural Hoodie',
      gsm: '500–540 GSM',
      composition: '100% Combed Cotton Heavyweight Loopback Terry',
      silhouette: 'Structural double-layer crossover hood, seamless kangaroo pocket, no drawstrings',
      description: 'Monolithic silhouette with brushed loopback interior and rigid crossover hood that stands upright without collapsing.',
      features: ['Double-Layer 520 GSM Crossover Hood', '500 GSM 2x2 Spandex Tension Ribbing', 'Industrial 4-Needle Flatlock Seam', 'Garment Pigment Stabilization'],
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Diagonal high-density loopback structure maximizing structural volume and thermal balance.',
    },
    {
      id: 'luxury-varsity-jacket',
      category: 'Outerwear',
      name: 'Heritage 650 GSM Melton Wool Overshirt',
      gsm: '650 GSM Felted Wool Blend',
      composition: '80% Recycled Melton Wool / 20% Technical Polyamide',
      silhouette: 'Architectural clean block with custom matte black gunmetal hardware',
      description: 'Heavyweight outerwear engineered with water-repellent dense felted weave, concealed storm placket, and brushed gunmetal snap closures.',
      features: ['24oz Dense Felted Melton Wool', 'Quilted Diamond Satin Interior', 'Custom Machined Matte Gunmetal Snaps', 'Reinforced Pocket Welts'],
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Tightly felted wool structure treated with lanolin water-resistant emulsion.',
    },
    {
      id: 'performance-half-zip',
      category: 'Technical',
      name: 'Bonded Seam Laser-Perforated Technical Shell',
      gsm: '280 GSM',
      composition: '78% Recycled Technical Poly / 22% Elastane Double-Knit',
      silhouette: 'Ergonomic raglan cut, ultrasonic bonded seam construction, matte zipper garage',
      description: 'Engineered for high-mobility industrial applications. Features 4-way mechanical stretch, laser-perforated aeration, and matte antimicrobial finish.',
      features: ['YKK Waterproof Matte Aquaguard Zipper', 'Ultrasonic Thermo-Welded Seams', 'Laser-Cut Underarm Aeration', 'Moisture-Wicking Capillary Finish'],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Hydrophilic micro-capillary channel structure transferring moisture within milliseconds.',
    },
    {
      id: 'quarter-zip-sweater',
      category: 'Knitwear',
      name: '12-Gauge Basolan Extra-Fine Merino Knit',
      gsm: '12-Gauge Full-Fashioned',
      composition: '100% Extra-Fine Australian Merino Wool (19.5 Micron)',
      silhouette: 'Precision tailored silhouette with full-fashioned linked shoulder',
      description: 'Refined industrial executive knitwear. Naturally thermoregulating with shrink-resistant Basolan treatment and polished steel hardware.',
      features: ['Full-Fashioned Linking Technique', 'Swiss Polished Metal Zipper Mechanism', 'Zero Synthetic Additives', 'Shrink-Resistant Basolan Treatment'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Two-ply high-twist worsted yarn yielding maximum anti-pill structural integrity.',
    },
  ];

  const customizationTechniques: CustomizationTech[] = [
    {
      id: 'screen-print',
      name: 'High-Mesh Screen & Discharge Printing',
      type: 'Printing',
      durability: '50+ Industrial Washes',
      minOrder: 'From 50 Units',
      description: 'Discharge inks bleach the cotton fiber dye and replace it with pigment, leaving zero ink feel (zero hand-feel) and breathable prints.',
      bestFor: 'Dark garments, oversized front/back graphics, vintage washed textures.',
    },
    {
      id: 'high-density-puff',
      name: '3D High-Density & Micro-Puff',
      type: 'Dimensional',
      durability: '35+ Washes',
      minOrder: 'From 50 Units (150+ for custom molds)',
      description: 'Heat-activated expandable plastisol creating razor-sharp raised geometric typography and tactile brand emblems.',
      bestFor: 'Heavyweight hoodies, chest branding, architectural typography.',
    },
    {
      id: 'chenille-embroidery',
      name: 'Chenille & Direct-to-Garment Embroidery',
      type: 'Embroidery',
      durability: 'Lifetime Garment',
      minOrder: 'From 50 Units',
      description: 'Plush looped yarn embroidery paired with micro-density satin lockstitching for archival varsity aesthetic.',
      bestFor: 'Jackets, collegiate crests, heavyweight fleece outerwear.',
    },
    {
      id: 'laser-cut-bonded',
      name: 'Ultrasonic Bonding & Laser Welds',
      type: 'Technical',
      durability: 'High-Performance',
      minOrder: 'From 150 Units (Specialized setup)',
      description: 'Seamless thermo-fused seam construction and laser-perforated ventilation zones with zero needle puncture holes.',
      bestFor: 'Performance wear, technical jackets, activewear collections.',
    },
    {
      id: 'custom-hardware',
      name: 'Custom Matte Hardware & Silicone Tags',
      type: 'Hardware',
      durability: 'Permanent',
      minOrder: 'From 150–300 Units (Tooling dependent)',
      description: 'Custom molded zinc alloy aglets, debossed snap buttons, matte silicone high-frequency badges, and custom jacquard wash care labels.',
      bestFor: 'Complete end-to-end proprietary brand identity.',
    },
  ];

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="what-we-do"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-between"
        >
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            SECTION 02 — WHAT WE DO
          </span>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Large Cinematic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 sm:mb-20"
        >
          <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-medium tracking-[0.08em] uppercase text-white">
            MERCHANDISE & APPAREL
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
            Crafted like luxury horology. Every garment is engineered from the yarn level up with proprietary patterns, custom dyes, and precision finishing.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Apple-Style Product Showcase */}
      <div className="w-full pl-6 sm:pl-12 overflow-x-auto no-scrollbar py-4" ref={scrollTrackRef}>
        <div className="flex items-stretch gap-8 w-max pr-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer w-[320px] sm:w-[420px] md:w-[480px] flex-shrink-0 bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden transition-all duration-700 hover:border-neutral-700"
            >
              {/* Product Image Stage */}
              <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* GSM Pill Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-syncopate text-[9px] tracking-[0.2em] uppercase px-3 py-1 bg-black/80 backdrop-blur-md border border-neutral-800 text-neutral-300 rounded-full">
                    {product.gsm}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-white text-black rounded-full font-semibold">
                    Inspect Specs
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between h-[230px]">
                <div>
                  <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                    {product.category}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl tracking-[0.04em] text-white mt-1 group-hover:text-neutral-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-light truncate max-w-[280px]">
                    {product.composition}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Development Split Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-32 sm:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Large Typography */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              CUSTOM PRODUCT DEVELOPMENT
            </span>
            <h3 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.06em] uppercase text-white leading-tight">
              PROPRIETARY PATTERNS.
              <span className="block font-medium text-neutral-400">EXACT METRICS. ZERO COMPROMISE.</span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              If your desired silhouette doesn't exist in standard catalogs, we develop it from scratch. In-house tech packs, master grading for all sizes, custom Pantone dye lots, and proprietary knit weight formulations.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartProject}
                className="px-7 py-3 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-semibold hover:bg-neutral-200 transition-colors"
              >
                DEVELOP A CUSTOM SILHOUETTE
              </button>
            </div>
          </div>

          {/* Right: Interactive Enquiry Prompt Card (Replaces Image) */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-full min-h-[380px] rounded-sm bg-neutral-950/90 border border-neutral-800/90 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-xl group hover:border-neutral-700 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <button
                  onClick={onStartProject}
                  className="group/btn inline-flex items-center gap-2.5 font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-white font-semibold border-b border-white pb-1.5 hover:text-neutral-300 hover:border-neutral-400 transition-all"
                >
                  <span>HAVE SOMETHING IN MIND? SEND AN ENQUIRY</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </button>

                <h4 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.06em] uppercase text-white leading-tight">
                  START WITH WHATEVER YOU HAVE.
                </h4>

                <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  A thought. A reference. A product you saw. A sketch on your phone.
                  <br />
                  <span className="text-neutral-400">It doesn’t have to be perfect to get started.</span>
                </p>
              </div>

              <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <p className="font-cinzel text-xs sm:text-sm text-neutral-400 font-light tracking-[0.05em]">
                  Tell us about it. We’ll take it from there.
                </p>

                <button
                  onClick={onStartProject}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-cinzel text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral-200 transition-colors shrink-0"
                >
                  Initiate Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customization & Floating Manufacturing Techniques */}
        <div className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              MANUFACTURING MASTERY
            </span>
            <h3 className="font-cinzel text-3xl sm:text-4xl font-medium tracking-[0.08em] uppercase text-white mt-2">
              SURFACE FINISHES & EMBELLISHMENT
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light">
              Industrial precision applied to every graphic placement, embroidery stitch, and tactile finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customizationTechniques.map((tech, idx) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="p-8 bg-neutral-950/80 border border-neutral-900 rounded-sm hover:border-neutral-700 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-syncopate text-[9px] tracking-[0.25em] uppercase text-neutral-500">
                      {tech.type}
                    </span>
                    <span className="text-[10px] text-neutral-400 border border-neutral-800 px-2.5 py-0.5 rounded-full">
                      MOQ: {tech.minOrder}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-xl tracking-[0.04em] text-white group-hover:text-neutral-200 transition-colors">
                    {tech.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-400 font-light mt-3 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-900 text-[11px] text-neutral-500 font-light">
                  <span className="text-neutral-400 font-normal">Optimal for:</span> {tech.bestFor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-sm p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white font-syncopate text-xs tracking-widest uppercase p-2"
            >
              CLOSE ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4">
              <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                    {selectedProduct.category} • {selectedProduct.gsm}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-[0.04em] text-white mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light mt-3 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-900">
                  <h4 className="font-syncopate text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                    ENGINEERING SPECIFICATIONS
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feat) => (
                      <li key={feat} className="text-xs text-neutral-300 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-sm">
                  <p className="font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                    MATERIAL INTEGRITY
                  </p>
                  <p className="text-xs text-neutral-300 font-light">
                    {selectedProduct.macroDetail}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onStartProject();
                    }}
                    className="w-full py-3.5 bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    INQUIRE ABOUT THIS SPECIFICATION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
