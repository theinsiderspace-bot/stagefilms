import React, { useState } from 'react';
import { CreatorUser } from '../types';
import { INITIAL_CREATORS } from '../data/mockFilms';
import { X, LogIn, UserPlus, ShieldCheck, Sparkles, Building2, User, Key, Mail, Lock } from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: CreatorUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<'Director' | 'Producer' | 'Screenwriter' | 'Cinematographer' | 'Studio Executive'>('Director');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoLogin = (creator: CreatorUser) => {
    onLoginSuccess(creator);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both your email address and security password.');
        return;
      }

      // Check if matches known creator or create session user
      const existing = INITIAL_CREATORS.find((c) => c.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        onLoginSuccess(existing);
      } else {
        const user: CreatorUser = {
          id: `creator-${Date.now()}`,
          name: email.split('@')[0].toUpperCase(),
          email: email.trim(),
          role: 'Director',
          company: 'Independent Filmmaker',
          bio: 'Registered film creator on Stage Films pipeline.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
          isVerified: true,
          createdFilmsCount: 0,
          joinedDate: new Date().toISOString().split('T')[0],
        };
        onLoginSuccess(user);
      }
      onClose();
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Please complete all required fields.');
        return;
      }

      const newUser: CreatorUser = {
        id: `creator-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: role,
        company: company.trim() || 'Independent Studio',
        bio: bio.trim() || 'Filmmaker and creator profile.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        isVerified: true,
        createdFilmsCount: 0,
        joinedDate: new Date().toISOString().split('T')[0],
      };

      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-[#0e0e12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 bg-black/80 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <StudioLogo variant="badge" />
          </div>

          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Demo Creator Accounts Selector */}
          <div className="space-y-2.5 bg-white/[0.03] border border-white/10 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 font-mono-tech">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                Instant Demo Access (Click to Sign In):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {INITIAL_CREATORS.map((creator) => (
                <button
                  key={creator.id}
                  type="button"
                  id={`demo-login-${creator.id}`}
                  onClick={() => handleQuickDemoLogin(creator)}
                  className="p-2.5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-red-600/60 border border-white/10 rounded-xl text-left flex items-center space-x-2.5 transition-all group cursor-pointer"
                >
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-8 h-8 rounded-full object-cover border border-red-600/40"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white group-hover:text-red-400 truncate flex items-center gap-1">
                      {creator.name}
                    </p>
                    <p className="text-[10px] text-white/50 truncate">{creator.role} • {creator.company}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Switcher: Sign In vs Register */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                mode === 'login'
                  ? 'border-red-600 text-red-500'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Registered Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                mode === 'register'
                  ? 'border-red-600 text-red-500'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              New Creator Registration
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-300 font-medium">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                    Full Creator Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nolan Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 text-xs text-white pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                      Primary Role *
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/15 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                    >
                      <option value="Director">Director</option>
                      <option value="Producer">Producer</option>
                      <option value="Screenwriter">Screenwriter</option>
                      <option value="Cinematographer">Cinematographer</option>
                      <option value="Studio Executive">Studio Executive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                      Production Studio
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="e.g. Apex Cinema Labs"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 text-xs text-white pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                Studio Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="creator@production.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                Security Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white pl-10 pr-3.5 py-2.5 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Creator Bio & Filmography Highlights
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of your filmmaking background and awards..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-red-600"
                />
              </div>
            )}

            <button
              type="submit"
              id="auth-submit-btn"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              <span>{mode === 'login' ? 'Authenticate & Enter Dashboard' : 'Complete Creator Registration'}</span>
            </button>
          </form>

          {/* Security Note */}
          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl flex items-center space-x-2.5 text-[11px] text-white/50 font-mono-tech">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>256-Bit Encrypted Hulu Production. New York Distribution Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};
