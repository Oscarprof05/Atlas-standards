import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ProductItem, CustomizationTech } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const WhatWeDoSection: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const products: ProductItem[] = [
    {
      id: 't-shirts',
      category: 'Merchandise & Apparel',
      name: 'T-Shirts',
      gsm: 'Core & Custom Weights',
      composition: '100% Combed Cotton & Custom Blends',
      silhouette: 'Regular, Boxy, Dropped Shoulder & Custom Blocks',
      description: 'Everyday and heavyweight t-shirts tailored for brands, startups, and institutions. Clean collar construction, balanced fit, and long-lasting shape retention.',
      features: ['Combed Cotton Yarns', 'Reinforced Collar Binding', 'Preshrunk Quality Standards', 'Multiple Silhouette Options'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Even fabric surface optimized for durable print adhesion and comfortable daily wear.',
    },
    {
      id: 'hoodies',
      category: 'Merchandise & Apparel',
      name: 'Hoodies & Sweatshirts',
      gsm: 'Loopback & Fleece',
      composition: 'Cotton Loopback Terry & Brushed Fleece',
      silhouette: 'Structured Hood, Crossover Collar, Clean Ribbing',
      description: 'Substantial hoodies and crewnecks designed with clean drape and structured hoods. Built for brand collections, creator lines, and team apparel.',
      features: ['Breathable Loopback & Warm Fleece Options', 'Heavy Duty Ribbed Cuffs & Hem', 'Reinforced Pocket & Seam Stitching', 'Customizable Fit & Proportions'],
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Dense knit structure providing structural volume, warmth, and wash durability.',
    },
    {
      id: 'polos',
      category: 'Merchandise & Apparel',
      name: 'Polos & Collared Shirts',
      gsm: 'Pique & Interlock Knits',
      composition: 'Cotton Pique, Matty & Interlock Knits',
      silhouette: 'Structured Collar, Clean Placket, Tailored Fit',
      description: 'Refined collared apparel for institutional teams, corporate identity, and elevated lifestyle collections.',
      features: ['Anti-Curl Knitted Collars', 'Reinforced Button Plackets', 'Breathable Pique Texture', 'Durable Color Fastness'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Structured knit weave offering balanced breathability and formal presentation.',
    },
    {
      id: 'outerwear',
      category: 'Merchandise & Apparel',
      name: 'Jackets & Outerwear',
      gsm: 'Wovens, Canvas & Fleece Blends',
      composition: 'Twill, Canvas, Nylon & Blended Wovens',
      silhouette: 'Structured Clean Block with Custom Hardware',
      description: 'Jackets, overshirts, and windbreakers developed with dependable weather protection, clean lining, and quality hardware.',
      features: ['Durable Outer Fabrics', 'Clean Interior Lining', 'Quality Zippers & Metal Snaps', 'Custom Pocket Configurations'],
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Sturdy weave construction designed for outer layer protection and enduring wear.',
    },
    {
      id: 'custom-apparel',
      category: 'Product Development',
      name: 'Custom Apparel & Headwear',
      gsm: 'Project Dependent',
      composition: 'Custom Sourced Fabrics & Specialized Materials',
      silhouette: 'Bespoke Patterns Developed from Concept',
      description: 'Caps, tote bags, and specialty apparel developed to your exact requirements. We help turn references and sketches into manufactured reality.',
      features: ['Custom Pattern Drafting', 'Specialized Material Sourcing', 'Comprehensive Branding Application', 'End-to-End Development Guidance'],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
      macroDetail: 'Tailored material sourcing and construction adapted to your exact product specifications.',
    },
  ];

  const customizationTechniques: CustomizationTech[] = [
    {
      id: 'screen-printing',
      name: 'Screen Printing',
      type: 'Print Technique',
      durability: 'Long-Lasting Wash Fastness',
      minOrder: 'From ~50 Units*',
      description: 'Clean pigment and water-based prints for sharp graphic clarity, smooth hand-feel, and reliable color reproduction.',
      bestFor: 'T-shirts, hoodies, bold front/back artwork, multi-color branding.',
    },
    {
      id: 'high-density-puff',
      name: 'High-Density & Puff Prints',
      type: 'Dimensional Print',
      durability: 'Durable Wash Life',
      minOrder: 'From ~50 Units*',
      description: 'Raised dimensional ink that creates tactile 3D typography, subtle embossed lettering, and distinctive brand marks.',
      bestFor: 'Hoodies, chest typography, bold graphic accents.',
    },
    {
      id: 'embroidery',
      name: 'Embroidery & Appliqué',
      type: 'Stitched Branding',
      durability: 'Permanent Lifetime',
      minOrder: 'From ~50 Units*',
      description: 'Precision thread embroidery with clean stitch density for logos, crests, text, and patch placements.',
      bestFor: 'Polos, jackets, caps, subtle chest branding, heavy fleece.',
    },
    {
      id: 'custom-trims',
      name: 'Labels, Tags & Trims',
      type: 'Customization',
      durability: 'Permanent',
      minOrder: 'From ~50 Units*',
      description: 'Woven neck labels, printed wash care tags, hangtags, metal aglets, and custom branded detail attachments.',
      bestFor: 'Complete brand presentation and retail-ready finish.',
    },
    {
      id: 'washes-dyes',
      name: 'Specialty Washes & Dyes',
      type: 'Fabric Treatment',
      durability: 'Color Fast',
      minOrder: 'Feasibility Dependent',
      description: 'Pantone-matched dyeing, vintage washes, and fabric softening treatments suited to specific collection requirements.',
      bestFor: 'Custom colorways, vintage aesthetic, soft hand-feel garments.',
    },
    {
      id: 'packaging',
      name: 'Custom Packaging',
      type: 'Finishing',
      durability: 'Protective & Branded',
      minOrder: 'Upon Request',
      description: 'Individual protective packing, custom branded polybags, presentation boxes, and size stickers ready for distribution.',
      bestFor: 'E-commerce deliveries, institutional distribution, VIP kits.',
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

        {/* Large Clean Heading */}
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
            From core brand essentials to custom product developments. We manage fabric sourcing, pattern calibration, quality construction, and precise finishing.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Product Showcase */}
      <div className="w-full pl-6 sm:pl-12 overflow-x-auto no-scrollbar py-4" ref={scrollTrackRef}>
        <div className="flex items-stretch gap-8 w-max pr-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer w-[320px] sm:w-[400px] md:w-[440px] flex-shrink-0 bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden transition-all duration-500 hover:border-neutral-700"
            >
              {/* Product Image Stage */}
              <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-white text-black rounded-full font-semibold">
                    View Details
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between h-[210px]">
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
          {/* Left: Product Development Info */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              PRODUCT DEVELOPMENT
            </span>
            <h3 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.06em] uppercase text-white leading-tight">
              FROM CONCEPT TO REALITY.
              <span className="block font-medium text-neutral-400">STRUCTURED & RELIABLE.</span>
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              If your desired product requires a custom pattern, specific fabric blend, or unique silhouette, we guide the development process step by step. We translate concepts into clear technical specifications, sample reviews, and production runs.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartProject}
                className="px-7 py-3 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-semibold hover:bg-neutral-200 transition-colors"
              >
                DISCUSS PRODUCT DEVELOPMENT
              </button>
            </div>
          </div>

          {/* Right: Enquiry Prompt Card */}
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

        {/* Customization & Finishing Section */}
        <div className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              CUSTOMIZATION
            </span>
            <h3 className="font-cinzel text-3xl sm:text-4xl font-medium tracking-[0.08em] uppercase text-white mt-2">
              PRINTING, EMBROIDERY & FINISHING
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light">
              Quality branding and finishing options tailored to your design requirements and batch sizes.
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
                      {tech.minOrder}
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
                  <span className="text-neutral-400 font-normal">Common applications:</span> {tech.bestFor}
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOQ Policy Note */}
          <div className="mt-8 p-4 bg-neutral-950/60 border border-neutral-900 rounded-sm text-center max-w-2xl mx-auto">
            <p className="text-xs text-neutral-400 font-light">
              *Projects generally begin from around 50 units. Certain products, materials or manufacturing methods may require higher minimum quantities depending on production feasibility.
            </p>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-sm p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
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
                    {selectedProduct.category}
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
                    KEY DETAILS
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

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onStartProject();
                    }}
                    className="w-full py-3.5 bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    DISCUSS THIS CATEGORY
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
