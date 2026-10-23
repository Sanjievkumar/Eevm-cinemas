'use client';

import { useState } from 'react';
import { DolbyFormatBadge } from '@/components/ui/DolbyLogos';

interface MoviePosterProps {
  src?: string;
  alt?: string;
  title?: string;
  certificate?: string;
  formats?: string[];
  genre?: string;
  className?: string;
}

/**
 * MoviePoster — Displays movie poster image with fallback to cinematic card.
 * Handles external image URLs (e.g. Google Drive/CDN) and falls back cleanly on error.
 */
export function MoviePoster({
  src,
  alt = '',
  title = '',
  certificate,
  formats = [],
  genre = '',
  className = '',
}: MoviePosterProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src && !hasError);

  return (
    <div
      className={`relative aspect-[2/3] w-full bg-gradient-to-b from-[#141C2A] via-[#0D121B] to-[#070A0F] border-b border-[#1E2631] overflow-hidden rounded-t-xl select-none flex flex-col justify-between p-4 sm:p-5 text-center transition-all duration-500 group-hover:border-brand-gold/40 ${className}`}
    >
      {/* 1. Real Poster Image (when valid src provided) */}
      {showImage && (
        <>
          <img
            src={src}
            alt={alt || title || 'Movie Poster'}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
          />
          {/* Subtle gradient overlays to ensure badge legibility */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C1017] via-[#0C1017]/70 to-transparent pointer-events-none z-10" />
        </>
      )}

      {/* 2. Cinematic Projector Cone & Ambient Geometry (fallback if no image or error) */}
      {!showImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0" aria-hidden="true">
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-60"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(0, 216, 246, 0.28) 0%, rgba(201, 168, 76, 0.16) 40%, transparent 75%)',
            }}
          />
          <svg className="w-full h-full text-brand-gold/25" viewBox="0 0 200 300" fill="none">
            <circle cx="100" cy="140" r="70" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
            <circle cx="100" cy="140" r="48" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="140" r="24" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="10" y1="40" x2="190" y2="240" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="190" y1="40" x2="10" y2="240" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </div>
      )}

      {/* 3. Top Bar: Format Badges & Certificate (Always visible above image) */}
      <div className="relative z-20 flex items-center justify-between w-full">
        {/* Format Badges (e.g. Dolby Vision, 4K, Dolby Atmos) */}
        <div className="flex flex-wrap gap-1 max-w-[70%] text-left">
          {formats.slice(0, 2).map((fmt) => {
            const isDolby = fmt.toUpperCase().includes('DOLBY');
            return (
              <span
                key={fmt}
                className="px-1.5 py-0.5 rounded bg-black/85 border border-brand-cyan/60 text-[0.55rem] font-bold text-brand-cyan uppercase tracking-wider backdrop-blur-sm shadow inline-flex items-center min-h-[16px]"
              >
                {isDolby ? (
                  <DolbyFormatBadge format={fmt} className="h-2 sm:h-2.5 w-auto" />
                ) : (
                  <span>{fmt}</span>
                )}
              </span>
            );
          })}
        </div>

        {/* Certificate Badge */}
        {certificate && (
          <div className="px-1.5 py-0.5 rounded bg-black/85 border border-white/20 text-[0.58rem] font-bold text-cinema-pure-white uppercase tracking-wider shadow backdrop-blur-sm">
            {certificate}
          </div>
        )}
      </div>

      {/* 4. Central Feature Showcase (Visible only when no image or error) */}
      {!showImage && (
        <div className="relative z-10 my-auto py-3 space-y-2.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.25)] group-hover:scale-110 group-hover:border-brand-gold transition-all duration-300">
            <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <span className="block text-lg sm:text-xl font-black uppercase tracking-widest text-gradient-gold drop-shadow-md">
              {title || 'COMING SOON'}
            </span>
            <span className="block text-[0.58rem] font-bold tracking-[0.25em] text-brand-cyan uppercase">
              EVM CINEMAS
            </span>
          </div>
        </div>
      )}

      {/* 5. Bottom Line: Genre / Cinema Tag (Visible on fallback or overlay) */}
      <div className="relative z-20 pt-2 border-t border-white/10">
        <span className="text-[0.6rem] font-semibold tracking-wider text-cinema-gray-300 uppercase truncate block">
          {genre || 'EXPERIENCE CINEMA'}
        </span>
      </div>

      {/* 6. Hover Accent Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/15 via-transparent to-brand-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
    </div>
  );
}
