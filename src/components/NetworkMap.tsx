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
      id: 'chennai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      description: 'An important location within our operational and sourcing network.',
    },
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      state: 'Karnataka',
      description: 'Part of our wider manufacturing and sourcing network for selected products and requirements.',
    },
    {
      id: 'tiruppur',
      city: 'Tiruppur',
      state: 'Tamil Nadu',
      description: 'A major apparel manufacturing ecosystem and an important part of our sourcing network.',
    },
    {
      id: 'nagpur',
      city: 'Nagpur',
      state: 'Maharashtra',
      description: 'A central manufacturing and logistics corridor supporting scalable production and distribution across India.',
    },
  ];

  const [activeHubId, setActiveHubId] = useState<string>('chennai');
  const activeHub = hubs.find((h) => h.id === activeHubId) || hubs[0];

  const mapCoordinates: Record<string, { x: number; y: number }> = {
    chennai: { x: 54, y: 72 },
    bengaluru: { x: 46, y: 70 },
    tiruppur: { x: 42, y: 78 },
    nagpur: { x: 51, y: 35 },
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
            THE NETWORK BEHIND THE PRODUCT
            <span className="block font-light text-neutral-400">
              THE RIGHT REQUIREMENT NEEDS THE RIGHT PRODUCTION PARTNER
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-3xl leading-relaxed">
            Atlas works through a network of manufacturing partners across key production locations in India.
          </p>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light max-w-3xl leading-relaxed">
            We consider the requirements of each project — including product, quality expectations, quantity, customization, timeline and commercial considerations — when identifying the appropriate manufacturing route.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 font-syncopate text-[10px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
            CHENNAI · BENGALURU · TIRUPPUR · NAGPUR
          </div>
        </div>

        {/* Interactive Hub Selector & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Minimal Architectural Vector Map */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-square bg-neutral-950/90 border border-neutral-800 rounded-sm p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Subtle background coordinate grid */}
              <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />
              
              {/* Latitude / Longitude luxury markings */}
              <div className="absolute top-4 left-4 font-mono text-[8px] text-neutral-600 tracking-widest uppercase">
                LAT 11°–21°N // LON 77°–80°E
              </div>
              <div className="absolute top-4 right-4 font-mono text-[8px] text-neutral-600 tracking-widest uppercase">
                INDIAN PRODUCTION CORRIDOR
              </div>

              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-h-[380px] select-none"
              >
                <defs>
                  {/* Glow filter */}
                  <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#888888" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Technical Grid lines */}
                <line x1="60" y1="100" x2="340" y2="100" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="60" y1="200" x2="340" y2="200" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="60" y1="300" x2="340" y2="300" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="120" y1="50" x2="120" y2="350" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="200" y1="50" x2="200" y2="350" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="280" y1="50" x2="280" y2="350" stroke="#222" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* South & Central India Landmass Contour */}
                <path
                  d="M 90 70 
                     C 115 120, 110 170, 115 220 
                     C 120 260, 140 310, 195 365 
                     C 210 350, 245 285, 275 230 
                     C 295 190, 310 145, 305 70"
                  fill="rgba(255,255,255,0.015)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />

                {/* Inner Regional Topography contours */}
                <path
                  d="M 130 110 
                     C 140 170, 135 220, 150 265 
                     C 165 300, 185 330, 195 345 
                     C 215 310, 245 260, 265 210 
                     C 280 170, 285 130, 280 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.7"
                />

                {/* Animated Route Lines between Sourcing Nodes */}
                {/* 1. Bengaluru (175, 130) to Chennai (285, 150) */}
                <path
                  d="M 175 130 Q 230 135 285 150"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle r="2.5" fill="#ffffff" filter="url(#mapGlow)">
                  <animateMotion
                    path="M 175 130 Q 230 135 285 150"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 2. Bengaluru (175, 130) to Tiruppur (145, 255) */}
                <path
                  d="M 175 130 Q 155 190 145 255"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle r="2.5" fill="#ffffff" filter="url(#mapGlow)">
                  <animateMotion
                    path="M 175 130 Q 155 190 145 255"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 3. Tiruppur (145, 255) to Chennai (285, 150) */}
                <path
                  d="M 145 255 Q 220 215 285 150"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <circle r="3" fill="#ffffff" filter="url(#mapGlow)">
                  <animateMotion
                    path="M 145 255 Q 220 215 285 150"
                    dur="3.6s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 4. Nagpur (205, 55) to Bengaluru (175, 130) */}
                <path
                  d="M 205 55 Q 185 90 175 130"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle r="2.5" fill="#ffffff" filter="url(#mapGlow)">
                  <animateMotion
                    path="M 205 55 Q 185 90 175 130"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 5. Nagpur (205, 55) to Chennai (285, 150) */}
                <path
                  d="M 205 55 Q 250 100 285 150"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle r="2.5" fill="#ffffff" filter="url(#mapGlow)">
                  <animateMotion
                    path="M 205 55 Q 250 100 285 150"
                    dur="3.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* CITY NODES & LABELS */}

                {/* NAGPUR NODE (205, 55) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveHubId('nagpur')}
                >
                  {activeHubId === 'nagpur' && (
                    <>
                      <circle cx="205" cy="55" r="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" className="animate-ping origin-center" />
                      <circle cx="205" cy="55" r="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    </>
                  )}
                  <circle
                    cx="205"
                    cy="55"
                    r={activeHubId === 'nagpur' ? 5.5 : 4}
                    fill={activeHubId === 'nagpur' ? '#ffffff' : '#888888'}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Leader line & Tag */}
                  <line x1="205" y1="55" x2="245" y2="35" stroke={activeHubId === 'nagpur' ? '#ffffff' : '#555555'} strokeWidth="0.8" />
                  <line x1="245" y1="35" x2="310" y2="35" stroke={activeHubId === 'nagpur' ? '#ffffff' : '#555555'} strokeWidth="0.8" />

                  <text
                    x="248"
                    y="30"
                    fill={activeHubId === 'nagpur' ? '#ffffff' : '#999999'}
                    fontSize="11"
                    fontFamily="Cinzel, serif"
                    letterSpacing="0.1em"
                    className="font-bold uppercase select-none transition-colors duration-300"
                  >
                    NAGPUR
                  </text>
                  <text
                    x="248"
                    y="46"
                    fill="#666666"
                    fontSize="7.5"
                    fontFamily="Syncopate, sans-serif"
                    letterSpacing="0.15em"
                    className="uppercase select-none"
                  >
                    CENTRAL LOGISTICS & PROD
                  </text>
                </g>

                {/* TIRUPPUR NODE (145, 255) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveHubId('tiruppur')}
                >
                  {activeHubId === 'tiruppur' && (
                    <>
                      <circle cx="145" cy="255" r="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" className="animate-ping origin-center" />
                      <circle cx="145" cy="255" r="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    </>
                  )}
                  <circle
                    cx="145"
                    cy="255"
                    r={activeHubId === 'tiruppur' ? 5.5 : 4}
                    fill={activeHubId === 'tiruppur' ? '#ffffff' : '#888888'}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Leader line & Tag */}
                  <line x1="145" y1="255" x2="110" y2="280" stroke={activeHubId === 'tiruppur' ? '#ffffff' : '#555555'} strokeWidth="0.8" />
                  <line x1="110" y1="280" x2="65" y2="280" stroke={activeHubId === 'tiruppur' ? '#ffffff' : '#555555'} strokeWidth="0.8" />
                  
                  <text
                    x="65"
                    y="274"
                    fill={activeHubId === 'tiruppur' ? '#ffffff' : '#999999'}
                    fontSize="11"
                    fontFamily="Cinzel, serif"
                    letterSpacing="0.1em"
                    className="font-bold uppercase select-none transition-colors duration-300"
                  >
                    TIRUPPUR
                  </text>
                  <text
                    x="65"
                    y="292"
                    fill="#666666"
                    fontSize="7.5"
                    fontFamily="Syncopate, sans-serif"
                    letterSpacing="0.15em"
                    className="uppercase select-none"
                  >
                    TEXTILE & KNITWEAR HUB
                  </text>
                </g>

                {/* BENGALURU NODE (175, 130) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveHubId('bengaluru')}
                >
                  {activeHubId === 'bengaluru' && (
                    <>
                      <circle cx="175" cy="130" r="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" className="animate-ping origin-center" />
                      <circle cx="175" cy="130" r="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    </>
                  )}
                  <circle
                    cx="175"
                    cy="130"
                    r={activeHubId === 'bengaluru' ? 5.5 : 4}
                    fill={activeHubId === 'bengaluru' ? '#ffffff' : '#888888'}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Leader line & Tag */}
                  <line x1="175" y1="130" x2="135" y2="90" stroke={activeHubId === 'bengaluru' ? '#ffffff' : '#555555'} strokeWidth="0.8" />
                  <line x1="135" y1="90" x2="70" y2="90" stroke={activeHubId === 'bengaluru' ? '#ffffff' : '#555555'} strokeWidth="0.8" />

                  <text
                    x="70"
                    y="84"
                    fill={activeHubId === 'bengaluru' ? '#ffffff' : '#999999'}
                    fontSize="11"
                    fontFamily="Cinzel, serif"
                    letterSpacing="0.1em"
                    className="font-bold uppercase select-none transition-colors duration-300"
                  >
                    BENGALURU
                  </text>
                  <text
                    x="70"
                    y="102"
                    fill="#666666"
                    fontSize="7.5"
                    fontFamily="Syncopate, sans-serif"
                    letterSpacing="0.15em"
                    className="uppercase select-none"
                  >
                    TECH & DESIGN CLUSTER
                  </text>
                </g>

                {/* CHENNAI NODE (285, 150) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveHubId('chennai')}
                >
                  {activeHubId === 'chennai' && (
                    <>
                      <circle cx="285" cy="150" r="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" className="animate-ping origin-center" />
                      <circle cx="285" cy="150" r="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                    </>
                  )}
                  <circle
                    cx="285"
                    cy="150"
                    r={activeHubId === 'chennai' ? 5.5 : 4}
                    fill={activeHubId === 'chennai' ? '#ffffff' : '#888888'}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Leader line & Tag */}
                  <line x1="285" y1="150" x2="320" y2="120" stroke={activeHubId === 'chennai' ? '#ffffff' : '#555555'} strokeWidth="0.8" />
                  <line x1="320" y1="120" x2="375" y2="120" stroke={activeHubId === 'chennai' ? '#ffffff' : '#555555'} strokeWidth="0.8" />

                  <text
                    x="375"
                    y="114"
                    textAnchor="end"
                    fill={activeHubId === 'chennai' ? '#ffffff' : '#999999'}
                    fontSize="11"
                    fontFamily="Cinzel, serif"
                    letterSpacing="0.1em"
                    className="font-bold uppercase select-none transition-colors duration-300"
                  >
                    CHENNAI
                  </text>
                  <text
                    x="375"
                    y="132"
                    textAnchor="end"
                    fill="#666666"
                    fontSize="7.5"
                    fontFamily="Syncopate, sans-serif"
                    letterSpacing="0.15em"
                    className="uppercase select-none"
                  >
                    PORT & EXPORT CORRIDOR
                  </text>
                </g>
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
                  A CONNECTED MANUFACTURING NETWORK
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
