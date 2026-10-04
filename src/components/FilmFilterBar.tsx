import React from 'react';
import { Genre, ReleaseStatus } from '../types';
import { Filter, Sparkles, LayoutGrid, List, Layers } from 'lucide-react';

interface FilmFilterBarProps {
  selectedGenre: Genre | 'All';
  setSelectedGenre: (genre: Genre | 'All') => void;
  selectedStatus: ReleaseStatus | 'All';
  setSelectedStatus: (status: ReleaseStatus | 'All') => void;
  sortBy: 'featured' | 'year-desc' | 'year-asc' | 'title';
  setSortBy: (sort: 'featured' | 'year-desc' | 'year-asc' | 'title') => void;
  totalFilmsCount: number;
  viewMode: 'grid' | 'compact';
  setViewMode: (mode: 'grid' | 'compact') => void;
  onlyCreatorSubmissions: boolean;
  setOnlyCreatorSubmissions: (val: boolean) => void;
}

const GENRES: (Genre | 'All')[] = [
  'All',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Action',
  'Drama',
  'Comedy',
  'Mystery',
  'Indie'
];

const STATUS_FILTERS: { label: string; value: ReleaseStatus | 'All' }[] = [
  { label: 'All Releases', value: 'All' },
  { label: 'In Theaters', value: 'in_theaters' },
  { label: 'Digital & VOD', value: 'digital_vod' },
  { label: '4K UHD / Blu-ray', value: 'bluray_physical' },
  { label: 'Coming Soon', value: 'coming_soon' },
  { label: 'Festival Circuit', value: 'festival_circuit' },
];

export const FilmFilterBar: React.FC<FilmFilterBarProps> = ({
  selectedGenre,
  setSelectedGenre,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  totalFilmsCount,
  viewMode,
  setViewMode,
  onlyCreatorSubmissions,
  setOnlyCreatorSubmissions,
}) => {
  return (
    <div className="w-full bg-[#0a0a0d] border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-2xl backdrop-blur-md">
      {/* Top Filter Row: Status + Creator Toggle + View Toggle */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        {/* Release Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedStatus(s.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedStatus === s.value
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.45)]'
                  : 'bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Creator Toggle & Sort Selector */}
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Creator Spotlight filter toggle */}
          <button
            onClick={() => setOnlyCreatorSubmissions(!onlyCreatorSubmissions)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              onlyCreatorSubmissions
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'border-white/15 text-white/60 hover:text-white hover:border-white/30 bg-white/[0.03]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Creator Hub Titles</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white/50 uppercase tracking-wider font-semibold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black/80 border border-white/15 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-600"
            >
              <option value="featured">Featured Stage Films</option>
              <option value="year-desc">Release Year (Newest)</option>
              <option value="year-asc">Release Year (Oldest)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-black/80 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-red-500' : 'text-white/40 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'compact' ? 'bg-white/10 text-red-500' : 'text-white/40 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Genre Pills */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <span className="text-xs text-white/50 font-semibold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-red-500" />
            Genre:
          </span>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono-tech text-white/50">
          Showing <span className="text-red-400 font-bold">{totalFilmsCount}</span> Title{totalFilmsCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
