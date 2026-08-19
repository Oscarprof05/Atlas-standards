import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectInquiry } from '../types';
import { ArrowRight, CheckCircle2, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: 'Heavyweight & Oversized T-Shirts',
    estimatedQuantity: 'Around 50 units',
    targetDate: 'Flexible',
    details: '',
  });

  const productOptions = [
    'Heavyweight & Oversized T-Shirts',
    'Hoodies & Sweatshirts',
    'Knitwear & Sweaters',
    'Varsity Jackets & Outerwear',
    'Performance & Active Apparel',
    'Institutional & Event Merchandise',
    'Custom Product Development / Reference',
  ];

  const quantityOptions = [
    'Around 50 units',
    '50 – 150 units',
    '150 – 500 units',
    '500 – 1,000+ units',
    'Institutional Scale (1,000 – 10,000+ units)',
    'Exploring Feasibility',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/hello@atlasstandards.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Atlas Standards Project Inquiry: ${formData.name} (${formData.productType})`,
          Name: formData.name,
          Brand_or_Organization: formData.company || 'N/A',
          Email: formData.email,
          Phone_or_WhatsApp: formData.phone || 'N/A',
          Product_Category: formData.productType,
          Target_Quantity: formData.estimatedQuantity,
          Details: formData.details || 'N/A',
        }),
      });
      setSubmitted(true);
    } catch {
      window.location.href = `mailto:hello@atlasstandards.com?subject=Project Inquiry - ${encodeURIComponent(formData.productType)}&body=${encodeURIComponent(`Name: ${formData.name}\nBrand: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nQuantity: ${formData.estimatedQuantity}\n\nDetails:\n${formData.details}`)}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black/40 text-white py-32 sm:py-44 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading: GET IN TOUCH // DIRECT SOURCING DESK */}
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

          <div className="pt-2 text-neutral-300 font-light text-sm sm:text-base tracking-wide space-y-1">
            <p>A thought.</p>
            <p>A reference.</p>
            <p>A product you saw.</p>
            <p>A sketch on your phone.</p>
          </div>

          <div className="pt-4 max-w-md mx-auto space-y-1.5">
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              It doesn't have to be perfect to get started.
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
              Tell us about it. We'll take it from there.
            </p>
          </div>
        </div>

        {/* Direct Contact Channels Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <a
            href="mailto:hello@atlasstandards.com"
            className="p-4 bg-neutral-950 border border-neutral-900 rounded-sm space-y-1 hover:border-neutral-700 transition-colors group block"
          >
            <span className="font-syncopate text-[8.5px] tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-1.5 group-hover:text-white transition-colors">
              <Mail className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
              EMAIL US
            </span>
            <span className="text-xs text-white group-hover:text-neutral-200 block truncate">
              hello@atlasstandards.com
            </span>
          </a>

          <a
            href="https://wa.me/917550080450"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-neutral-950 border border-neutral-900 rounded-sm space-y-1 hover:border-neutral-700 transition-colors group block"
          >
            <span className="font-syncopate text-[8.5px] tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-1.5 group-hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
              CALL / WHATSAPP
            </span>
            <span className="text-xs text-white group-hover:text-neutral-200 block">
              +91 75500 80450
            </span>
          </a>

          <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-sm space-y-1">
            <span className="font-syncopate text-[8.5px] tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-1.5">
              <Instagram className="w-3 h-3 text-neutral-400" />
              INSTAGRAM
            </span>
            <span className="text-xs text-neutral-400 block">
              @atlasstandards
            </span>
          </div>

          <a
            href="https://www.linkedin.com/company/atlas-standards/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-neutral-950 border border-neutral-900 rounded-sm space-y-1 hover:border-neutral-700 transition-colors group block"
          >
            <span className="font-syncopate text-[8.5px] tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-1.5 group-hover:text-white transition-colors">
              <Linkedin className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
              LINKEDIN
            </span>
            <span className="text-xs text-white group-hover:text-neutral-200 block truncate">
              Atlas Standards ↗
            </span>
          </a>
        </div>

        {/* Form */}
        <div className="bg-neutral-950/90 border border-neutral-850 rounded-sm p-8 sm:p-12 relative z-10 backdrop-blur-md">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-14 text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-white mx-auto stroke-[1.5]" />
              <h3 className="font-cinzel text-2xl font-medium text-white">
                REQUIREMENT RECEIVED
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. We have received your notes regarding <span className="text-white font-normal">{formData.productType}</span>. We will review the details and get back to you with the next steps.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full border border-neutral-800 text-[11px] font-cinzel tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
              >
                Send Another Requirement
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
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
                    placeholder="Brand or Organization"
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                    PRODUCT CATEGORY
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
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
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  >
                    {quantityOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-neutral-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-syncopate text-[8.5px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                  TELL US ABOUT WHAT YOU'RE LOOKING TO BUILD
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe your requirement, references, timeline, designs or questions..."
                  className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-9 py-4 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.22em] uppercase font-bold hover:bg-neutral-200 transition-all flex items-center gap-3 w-full sm:w-auto justify-center disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'SENDING INQUIRY...' : 'START A PROJECT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
