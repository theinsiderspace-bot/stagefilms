import React from 'react';
import { Film } from '../types';
import { Play, Info, Bookmark, ShieldCheck, Star, Clock, Eye } from 'lucide-react';

interface FilmCardProps {
  film: Film;
  onSelect: (film: Film) => void;
  onPlayTrailer: (film: Film) => void;
  isBookmarked: boolean;
  onToggleBookmark: (filmId: string) => void;
  viewMode?: 'grid' | 'compact';
}

export const FilmCard: React.FC<FilmCardProps> = ({
  film,
  onSelect,
  onPlayTrailer,
  isBookmarked,
  onToggleBookmark,
  viewMode = 'grid',
}) => {
  const getStatusBadge = () => {
    switch (film.releaseStatus) {
      case 'in_theaters':
        return { label: 'IN THEATERS', bg: 'bg-red-600 text-white font-extrabold shadow-[0_0_12px_rgba(229,9,20,0.5)]' };
      case 'digital_vod':
        return { label: 'DIGITAL & VOD', bg: 'bg-white/15 text-white font-bold border border-white/20 backdrop-blur-md' };
      case 'bluray_physical':
        return { label: '4K UHD / BLU-RAY', bg: 'bg-white/10 text-white font-bold border border-white/15' };
      case 'coming_soon':
        return { label: 'COMING SOON', bg: 'bg-black/80 text-red-400 border border-red-600/50 font-bold' };
      case 'festival_circuit':
        return { label: 'FESTIVAL CIRCUIT', bg: 'bg-emerald-600 text-white font-bold shadow-md' };
      default:
        return { label: 'STAGE 6 FILM', bg: 'bg-white/10 text-white/80' };
    }
  };

  const statusBadge = getStatusBadge();

  if (viewMode === 'compact') {
    return (
      <div className="group relative flex flex-col sm:flex-row items-center bg-[#0e0e12] hover:bg-[#14141a] border border-white/10 hover:border-red-600/40 rounded-2xl overflow-hidden p-3.5 gap-4 transition-all duration-200 shadow-lg">
        <div className="relative w-full sm:w-32 h-44 sm:h-36 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={film.posterUrl}
            alt={film.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={() => onPlayTrailer(film)}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.6)]">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </button>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-1">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${statusBadge.bg}`}>
                {statusBadge.label}
              </span>
              <span className="text-xs font-bold text-white/70 border border-white/15 px-1.5 py-0.5 rounded bg-white/5">
                {film.rating}
              </span>
              <span className="text-xs text-white/60 font-mono-tech">{film.releaseYear}</span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/60">{film.runtimeMinutes}m</span>
              {film.isCreatorSubmission && (
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Creator Submission
                </span>
              )}
            </div>

            <h3 
              onClick={() => onSelect(film)}
              className="text-base sm:text-lg font-cinematic font-bold text-white group-hover:text-red-400 cursor-pointer transition-colors"
            >
              {film.title}
            </h3>
            <p className="text-xs text-white/60 line-clamp-2 mt-1 leading-relaxed">{film.synopsis}</p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10">
            <div className="text-xs text-white/60">
              <span className="text-white/40">Dir:</span> <span className="text-white/90 font-medium">{film.director}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleBookmark(film.id)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked ? 'bg-red-600/20 border-red-600 text-red-400 shadow-[0_0_12px_rgba(229,9,20,0.3)]' : 'border-white/15 text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelect(film)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Info className="w-3.5 h-3.5 text-red-500" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid View
  return (
    <div className="group relative bg-[#0e0e12] border border-white/10 hover:border-red-600/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.2)] hover:-translate-y-1">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
        <img
          src={film.posterUrl}
          alt={film.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shadow-md ${statusBadge.bg}`}>
            {statusBadge.label}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(film.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(229,9,20,0.7)] scale-105'
                : 'bg-black/70 text-white/70 hover:text-white hover:bg-black/90'
            }`}
            title={isBookmarked ? 'In Watchlist' : 'Save to Watchlist'}
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover Quick Overlay with Trailer & Details trigger */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-xs text-red-400 font-medium italic line-clamp-1">"{film.tagline || film.title}"</p>
            <p className="text-[11px] text-white/70 line-clamp-3 leading-relaxed">{film.synopsis}</p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                id={`card-play-trailer-${film.id}`}
                onClick={() => onPlayTrailer(film)}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Trailer</span>
              </button>
              <button
                id={`card-view-details-${film.id}`}
                onClick={() => onSelect(film)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-red-500" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[11px] text-white/50 font-medium mb-1">
            <span className="border border-white/15 px-1.5 py-0.2 rounded text-white/80 font-bold bg-white/5">
              {film.rating}
            </span>
            <span className="font-mono-tech">{film.releaseYear}</span>
            <span>•</span>
            <span>{film.runtimeMinutes}m</span>
          </div>

          <h3 
            onClick={() => onSelect(film)}
            className="text-base font-cinematic font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {film.title}
          </h3>

          <p className="text-xs text-white/50 mt-1 line-clamp-1">
            {film.genres.join(' / ')}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-white/60 truncate max-w-[140px]">
            Dir: <span className="text-white/90">{film.director}</span>
          </span>
          {film.isCreatorSubmission && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Creator
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
