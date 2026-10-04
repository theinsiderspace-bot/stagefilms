import React, { useState } from 'react';
import { Film, CreatorUser, ReleaseStatus } from '../../types';
import { 
  Film as FilmIcon, PlusCircle, ShieldCheck, Eye, Lock, Unlock, 
  Trash2, Edit3, Sparkles, CheckCircle2, Clock, Award, FileText, 
  ExternalLink, Copy, Check, BarChart3, AlertCircle, Share2, Video,
  CheckSquare, Square, MinusSquare, Layers, X, ArrowRight
} from 'lucide-react';

interface CreatorDashboardViewProps {
  currentUser: CreatorUser;
  films: Film[];
  onOpenAddFilm: () => void;
  onOpenEditFilm: (film: Film) => void;
  onDeleteFilm: (filmId: string) => void;
  onOpenScreenerRoom: (film: Film) => void;
  onSelectFilm: (film: Film) => void;
  onPlayTrailer: (film: Film) => void;
  onUpdateFilmStatus: (filmId: string, status: Film['releaseStatus']) => void;
  onBulkDeleteFilms?: (filmIds: string[]) => void;
  onBulkUpdateFilmStatus?: (filmIds: string[], status: Film['releaseStatus']) => void;
}

export const CreatorDashboardView: React.FC<CreatorDashboardViewProps> = ({
  currentUser,
  films,
  onOpenAddFilm,
  onOpenEditFilm,
  onDeleteFilm,
  onOpenScreenerRoom,
  onSelectFilm,
  onPlayTrailer,
  onUpdateFilmStatus,
  onBulkDeleteFilms,
  onBulkUpdateFilmStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'acquisitions' | 'screeners' | 'epk'>('projects');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFilmIds, setSelectedFilmIds] = useState<string[]>([]);
  const [bulkStatusToApply, setBulkStatusToApply] = useState<ReleaseStatus>('coming_soon');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter films for this creator or show all creator submissions
  const creatorFilms = films.filter((f) => f.creatorId === currentUser.id || f.isCreatorSubmission);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCopyScreener = (film: Film) => {
    const text = `Title: ${film.title}\nScreener URL: ${window.location.origin} (Catalog)\nPasscode: ${film.screenerPasscode || 'STAGE6'}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(film.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Bulk Selection Handlers
  const handleToggleSelectFilm = (filmId: string) => {
    setSelectedFilmIds((prev) =>
      prev.includes(filmId) ? prev.filter((id) => id !== filmId) : [...prev, filmId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedFilmIds.length === creatorFilms.length && creatorFilms.length > 0) {
      setSelectedFilmIds([]);
    } else {
      setSelectedFilmIds(creatorFilms.map((f) => f.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedFilmIds([]);
  };

  const handleApplyBulkStatus = () => {
    if (selectedFilmIds.length === 0) return;
    const count = selectedFilmIds.length;
    if (onBulkUpdateFilmStatus) {
      onBulkUpdateFilmStatus(selectedFilmIds, bulkStatusToApply);
    } else {
      selectedFilmIds.forEach((id) => onUpdateFilmStatus(id, bulkStatusToApply));
    }
    showNotification(`Successfully updated ${count} film${count > 1 ? 's' : ''} to "${bulkStatusToApply.replace('_', ' ')}"!`);
    setSelectedFilmIds([]);
  };

  const handleExecuteBulkDelete = () => {
    if (selectedFilmIds.length === 0) return;
    const count = selectedFilmIds.length;
    if (onBulkDeleteFilms) {
      onBulkDeleteFilms(selectedFilmIds);
      setSelectedFilmIds([]);
    } else {
      if (window.confirm(`Are you sure you want to delete ${count} selected film${count > 1 ? 's' : ''} from your catalog?`)) {
        selectedFilmIds.forEach((id) => onDeleteFilm(id));
        setSelectedFilmIds([]);
      }
    }
  };

  const isAllSelected = creatorFilms.length > 0 && selectedFilmIds.length === creatorFilms.length;
  const isPartiallySelected = selectedFilmIds.length > 0 && selectedFilmIds.length < creatorFilms.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Creator Profile & Action Banner */}
      <div className="relative bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-600/60 shadow-[0_0_20px_rgba(229,9,20,0.3)]"
            />
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl sm:text-3xl font-cinematic font-black text-white">
                  {currentUser.name}
                </h1>
                <span className="bg-red-600/15 border border-red-600/40 text-red-400 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono-tech shadow-[0_0_10px_rgba(229,9,20,0.2)]">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED CREATOR
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {currentUser.role} • <span className="text-white font-semibold">{currentUser.company}</span>
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                Stage Films Studio Partner since {currentUser.joinedDate}
              </p>
            </div>
          </div>

          {/* Add Film CTA */}
          <div className="flex items-center space-x-3 w-full md:w-auto relative z-10">
            <button
              id="dashboard-submit-new-film-btn"
              onClick={onOpenAddFilm}
              className="w-full md:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit / Add New Film</span>
            </button>
          </div>
        </div>

        {/* Studio Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
            <span className="text-xl sm:text-2xl font-cinematic font-bold text-white">
              {creatorFilms.length}
            </span>
            <p className="text-[11px] text-white/50 uppercase font-semibold mt-0.5">Registered Projects</p>
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
            <span className="text-xl sm:text-2xl font-cinematic font-bold text-red-500">
              {creatorFilms.filter((f) => f.acquisitionsStatus === 'under_review').length || 1}
            </span>
            <p className="text-[11px] text-white/50 uppercase font-semibold mt-0.5">In Acquisitions Review</p>
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
            <span className="text-xl sm:text-2xl font-cinematic font-bold text-emerald-400">
              248
            </span>
            <p className="text-[11px] text-white/50 uppercase font-semibold mt-0.5">VIP Screener Views</p>
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
            <span className="text-xl sm:text-2xl font-cinematic font-bold text-red-400">
              Hulu NYC
            </span>
            <p className="text-[11px] text-white/50 uppercase font-semibold mt-0.5">Pipeline Status</p>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <FilmIcon className="w-4 h-4" />
          <span>My Film Catalog ({creatorFilms.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('acquisitions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'acquisitions'
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Stage Films Acquisitions Review</span>
        </button>

        <button
          onClick={() => setActiveTab('screeners')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'screeners'
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Screener Security & Passes</span>
        </button>

        <button
          onClick={() => setActiveTab('epk')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'epk'
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Press Kit & Pitch Deck</span>
        </button>
      </div>

      {/* Feedback Toast Notification */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14141c] border border-red-500/50 text-white px-5 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(229,9,20,0.4)] flex items-center space-x-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{actionNotice}</span>
          <button 
            onClick={() => setActionNotice(null)}
            className="text-white/40 hover:text-white ml-2 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: Projects List */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-cinematic font-bold text-white">
                Creator Submitted Film Roster
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                Manage film releases, trigger bulk status updates, and configure VIP acquisitions screeners.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                id="dashboard-submit-another-film-btn"
                onClick={onOpenAddFilm}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.4)] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Film Project</span>
              </button>
            </div>
          </div>

          {creatorFilms.length === 0 ? (
            <div className="p-12 text-center bg-[#0e0e12] border border-dashed border-white/15 rounded-3xl space-y-4">
              <FilmIcon className="w-12 h-12 text-white/30 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-cinematic font-bold text-white">No Submitted Films Yet</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto">
                  Add your completed or in-production feature film to appear in the Stage Films public catalog and access our acquisitions board.
                </p>
              </div>
              <button
                onClick={onOpenAddFilm}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(229,9,20,0.3)] cursor-pointer"
              >
                Submit First Project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Master Control & Bulk Actions Bar */}
              <div className="bg-[#0e0e12] border border-white/10 rounded-2xl p-4 transition-all">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Select All Checkbox & Count */}
                  <div className="flex items-center space-x-3">
                    <button
                      id="bulk-select-all-btn"
                      onClick={handleToggleSelectAll}
                      className="flex items-center space-x-2.5 text-xs font-bold uppercase tracking-wider text-white hover:text-red-400 transition-colors cursor-pointer group"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isAllSelected 
                          ? 'bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(229,9,20,0.5)]'
                          : isPartiallySelected
                          ? 'bg-red-600/30 border-red-500 text-white'
                          : 'bg-black/40 border-white/25 text-transparent group-hover:border-white/50'
                      }`}>
                        {isAllSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        {isPartiallySelected && <MinusSquare className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="font-mono-tech">
                        {isAllSelected ? 'Deselect All' : 'Select All'} ({creatorFilms.length})
                      </span>
                    </button>

                    {selectedFilmIds.length > 0 && (
                      <span className="bg-red-600/20 text-red-400 border border-red-600/40 text-[11px] font-mono-tech font-bold px-2.5 py-0.5 rounded-full">
                        {selectedFilmIds.length} Selected
                      </span>
                    )}
                  </div>

                  {/* Bulk Actions Controls (Visible when at least 1 film selected) */}
                  {selectedFilmIds.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                      {/* Bulk Change Status Dropdown */}
                      <div className="flex items-center space-x-2 bg-black/60 border border-white/15 rounded-xl px-2.5 py-1.5">
                        <span className="text-[10px] text-white/50 uppercase font-mono-tech whitespace-nowrap">
                          Set Status:
                        </span>
                        <select
                          id="bulk-status-select"
                          value={bulkStatusToApply}
                          onChange={(e) => setBulkStatusToApply(e.target.value as ReleaseStatus)}
                          className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="festival_circuit" className="bg-zinc-900 text-white">Festival Circuit</option>
                          <option value="coming_soon" className="bg-zinc-900 text-white">Coming Soon</option>
                          <option value="in_theaters" className="bg-zinc-900 text-white">In Theaters</option>
                          <option value="digital_vod" className="bg-zinc-900 text-white">Digital & VOD</option>
                          <option value="bluray_physical" className="bg-zinc-900 text-white">4K UHD & Blu-ray</option>
                        </select>
                        <button
                          id="bulk-apply-status-btn"
                          onClick={handleApplyBulkStatus}
                          className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase rounded-lg transition-all cursor-pointer shadow-[0_0_10px_rgba(229,9,20,0.3)]"
                        >
                          Apply
                        </button>
                      </div>

                      {/* Bulk Delete Button */}
                      <button
                        id="bulk-delete-selected-btn"
                        onClick={handleExecuteBulkDelete}
                        className="px-3 py-2 bg-red-950/80 hover:bg-red-900 border border-red-600/50 text-red-300 hover:text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Selected ({selectedFilmIds.length})</span>
                      </button>

                      {/* Clear Selection Button */}
                      <button
                        onClick={handleClearSelection}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
                        title="Clear selection"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] text-white/40 font-mono-tech hidden sm:block">
                      Select multiple films below to perform batch deletions or status updates.
                    </div>
                  )}
                </div>
              </div>

              {/* Film Cards List with Checkboxes */}
              <div className="grid grid-cols-1 gap-4">
                {creatorFilms.map((film) => {
                  const isSelected = selectedFilmIds.includes(film.id);

                  return (
                    <div
                      key={film.id}
                      className={`bg-[#0e0e12] border rounded-2xl p-4 sm:p-6 transition-all duration-200 ${
                        isSelected 
                          ? 'border-red-600/70 bg-[#140c10] shadow-[0_0_25px_rgba(229,9,20,0.15)] ring-1 ring-red-600/30'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        {/* Checkbox + Poster + Meta */}
                        <div className="flex items-start sm:items-center space-x-4 min-w-0 w-full lg:w-auto">
                          {/* Item Checkbox */}
                          <button
                            id={`film-checkbox-${film.id}`}
                            onClick={() => handleToggleSelectFilm(film.id)}
                            className="mt-1 sm:mt-0 p-1 -ml-1 text-white hover:text-red-400 cursor-pointer flex-shrink-0"
                            aria-label={`Select ${film.title}`}
                          >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              isSelected 
                                ? 'bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(229,9,20,0.5)]'
                                : 'bg-black/50 border-white/30 text-transparent hover:border-white/60'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>

                          <img
                            src={film.posterUrl}
                            alt={film.title}
                            className="w-20 h-28 object-cover rounded-xl border border-white/15 flex-shrink-0 shadow-lg"
                          />

                          <div className="space-y-1.5 min-w-0 flex-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <span className="px-2 py-0.5 bg-red-600/15 text-red-400 border border-red-600/40 text-[10px] font-mono-tech uppercase font-bold rounded-md">
                                {film.releaseStatus.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-white/70 border border-white/15 px-1.5 py-0.2 rounded-md font-bold">
                                {film.rating}
                              </span>
                              <span className="text-xs text-white/50 font-mono-tech">{film.releaseYear}</span>
                              <span className="text-white/30">•</span>
                              <span className="text-xs text-white/50">{film.runtimeMinutes}m</span>
                              {film.isFeatured && (
                                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono-tech uppercase font-bold px-1.5 py-0.2 rounded-md">
                                  Featured
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg sm:text-xl font-cinematic font-bold text-white truncate">
                              {film.title}
                            </h3>

                            <p className="text-xs text-white/60 line-clamp-1 max-w-xl">
                              {film.synopsis}
                            </p>

                            <div className="flex items-center space-x-3 text-[11px] text-white/40 pt-0.5">
                              <span>Dir: <strong className="text-white/80">{film.director}</strong></span>
                              <span>•</span>
                              <span>Specs: <strong className="text-white/70">{film.technicalSpecs.aspectRatio}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Status Select & Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto justify-end">
                          {/* Individual Status Dropdown */}
                          <div className="w-full sm:w-auto">
                            <label className="block text-[10px] text-white/50 uppercase font-mono-tech mb-1">
                              Catalog Status
                            </label>
                            <select
                              value={film.releaseStatus}
                              onChange={(e) => onUpdateFilmStatus(film.id, e.target.value as ReleaseStatus)}
                              className="w-full sm:w-auto bg-black/60 border border-white/15 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-red-600 font-medium cursor-pointer"
                            >
                              <option value="festival_circuit" className="bg-zinc-900 text-white">Festival Circuit</option>
                              <option value="coming_soon" className="bg-zinc-900 text-white">Coming Soon</option>
                              <option value="in_theaters" className="bg-zinc-900 text-white">In Theaters</option>
                              <option value="digital_vod" className="bg-zinc-900 text-white">Digital & VOD</option>
                              <option value="bluray_physical" className="bg-zinc-900 text-white">4K UHD & Blu-ray</option>
                            </select>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center space-x-2 pt-4 sm:pt-0">
                            <button
                              onClick={() => onOpenScreenerRoom(film)}
                              className="px-3 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Open Watermarked Screener"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Screener</span>
                            </button>

                            <button
                              onClick={() => handleCopyScreener(film)}
                              className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 rounded-xl text-xs transition-colors cursor-pointer"
                              title="Copy VIP Screener Access Info"
                            >
                              {copiedId === film.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => onOpenEditFilm(film)}
                              className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 rounded-xl text-xs transition-colors cursor-pointer"
                              title="Edit Film Details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onSelectFilm(film)}
                              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                              View Card
                            </button>

                            <button
                              onClick={() => onDeleteFilm(film.id)}
                              className="p-2 bg-white/5 hover:bg-red-950/80 border border-white/15 hover:border-red-500/60 text-white/60 hover:text-red-400 rounded-xl text-xs transition-colors cursor-pointer"
                              title="Delete Film"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Acquisitions Review Board */}
      {activeTab === 'acquisitions' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono-tech">
                Hulu Production. New York Pipeline
              </span>
              <h2 className="text-2xl font-cinematic font-bold text-white mt-1">
                Active Acquisitions Review Stages
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Real-time tracking of creative evaluation, test screening ratings, and distribution terms.
              </p>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { stage: '1. Metadata & Screener Intake', status: 'Completed', color: 'emerald', desc: 'Screener files, DCP specs, and rights verified.' },
                { stage: '2. Creative Coverage', status: 'Completed', color: 'emerald', desc: 'Reader notes & genre suitability report cleared.' },
                { stage: '3. Senior Acquisitions Review', status: 'In Progress', color: 'red', desc: 'New York studio team evaluating streaming and theatrical windows.' },
                { stage: '4. Deal Terms & Greenlight', status: 'Pending', color: 'zinc', desc: 'Minimum guarantee & streaming rights packaging.' },
              ].map((step, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-tech text-white/40 font-bold">Step 0{i + 1}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      step.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : step.status === 'In Progress'
                        ? 'bg-red-600/20 text-red-400 border border-red-600/40 animate-pulse'
                        : 'bg-white/5 text-white/40'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-cinematic font-bold text-white">{step.stage}</h4>
                  <p className="text-xs text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Executive Notes Callout */}
            <div className="p-5 bg-red-600/10 border border-red-600/30 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-red-400 uppercase font-mono-tech">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Stage Films Acquisitions Executive Notes:</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                "We are impressed with the high production value, immersive sound mix, and festival traction. The current pitch has been escalated to the Hulu Production. New York theatrical and streaming division for release scheduling."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Screener Security & Passes */}
      {activeTab === 'screeners' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono-tech">
                Passcode Encryption & DRM Access
              </span>
              <h2 className="text-2xl font-cinematic font-bold text-white mt-1">
                VIP Screener Management & Access Logs
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Monitor authorized screener sessions, watermarking signatures, and festival jury views.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-2">
                <span className="text-xs text-white/50 uppercase font-mono-tech font-bold">Default VIP Passcode</span>
                <p className="text-2xl font-mono-tech font-bold text-red-500">STAGE-HORIZON</p>
                <p className="text-[11px] text-white/40">Shared with authenticated Hulu Production acquisitions executives.</p>
              </div>

              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-2">
                <span className="text-xs text-white/50 uppercase font-mono-tech font-bold">Dynamic Watermarking</span>
                <p className="text-2xl font-mono-tech font-bold text-emerald-400">ENABLED</p>
                <p className="text-[11px] text-white/40">Burned in timestamp & executive name overlay.</p>
              </div>

              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-2">
                <span className="text-xs text-white/50 uppercase font-mono-tech font-bold">Geographic Restrictions</span>
                <p className="text-2xl font-mono-tech font-bold text-white">WORLDWIDE</p>
                <p className="text-[11px] text-white/40">Encrypted token validation across all territories.</p>
              </div>
            </div>

            {/* Simulated Live Access Log */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider font-mono-tech">
                Recent VIP Screener Access Telemetry
              </h3>
              <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden text-xs bg-black/40 font-mono-tech">
                {[
                  { user: 'Hulu Production Exec (New York, NY)', time: '12 minutes ago', duration: '94 min (Full Watch)', status: 'Verified' },
                  { user: 'Sundance Midnight Jury Member (Park City, UT)', time: '2 hours ago', duration: '104 min (Full Watch)', status: 'Verified' },
                  { user: 'Sitges Festival Programmer (Barcelona, ES)', time: 'Yesterday', duration: '88 min', status: 'Verified' },
                ].map((log, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 text-white/80">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{log.user}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-white/50">
                      <span>{log.duration}</span>
                      <span className="text-white/20 hidden sm:inline">•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EPK & Pitch Deck */}
      {activeTab === 'epk' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e12] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono-tech">
                Electronic Press Kit (EPK) Generator
              </span>
              <h2 className="text-2xl font-cinematic font-bold text-white mt-1">
                Export One-Sheet & Pitch Deck
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Generate shareable one-sheets and technical specs for festivals, press outlets, and buyers.
              </p>
            </div>

            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4 font-mono-tech text-xs text-white/80">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-red-500 font-bold">STAGE FILMS CREATOR ONE-SHEET</span>
                <span className="text-white/40">CONFIDENTIAL</span>
              </div>
              <div className="space-y-1 text-white/70">
                <p><strong className="text-white">CREATOR:</strong> {currentUser.name} ({currentUser.company})</p>
                <p><strong className="text-white">PROJECTS:</strong> {creatorFilms.map((f) => f.title).join(', ') || 'Pending Submissions'}</p>
                <p><strong className="text-white">DISTRIBUTION TARGET:</strong> Hulu Production. New York / Worldwide Theatrical</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `STAGE FILMS CREATOR EPK\nCreator: ${currentUser.name}\nStudio: ${currentUser.company}\nProjects: ${creatorFilms.map(f => f.title).join(', ')}`
                    );
                    alert('Electronic Press Kit summary copied to clipboard!');
                  }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-xl text-xs transition-colors cursor-pointer shadow-[0_0_15px_rgba(229,9,20,0.3)]"
                >
                  Copy One-Sheet Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
