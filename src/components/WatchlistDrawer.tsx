import React from 'react';
import { Film } from '../types';
import { X, Play, Trash2, Bookmark, Film as FilmIcon } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedFilms: Film[];
  onSelectFilm: (film: Film) => void;
  onPlayTrailer: (film: Film) => void;
  onRemoveBookmark: (filmId: string) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedFilms,
  onSelectFilm,
  onPlayTrailer,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e12] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-red-500" />
                <h3 className="font-cinematic font-bold text-white text-lg">
                  Saved Watchlist ({bookmarkedFilms.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-4 space-y-3 overflow-y-auto max-h-[70vh] pr-1">
              {bookmarkedFilms.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <FilmIcon className="w-10 h-10 text-white/20 mx-auto" />
                  <p className="text-sm text-white/70">Your Stage Films watchlist is currently empty.</p>
                  <p className="text-xs text-white/40">Click the bookmark icon on any movie card to save it here.</p>
                </div>
              ) : (
                bookmarkedFilms.map((film) => (
                  <div
                    key={film.id}
                    className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between gap-3 group hover:border-red-600/40 transition-colors"
                  >
                    <img
                      src={film.posterUrl}
                      alt={film.title}
                      className="w-12 h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 
                        onClick={() => { onClose(); onSelectFilm(film); }}
                        className="text-xs sm:text-sm font-cinematic font-bold text-white group-hover:text-red-400 cursor-pointer truncate"
                      >
                        {film.title}
                      </h4>
                      <p className="text-[11px] text-white/50 font-mono-tech mt-0.5">
                        {film.releaseYear} • {film.rating} • {film.runtimeMinutes}m
                      </p>
                      <button
                        onClick={() => { onClose(); onPlayTrailer(film); }}
                        className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-1 hover:underline cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-red-400" />
                        Play Trailer
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveBookmark(film.id)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Close Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
