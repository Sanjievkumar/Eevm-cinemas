'use client';

import { useState } from 'react';
import { DolbyIcon } from '@/components/ui/DolbyIcon';

interface MoviePosterProps {
  src?: string;
  alt: string;
  title: string;
  certificate?: string;
  formats?: string[];
  genre?: string;
  className?: string;
}

/**
 * Custom SVG Thematic Movie Poster Generator
 * Generates cinematic, rich poster artwork for mock development records.
 */
function ThematicMoviePoster({ title, genre = '' }: { title: string; genre?: string }) {
  const t = title.toUpperCase();

  if (t.includes('JAWAN')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0505] via-[#3B0A0A] to-[#0A0303] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_40%,#FF3B3B,transparent_70%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.6rem] font-bold tracking-[0.3em] text-[#FF6B6B] uppercase block">AN ATLEE FILM</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(255,0,0,0.8)] uppercase">
            JAWAN
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.25em] text-[#FFA8A8] uppercase block mt-1">
            READY / ACTION
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-[#FF8080] uppercase">IN CINEMAS WORLDWIDE</span>
        </div>
      </div>
    );
  }

  if (t.includes('JAILER')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F1404] via-[#3D2908] to-[#0D0801] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_35%,#C9A84C,transparent_70%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.6rem] font-bold tracking-[0.3em] text-brand-gold uppercase block">SUPERSTAR RAJINIKANTH</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-3xl font-black tracking-widest text-white drop-shadow-[0_4px_12px_rgba(201,168,76,0.8)] uppercase">
            JAILER
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.25em] text-brand-gold-light uppercase block mt-1">
            NELSON FILM
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-brand-gold uppercase">UNLEASH THE RAGE</span>
        </div>
      </div>
    );
  }

  if (t.includes('OPPENHEIMER')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B0D03] via-[#381B07] to-[#0A0502] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_50%_50%,#FF6B00,transparent_65%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.55rem] font-bold tracking-[0.3em] text-[#FFB076] uppercase block">CHRISTOPHER NOLAN</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-2xl font-black tracking-[0.2em] text-white drop-shadow-[0_4px_12px_rgba(255,107,0,0.8)] uppercase leading-none">
            OPPENHEIMER
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.2em] text-[#FFA052] uppercase block mt-2">
            THE WORLD FOREVER CHANGES
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-[#FFC499] uppercase">SHOT IN IMAX 70MM</span>
        </div>
      </div>
    );
  }

  if (t.includes('BARBIE')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B051D] via-[#520938] to-[#12020D] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_40%,#FF40B4,transparent_70%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.6rem] font-bold tracking-[0.3em] text-[#FF85D0] uppercase block">GRETA GERWIG</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-3xl font-black tracking-widest text-white drop-shadow-[0_4px_12px_rgba(255,64,180,0.9)] italic uppercase">
            BARBIE
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.25em] text-[#FFB3E3] uppercase block mt-1">
            SHE&apos;S EVERYTHING
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-[#FF85D0] uppercase">ONLY IN THEATRES</span>
        </div>
      </div>
    );
  }

  if (t.includes('MISSION') || t.includes('IMPOSSIBLE')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#051525] via-[#092644] to-[#020A12] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_50%_40%,#00D8F6,transparent_70%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.55rem] font-bold tracking-[0.25em] text-brand-cyan uppercase block">TOM CRUISE</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-xl font-black tracking-wider text-white drop-shadow-[0_4px_10px_rgba(0,216,246,0.8)] uppercase leading-tight">
            MISSION: IMPOSSIBLE
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.2em] text-brand-cyan uppercase block mt-1">
            DEAD RECKONING
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-cinema-gray-300 uppercase">THE EXPERIENCE OF A LIFETIME</span>
        </div>
      </div>
    );
  }

  if (t.includes('ANIMAL')) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#240404] via-[#450808] to-[#0C0101] flex flex-col justify-between p-4 text-center">
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_50%_35%,#E52B2B,transparent_70%)]" />
        <div className="relative z-10 pt-4">
          <span className="text-[0.55rem] font-bold tracking-[0.25em] text-[#FF7575] uppercase block">SANDEEP REDDY VANGA</span>
        </div>
        <div className="relative z-10 my-auto py-6">
          <h2 className="text-3xl font-black tracking-widest text-white drop-shadow-[0_4px_12px_rgba(229,43,43,0.9)] uppercase">
            ANIMAL
          </h2>
          <span className="text-[0.55rem] font-bold tracking-[0.2em] text-[#FF9E9E] uppercase block mt-1">
            WILD & UNTAMED
          </span>
        </div>
        <div className="relative z-10 pb-2">
          <span className="text-[0.5rem] font-semibold tracking-widest text-[#FF7575] uppercase">IN THEATRES NOW</span>
        </div>
      </div>
    );
  }

  // Generic Thematic Poster Fallback
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#141B26] via-[#0D121B] to-[#06080C] flex flex-col justify-between p-4 text-center">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_40%,#00D8F6,transparent_70%)]" />
      <div className="relative z-10 pt-4">
        <span className="text-[0.55rem] font-bold tracking-[0.25em] text-brand-cyan uppercase block">{genre || 'FEATURE FILM'}</span>
      </div>
      <div className="relative z-10 my-auto py-6">
        <h2 className="text-2xl font-black tracking-wider text-white drop-shadow-md uppercase leading-tight">
          {title}
        </h2>
      </div>
      <div className="relative z-10 pb-2">
        <span className="text-[0.5rem] font-semibold tracking-widest text-cinema-gray-400 uppercase">NOW SHOWING</span>
      </div>
    </div>
  );
}

/**
 * MoviePoster — 2:3 portrait aspect ratio poster component.
 * Uses `object-fit: cover` for image URLs, with an authentic thematic poster visual fallback.
 */
export function MoviePoster({
  src,
  alt,
  title,
  certificate,
  formats = [],
  genre = '',
  className = '',
}: MoviePosterProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative aspect-[2/3] w-full bg-[#0A0D14] overflow-hidden rounded-t-xl select-none ${className}`}>
      {/* 1. Real Image Element (when valid URL is provided) */}
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        /* 2. Realistic Thematic Movie Poster Artwork */
        <ThematicMoviePoster title={title} genre={genre} />
      )}

      {/* 3. Certificate Badge Top Right */}
      {certificate && (
        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded bg-black/85 border border-white/20 text-[0.62rem] font-bold text-cinema-pure-white uppercase tracking-wider shadow-md backdrop-blur-sm">
          {certificate}
        </div>
      )}

      {/* 4. Format Badges Top Left */}
      {formats.length > 0 && (
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1 max-w-[70%]">
          {formats.map((fmt) => (
            <span
              key={fmt}
              className="px-1.5 py-0.5 rounded bg-black/80 border border-brand-cyan/70 text-[0.58rem] font-bold text-brand-cyan uppercase tracking-wider backdrop-blur-sm shadow-md inline-flex items-center gap-1"
            >
              {fmt.toUpperCase().includes('DOLBY') && (
                <DolbyIcon className="h-2.5 w-auto text-white flex-shrink-0" />
              )}
              <span>{fmt}</span>
            </span>
          ))}
        </div>
      )}

      {/* 5. Bottom Vignette Fade */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0C1017] to-transparent pointer-events-none z-10" />
    </div>
  );
}
