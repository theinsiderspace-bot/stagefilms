import React, { useState } from 'react';
import { Film } from '../../types';
import { X, ShieldCheck, Lock, Play, Pause, Volume2, VolumeX, Maximize2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ScreenerRoomModalProps {
  film: Film | null;
  onClose: () => void;
  viewerName?: string;
}

export const ScreenerRoomModal: React.FC<ScreenerRoomModalProps> = ({
  film,
  onClose,
  viewerName = 'SONY PICTURES ACQUISITIONS REVIEWER',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showExecutiveNotes, setShowExecutiveNotes] = useState(true);

  if (!film) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-[#0e0e12] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Security Watermark Top Bar */}
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-5 py-3 flex items-center justify-between text-xs text-emerald-300 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold tracking-wider font-mono-tech">
              SECURE SONY SCREENER PORTAL • WATERMARKED FOR: {viewerName.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-900/50 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container with Dynamic Screen Watermark */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <iframe
            src={`${film.trailerUrl}?autoplay=1&rel=0&modestbranding=1`}
            title={`${film.title} Screener`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />

          {/* Security Dynamic Watermark Overlay (Floating across corner to center) */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 opacity-30 select-none">
            <div className="text-right text-[11px] font-mono-tech text-white font-bold tracking-widest uppercase">
              CONFIDENTIAL • STAGE 6 FILMS ACQUISITIONS • IP #{film.id}
            </div>
            <div className="text-center text-sm font-mono-tech text-white/50 font-black tracking-[0.3em] uppercase transform -rotate-12">
              DO NOT DISTRIBUTE • {viewerName.toUpperCase()} • {new Date().toLocaleDateString()}
            </div>
            <div className="text-left text-[11px] font-mono-tech text-white font-bold">
              SCREENER PASSCODE VERIFIED • {film.screenerPasscode || 'STAGE6'}
            </div>
          </div>
        </div>

        {/* Bottom Panel: Film Pitch Info & Executive Review Notes */}
        <div className="p-5 sm:p-6 bg-black/70 border-t border-white/10 space-y-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono-tech mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized Screener Session Active</span>
                <span>•</span>
                <span>Tier: {film.budgetTier || 'Indie Feature'}</span>
              </div>
              <h3 className="text-xl font-cinematic font-black text-white">{film.title}</h3>
              <p className="text-xs text-white/60">Dir: {film.director} • Produced by: {film.producers.join(', ')}</p>
            </div>

            <button
              onClick={() => setShowExecutiveNotes(!showExecutiveNotes)}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>{showExecutiveNotes ? 'Hide Executive Notes' : 'Show Executive Notes'}</span>
            </button>
          </div>

          {showExecutiveNotes && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl space-y-1.5">
                <span className="font-bold text-red-400 uppercase font-mono-tech text-[10px]">
                  Director & Creator Pitch Strategy
                </span>
                <p className="text-white/80 leading-relaxed">
                  {film.pitchDeckNotes || 'Seeking global theatrical or streaming distribution with Hulu Production. New York.'}
                </p>
              </div>

              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-1.5">
                <span className="font-bold text-emerald-400 uppercase font-mono-tech text-[10px]">
                  Stage Films Acquisitions Feedback Log
                </span>
                <p className="text-emerald-200/90 leading-relaxed">
                  {film.executiveFeedback || 'Project verified by acquisitions pipeline. Quality review in progress.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
