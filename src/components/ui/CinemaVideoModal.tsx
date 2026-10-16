'use client';

import { useEffect, useRef } from 'react';
import { DolbyIcon } from './DolbyIcon';

interface CinemaVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export function CinemaVideoModal({
  isOpen,
  onClose,
  videoSrc = '/videos/evm-experience.mp4',
  title = 'EVM CINEMAS — THE EXPERIENCE',
}: CinemaVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Play video automatically when modal opens
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound might need user interaction in some browsers
      });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in"
      onClick={onClose}
    >
      {/* Container */}
      <div
        className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-[#1E2631] bg-[#0A0D14] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0C1017] border-b border-[#1E2631]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00D8F6]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cinema-pure-white flex items-center gap-2">
              <span>{title}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-cinema-gray-400 text-xs">
              <DolbyIcon className="w-3.5 h-3.5 text-white" />
              <span className="text-[0.65rem] font-bold tracking-widest text-brand-gold uppercase">
                DOLBY CINEMA
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-cinema-pure-white flex items-center justify-center transition-colors text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Bottom Status Line */}
        <div className="px-4 sm:px-6 py-3 bg-[#080B10] border-t border-[#1E2631] flex items-center justify-between text-[0.65rem] sm:text-xs text-cinema-gray-400">
          <span>EVM Cinemas &middot; Kochi, Keralam</span>
          <span className="text-brand-cyan font-semibold">Press Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
