'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cinemaInfo } from '@/lib/data/mock-data';
import { CinemaVideoModal } from '@/components/ui/CinemaVideoModal';

/**
 * HeroContent — Left-aligned content layout representing EVM CINEMAS (Kochi, Keralam).
 */
export function HeroContent() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36 pb-16 lg:pb-28 flex flex-col items-start text-left">
      {/* 1. Location Header: KOCHI · KERALAM */}
      <div
        className="flex items-center gap-2 sm:gap-3 text-[0.7rem] sm:text-xs font-semibold tracking-[0.25em] uppercase text-brand-cyan opacity-0 animate-slide-in-left"
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <span>{cinemaInfo.city}</span>
        <span className="text-cinema-gray-500 font-normal">&middot;</span>
        <span>{cinemaInfo.state}</span>
      </div>

      {/* 2. Main Headline: EXPERIENCE THE GRANDNESS */}
      <h1
        className="mt-4 sm:mt-6 opacity-0 animate-slide-in-left"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-cinema-pure-white leading-[1.02] uppercase">
          EXPERIENCE
        </span>
        <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gradient-gold leading-[1.02] uppercase mt-1 sm:mt-2">
          THE GRANDNESS.
        </span>
      </h1>

      {/* 3. Concise Supporting Text */}
      <p
        className="mt-4 sm:mt-5 text-sm sm:text-base text-cinema-gray-300 max-w-sm sm:max-w-md font-light leading-relaxed opacity-0 animate-slide-in-left"
        style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
      >
        {cinemaInfo.description}
      </p>

      {/* 4. Action Buttons */}
      <div
        className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5 opacity-0 animate-slide-in-left"
        style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
      >
        {/* Primary CTA: BOOK TICKETS */}
        <Link
          href="#now-showing"
          className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light active:bg-brand-gold-dark shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:shadow-[0_0_35px_rgba(201,168,76,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <span>BOOK TICKETS</span>
          <div className="w-5 h-5 rounded-full bg-cinema-black/20 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-cinema-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </Link>

        {/* Secondary CTA: WATCH EXPERIENCE VIDEO */}
        <button
          type="button"
          onClick={() => setIsVideoModalOpen(true)}
          className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-cinema-pure-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-cyan/60 transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border border-brand-cyan/60 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-brand-cyan ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span>WATCH EXPERIENCE VIDEO</span>
        </button>
      </div>

      {/* Cinematic Experience Video Modal */}
      <CinemaVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/videos/evm-experience.mp4"
        title="EVM CINEMAS — EXPERIENCE FILM"
      />
    </div>
  );
}
