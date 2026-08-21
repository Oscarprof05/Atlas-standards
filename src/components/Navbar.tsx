import React, { useState, useEffect } from 'react';
import { AtlasLogo } from './AtlasLogo';
import { Menu, X, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
  onOpenLookbookStudio?: () => void;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartProject,
  onOpenLookbookStudio,
  isMuted = true,
  onToggleSound,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { id: 'problem', label: 'The Problem', href: '#problem' },
    { id: 'what-we-do', label: 'What We Do', href: '#what-we-do' },
    { id: 'requirements', label: 'For Brands', href: '#requirements' },
    { id: 'approach', label: 'How We Work', href: '#approach' },
    { id: 'brand-desk', label: 'Brand Desk', href: '#brand-desk' },
    { id: 'network', label: 'Our Network', href: '#network' },
    { id: 'why-atlas', label: 'Why Atlas', href: '#why-atlas' },
    { id: 'connect', label: 'Connect With Us', href: '#connect' },
  ];

  // Apple-style scroll-driven active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Section detection
      const sectionIds = navLinks.map((l) => l.id);
      const viewportTrigger = scrollY + window.innerHeight * 0.38;

      let current = '';

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportTrigger >= top && viewportTrigger < top + height) {
            current = id;
            break;
          }
        }
      }

      // If past the last section or near bottom
      const connectEl = document.getElementById('connect') || document.getElementById('contact');
      if (connectEl && scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200) {
        current = 'connect';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-900/80 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80 group"
          id="navbar-brand-logo"
        >
          <img
            src="/favicon.svg"
            alt="Atlas Standards"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-md shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <AtlasLogo size="sm" showTagline={false} withLightSweep={false} />
        </a>

        {/* Desktop Navigation Links (Apple Product Chapter Style with Radiant Highlight) */}
        <nav className="hidden lg:flex items-center gap-7 text-[10.5px] font-syncopate uppercase tracking-[0.22em]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative py-1.5 px-2 transition-all duration-300 group select-none ${
                  isActive
                    ? 'text-white font-bold drop-shadow-[0_0_14px_rgba(255,255,255,1)] tracking-[0.24em]'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-white' : ''}>{link.label}</span>

                {/* Active Indicator Underline & Radiant Pill Ambient Glow */}
                {isActive && (
                  <>
                    <span className="absolute inset-0 bg-white/10 rounded-full blur-sm -z-10 animate-pulse" />
                    <span className="absolute -bottom-1 left-1 right-1 h-[2px] bg-white rounded-full shadow-[0_0_12px_#FFFFFF,0_0_20px_#FFFFFF] transition-all duration-500" />
                  </>
                )}
                {!isActive && (
                  <span className="absolute -bottom-1 left-2 w-0 h-[1px] bg-neutral-600 transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          {onOpenLookbookStudio && (
            <button
              onClick={onOpenLookbookStudio}
              className="px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-950/60 text-neutral-300 text-[10px] font-syncopate tracking-[0.2em] uppercase hover:text-white hover:border-neutral-600 transition-colors"
            >
              Lookbook Studio
            </button>
          )}

          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-300"
              title={isMuted ? 'Enable Ambient Studio Audio' : 'Mute Ambient Audio'}
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onStartProject}
            id="nav-start-project-btn"
            className="group px-5 py-2 rounded-full border border-neutral-700 bg-neutral-950 text-white font-cinzel text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:border-white hover:bg-white hover:text-black flex items-center gap-2"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-black/95 backdrop-blur-xl z-40 border-t border-neutral-900 p-8 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col gap-6 pt-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`font-cinzel text-xl tracking-[0.2em] uppercase transition-all ${
                    isActive ? 'text-white font-semibold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-4 rounded-full bg-white text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-center"
            >
              START A PROJECT
            </button>
            <p className="font-cinzel text-[10px] tracking-[0.3em] text-neutral-500 text-center uppercase">
              INFINITE STANDARDS. ENDLESS COMMITMENT
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
