import React, { useState } from 'react';
import { Film, User, LogIn, Search, Film as FilmIcon, PlusCircle, Bookmark, ShieldCheck, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { CreatorUser } from '../types';
import { StudioLogo } from './StudioLogo';

interface HeaderProps {
  currentTab: 'home' | 'movies' | 'trailers' | 'whats-new' | 'about' | 'creator-dashboard';
  setCurrentTab: (tab: 'home' | 'movies' | 'trailers' | 'whats-new' | 'about' | 'creator-dashboard') => void;
  currentUser: CreatorUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  watchlistCount,
  onOpenWatchlist,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      {/* Top Hulu Production bar */}
      <div className="w-full bg-black/90 border-b border-white/5 py-1.5 px-4 sm:px-8 flex items-center justify-between text-[11px] font-medium tracking-widest text-white/50 uppercase font-mono-tech">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white/90 tracking-wider">HULU PRODUCTION</span>
          <span className="text-white/20">|</span>
          <span className="text-emerald-400 font-semibold">NEW YORK</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-white/40 hover:text-white/70 transition-colors">New York, NY</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-red-500 font-mono-tech text-[10px] tracking-widest uppercase">ACQUISITIONS & PRODUCTION HUB</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
          className="cursor-pointer group select-none"
        >
          <StudioLogo variant="full" size="md" />
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-white/70">
          <button
            id="nav-home-btn"
            onClick={() => setCurrentTab('home')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'home'
                ? 'text-white bg-white/10 font-semibold shadow-inner border border-white/10'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Featured
          </button>
          <button
            id="nav-movies-btn"
            onClick={() => setCurrentTab('movies')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'movies'
                ? 'text-white bg-white/10 font-semibold shadow-inner border border-white/10'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            All Movies
          </button>
          <button
            id="nav-trailers-btn"
            onClick={() => setCurrentTab('trailers')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'trailers'
                ? 'text-white bg-white/10 font-semibold shadow-inner border border-white/10'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            Trailers
          </button>
          <button
            id="nav-whats-new-btn"
            onClick={() => setCurrentTab('whats-new')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'whats-new'
                ? 'text-white bg-white/10 font-semibold shadow-inner border border-white/10'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            What's New
          </button>
          <button
            id="nav-about-btn"
            onClick={() => setCurrentTab('about')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'about'
                ? 'text-white bg-white/10 font-semibold shadow-inner border border-white/10'
                : 'hover:text-white hover:bg-white/5'
            }`}
          >
            About Label
          </button>
        </nav>

        {/* Right Actions: Search, Watchlist, Creator Portal Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#111111] border border-red-600/50 rounded-full px-3.5 py-1.5 shadow-[0_0_20px_rgba(229,9,20,0.2)] w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search movies, cast..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentTab !== 'movies') setCurrentTab('movies');
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none w-full"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-white/50 hover:text-white ml-1 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="header-search-toggle-btn"
                onClick={() => {
                  setIsSearchOpen(true);
                  if (currentTab !== 'movies') setCurrentTab('movies');
                }}
                className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title="Search movies"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Watchlist button */}
          <button
            id="header-watchlist-btn"
            onClick={onOpenWatchlist}
            className="relative p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Saved Watchlist"
          >
            <Bookmark className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-[0_0_8px_rgba(229,9,20,0.7)]">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Creator Portal / Sign In Button */}
          {currentUser ? (
            <div className="relative">
              <button
                id="creator-profile-dropdown-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center space-x-2 pl-2 pr-3.5 py-1.5 rounded-full border transition-all ${
                  currentTab === 'creator-dashboard'
                    ? 'border-red-600/80 bg-red-950/40 text-red-200 shadow-[0_0_15px_rgba(229,9,20,0.25)]'
                    : 'border-white/15 bg-white/[0.04] text-white hover:border-white/30'
                }`}
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-red-500/80"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold leading-tight flex items-center gap-1">
                    {currentUser.name}
                    <ShieldCheck className="w-3 h-3 text-red-500" />
                  </div>
                  <div className="text-[10px] text-white/50">{currentUser.role}</div>
                </div>
              </button>

              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#0e0e11] border border-white/15 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-white/10">
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-white/50 truncate">{currentUser.company || currentUser.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-semibold bg-red-600/20 text-red-400 border border-red-600/40 rounded">
                      Verified Film Creator
                    </span>
                  </div>

                  <button
                    id="menu-go-dashboard-btn"
                    onClick={() => setCurrentTab('creator-dashboard')}
                    className="w-full text-left px-4 py-2.5 text-xs text-white/80 hover:bg-white/10 hover:text-white flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <FilmIcon className="w-4 h-4 text-red-500" />
                      Creator Studio Dashboard
                    </span>
                  </button>

                  <button
                    id="menu-add-film-btn"
                    onClick={() => setCurrentTab('creator-dashboard')}
                    className="w-full text-left px-4 py-2.5 text-xs text-white/80 hover:bg-white/10 hover:text-white flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-red-400" />
                      Add / Submit New Film
                    </span>
                  </button>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    id="menu-logout-btn"
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/10 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="header-creator-signin-btn"
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.35)] transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Creator Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-md text-white/70 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-150">
          <button
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'home' ? 'bg-red-600/20 text-red-400 font-semibold border border-red-600/30' : 'text-white/80'
            }`}
          >
            Featured Showcase
          </button>
          <button
            onClick={() => { setCurrentTab('movies'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'movies' ? 'bg-red-600/20 text-red-400 font-semibold border border-red-600/30' : 'text-white/80'
            }`}
          >
            All Movies & Catalog
          </button>
          <button
            onClick={() => { setCurrentTab('trailers'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'trailers' ? 'bg-red-600/20 text-red-400 font-semibold border border-red-600/30' : 'text-white/80'
            }`}
          >
            Trailers & Teasers
          </button>
          <button
            onClick={() => { setCurrentTab('whats-new'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'whats-new' ? 'bg-red-600/20 text-red-400 font-semibold border border-red-600/30' : 'text-white/80'
            }`}
          >
            What's New & Releases
          </button>
          <button
            onClick={() => { setCurrentTab('about'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'about' ? 'bg-red-600/20 text-red-400 font-semibold border border-red-600/30' : 'text-white/80'
            }`}
          >
            About Stage Films
          </button>

          <div className="pt-3 border-t border-white/10">
            {currentUser ? (
              <button
                onClick={() => { setCurrentTab('creator-dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-red-600/20 border border-red-600/50 text-red-300 font-bold rounded-lg text-sm"
              >
                <FilmIcon className="w-4 h-4" />
                <span>Open Creator Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-red-600 text-white font-bold rounded-lg text-sm shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              >
                <LogIn className="w-4 h-4" />
                <span>Film Creator Portal Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
