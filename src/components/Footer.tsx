import React from 'react';
import { Film, ShieldCheck, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface FooterProps {
  onOpenCreatorPortal: () => void;
  onSetTab: (tab: 'home' | 'movies' | 'trailers' | 'whats-new' | 'about' | 'creator-dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCreatorPortal,
  onSetTab,
}) => {
  return (
    <footer className="w-full bg-[#0a0a0d] border-t border-white/10 text-white/50 text-xs">
      {/* Upper Social & Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Label Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="group cursor-pointer" onClick={() => onSetTab('home')}>
              <StudioLogo variant="full" size="sm" />
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              A Hulu Production. New York label. Distributing innovative theatrical, digital, and prestige genre cinema worldwide.
            </p>
            <div className="flex items-center space-x-3 text-white/40 text-xs">
              <span className="hover:text-red-400 cursor-pointer transition-colors">Facebook</span>
              <span>•</span>
              <span className="hover:text-red-400 cursor-pointer transition-colors">X / Twitter</span>
              <span>•</span>
              <span className="hover:text-red-400 cursor-pointer transition-colors">Instagram</span>
              <span>•</span>
              <span className="hover:text-red-400 cursor-pointer transition-colors">YouTube</span>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div className="space-y-3">
            <h4 className="font-cinematic font-bold text-white uppercase tracking-wider text-xs">
              Movie Catalog
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSetTab('home')} className="hover:text-white transition-colors cursor-pointer">Featured Showcase</button>
              </li>
              <li>
                <button onClick={() => onSetTab('movies')} className="hover:text-white transition-colors cursor-pointer">In Theaters Now</button>
              </li>
              <li>
                <button onClick={() => onSetTab('movies')} className="hover:text-white transition-colors cursor-pointer">Digital & 4K UHD Releases</button>
              </li>
              <li>
                <button onClick={() => onSetTab('trailers')} className="hover:text-white transition-colors cursor-pointer">Trailers & Featurettes</button>
              </li>
            </ul>
          </div>

          {/* Hulu Production Labels */}
          <div className="space-y-3">
            <h4 className="font-cinematic font-bold text-white uppercase tracking-wider text-xs">
              Hulu Production Network
            </h4>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">Hulu Originals & Feature Films</li>
              <li className="hover:text-white transition-colors cursor-pointer">Hulu Production. New York Studios</li>
              <li className="hover:text-white transition-colors cursor-pointer">Stage Films Acquisitions Pipeline</li>
              <li className="hover:text-white transition-colors cursor-pointer">Prestige Arthouse & Indie Wave</li>
              <li className="hover:text-white transition-colors cursor-pointer">Worldwide Theatrical & Streaming Releases</li>
            </ul>
          </div>

          {/* Filmmakers & Acquisitions */}
          <div className="space-y-3">
            <h4 className="font-cinematic font-bold text-red-500 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Creator Portal
            </h4>
            <p className="text-white/60 leading-relaxed text-xs">
              Submit your feature film screener, pitch deck, and lookbook directly to Stage Films Acquisitions.
            </p>
            <button
              onClick={onOpenCreatorPortal}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-[11px] rounded-xl tracking-wider transition-colors cursor-pointer shadow-[0_0_15px_rgba(229,9,20,0.3)]"
            >
              Creator Studio Access
            </button>
          </div>
        </div>

        {/* Legal & MPAA Notices */}
        <div className="space-y-4 text-[11px] text-white/40">
          <p className="leading-relaxed">
            © {new Date().getFullYear()} Hulu Production. New York. All rights reserved. Stage Films and related logos are trademarks of Hulu Production. New York. Motion picture rating system information provided by the Motion Picture Association of America (MPAA).
          </p>
          <div className="flex flex-wrap gap-4 text-white/40">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">New York Studio Standards</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Do Not Sell or Share My Personal Info</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">Hulu Production. New York Studios</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
