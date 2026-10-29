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
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 flex flex-col items-start text-left">
      {/* 1. Location Header: KOCHI · KERALAM */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C1017]/85 border border-brand-gold/50 text-[0.7rem] sm:text-xs font-bold tracking-[0.25em] uppercase opacity-0 animate-slide-in-left shadow-[0_0_20px_rgba(201,168,76,0.2)] backdrop-blur-md"
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
      >
        <svg className="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span className="text-brand-gold font-extrabold">EVM</span>
        <span className="text-cinema-gray-500 font-normal">&bull;</span>
        <span className="text-cinema-pure-white font-black tracking-widest">FORT KOCHI</span>


      </div>

      {/* 2. Main Headline: EXPERIENCE THE GRANDNESS */}
      <h1
        className="mt-3 sm:mt-5 opacity-0 animate-slide-in-left"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-cinema-pure-white leading-[1.05] uppercase">
          EXPERIENCE
        </span>
        <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-gradient-gold leading-[1.05] uppercase mt-1 sm:mt-2">
          THE GRANDNESS.
        </span>
      </h1>

      {/* 3. Concise Supporting Text */}
      <p
        className="mt-3 sm:mt-5 text-xs sm:text-base text-cinema-gray-300 max-w-sm sm:max-w-md font-light leading-relaxed opacity-0 animate-slide-in-left"
        style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
      >
        {cinemaInfo.description}
      </p>

      {/* 4. Action Buttons */}
      <div
        className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-5 opacity-0 animate-slide-in-left"
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
