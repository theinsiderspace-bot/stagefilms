import React, { useState } from 'react';
import { Film, Genre, ContentRating, BudgetTier } from '../../types';
import { PRESET_FILM_ASSETS, DEMO_TRAILER_URLS } from '../../data/presetAssets';
import { 
  X, Check, Film as FilmIcon, Sparkles, Image, Video, Users, 
  Lock, ArrowRight, ArrowLeft, ShieldCheck, Eye, HelpCircle 
} from 'lucide-react';

interface AddFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveFilm: (newFilm: Film) => void;
  creatorName: string;
  creatorId: string;
  editFilmData?: Film | null;
}

const GENRE_LIST: Genre[] = [
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Action',
  'Drama',
  'Comedy',
  'Mystery',
  'Indie',
  'Documentary'
];

export const AddFilmModal: React.FC<AddFilmModalProps> = ({
  isOpen,
  onClose,
  onSaveFilm,
  creatorName,
  creatorId,
  editFilmData,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [title, setTitle] = useState(editFilmData?.title || '');
  const [tagline, setTagline] = useState(editFilmData?.tagline || '');
  const [synopsis, setSynopsis] = useState(editFilmData?.synopsis || '');
  const [releaseYear, setReleaseYear] = useState(editFilmData?.releaseYear || 2025);
  const [rating, setRating] = useState<ContentRating>(editFilmData?.rating || 'R');
  const [runtimeMinutes, setRuntimeMinutes] = useState(editFilmData?.runtimeMinutes || 102);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(editFilmData?.genres || ['Sci-Fi', 'Thriller']);
  
  // Media State
  const [posterUrl, setPosterUrl] = useState(editFilmData?.posterUrl || PRESET_FILM_ASSETS[0].posterUrl);
  const [backdropUrl, setBackdropUrl] = useState(editFilmData?.backdropUrl || PRESET_FILM_ASSETS[0].backdropUrl);
  const [trailerUrl, setTrailerUrl] = useState(editFilmData?.trailerUrl || DEMO_TRAILER_URLS[0].url);

  // Credits State
  const [director, setDirector] = useState(editFilmData?.director || creatorName);
  const [writers, setWriters] = useState(editFilmData?.writers?.join(', ') || creatorName);
  const [producers, setProducers] = useState(editFilmData?.producers?.join(', ') || 'Independent Producers Group');
  const [cast, setCast] = useState(editFilmData?.cast?.join(', ') || 'Lead Actor, Supporting Cast');
  const [studio, setStudio] = useState(editFilmData?.studio || 'Creator Indie Studio');
  const [distributor, setDistributor] = useState(editFilmData?.distributor || 'Stage Films Acquisitions Pipeline');

  // Screener & Technical Specs
  const [screenerPasscode, setScreenerPasscode] = useState(editFilmData?.screenerPasscode || 'STAGE-VIP');
  const [isScreenerProtected, setIsScreenerProtected] = useState(editFilmData?.isScreenerProtected !== false);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>(editFilmData?.budgetTier || 'Indie ($1M - $5M)');
  const [aspectRatio, setAspectRatio] = useState(editFilmData?.technicalSpecs?.aspectRatio || '2.39:1 DCI 4K Scope');
  const [soundMix, setSoundMix] = useState(editFilmData?.technicalSpecs?.soundMix || 'Dolby Atmos 7.1.4');
  const [camera, setCamera] = useState(editFilmData?.technicalSpecs?.camera || 'Arri Alexa 35');
  const [color, setColor] = useState(editFilmData?.technicalSpecs?.color || 'ACES Color Pipeline');
  
  // Pitch & Status
  const [pitchDeckNotes, setPitchDeckNotes] = useState(editFilmData?.pitchDeckNotes || 'Seeking global theatrical or streaming distribution with Hulu Production. New York.');
  const [laurels, setLaurels] = useState(editFilmData?.laurels?.join(', ') || 'Official Selection - Sundance Film Festival');
  const [releaseStatus, setReleaseStatus] = useState<Film['releaseStatus']>(editFilmData?.releaseStatus || 'festival_circuit');

  if (!isOpen) return null;

  const toggleGenre = (g: Genre) => {
    if (selectedGenres.includes(g)) {
      if (selectedGenres.length > 1) {
        setSelectedGenres(selectedGenres.filter((item) => item !== g));
      }
    } else {
      setSelectedGenres([...selectedGenres, g]);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_FILM_ASSETS[0]) => {
    setPosterUrl(preset.posterUrl);
    setBackdropUrl(preset.backdropUrl);
    if (!selectedGenres.includes(preset.genre as Genre)) {
      setSelectedGenres([preset.genre as Genre, ...selectedGenres]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const filmData: Film = {
      id: editFilmData?.id || `creator-film-${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline.trim() || 'A Stage Films Creator Production',
      synopsis: synopsis.trim() || 'A compelling new independent feature film.',
      releaseYear: Number(releaseYear),
      rating: rating,
      runtimeMinutes: Number(runtimeMinutes),
      genres: selectedGenres,
      releaseStatus: releaseStatus,
      releaseDateText: releaseStatus === 'in_theaters' ? 'Now In Theaters' : releaseStatus === 'digital_vod' ? 'Now on Digital' : 'Festival Circuit & Acquisitions Review',
      posterUrl: posterUrl.trim(),
      backdropUrl: backdropUrl.trim(),
      trailerUrl: trailerUrl.trim(),
      director: director.trim(),
      writers: writers.split(',').map((w) => w.trim()).filter(Boolean),
      producers: producers.split(',').map((p) => p.trim()).filter(Boolean),
      cast: cast.split(',').map((c) => c.trim()).filter(Boolean),
      studio: studio.trim(),
      distributor: distributor.trim(),
      laurels: laurels ? laurels.split(',').map((l) => l.trim()).filter(Boolean) : [],
      technicalSpecs: {
        aspectRatio: aspectRatio.trim(),
        soundMix: soundMix.trim(),
        camera: camera.trim(),
        color: color.trim(),
        runtimeMinutes: Number(runtimeMinutes),
      },
      watchLinks: {
        sonyPicturesStore: 'https://www.sonypictures.com',
      },
      isFeatured: true,
      isStage6Original: false,
      isCreatorSubmission: true,
      creatorId: creatorId,
      creatorName: creatorName,
      screenerPasscode: screenerPasscode.trim().toUpperCase(),
      isScreenerProtected: isScreenerProtected,
      screenerUrl: `https://screener.stagefilms.com/v/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      pitchDeckNotes: pitchDeckNotes.trim(),
      budgetTier: budgetTier,
      createdAt: editFilmData?.createdAt || new Date().toISOString().split('T')[0],
      acquisitionsStatus: editFilmData?.acquisitionsStatus || 'under_review',
      executiveFeedback: editFilmData?.executiveFeedback || 'Stage Films Acquisitions Executive Board: Project logged into primary review queue. Screener access verified.'
    };

    onSaveFilm(filmData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#111319] border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl my-6 text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-black/80 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-600/40 flex items-center justify-center text-red-500 font-bold shadow-[0_0_12px_rgba(229,9,20,0.2)]">
              <FilmIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-cinematic font-bold text-white text-base sm:text-lg">
                {editFilmData ? 'Edit Creator Film Project' : 'Add New Film / Pitch to Stage Films'}
              </h2>
              <p className="text-[11px] text-white/50 font-mono-tech">
                CREATOR PIPELINE • STEP {step} OF 5
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 bg-black/50 border-b border-white/10 text-[11px] font-mono-tech">
          {[
            { num: 1, label: 'Metadata' },
            { num: 2, label: 'Media & Posters' },
            { num: 3, label: 'Credits' },
            { num: 4, label: 'Screener & Specs' },
            { num: 5, label: 'Pitch & Preview' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num as any)}
              className={`py-2.5 px-2 text-center border-b-2 transition-all cursor-pointer ${
                step === s.num
                  ? 'border-red-600 text-red-500 font-bold bg-red-600/10'
                  : step > s.num
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-white/40'
              }`}
            >
              <span className="hidden sm:inline">{s.num}. </span>{s.label}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Metadata */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Film Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Echoes of the Deep Void"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-sm text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  placeholder="e.g. In the shadows of the deep, the truth emerges."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Release Year
                  </label>
                  <input
                    type="number"
                    min={2000}
                    max={2030}
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Content Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value as ContentRating)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  >
                    <option value="G">G - General Audiences</option>
                    <option value="PG">PG - Parental Guidance</option>
                    <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                    <option value="R">R - Restricted</option>
                    <option value="NC-17">NC-17 - Adults Only</option>
                    <option value="Not Rated">Not Rated / Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Runtime (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={360}
                    value={runtimeMinutes}
                    onChange={(e) => setRuntimeMinutes(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  Select Primary Genres (Multi-select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRE_LIST.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        selectedGenres.includes(g)
                          ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                          : 'bg-black/60 border border-white/15 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {selectedGenres.includes(g) ? '✓ ' : ''}{g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Full Synopsis / Logline *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed narrative synopsis of the film..."
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-600 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Media & Artwork */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Preset Visuals Quick Picker */}
              <div className="p-4 bg-black/40 border border-red-600/30 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 font-mono-tech">
                  <Sparkles className="w-3.5 h-3.5" />
                  Quick Cinematic Presets (Click to apply poster & backdrop):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                  {PRESET_FILM_ASSETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="group relative rounded-xl overflow-hidden border border-white/15 hover:border-red-600 text-left transition-all cursor-pointer"
                    >
                      <img
                        src={preset.posterUrl}
                        alt={preset.name}
                        className="w-full h-20 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="p-1 bg-black/80 text-[10px] truncate text-white/80">
                        {preset.genre}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Poster Image URL (2:3 Aspect) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                  />
                  {posterUrl && (
                    <div className="mt-2 w-24 h-36 rounded-xl overflow-hidden border border-white/15 bg-black">
                      <img src={posterUrl} alt="Poster preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Backdrop Hero URL (16:9 Aspect) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={backdropUrl}
                    onChange={(e) => setBackdropUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                  />
                  {backdropUrl && (
                    <div className="mt-2 w-full h-36 rounded-xl overflow-hidden border border-white/15 bg-black">
                      <img src={backdropUrl} alt="Backdrop preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Trailer Embed URL (YouTube embed or MP4) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/embed/..."
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-[11px] text-white/50">Sample Trailers:</span>
                  {DEMO_TRAILER_URLS.slice(0, 3).map((demo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTrailerUrl(demo.url)}
                      className="text-[10px] text-red-400 hover:underline bg-white/5 px-2 py-0.5 rounded-lg border border-white/10 cursor-pointer"
                    >
                      Preset {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Credits & Filmmakers */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Director *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Director Name"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Writers (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Screenplay Writer 1, Writer 2"
                    value={writers}
                    onChange={(e) => setWriters(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Producers (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Producer 1, Executive Producer 2"
                    value={producers}
                    onChange={(e) => setProducers(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Principal Cast (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Actor 1, Actor 2, Actor 3"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Production Company / Studio
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Midnight Horizon Pictures"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Distribution Label Pipeline
                  </label>
                  <input
                    type="text"
                    placeholder="Stage Films Acquisitions Pipeline"
                    value={distributor}
                    onChange={(e) => setDistributor(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Screener & Technical Specs */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    Screener Security & Passcode Protection
                  </span>
                  <label className="flex items-center space-x-2 text-xs text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isScreenerProtected}
                      onChange={(e) => setIsScreenerProtected(e.target.checked)}
                      className="rounded text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Require Passcode</span>
                  </label>
                </div>

                {isScreenerProtected && (
                  <div className="space-y-1">
                    <label className="block text-[11px] text-white/50 uppercase">
                      VIP Screener Passcode (for Stage Films Execs & Jurors)
                    </label>
                    <input
                      type="text"
                      value={screenerPasscode}
                      onChange={(e) => setScreenerPasscode(e.target.value.toUpperCase())}
                      className="w-full sm:w-64 bg-black/70 border border-emerald-500/60 text-xs text-white px-3 py-2 rounded-xl font-mono-tech font-bold uppercase tracking-wider"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Budget Tier
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value as BudgetTier)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  >
                    <option value="Micro-Budget (< $1M)">Micro-Budget (&lt; $1M)</option>
                    <option value="Indie ($1M - $5M)">Indie ($1M - $5M)</option>
                    <option value="Mid-Tier ($5M - $20M)">Mid-Tier ($5M - $20M)</option>
                    <option value="Studio Tier ($20M+)">Studio Tier ($20M+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Aspect Ratio
                  </label>
                  <input
                    type="text"
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600 font-mono-tech"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Sound Mix Format
                  </label>
                  <input
                    type="text"
                    value={soundMix}
                    onChange={(e) => setSoundMix(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2 rounded-xl font-mono-tech"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Camera Rig
                  </label>
                  <input
                    type="text"
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2 rounded-xl font-mono-tech"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Color Pipeline
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2 rounded-xl font-mono-tech"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Pitch Strategy & Live Preview */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Festival Laurels / World Premiere
                  </label>
                  <input
                    type="text"
                    placeholder="Sundance, TIFF, Sitges, SXSW..."
                    value={laurels}
                    onChange={(e) => setLaurels(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Initial Status in Stage Films Catalog
                  </label>
                  <select
                    value={releaseStatus}
                    onChange={(e) => setReleaseStatus(e.target.value as any)}
                    className="w-full bg-black/60 border border-white/15 text-xs text-white px-3 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                  >
                    <option value="festival_circuit">Festival Circuit (In Acquisitions Review)</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="in_theaters">In Theaters</option>
                    <option value="digital_vod">Digital & VOD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Director's Statement & Stage Films Acquisitions Pitch Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Target audience, international distribution goals, and technical summary for Hulu Production acquisitions executives..."
                  value={pitchDeckNotes}
                  onChange={(e) => setPitchDeckNotes(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-600 leading-relaxed"
                />
              </div>

              {/* Live Preview Card */}
              <div className="p-4 bg-black/50 border border-white/10 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider font-mono-tech">
                  Catalog Preview Card:
                </span>
                <div className="flex items-center space-x-4">
                  <img src={posterUrl} alt="Preview" className="w-16 h-24 object-cover rounded-xl border border-white/15" />
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-xs text-red-500 font-bold uppercase">{releaseStatus.replace('_', ' ')}</p>
                    <h4 className="font-cinematic font-bold text-white text-base truncate">{title || 'Untitled Film'}</h4>
                    <p className="text-xs text-white/60 truncate">{director} • {selectedGenres.join(', ')} • {releaseYear}</p>
                    <p className="text-[11px] text-white/40 line-clamp-1">{synopsis}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-colors cursor-pointer"
              >
                <span>Next: Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="submit-film-final-btn"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(229,9,20,0.6)] flex items-center gap-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{editFilmData ? 'Update & Publish Changes' : 'Submit Film to Stage Films Pipeline'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
