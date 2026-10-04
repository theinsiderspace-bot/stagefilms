import React, { useState } from 'react';
import { Film, Genre } from '../types';
import { Play, Film as FilmIcon, Sparkles, Tv } from 'lucide-react';

interface TrailersSectionProps {
  films: Film[];
  onPlayTrailer: (film: Film) => void;
  onSelectFilm: (film: Film) => void;
}

export const TrailersSection: React.FC<TrailersSectionProps> = ({
  films,
  onPlayTrailer,
  onSelectFilm,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'All'>('All');

  const filteredFilms = films.filter((f) => {
    if (selectedGenre !== 'All' && !f.genres.includes(selectedGenre as Genre)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-red-500 text-xs font-mono-tech uppercase tracking-widest mb-1.5">
            <Tv className="w-4 h-4" />
            <span>Official Video Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-cinematic font-black text-white">
            Trailers, Teasers & Sneak Peeks
          </h2>
          <p className="text-sm text-white/60 mt-1 max-w-xl">
            Watch official 4K trailers and festival teasers for Stage Films theatrical and digital acquisitions.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {(['All', 'Horror', 'Sci-Fi', 'Thriller', 'Action', 'Drama'] as (Genre | 'All')[]).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedGenre === g
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.45)]'
                  : 'bg-white/[0.04] border border-white/10 text-white/70 hover:border-white/20 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Trailers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group relative bg-[#0e0e12] border border-white/10 hover:border-red-600/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,9,20,0.25)]"
          >
            {/* Video Thumbnail with Play overlay */}
            <div 
              onClick={() => onPlayTrailer(film)}
              className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
            >
              <img
                src={film.backdropUrl}
                alt={film.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.6)] group-hover:scale-110 group-hover:bg-red-600 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
              </div>

              {/* Duration / Status badge */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-red-400 font-mono-tech text-[10px] rounded font-bold border border-white/10">
                  {film.releaseDateText}
                </span>
                <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white/70 text-[10px] rounded border border-white/10">
                  {film.runtimeMinutes}m
                </span>
              </div>
            </div>

            {/* Video Card Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[11px] text-white/50 mb-1.5">
                  <span className="border border-white/15 px-1.5 py-0.2 rounded text-white/80 font-bold bg-white/5">{film.rating}</span>
                  <span>{film.genres.slice(0, 2).join(' / ')}</span>
                </div>

                <h3 
                  onClick={() => onSelectFilm(film)}
                  className="text-base font-cinematic font-bold text-white group-hover:text-red-400 cursor-pointer transition-colors"
                >
                  {film.title} - Official Trailer
                </h3>

                <p className="text-xs text-white/60 mt-2 line-clamp-2 leading-relaxed">
                  {film.synopsis}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => onPlayTrailer(film)}
                  className="text-red-500 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-red-500" />
                  <span>Play Trailer</span>
                </button>

                <button
                  onClick={() => onSelectFilm(film)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Details & Credits →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
