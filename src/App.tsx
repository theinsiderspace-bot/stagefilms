import React, { useState, useEffect } from 'react';
import { Film, CreatorUser, Genre, ReleaseStatus } from './types';
import { STAGE_6_FILMS, INITIAL_CREATORS } from './data/mockFilms';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FilmFilterBar } from './components/FilmFilterBar';
import { FilmCard } from './components/FilmCard';
import { FilmDetailsModal } from './components/FilmDetailsModal';
import { TrailerModal } from './components/TrailerModal';
import { TrailersSection } from './components/TrailersSection';
import { WhatsNewSection } from './components/WhatsNewSection';
import { AboutStage6Section } from './components/AboutStage6Section';
import { AuthModal } from './components/AuthModal';
import { CreatorDashboardView } from './components/CreatorDashboard/CreatorDashboardView';
import { AddFilmModal } from './components/CreatorDashboard/AddFilmModal';
import { ScreenerRoomModal } from './components/CreatorDashboard/ScreenerRoomModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { Footer } from './components/Footer';
import { Film as FilmIcon, Sparkles, Clapperboard, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation tab
  const [currentTab, setCurrentTab] = useState<'home' | 'movies' | 'trailers' | 'whats-new' | 'about' | 'creator-dashboard'>('home');

  // Persistence: Films State
  const [films, setFilms] = useState<Film[]>(() => {
    try {
      const saved = localStorage.getItem('stage6_films_catalog_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed loading saved films from localStorage', e);
    }
    return STAGE_6_FILMS;
  });

  // Persistence: Authenticated Creator User
  const [currentUser, setCurrentUser] = useState<CreatorUser | null>(() => {
    try {
      const savedUser = localStorage.getItem('stage6_creator_session');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed loading creator user session', e);
    }
    return INITIAL_CREATORS[0]; // Default logged-in as demo Director Elena Rostova for immediate access
  });

  // Watchlist State
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stage6_watchlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['paddington-in-peru', 'a-big-bold-beautiful-journey'];
  });

  // Filter & Search State
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ReleaseStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'year-desc' | 'year-asc' | 'title'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [onlyCreatorSubmissions, setOnlyCreatorSubmissions] = useState(false);

  // Modals & Drawers
  const [selectedFilmForDetails, setSelectedFilmForDetails] = useState<Film | null>(null);
  const [selectedFilmForTrailer, setSelectedFilmForTrailer] = useState<Film | null>(null);
  const [selectedFilmForScreener, setSelectedFilmForScreener] = useState<Film | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddFilmModalOpen, setIsAddFilmModalOpen] = useState(false);
  const [filmToEdit, setFilmToEdit] = useState<Film | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('stage6_films_catalog_v1', JSON.stringify(films));
    } catch (e) {}
  }, [films]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('stage6_creator_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('stage6_creator_session');
      }
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('stage6_watchlist', JSON.stringify(watchlistIds));
    } catch (e) {}
  }, [watchlistIds]);

  // Auth Handlers
  const handleLoginSuccess = (user: CreatorUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    setCurrentTab('creator-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (currentTab === 'creator-dashboard') {
      setCurrentTab('home');
    }
  };

  // Watchlist Handlers
  const handleToggleBookmark = (filmId: string) => {
    setWatchlistIds((prev) =>
      prev.includes(filmId) ? prev.filter((id) => id !== filmId) : [...prev, filmId]
    );
  };

  const bookmarkedFilms = films.filter((f) => watchlistIds.includes(f.id));

  // Film Management Handlers (Creator Studio)
  const handleSaveFilm = (filmData: Film) => {
    setFilms((prev) => {
      const exists = prev.some((f) => f.id === filmData.id);
      if (exists) {
        return prev.map((f) => (f.id === filmData.id ? filmData : f));
      }
      return [filmData, ...prev];
    });
    setFilmToEdit(null);
  };

  const handleDeleteFilm = (filmId: string) => {
    if (window.confirm('Are you sure you want to remove this film from your catalog and Stage Films review?')) {
      setFilms((prev) => prev.filter((f) => f.id !== filmId));
    }
  };

  const handleBulkDeleteFilms = (filmIds: string[]) => {
    if (filmIds.length === 0) return;
    const count = filmIds.length;
    if (window.confirm(`Are you sure you want to delete ${count} selected film${count > 1 ? 's' : ''} from your catalog?`)) {
      setFilms((prev) => prev.filter((f) => !filmIds.includes(f.id)));
    }
  };

  const handleUpdateFilmStatus = (filmId: string, newStatus: Film['releaseStatus']) => {
    setFilms((prev) =>
      prev.map((f) => (f.id === filmId ? { ...f, releaseStatus: newStatus } : f))
    );
  };

  const handleBulkUpdateFilmStatus = (filmIds: string[], newStatus: Film['releaseStatus']) => {
    if (filmIds.length === 0) return;
    setFilms((prev) =>
      prev.map((f) => (filmIds.includes(f.id) ? { ...f, releaseStatus: newStatus } : f))
    );
  };

  // Filtered and Sorted Films
  const filteredFilms = films.filter((f) => {
    if (selectedGenre !== 'All' && !f.genres.includes(selectedGenre as Genre)) return false;
    if (selectedStatus !== 'All' && f.releaseStatus !== selectedStatus) return false;
    if (onlyCreatorSubmissions && !f.isCreatorSubmission) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchDir = f.director.toLowerCase().includes(q);
      const matchCast = f.cast.some((c) => c.toLowerCase().includes(q));
      const matchSyn = f.synopsis.toLowerCase().includes(q);
      const matchGenre = f.genres.some((g) => g.toLowerCase().includes(q));
      if (!matchTitle && !matchDir && !matchCast && !matchSyn && !matchGenre) return false;
    }
    return true;
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.releaseYear - a.releaseYear;
    }
    if (sortBy === 'year-desc') return b.releaseYear - a.releaseYear;
    if (sortBy === 'year-asc') return a.releaseYear - b.releaseYear;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const featuredFilms = films.filter((f) => f.isFeatured);

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Official Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        watchlistCount={watchlistIds.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">
        {/* VIEW 1: HOME (Featured Showcase + Catalog Preview) */}
        {currentTab === 'home' && (
          <div className="space-y-12">
            {/* Cinematic Hero Carousel */}
            <HeroCarousel
              featuredFilms={featuredFilms}
              onSelectFilm={(f) => setSelectedFilmForDetails(f)}
              onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
            />

            {/* Catalog Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono-tech uppercase tracking-widest mb-1">
                    <Clapperboard className="w-4 h-4 text-emerald-400" />
                    <span>Hulu Production. New York</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-cinematic font-black text-white">
                    Featured Releases & Catalog
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentTab('movies')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider font-mono-tech"
                >
                  View Full Catalog ({films.length} Titles) →
                </button>
              </div>

              {/* Filter Bar */}
              <FilmFilterBar
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalFilmsCount={sortedFilms.length}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onlyCreatorSubmissions={onlyCreatorSubmissions}
                setOnlyCreatorSubmissions={setOnlyCreatorSubmissions}
              />

              {/* Movie Grid */}
              {sortedFilms.length === 0 ? (
                <div className="py-20 text-center bg-[#12141a] border border-dashed border-zinc-800 rounded-2xl space-y-3">
                  <FilmIcon className="w-12 h-12 text-zinc-600 mx-auto" />
                  <h3 className="text-lg font-cinematic font-bold text-white">No Movies Found</h3>
                  <p className="text-xs text-zinc-400">Try adjusting your filters or search keywords.</p>
                  <button
                    onClick={() => {
                      setSelectedGenre('All');
                      setSelectedStatus('All');
                      setSearchQuery('');
                      setOnlyCreatorSubmissions(false);
                    }}
                    className="px-4 py-2 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6' : 'space-y-4'}>
                  {sortedFilms.map((film) => (
                    <FilmCard
                      key={film.id}
                      film={film}
                      onSelect={(f) => setSelectedFilmForDetails(f)}
                      onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
                      isBookmarked={watchlistIds.includes(film.id)}
                      onToggleBookmark={handleToggleBookmark}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: ALL MOVIES CATALOG */}
        {currentTab === 'movies' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="pb-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2 text-amber-500 text-xs font-mono-tech uppercase tracking-widest mb-1">
                <Clapperboard className="w-4 h-4" />
                <span>Motion Picture Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-cinematic font-black text-white">
                All Stage Films Releases & Acquisitions
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Explore the complete collection of theatrical releases, 4K Ultra HD Blu-rays, digital on-demand premieres, and independent creator pipeline submissions.
              </p>
            </div>

            <FilmFilterBar
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalFilmsCount={sortedFilms.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onlyCreatorSubmissions={onlyCreatorSubmissions}
              setOnlyCreatorSubmissions={setOnlyCreatorSubmissions}
            />

            {sortedFilms.length === 0 ? (
              <div className="py-20 text-center bg-[#12141a] border border-dashed border-zinc-800 rounded-2xl space-y-3">
                <FilmIcon className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-lg font-cinematic font-bold text-white">No Movies Found</h3>
                <p className="text-xs text-zinc-400">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6' : 'space-y-4'}>
                {sortedFilms.map((film) => (
                  <FilmCard
                    key={film.id}
                    film={film}
                    onSelect={(f) => setSelectedFilmForDetails(f)}
                    onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
                    isBookmarked={watchlistIds.includes(film.id)}
                    onToggleBookmark={handleToggleBookmark}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: TRAILERS */}
        {currentTab === 'trailers' && (
          <TrailersSection
            films={films}
            onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
            onSelectFilm={(f) => setSelectedFilmForDetails(f)}
          />
        )}

        {/* VIEW 4: WHAT'S NEW */}
        {currentTab === 'whats-new' && (
          <WhatsNewSection
            onSelectFilmById={(filmId) => {
              const target = films.find((f) => f.id === filmId || f.slug === filmId);
              if (target) setSelectedFilmForDetails(target);
            }}
            onOpenCreatorPortal={() => {
              if (currentUser) {
                setCurrentTab('creator-dashboard');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
          />
        )}

        {/* VIEW 5: ABOUT STAGE 6 */}
        {currentTab === 'about' && (
          <AboutStage6Section
            onOpenCreatorPortal={() => {
              if (currentUser) {
                setCurrentTab('creator-dashboard');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
          />
        )}

        {/* VIEW 6: REGISTERED FILM CREATORS DASHBOARD */}
        {currentTab === 'creator-dashboard' && (
          currentUser ? (
            <CreatorDashboardView
              currentUser={currentUser}
              films={films}
              onOpenAddFilm={() => {
                setFilmToEdit(null);
                setIsAddFilmModalOpen(true);
              }}
              onOpenEditFilm={(film) => {
                setFilmToEdit(film);
                setIsAddFilmModalOpen(true);
              }}
              onDeleteFilm={handleDeleteFilm}
              onOpenScreenerRoom={(film) => setSelectedFilmForScreener(film)}
              onSelectFilm={(film) => setSelectedFilmForDetails(film)}
              onPlayTrailer={(film) => setSelectedFilmForTrailer(film)}
              onUpdateFilmStatus={handleUpdateFilmStatus}
              onBulkDeleteFilms={handleBulkDeleteFilms}
              onBulkUpdateFilmStatus={handleBulkUpdateFilmStatus}
            />
          ) : (
            <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-red-600/15 border border-red-600/40 flex items-center justify-center text-red-500 mx-auto shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-cinematic font-black text-white">
                Film Creator Portal Authentication
              </h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Sign in with your registered filmmaker, producer, or studio credentials to manage your film submissions and access the Stage Films acquisitions review dashboard.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all cursor-pointer"
              >
                Sign In to Creator Studio
              </button>
            </div>
          )
        )}
      </main>

      {/* Official Hulu Production. New York & Stage Films Footer */}
      <Footer
        onOpenCreatorPortal={() => {
          if (currentUser) {
            setCurrentTab('creator-dashboard');
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onSetTab={setCurrentTab}
      />

      {/* MODALS */}
      {/* 1. Film Details Modal with Screener Gate */}
      <FilmDetailsModal
        film={selectedFilmForDetails}
        onClose={() => setSelectedFilmForDetails(null)}
        onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
        isBookmarked={selectedFilmForDetails ? watchlistIds.includes(selectedFilmForDetails.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onOpenScreenerRoom={(f) => setSelectedFilmForScreener(f)}
      />

      {/* 2. Fullscreen Trailer Modal */}
      <TrailerModal
        film={selectedFilmForTrailer}
        onClose={() => setSelectedFilmForTrailer(null)}
        onViewDetails={(f) => setSelectedFilmForDetails(f)}
      />

      {/* 3. Creator Auth Modal (Sign in / Register / Instant Demo Accounts) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 4. Multi-Step Studio Film Submission Form */}
      <AddFilmModal
        isOpen={isAddFilmModalOpen}
        onClose={() => {
          setIsAddFilmModalOpen(false);
          setFilmToEdit(null);
        }}
        onSaveFilm={handleSaveFilm}
        creatorName={currentUser?.name || 'Registered Film Creator'}
        creatorId={currentUser?.id || 'creator-session'}
        editFilmData={filmToEdit}
      />

      {/* 5. Watermarked Private Screener Player */}
      <ScreenerRoomModal
        film={selectedFilmForScreener}
        onClose={() => setSelectedFilmForScreener(null)}
        viewerName={currentUser ? `${currentUser.name} (${currentUser.company})` : 'SONY PICTURES ACQUISITIONS REVIEWER'}
      />

      {/* 6. Saved Watchlist Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        bookmarkedFilms={bookmarkedFilms}
        onSelectFilm={(f) => setSelectedFilmForDetails(f)}
        onPlayTrailer={(f) => setSelectedFilmForTrailer(f)}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
