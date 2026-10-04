import React from 'react';
import { Film, Building2, Globe, Clapperboard, Sparkles, ShieldCheck, CheckCircle2, Tv } from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface AboutStage6SectionProps {
  onOpenCreatorPortal: () => void;
}

export const AboutStage6Section: React.FC<AboutStage6SectionProps> = ({
  onOpenCreatorPortal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Narrative */}
      <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_#260808_0%,_#0a0a0d_60%)] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_0_40px_rgba(229,9,20,0.15)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-2 text-red-500 text-xs font-mono-tech uppercase tracking-widest">
              <Building2 className="w-4 h-4" />
              <span>Hulu Production • New York City, New York</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-cinematic font-black text-white leading-tight">
              The Vision Behind Stage Films
            </h2>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Established as a dedicated premium label, <strong className="text-white">Stage Films</strong> is powered by <strong className="text-white">Hulu Production. New York</strong>. Headquartered in New York City, the studio champions visionary genre storytellers, boundary-pushing independent directors, high-concept theatrical releases, and prestige festival acquisitions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <span className="text-2xl sm:text-3xl font-cinematic font-bold text-red-500">2007</span>
                <p className="text-[11px] text-white/50 uppercase font-semibold mt-1">Founded</p>
              </div>
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <span className="text-2xl sm:text-3xl font-cinematic font-bold text-red-500">100+</span>
                <p className="text-[11px] text-white/50 uppercase font-semibold mt-1">Acquired & Released</p>
              </div>
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <span className="text-2xl sm:text-3xl font-cinematic font-bold text-red-500">180+</span>
                <p className="text-[11px] text-white/50 uppercase font-semibold mt-1">Global Territories</p>
              </div>
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <span className="text-2xl sm:text-3xl font-cinematic font-bold text-red-500">4K / IMAX</span>
                <p className="text-[11px] text-white/50 uppercase font-semibold mt-1">Mastering Standard</p>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 p-8 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center">
            <StudioLogo variant="vertical" size="xl" />
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 font-mono-tech text-[10px] uppercase tracking-widest rounded-full">
                OFFICIAL STUDIO SEAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hulu Production Motion Picture Ecosystem */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-mono-tech text-red-500 uppercase tracking-widest">Global Motion Picture & Streaming Network</p>
          <h3 className="text-2xl sm:text-3xl font-cinematic font-bold text-white">
            Hulu Production. New York Studio Network
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto">
            Stage Films collaborates closely across Hulu Production. New York to distribute titles globally in theaters, premium streaming, festival circuits, and home entertainment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Hulu Originals', desc: 'Prestige original series, documentaries & feature films' },
            { name: 'Hulu Production. New York', desc: 'NYC-headquartered creative development & production' },
            { name: 'Stage Films Label', desc: 'Genre, high-concept thrillers & independent acquisitions' },
            { name: 'Worldwide Theatrical', desc: 'Global festival distribution & premium theatrical runs' },
          ].map((studio, i) => (
            <div key={i} className="p-5 bg-[#0e0e12] border border-white/10 rounded-2xl space-y-2 hover:border-red-600/30 transition-colors">
              <h4 className="font-cinematic font-bold text-sm text-white">{studio.name}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{studio.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Acquisitions Manifesto & Creator Collaboration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-[#0e0e12] border border-white/10 rounded-3xl space-y-4">
          <h3 className="text-xl font-cinematic font-bold text-white flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-red-500" />
            Our Acquisitions Philosophy
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            From breakthrough hits like Duncan Jones' <em>Moon</em>, Fede Álvarez's <em>Don't Breathe</em>, and Jalmari Helander's <em>Sisu</em>, to global phenomena like <em>Paddington in Peru</em>, Stage Films champions distinct storytelling with uncompromising cinematic craft.
          </p>
          <ul className="space-y-2.5 text-xs text-white/70 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-concept horror, psychological thrillers, and hard sci-fi.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> World cinema & international festival acquisitions.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Groundbreaking screenlife and experimental tech narratives.
            </li>
          </ul>
        </div>

        <div className="p-8 bg-[#0e0e12] border border-white/10 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-cinematic font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              Direct Creator Submission Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
              Registered filmmakers, producers, and sales agents can register projects directly to our secure dashboard, assign passcode-protected screeners, and monitor acquisition review status.
            </p>
          </div>

          <button
            onClick={onOpenCreatorPortal}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            Access Creator Dashboard & Submission Portal
          </button>
        </div>
      </div>
    </div>
  );
};
