import React, { useState } from 'react';
import { Film } from '../types';
import { 
  X, Play, Bookmark, ExternalLink, ShieldCheck, Lock, Unlock, 
  Award, Film as FilmIcon, Check, Clapperboard, Video, Sparkles, Share2
} from 'lucide-react';

interface FilmDetailsModalProps {
  film: Film | null;
  onClose: () => void;
  onPlayTrailer: (film: Film) => void;
  isBookmarked: boolean;
  onToggleBookmark: (filmId: string) => void;
  onOpenScreenerRoom?: (film: Film) => void;
}

export const FilmDetailsModal: React.FC<FilmDetailsModalProps> = ({
  film,
  onClose,
  onPlayTrailer,
  isBookmarked,
  onToggleBookmark,
  onOpenScreenerRoom,
}) => {
  const [screenerInputPasscode, setScreenerInputPasscode] = useState('');
  const [screenerUnlocked, setScreenerUnlocked] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!film) return null;

  const handleVerifyScreenerPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!film.screenerPasscode || screenerInputPasscode.trim().toUpperCase() === film.screenerPasscode.toUpperCase() || screenerInputPasscode.trim() === 'STAGE6') {
      setScreenerUnlocked(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid screener passcode. Contact the creator or acquisitions rep for VIP access.');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0e0e12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="film-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/70 hover:text-white border border-white/15 transition-colors shadow-lg cursor-pointer"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Header with Trailer Button */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-black overflow-hidden">
          <img
            src={film.backdropUrl}
            alt={film.title}
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-vignette opacity-60" />

          {/* Quick Play Trailer Floating Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              id={`modal-play-trailer-hero-${film.id}`}
              onClick={() => onPlayTrailer(film)}
              className="group flex items-center space-x-3 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-xs sm:text-sm tracking-wider rounded-full shadow-[0_0_30px_rgba(229,9,20,0.6)] transform transition-all group-hover:scale-105 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Official Trailer</span>
            </button>
          </div>

          {/* Top Label & Status */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-red-400 font-mono-tech text-xs uppercase tracking-wider rounded-lg font-bold">
              {film.releaseDateText}
            </span>
            {film.isCreatorSubmission && (
              <span className="px-3 py-1 bg-emerald-600/90 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" /> Registered Creator Film
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Title & Action Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-3 text-xs text-white/50 font-medium mb-1.5">
                <span className="border border-white/15 text-white/90 px-2 py-0.5 rounded-md font-bold bg-white/5">
                  {film.rating}
                </span>
                <span className="font-mono-tech text-red-400 font-semibold">{film.releaseYear}</span>
                <span>•</span>
                <span>{film.runtimeMinutes} Minutes</span>
                <span>•</span>
                <span>{film.genres.join(', ')}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-cinematic font-black text-white">
                {film.title}
              </h2>
              {film.tagline && (
                <p className="text-sm sm:text-base text-red-400/90 italic mt-1.5">"{film.tagline}"</p>
              )}
            </div>

            {/* Actions: Bookmark & Share */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => onToggleBookmark(film.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-red-600 text-white border-red-600 shadow-[0_0_12px_rgba(229,9,20,0.5)]'
                    : 'bg-white/[0.05] border-white/15 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-white/[0.05] border border-white/15 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Festival Laurels & Accolades */}
          {film.laurels && film.laurels.length > 0 && (
            <div className="bg-red-600/10 border border-red-600/30 rounded-2xl p-4 flex items-center space-x-3 shadow-[0_0_15px_rgba(229,9,20,0.15)]">
              <Award className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-red-400">Festival Laurels & Honors</p>
                <p className="text-xs text-white/80">{film.laurels.join('  •  ')}</p>
              </div>
            </div>
          )}

          {/* Synopsis & Watch Retailers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono-tech">
                  Synopsis
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {film.synopsis}
                </p>
              </div>

              {/* Cast & Filmmaker Credits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-xs">
                <div>
                  <span className="text-white/40 uppercase font-semibold">Director</span>
                  <p className="text-white font-bold mt-0.5">{film.director}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-semibold">Writers</span>
                  <p className="text-white font-bold mt-0.5">{film.writers.join(', ')}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-semibold">Producers</span>
                  <p className="text-white font-bold mt-0.5">{film.producers.join(', ')}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-semibold">Starring</span>
                  <p className="text-white font-bold mt-0.5">{film.cast.join(', ')}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-semibold">Production Company</span>
                  <p className="text-white font-bold mt-0.5">{film.studio}</p>
                </div>
                <div>
                  <span className="text-white/40 uppercase font-semibold">Worldwide Distribution</span>
                  <p className="text-white font-bold mt-0.5">{film.distributor}</p>
                </div>
              </div>

              {/* Critic Reviews / Quotes */}
              {film.reviews && film.reviews.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 font-mono-tech">
                    Critical Reception
                  </h3>
                  <div className="space-y-3">
                    {film.reviews.map((rev, i) => (
                      <div key={i} className="border-l-2 border-red-600 pl-4 py-1">
                        <p className="text-xs sm:text-sm text-white/80 italic">"{rev.quote}"</p>
                        <p className="text-[11px] text-white/40 mt-1 font-semibold">
                          — {rev.critic}, <span className="text-white/60">{rev.publication}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Watch Links + Technical Specs + Screener Gate */}
            <div className="space-y-6">
              {/* Where to Watch / Buy Box */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 font-mono-tech">
                  <FilmIcon className="w-3.5 h-3.5 text-red-500" />
                  Where to Watch & Rent
                </h3>

                <div className="space-y-2 text-xs">
                  {film.watchLinks.sonyPicturesStore && (
                    <a
                      href={film.watchLinks.sonyPicturesStore}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
                    >
                      <span className="font-semibold">Hulu Production. New York Hub</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                  {film.watchLinks.appleTv && (
                    <a
                      href={film.watchLinks.appleTv}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
                    >
                      <span>Apple TV / iTunes</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                  {film.watchLinks.amazonPrime && (
                    <a
                      href={film.watchLinks.amazonPrime}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
                    >
                      <span>Amazon Prime Video</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                  {film.watchLinks.fandango && (
                    <a
                      href={film.watchLinks.fandango}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
                    >
                      <span>Fandango Showtimes & Tickets</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                  {film.watchLinks.moviesAnywhere && (
                    <a
                      href={film.watchLinks.moviesAnywhere}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5"
                    >
                      <span>Movies Anywhere</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white/50" />
                    </a>
                  )}
                </div>
              </div>

              {/* Creator Private Screener Room Access */}
              {film.isCreatorSubmission && (
                <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    {screenerUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>Private Screener Gate</span>
                  </div>

                  <p className="text-[11px] text-white/70">
                    This film is registered with the Stage Films Creator Submissions Pipeline. Authorized executives, festival juries, and distributors can view the full screener.
                  </p>

                  {screenerUnlocked ? (
                    <div className="space-y-2 pt-1">
                      <div className="p-2 bg-emerald-900/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-200">
                        ✓ VIP Passcode Verified. Full watermark screener access unlocked.
                      </div>
                      <button
                        id="open-screener-room-btn"
                        onClick={() => {
                          onClose();
                          if (onOpenScreenerRoom) onOpenScreenerRoom(film);
                        }}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch Secure Screener Room</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleVerifyScreenerPass} className="space-y-2">
                      <div className="text-[10px] text-white/50">
                        Demo Passcode: <span className="font-mono-tech text-red-400 font-bold">{film.screenerPasscode || 'STAGE6'}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Screener Passcode"
                          value={screenerInputPasscode}
                          onChange={(e) => setScreenerInputPasscode(e.target.value)}
                          className="flex-1 bg-black border border-white/20 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-500 text-white font-mono-tech uppercase"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Unlock
                        </button>
                      </div>
                      {passcodeError && (
                        <p className="text-[11px] text-red-400 font-medium">{passcodeError}</p>
                      )}
                    </form>
                  )}
                </div>
              )}

              {/* Technical Specs Panel */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-2.5 text-xs">
                <h3 className="font-bold text-white/50 uppercase tracking-wider font-mono-tech text-[11px]">
                  Technical Specs
                </h3>
                <div className="space-y-2 text-white/80 font-mono-tech text-[11px]">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-white/40">Aspect Ratio:</span>
                    <span>{film.technicalSpecs.aspectRatio}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-white/40">Sound Mix:</span>
                    <span>{film.technicalSpecs.soundMix}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span className="text-white/40">Camera / Format:</span>
                    <span>{film.technicalSpecs.camera}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Color Grading:</span>
                    <span>{film.technicalSpecs.color}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
