import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface WhatWeDoSectionProps {
  onStartProject: () => void;
}

interface CollectionItem {
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
}

export const WhatWeDoSection: React.FC<WhatWeDoSectionProps> = ({ onStartProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);

  const collectionItems: CollectionItem[] = [
    {
      id: 't-shirts',
      category: 'Merchandise & Apparel',
      name: 'T-Shirts & Oversized Tees',
      description: 'From everyday essentials to heavy, structured silhouettes with clean collar construction.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'hoodies',
      category: 'Merchandise & Apparel',
      name: 'Hoodies & Sweatshirts',
      description: 'Loopback and fleece apparel developed for clean drape, structured hoods, and lasting comfort.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'polos',
      category: 'Merchandise & Apparel',
      name: 'Polos & Collared Shirts',
      description: 'Knitted and structured collared apparel suited for teams, institutions, and lifestyle collections.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'sweaters',
      category: 'Merchandise & Apparel',
      name: 'Sweaters & Knitwear',
      description: 'Elevated knitted apparel developed across fine and heavy gauges based on project specifications.',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'jerseys',
      category: 'Merchandise & Apparel',
      name: 'Jerseys & Performance Wear',
      description: 'Engineered for sports, active communities, and events with breathable, durable fabrics.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'jackets',
      category: 'Merchandise & Apparel',
      name: 'Jackets & Varsity Jackets',
      description: 'Structured outerwear, overshirts, and classic varsity silhouettes with tailored hardware and trims.',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'leather-jackets',
      category: 'Merchandise & Apparel',
      name: 'Leather Jackets & Specialty Outerwear',
      description: 'Premium outer layers developed through specialized production partners where feasible.',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const customizationOptions = [
    {
      name: 'Printing',
      detail: 'Screen printing, high-density prints, puff inks, and water-based techniques based on fabric and artwork requirements.',
    },
    {
      name: 'Embroidery',
      detail: 'Direct embroidery, 3D raised stitching, and patch placements with clean thread density.',
    },
    {
      name: 'Appliqué',
      detail: 'Fabric patch applications and layered badge detailing suited for heavier garments.',
    },
    {
      name: 'Labels & Tags',
      detail: 'Custom woven neck labels, printed wash care tags, hangtags, and branded hardware.',
    },
    {
      name: 'Packaging',
      detail: 'Protective individual polybags, presentation boxes, and custom branded packaging upon request.',
    },
    {
      name: 'Other Custom Finishing',
      detail: 'Specialty washes, garment dyeing, and customized trims calibrated to your project.',
    },
  ];

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="what-we-do"
      ref={containerRef}
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header: 03 MERCHANDISE & APPAREL */}
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
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Heading: MERCHANDISE & APPAREL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <span className="font-syncopate text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
            MERCHANDISE & APPAREL
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-2">
            PRODUCTS BUILT AROUND THE REQUIREMENT.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light max-w-3xl leading-relaxed">
            We source and develop apparel and merchandise for brands, startups, institutions, events, teams and organizations.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            From everyday essentials to more elevated pieces, our range can include:
            <span className="block text-white font-medium mt-1">
              T-Shirts · Oversized T-Shirts · Polos · Hoodies · Sweatshirts · Sweaters · Jerseys · Jackets · Varsity Jackets · Leather Jackets · Performance Wear
            </span>
            <span className="text-neutral-500 text-xs mt-1 block">
              And other products based on the project requirement.
            </span>
          </p>
        </motion.div>
      </div>

      {/* 11 — PRODUCT COLLECTION CAROUSEL */}
      <div className="w-full pl-6 sm:pl-12 overflow-x-auto no-scrollbar py-4" ref={scrollTrackRef}>
        <div className="flex items-stretch gap-8 w-max pr-12">
          {collectionItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.15 + idx * 0.08 }}
              onClick={() => setSelectedProduct(item)}
              className="group cursor-pointer w-[300px] sm:w-[380px] md:w-[420px] flex-shrink-0 bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden transition-all duration-500 hover:border-neutral-700"
            >
              <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-white text-black rounded-full font-semibold">
                    Enquire
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between h-[170px]">
                <div>
                  <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-lg sm:text-xl tracking-[0.04em] text-white mt-1 group-hover:text-neutral-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-light">
                    Customizable to requirement
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-4">
        <p className="text-xs text-neutral-500 font-light italic">
          Every project can be developed differently depending on the requirement.
        </p>
      </div>

      {/* 04 — PRODUCT DEVELOPMENT & REVERSE ENGINEERING */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-32 sm:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Product Development Info */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              PRODUCT DEVELOPMENT
            </span>
            <h3 className="font-cinzel text-3xl sm:text-5xl font-light tracking-[0.06em] uppercase text-white leading-tight">
              HAVE A PRODUCT IN MIND?
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              You don’t always start with a specification. Sometimes you start with a product you already own, a photograph, a sketch or simply an idea.
            </p>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Atlas can study the reference, understand what needs to be reproduced or adapted, and explore the most practical route for developing it.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-semibold hover:bg-neutral-200 transition-colors"
              >
                <span>SEND A REFERENCE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: From Reference to a Product */}
          <div className="lg:col-span-6">
            <div className="relative w-full rounded-sm bg-neutral-950/90 border border-neutral-800/90 p-8 sm:p-12 flex flex-col justify-between backdrop-blur-xl group hover:border-neutral-700 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <div className="space-y-6">
                <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                  DEVELOPMENT ROUTE
                </span>

                <h4 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-[0.06em] uppercase text-white leading-tight">
                  FROM REFERENCE
                  <span className="block font-light text-neutral-400">TO A PRODUCT THAT CAN BE MADE.</span>
                </h4>

                <p className="font-sans text-sm text-neutral-300 font-light leading-relaxed">
                  Where exact replication isn’t possible, we can explore the closest practical alternative based on materials, construction, finishing and manufacturing feasibility.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-light">
                  Feasibility & practical alternatives
                </span>
                <button
                  onClick={onStartProject}
                  className="font-cinzel text-xs tracking-[0.2em] uppercase text-white hover:text-neutral-300 underline underline-offset-4"
                >
                  Discuss Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 05 — CUSTOMIZATION & FINISHING */}
        <div className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-syncopate text-[10px] tracking-[0.35em] text-neutral-500 uppercase">
              CUSTOMIZATION & FINISHING
            </span>
            <h3 className="font-cinzel text-3xl sm:text-4xl font-medium tracking-[0.06em] uppercase text-white mt-2">
              THE DETAILS MAKE THE PRODUCT YOURS.
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
              From branding and artwork to the finishing details around the garment, we coordinate the customization required for the project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customizationOptions.map((opt) => (
              <div
                key={opt.name}
                className="p-8 bg-neutral-950/80 border border-neutral-900 rounded-sm hover:border-neutral-700 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-cinzel text-lg tracking-[0.04em] text-white">
                    {opt.name}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-3 leading-relaxed">
                    {opt.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-2">
            <p className="text-xs text-neutral-400 font-light">
              The appropriate method depends on the product, design, quantity and desired result.
            </p>
            <p className="font-cinzel text-xs tracking-[0.2em] text-white uppercase font-medium">
              BUILT AROUND THE PRODUCT. FINISHED AROUND THE BRAND.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for item inquiry */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-sm p-6 sm:p-10">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white font-syncopate text-xs tracking-widest uppercase p-2"
            >
              CLOSE ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mt-4">
              <div className="aspect-[4/3] bg-neutral-900 rounded-sm overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-medium tracking-[0.04em] text-white mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onStartProject();
                    }}
                    className="w-full py-3 bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center hover:bg-neutral-200 transition-colors"
                  >
                    ENQUIRE ABOUT THIS PRODUCT
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
