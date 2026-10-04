import React from 'react';

interface StudioLogoProps {
  variant?: 'full' | 'compact' | 'icon-only' | 'badge' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showLocation?: boolean;
  animated?: boolean;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showLocation = true,
  animated = true,
}) => {
  // Size metrics for the SVG icon
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  const titleSizes = {
    sm: 'text-base tracking-wider',
    md: 'text-xl tracking-widest',
    lg: 'text-2xl sm:text-3xl tracking-widest',
    xl: 'text-4xl tracking-widest',
  }[size];

  const subtitleSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.28em]',
    xl: 'text-xs tracking-[0.3em]',
  }[size];

  // The custom geometric Studio Mark: Intersecting Soundstage Beams, Anamorphic Film Aperture & 'SF' Geometry
  const renderEmblem = () => (
    <div
      className={`relative flex items-center justify-center ${iconDimensions} rounded-2xl bg-gradient-to-b from-[#18181b] via-[#09090b] to-[#040405] border border-white/20 shadow-[0_8px_25px_rgba(0,0,0,0.8)] group-hover:border-red-500/70 group-hover:shadow-[0_0_28px_rgba(229,9,20,0.45)] transition-all duration-300 overflow-hidden select-none`}
    >
      {/* Background Studio Light Prism */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#e50914_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
      
      {/* Dynamic Studio Gradient Glows */}
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-red-600/40 rounded-full blur-md group-hover:bg-red-500/60 transition-all duration-500" />
      <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-emerald-500/25 rounded-full blur-md group-hover:bg-emerald-400/40 transition-all duration-500" />

      {/* SVG Bespoke Studio Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-[78%] h-[78%] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="stageGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="filmGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>

          <linearGradient id="huluAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          <filter id="cinematicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Soundstage Aperture Ring (Geometric Film Slate & Soundstage Truss) */}
        <path
          d="M 18 28 L 50 10 L 82 28 L 82 72 L 50 90 L 18 72 Z"
          stroke="url(#stageGlow)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeOpacity="0.85"
          fill="#0a0a0c"
          fillOpacity="0.7"
        />

        {/* Soundstage Roof Truss Crossbars */}
        <line x1="50" y1="10" x2="50" y2="28" stroke="url(#filmGold)" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="18" y1="28" x2="82" y2="28" stroke="url(#filmGold)" strokeWidth="1.5" strokeOpacity="0.3" />

        {/* Stylized Intersecting 'S' & 'F' Monogram */}
        {/* 'S' Curve Blade */}
        <path
          d="M 64 36 C 64 36 34 32 34 46 C 34 58 66 54 66 66 C 66 76 36 74 36 74"
          stroke="url(#filmGold)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 'F' Pillar & Crossbars with Red Accent */}
        <path
          d="M 48 34 L 48 76"
          stroke="#e50914"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 48 38 L 70 38"
          stroke="#e50914"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 48 52 L 64 52"
          stroke="#e50914"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Anamorphic Lens Flare / Recording Spotlight Dot */}
        <circle cx="50" cy="18" r="3" fill="#10b981" />
        <circle cx="50" cy="18" r="5" fill="#10b981" fillOpacity="0.3" />

        {/* Film Sprocket Perforation Accents */}
        <rect x="25" y="44" width="3" height="5" rx="1" fill="#ffffff" fillOpacity="0.4" />
        <rect x="25" y="55" width="3" height="5" rx="1" fill="#ffffff" fillOpacity="0.4" />
        <rect x="72" y="44" width="3" height="5" rx="1" fill="#ffffff" fillOpacity="0.4" />
        <rect x="72" y="55" width="3" height="5" rx="1" fill="#ffffff" fillOpacity="0.4" />
      </svg>

      {/* Recording / Active Studio Live Indicator */}
      {animated && (
        <div className="absolute bottom-1 right-1 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(229,9,20,1)]" />
        </div>
      )}
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center space-y-3 ${className}`}>
        {renderEmblem()}
        <div>
          <div className="flex items-baseline justify-center space-x-1.5 font-cinematic font-black tracking-widest">
            <span className={`text-white ${titleSizes}`}>STAGE</span>
            <span className={`text-red-600 ${titleSizes}`}>FILMS</span>
          </div>
          {showLocation && (
            <p className={`text-white/60 font-mono-tech font-bold uppercase mt-1 flex items-center justify-center gap-1.5 ${subtitleSizes}`}>
              <span>HULU PRODUCTION</span>
              <span className="text-white/30">•</span>
              <span className="text-emerald-400">NEW YORK</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center space-x-3 px-3.5 py-2 rounded-2xl bg-zinc-950/80 border border-white/15 backdrop-blur-md shadow-xl ${className}`}>
        {renderEmblem()}
        <div className="text-left">
          <div className="flex items-baseline space-x-1.5">
            <span className="font-cinematic font-black text-sm tracking-wider text-white">STAGE</span>
            <span className="font-cinematic font-black text-sm tracking-wider text-red-500">FILMS</span>
          </div>
          <p className="text-[8px] font-mono-tech text-white/50 font-bold uppercase tracking-wider flex items-center gap-1">
            <span>HULU PROD.</span>
            <span className="text-emerald-400">NYC</span>
          </p>
        </div>
      </div>
    );
  }

  // Default 'full' or 'compact'
  return (
    <div className={`flex items-center space-x-3.5 select-none ${className}`}>
      {renderEmblem()}
      <div className="text-left">
        <div className="flex items-baseline space-x-1.5">
          <span className={`font-cinematic font-black text-white transition-colors group-hover:text-red-400 ${titleSizes}`}>
            STAGE
          </span>
          <span className={`font-cinematic font-black text-red-600 transition-colors group-hover:text-red-500 ${titleSizes}`}>
            FILMS
          </span>
        </div>
        {showLocation && (
          <p className={`text-white/50 font-mono-tech font-bold uppercase flex items-center gap-1.5 ${subtitleSizes}`}>
            <span className="text-zinc-300">HULU PRODUCTION</span>
            <span className="text-white/20">•</span>
            <span className="text-emerald-400 font-semibold tracking-widest">NEW YORK</span>
          </p>
        )}
      </div>
    </div>
  );
};
