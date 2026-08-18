import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectInquiry } from '../types';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: 'Heavyweight Fleece & Hoodies',
    estimatedQuantity: '50 – 300 units',
    targetDate: 'Within 60 Days',
    details: '',
  });

  const productOptions = [
    'Heavyweight Tees & Oversized Silhouettes',
    'Heavyweight Fleece & Hoodies (480+ GSM)',
    'Tailored Outerwear, Varsity & Leather',
    'Technical Performance & Athleisure',
    'Bespoke Knitwear & Sweaters',
    'Custom Brand Merch Collection',
    'Non-Standard / Specialty Fabrication',
  ];

  const quantityOptions = [
    '50 – 300 units (Initial Launch & Capsule)',
    '300 – 1,000 units (Core Collection)',
    '1,000 – 5,000 units (Enterprise)',
    '5,000+ units (Global Distribution)',
    'Institutional / Custom Allocation',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black/40 text-white py-32 sm:py-44 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-900/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading — Calm, Minimal, Exact Copy */}
        <div className="text-center mb-16 sm:mb-20 space-y-6">
          <span className="font-syncopate text-[9px] sm:text-[10px] tracking-[0.4em] text-neutral-500 uppercase block">
            GET IN TOUCH // DIRECT SOURCING DESK
          </span>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.06em] uppercase text-white leading-tight">
            START WITH WHATEVER
            <span className="block font-medium text-steel-gradient mt-1">
              YOU HAVE.
            </span>
          </h2>

          {/* Poetic minimal prompts */}
          <div className="pt-2 text-neutral-300 font-light text-sm sm:text-base tracking-wide space-y-1">
            <p>A thought.</p>
            <p>A reference.</p>
            <p>A product you saw.</p>
            <p>A sketch on your phone.</p>
          </div>

          <div className="pt-4 max-w-md mx-auto space-y-2">
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              It doesn't have to be perfect to get started.
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 font-medium tracking-wide">
              Tell us about it. We'll take it from there.
            </p>
          </div>
        </div>

        {/* Calm, Minimal Form Container */}
        <div className="bg-neutral-950/90 border border-neutral-850 rounded-sm p-8 sm:p-12 relative z-10 backdrop-blur-md">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-14 text-center space-y-6"
            >
              <CheckCircle2 className="w-14 h-14 text-white mx-auto stroke-[1.5]" />
              <h3 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-[0.05em] text-white">
                ENQUIRY RECEIVED
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. We have received your notes regarding <span className="text-white font-normal">{formData.productType}</span>. A technical lead will review your submission and connect with you directly.
              </p>
              <div className="pt-2 font-syncopate text-[9px] tracking-[0.25em] uppercase text-neutral-500">
                REFERENCE CODE: ATLAS-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2 rounded-full border border-neutral-800 text-[11px] font-cinzel tracking-widest text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors uppercase"
              >
                SEND ANOTHER NOTE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1: Name & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-700"
                  />
                </div>

                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    BRAND / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vance Studios or Creator Project"
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-700"
                  />
                </div>

                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    PHONE / WHATSAPP (OPTIONAL)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Row 3: Product Category & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    WHAT ARE YOU LOOKING TO BUILD?
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  >
                    {productOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    TARGET QUANTITY
                  </label>
                  <select
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  >
                    {quantityOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Details */}
              <div>
                <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                  TELL US ABOUT YOUR IDEA / REFERENCES
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Share anything you have: fabric thoughts, reference images, sample garments, fit aspirations, or questions..."
                  className="w-full px-4 py-3.5 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-700"
                />
              </div>

              {/* Submit Row with Exact CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-light">
                  <Shield className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Confidential review. No spam, no sales pressure.</span>
                </div>

                <button
                  type="submit"
                  id="submit-enquiry-btn"
                  className="group relative px-9 py-4 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.22em] uppercase font-bold overflow-hidden transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <span>SEND AN ENQUIRY</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
