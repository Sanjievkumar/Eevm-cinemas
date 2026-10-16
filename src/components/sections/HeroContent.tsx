'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cinemaInfo } from '@/lib/data/mock-data';
import { CinemaVideoModal } from '@/components/ui/CinemaVideoModal';

interface HeroContentProps {
  /** Optional custom image URI for the theatre visual */
  src?: string;
}

/**
 * HeroContent — Coordinated hero stage layout representing EVM CINEMAS (Kochi, Keralam).
 * Contains both typography/CTAs and the theatre exterior visual in the same container,
 * ensuring they scale and shrink proportionally together when zooming or resizing.
 */
export function HeroContent({ src = '/images/gallery/evm-exterior-night.png' }: HeroContentProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-14 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
        {/* Left Column: Typography & Action Buttons */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
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
            className="mt-3 sm:mt-5 opacity-0 animate-slide-in-left"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tight text-cinema-pure-white leading-[1.05] uppercase">
              EXPERIENCE
            </span>
            <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tight text-gradient-gold leading-[1.05] uppercase mt-1 sm:mt-2">
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
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto opacity-0 animate-slide-in-left"
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
          >
            {/* Primary CTA: BOOK TICKETS */}
            <Link
              href="#now-showing"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light active:bg-brand-gold-dark shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:shadow-[0_0_35px_rgba(201,168,76,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
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
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-cinema-pure-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-cyan/60 transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
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
        </div>

        {/* Right Column: Theatre Exterior Visual (Shrinks right along with the contents!) */}
        <div
          className="lg:col-span-6 xl:col-span-6 w-full opacity-0 animate-fade-in"
          style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
        >
          <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
            {/* Ambient Cyan/Gold Radial Glow behind building */}
            <div
              className="absolute -inset-4 sm:-inset-6 pointer-events-none opacity-30 -z-10 rounded-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0, 216, 246, 0.35) 0%, rgba(201, 168, 76, 0.1) 45%, transparent 75%)',
              }}
            />

            {/* Theatre Exterior Visual Frame */}
            <div className="group relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1E2631] bg-[#0A0D14] shadow-[0_0_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-brand-cyan/50 hover:shadow-[0_0_40px_rgba(0,216,246,0.25)]">
              <img
                src={src}
                alt="EVM Cinemas Building at Night"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Edge Vignette Overlays for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060709]/85 via-transparent to-[#060709]/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/30 via-transparent to-[#060709]/20 pointer-events-none" />

              {/* Architectural Location Badge */}
              <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 border border-brand-cyan/60 text-[0.62rem] sm:text-xs font-bold text-brand-cyan uppercase tracking-wider backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00D8F6]" />
                <span>EVM CINEMAS &middot; KOCHI</span>
              </div>
            </div>
          </div>
        </div>
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
