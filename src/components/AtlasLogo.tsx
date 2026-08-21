import React from 'react';

interface AtlasLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  withLightSweep?: boolean;
}

export const AtlasLogo: React.FC<AtlasLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  withLightSweep = true,
}) => {
  const sizeClasses = {
    sm: {
      atlas: 'text-xl tracking-[0.35em]',
      standards: 'text-[9px] tracking-[0.4em]',
      line: 'w-4',
      tagline: 'text-[7px] tracking-[0.3em] mt-2',
    },
    md: {
      atlas: 'text-3xl sm:text-4xl tracking-[0.45em]',
      standards: 'text-xs sm:text-sm tracking-[0.55em]',
      line: 'w-8 sm:w-12',
      tagline: 'text-[9px] sm:text-[10px] tracking-[0.35em] mt-4',
    },
    lg: {
      atlas: 'text-5xl sm:text-6xl tracking-[0.5em]',
      standards: 'text-sm sm:text-base tracking-[0.65em]',
      line: 'w-12 sm:w-16',
      tagline: 'text-xs tracking-[0.4em] mt-5',
    },
    hero: {
      atlas: 'text-4xl sm:text-6xl md:text-7xl tracking-[0.55em]',
      standards: 'text-xs sm:text-sm md:text-base tracking-[0.7em]',
      line: 'w-10 sm:w-20 md:w-28',
      tagline: 'text-[9px] sm:text-xs tracking-[0.45em] mt-6 text-neutral-400',
    },
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* ATLAS Heading with Brushed Metallic Finish */}
      <div className="relative overflow-hidden group">
        <h1
          className={`font-cinzel font-medium text-white uppercase text-center ${sizeClasses.atlas} pl-[0.55em] transition-colors duration-500`}
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 40%, #E2E8F0 75%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 14px rgba(255,255,255,0.25))',
          }}
        >
          ATLAS
        </h1>

        {withLightSweep && (
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay animate-sweep"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
            }}
          />
        )}
      </div>

      {/* — STANDARDS — with razor-sharp hairline rules */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-3 w-full">
        <span
          className={`h-[1px] ${sizeClasses.line} bg-gradient-to-r from-transparent via-neutral-400 to-neutral-200 opacity-60`}
        />
        <span
          className={`font-cinzel font-light text-neutral-300 uppercase ${sizeClasses.standards} pl-[0.7em]`}
          style={{
            letterSpacing: '0.65em',
            textShadow: '0 0 10px rgba(255,255,255,0.1)',
          }}
        >
          STANDARDS
        </span>
        <span
          className={`h-[1px] ${sizeClasses.line} bg-gradient-to-l from-transparent via-neutral-400 to-neutral-200 opacity-60`}
        />
      </div>

      {/* Optional Tagline: INFINITE STANDARDS. ENDLESS COMMITMENT */}
      {showTagline && (
        <p
          className={`font-cinzel uppercase font-normal text-neutral-400/90 text-center ${sizeClasses.tagline}`}
        >
          INFINITE STANDARDS. ENDLESS COMMITMENT
        </p>
      )}
    </div>
  );
};
