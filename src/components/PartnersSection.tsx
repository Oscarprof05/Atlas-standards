import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    contactPerson: '',
    location: '',
    whatDoYouManufacture: '',
    keyCapabilities: '',
    typicalMoqCapacity: '',
    portfolioUrl: '',
    contactDetails: '',
  });

  const criteria = [
    {
      title: 'CAPABILITY',
      desc: 'What products and processes do you handle well?',
    },
    {
      title: 'CONSISTENCY',
      desc: 'How reliably can you reproduce quality?',
    },
    {
      title: 'COMMUNICATION',
      desc: 'How clearly and professionally does your team work?',
    },
    {
      title: 'CAPACITY',
      desc: 'What scale can you comfortably support?',
    },
    {
      title: 'RELIABILITY',
      desc: 'How dependable are your timelines and commitments?',
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          _subject: `New Atlas Standards Partner Application: ${partnerForm.companyName || partnerForm.contactPerson}`,
          Company_or_Unit_Name: partnerForm.companyName || 'N/A',
          Contact_Person: partnerForm.contactPerson || 'N/A',
          Location: partnerForm.location || 'N/A',
          What_Do_You_Manufacture: partnerForm.whatDoYouManufacture || 'N/A',
          Key_Capabilities: partnerForm.keyCapabilities || 'N/A',
          Typical_MOQ_or_Capacity: partnerForm.typicalMoqCapacity || 'N/A',
          Website_Portfolio: partnerForm.portfolioUrl || 'N/A',
          Contact_Details: partnerForm.contactDetails || 'N/A',
        }),
      });
      setSubmitted(true);
    } catch {
      window.location.href = `mailto:hello@atlasstandards.com?subject=Partner Application - ${encodeURIComponent(partnerForm.companyName)}&body=${encodeURIComponent(`Company: ${partnerForm.companyName}\nContact: ${partnerForm.contactPerson}\nLocation: ${partnerForm.location}\nProducts: ${partnerForm.whatDoYouManufacture}\nCapabilities: ${partnerForm.keyCapabilities}\nMOQ/Capacity: ${partnerForm.typicalMoqCapacity}\nContact: ${partnerForm.contactDetails}`)}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="partners"
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Heading & Criteria (14 Manufacturer Partners) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase">
                14 — MANUFACTURING PARTNERS
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.08em] uppercase text-white mt-4 leading-tight">
                GOOD PRODUCTION
                <span className="block font-light text-neutral-400">DESERVES GOOD PARTNERS</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Atlas is continuously building relationships with capable manufacturers and production partners.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                We're interested in understanding what you make, how you work and where your capabilities fit.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <span className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-500 uppercase block">
                WHAT MATTERS TO US
              </span>
              {criteria.map((c) => (
                <div key={c.title} className="border-l border-neutral-800 pl-6 space-y-1">
                  <h3 className="font-cinzel text-sm sm:text-base font-semibold text-white tracking-[0.05em]">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-900">
              <p className="font-cinzel text-xs sm:text-sm text-white tracking-wide uppercase font-medium">
                IF YOUR CAPABILITY FITS THE KIND OF WORK WE HANDLE, LET'S TALK
              </p>
            </div>
          </div>

          {/* Right Column: Manufacturer Partner Form (15) */}
          <div className="lg:col-span-6">
            <div className="bg-black border border-neutral-800 rounded-sm p-8 sm:p-10">
              <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-400">
                15 — PARTNER APPLICATION
              </span>
              <h3 className="font-cinzel text-2xl font-medium tracking-[0.04em] text-white mt-1 mb-6">
                Become an Atlas Partner
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                  <h4 className="font-cinzel text-xl text-white">Details Received</h4>
                  <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                    Thank you for sharing your information. We will review your production capabilities and be in touch if there is an alignment with upcoming projects.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Company / Factory Name
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.companyName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                      placeholder="Company or unit name"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.contactPerson}
                        onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        required
                        value={partnerForm.location}
                        onChange={(e) => setPartnerForm({ ...partnerForm, location: e.target.value })}
                        placeholder="City, State"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      What do you manufacture?
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.whatDoYouManufacture}
                      onChange={(e) => setPartnerForm({ ...partnerForm, whatDoYouManufacture: e.target.value })}
                      placeholder="e.g. Knits, Hoodies, Wovens, Outerwear, Printing"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Key Capabilities
                    </label>
                    <input
                      type="text"
                      value={partnerForm.keyCapabilities}
                      onChange={(e) => setPartnerForm({ ...partnerForm, keyCapabilities: e.target.value })}
                      placeholder="e.g. Cut & sew, screen printing, embroidery, sampling"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Typical MOQ / Capacity
                      </label>
                      <input
                        type="text"
                        value={partnerForm.typicalMoqCapacity}
                        onChange={(e) => setPartnerForm({ ...partnerForm, typicalMoqCapacity: e.target.value })}
                        placeholder="e.g. 100 pcs MOQ"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Website / Portfolio / Instagram
                      </label>
                      <input
                        type="text"
                        value={partnerForm.portfolioUrl}
                        onChange={(e) => setPartnerForm({ ...partnerForm, portfolioUrl: e.target.value })}
                        placeholder="Link or handle"
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-syncopate text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Contact Details (Email / Phone)
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.contactDetails}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactDetails: e.target.value })}
                      placeholder="Email and phone number"
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'SUBMITTING REQUEST...' : 'SUBMIT PARTNERSHIP REQUEST'}</span>
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
