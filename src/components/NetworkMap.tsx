import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Globe } from 'lucide-react';

interface NetworkHub {
  id: string;
  city: string;
  state: string;
  title: string;
  role: string;
  capabilities: string[];
}

export const NetworkMap: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const hubs: NetworkHub[] = [
    {
      id: 'tiruppur',
      city: 'Tiruppur',
      state: 'Tamil Nadu',
      title: 'Knits & Cotton Manufacturing Hub',
      role: 'Home to specialized knitting facilities and eco-friendly dye houses. We coordinate heavy single jerseys, loopback terry, and everyday cotton apparel here.',
      capabilities: [
        'Custom Yarn Knitting & Loopback Formulations',
        'Pantone Reactive Dyeing & Lab Dips',
        'Screen Printing & High-Density Graphic Work',
        'Structured Stitching & Finishing',
      ],
    },
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      title: 'Product Development & Technical Apparel',
      role: 'Our center for initial prototyping, CAD pattern development, and technical garment assembly. We engineer precise fit blocks and structured silhouettes here.',
      capabilities: [
        'Digital Pattern Drafting & Size Grading',
        'Technical Outerwear & Performance Blends',
        'Prototype Review & Pre-Production Sampling',
        'Precision Tailoring & Trim Assembly',
      ],
    },
    {
      id: 'chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      title: 'Wovens & Specialty Apparel Sourcing',
      role: 'Specialized in structured woven fabrics, canvas garments, and export-grade apparel finishes with direct logistics access.',
      capabilities: [
        'Structured Wovens, Twills & Heavy Canvas',
        'Specialty Washes & Fabric Treatments',
        'Custom Hardware & Metal Trim Attachment',
        'Export Logistics & Port Dispatch Coordination',
      ],
    },
  ];

  const [activeHubId, setActiveHubId] = useState<string>('tiruppur');
  const activeHub = hubs.find((h) => h.id === activeHubId) || hubs[0];

  // Normalized map coordinates for minimal luxury canvas visualization (SVG projection)
  const mapCoordinates: Record<string, { x: number; y: number }> = {
    tiruppur: { x: 42, y: 78 },
    bengaluru: { x: 46, y: 70 },
    chennai: { x: 54, y: 72 },
  };

  return (
    <section
      id="network"
      className="relative w-full bg-black/40 text-white py-28 sm:py-36 px-6 sm:px-12 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            SECTION 06 — SOURCING & MANUFACTURING HUBS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            THE RIGHT PRODUCT
            <span className="block font-light text-neutral-400">NEEDS THE RIGHT SPECIALIZATION.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
            Rather than trying to do everything in one generic workshop, we direct your project to dedicated manufacturing clusters in South India based on the exact fabric and construction required.
          </p>
        </div>

        {/* Interactive Hub Selector & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Clean Minimal Vector Map */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/4] bg-neutral-950 border border-neutral-900 rounded-sm p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-subtle-grid opacity-25" />

              {/* Minimal SVG India Geographic Constellation Nodes */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[420px] select-none"
              >
                {/* Stylized Southern Subcontinent boundary */}
                <path
                  d="M 28 35 L 45 42 L 58 40 L 72 48 L 68 60 L 56 75 L 46 90 L 36 80 L 28 62 L 24 45 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />

                {/* Connection lines between Tiruppur, Bengaluru, Chennai */}
                <path
                  d="M 42 78 L 46 70"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.75"
                />
                <path
                  d="M 46 70 L 54 72"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.75"
                />
                <path
                  d="M 42 78 L 54 72"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="1 2"
                />

                {/* Active Hub Radiating Pulse */}
                {mapCoordinates[activeHub.id] && (
                  <circle
                    cx={mapCoordinates[activeHub.id].x}
                    cy={mapCoordinates[activeHub.id].y}
                    r="5"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="0.5"
                    className="animate-ping origin-center"
                  />
                )}

                {/* Hub Pin Points */}
                {hubs.map((hub) => {
                  const coords = mapCoordinates[hub.id];
                  if (!coords) return null;
                  const isActive = hub.id === activeHubId;
                  return (
                    <g
                      key={hub.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveHubId(hub.id)}
                    >
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isActive ? 3.5 : 2.2}
                        fill={isActive ? '#FFFFFF' : '#666666'}
                        className="transition-all duration-300 hover:fill-white"
                      />
                      <text
                        x={coords.x + 4}
                        y={coords.y + 1}
                        fill={isActive ? '#FFFFFF' : '#888888'}
                        fontSize="3.4"
                        fontFamily="Cinzel"
                        letterSpacing="0.05em"
                        className="select-none font-medium"
                      >
                        {hub.city}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Footer Label */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[9px] font-syncopate text-neutral-500 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  Manufacturing Clusters
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-neutral-400" />
                  Open to Enquiries Globally
                </span>
              </div>
            </div>
          </div>

          {/* Right: Selected Hub Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              {hubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHubId(hub.id)}
                  className={`px-5 py-2 rounded-full font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    hub.id === activeHubId
                      ? 'bg-white text-black font-semibold'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {hub.city}
                </button>
              ))}
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-8 space-y-6">
              <div>
                <span className="font-syncopate text-[9px] tracking-[0.3em] uppercase text-neutral-500">
                  {activeHub.state}, India
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-medium tracking-[0.04em] text-white mt-1">
                  {activeHub.city} Hub
                </h3>
                <p className="font-cinzel text-sm text-neutral-300 font-light mt-1">
                  {activeHub.title}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {activeHub.role}
              </p>

              {/* Capabilities List */}
              <div className="pt-2 border-t border-neutral-900">
                <h4 className="font-syncopate text-[9px] tracking-[0.25em] text-neutral-500 uppercase mb-3">
                  PRIMARY FOCUS AREAS
                </h4>
                <div className="space-y-2.5">
                  {activeHub.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2.5 text-xs text-neutral-300 font-light">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onStartProject}
                  className="w-full py-3.5 rounded-full bg-neutral-900 border border-neutral-700 text-white font-cinzel text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  DISCUSS SOURCING VIA {activeHub.city.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
