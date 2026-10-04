import React from 'react';
import { Film } from '../types';
import { X, Volume2, Info, Film as FilmIcon, ExternalLink } from 'lucide-react';

interface TrailerModalProps {
  film: Film | null;
  onClose: () => void;
  onViewDetails?: (film: Film) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  film,
  onClose,
  onViewDetails,
}) => {
  if (!film) return null;

  // Format embed url with autoplay
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/embed')) {
      return `${url}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#0e0e12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-black/80 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="font-cinematic font-black text-red-600 text-lg tracking-wider">STAGE 6</span>
              <span className="text-white/40 text-xs uppercase tracking-widest font-mono-tech">PREVIEW THEATRE</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">{film.title}</span>
          </div>

          <button
            id="trailer-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <iframe
            src={getEmbedUrl(film.trailerUrl)}
            title={`${film.title} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Film Snapshot & Actions */}
        <div className="p-4 sm:p-6 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs text-white/50">
              <span className="border border-white/15 px-1.5 py-0.2 rounded text-white/80 font-bold bg-white/5">{film.rating}</span>
              <span className="text-red-400 font-mono-tech font-semibold">{film.releaseDateText}</span>
              <span>•</span>
              <span>Dir: {film.director}</span>
            </div>
            <p className="text-xs text-white/70 line-clamp-2">{film.synopsis}</p>
          </div>

          {onViewDetails && (
            <button
              onClick={() => {
                onClose();
                onViewDetails(film);
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:border-red-600/50 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer shadow-md"
            >
              <Info className="w-4 h-4 text-red-500" />
              <span>Full Film Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
