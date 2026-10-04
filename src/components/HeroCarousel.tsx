import React, { useState, useEffect } from 'react';
import { Play, Info, ShoppingBag, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles, Film as FilmIcon, ShieldCheck } from 'lucide-react';
import { Film } from '../types';

interface HeroCarouselProps {
  featuredFilms: Film[];
  onSelectFilm: (film: Film) => void;
  onPlayTrailer: (film: Film) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  featuredFilms,
  onSelectFilm,
  onPlayTrailer,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const activeFilm = featuredFilms[currentIndex] || featuredFilms[0];

  useEffect(() => {
    if (featuredFilms.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredFilms.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredFilms.length]);

  if (!activeFilm) return null;

  return (
    <div className="relative w-full h-[650px] sm:h-[720px] lg:h-[780px] bg-[#050505] overflow-hidden border-b border-white/10">
      {/* Background Image Backdrop with Gradient Vignettes */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out transform scale-105">
        <img
          src={activeFilm.backdropUrl}
          alt={activeFilm.title}
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.15]"
        />
        {/* Dynamic Multi-stop Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24 z-10">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Label Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest rounded-md shadow-[0_0_12px_rgba(229,9,20,0.5)]">
              STAGE 6 SPOTLIGHT
            </span>
            <span className="px-2.5 py-1 bg-white/[0.06] border border-white/15 text-white/80 text-[11px] font-mono-tech uppercase tracking-wider rounded-md backdrop-blur-md">
              {activeFilm.releaseDateText}
            </span>
            {activeFilm.isCreatorSubmission && (
              <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold tracking-wider rounded-md flex items-center gap-1 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACQUISITIONS PREVIEW
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-cinematic font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              {activeFilm.title}
            </h1>
            {activeFilm.tagline && (
              <p className="mt-2 text-base sm:text-lg text-red-400 font-medium italic drop-shadow">
                "{activeFilm.tagline}"
              </p>
            )}
          </div>

          {/* Metadata pill bar */}
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-white/70 font-medium">
            <span className="px-2 py-0.5 border border-white/20 rounded text-white font-bold bg-white/5">
              {activeFilm.rating}
            </span>
            <span>{activeFilm.runtimeMinutes} MIN</span>
            <span className="text-white/20">•</span>
            <span>{activeFilm.genres.join(', ')}</span>
            <span className="text-white/20">•</span>
            <span className="text-white/50 font-mono-tech">{activeFilm.technicalSpecs.aspectRatio}</span>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-white/80 line-clamp-3 leading-relaxed drop-shadow max-w-xl">
            {activeFilm.synopsis}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id={`hero-watch-trailer-btn-${activeFilm.id}`}
              onClick={() => onPlayTrailer(activeFilm)}
              className="flex items-center space-x-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-[0_0_24px_rgba(229,9,20,0.45)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Trailer</span>
            </button>

            <button
              id={`hero-details-btn-${activeFilm.id}`}
              onClick={() => onSelectFilm(activeFilm)}
              className="flex items-center space-x-2 px-5 py-3.5 bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl backdrop-blur-md transition-all"
            >
              <Info className="w-4 h-4 text-red-500" />
              <span>Film Details & Credits</span>
            </button>
          </div>
        </div>

        {/* Carousel Indicators & Thumbnails */}
        <div className="absolute right-4 sm:right-8 bottom-8 sm:bottom-12 hidden md:flex items-center space-x-3 bg-black/70 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 shadow-2xl">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? featuredFilms.length - 1 : prev - 1))}
            className="p-2 text-white/60 hover:text-white transition-colors"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {featuredFilms.map((film, idx) => (
              <button
                key={film.id}
                onClick={() => setCurrentIndex(idx)}
                className={`relative group rounded-lg overflow-hidden transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-red-600 scale-105 opacity-100 shadow-[0_0_15px_rgba(229,9,20,0.5)]'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img
                  src={film.posterUrl}
                  alt={film.title}
                  className="w-12 h-16 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredFilms.length)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
