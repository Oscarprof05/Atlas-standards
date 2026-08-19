import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    facilityName: '',
    location: '',
    coreSpecialty: '',
    contactEmail: '',
  });

  const criteria = [
    {
      title: 'CRAFTSMANSHIP & ATTENTION TO DETAIL',
      desc: 'Consistent stitching, clean finishing, and taking pride in building quality garments.',
    },
    {
      title: 'RELIABLE TIMELINES & SCHEDULES',
      desc: 'Realistic production commitments, clear milestone adherence, and dependable dispatch.',
    },
    {
      title: 'RESPONSIBLE WORKING CONDITIONS',
      desc: 'Safe working environments, fair compensation, and ethical manufacturing practices.',
    },
    {
      title: 'CLEAR & HONEST COMMUNICATION',
      desc: 'Direct updates on sample progress, material availability, and production status.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="partners"
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Heading & Criteria */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase">
                MANUFACTURING PARTNERS
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.08em] uppercase text-white mt-4 leading-tight">
                GOOD MANUFACTURERS
                <span className="block font-light text-neutral-400">SHOULD BE BUSIER.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                We work with dedicated factories and workshops that take pride in craftsmanship. We connect your specialized production capacity with clear, structured orders from brands, startups, and institutions.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {criteria.map((c, idx) => (
                <div key={c.title} className="border-l border-neutral-800 pl-6 space-y-1">
                  <h3 className="font-cinzel text-sm sm:text-base font-semibold text-white tracking-[0.05em]">
                    0{idx + 1} • {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Factory Application Form */}
          <div className="lg:col-span-6">
            <div className="bg-black border border-neutral-800 rounded-sm p-8 sm:p-10">
              <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                MANUFACTURING INQUIRY
              </span>
              <h3 className="font-cinzel text-2xl font-medium tracking-[0.04em] text-white mt-1 mb-6">
                Connect with Atlas Standards
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                  <h4 className="font-cinzel text-xl text-white">Details Received</h4>
                  <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We will review your production capabilities and connect with you directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Facility / Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.facilityName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, facilityName: e.target.value })}
                      placeholder="e.g. Sourcing / Manufacturing Unit"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.location}
                        onChange={(e) => setPartnerForm({ ...partnerForm, location: e.target.value })}
                        placeholder="e.g. Tiruppur / Bengaluru / Chennai"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Core Category
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.coreSpecialty}
                        onChange={(e) => setPartnerForm({ ...partnerForm, coreSpecialty: e.target.value })}
                        placeholder="e.g. Knits / Fleece / Wovens / Printing"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={partnerForm.contactEmail}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactEmail: e.target.value })}
                      placeholder="contact@facility.com"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT DETAILS</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
