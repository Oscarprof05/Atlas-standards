import React, { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';

interface NetworkHub {
  id: string;
  city: string;
  state: string;
  description: string;
}

export const NetworkMap: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const hubs: NetworkHub[] = [
    {
      id: 'tiruppur',
      city: 'Tiruppur',
      state: 'Tamil Nadu',
      description: 'A major apparel manufacturing ecosystem and an important part of our sourcing network.',
    },
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      description: 'Part of our wider manufacturing and sourcing network for selected products and requirements.',
    },
    {
      id: 'chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      description: 'An important location within our operational and sourcing network.',
    },
  ];

  const [activeHubId, setActiveHubId] = useState<string>('tiruppur');
  const activeHub = hubs.find((h) => h.id === activeHubId) || hubs[0];

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
        {/* Section Header: 08 MANUFACTURING NETWORK */}
        <div className="mb-16 sm:mb-20">
          <span className="font-syncopate text-[10px] sm:text-xs tracking-[0.35em] text-neutral-500 uppercase flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-600" />
            08 — MANUFACTURING NETWORK
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium tracking-[0.06em] uppercase text-white mt-4 leading-tight">
            THE NETWORK BEHIND THE PRODUCT.
            <span className="block font-light text-neutral-400">
              THE RIGHT REQUIREMENT NEEDS THE RIGHT PRODUCTION PARTNER.
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-3xl leading-relaxed">
            Atlas works through a network of manufacturing partners across key production locations in India.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light max-w-3xl leading-relaxed">
            We consider the requirements of each project — including product, quality expectations, quantity, customization, timeline and commercial considerations — when identifying the appropriate manufacturing route.
          </p>
        </div>

        {/* Interactive Hub Selector & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Minimal Vector Map */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/4] bg-neutral-950 border border-neutral-900 rounded-sm p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-subtle-grid opacity-25" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[420px] select-none"
              >
                <path
                  d="M 28 35 L 45 42 L 58 40 L 72 48 L 68 60 L 56 75 L 46 90 L 36 80 L 28 62 L 24 45 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.75"
                  strokeDasharray="2 2"
                />

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

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[9px] font-syncopate text-neutral-500 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  Sourcing & Production Network
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-neutral-400" />
                  Coordinated Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right: Selected Location Information */}
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
                  {activeHub.city}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {activeHub.description}
              </p>

              {/* Connected Network Graphic Box */}
              <div className="pt-4 border-t border-neutral-900 space-y-2">
                <h4 className="font-cinzel text-sm font-semibold text-white tracking-wide uppercase">
                  A CONNECTED MANUFACTURING NETWORK.
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Different requirements. Different capabilities. One coordinated approach.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onStartProject}
                  className="w-full py-3.5 rounded-full bg-neutral-900 border border-neutral-700 text-white font-cinzel text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
                >
                  DISCUSS SOURCING REQUIREMENTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
