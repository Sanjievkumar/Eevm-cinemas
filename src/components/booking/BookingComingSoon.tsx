'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { nowShowingMovies, cinemaInfo } from '@/lib/data/mock-data';
import { getMovieById } from '@/lib/api/cinema-service';
import { DolbyCinemaLogo, DolbyVisionLogo, DolbyAtmosLogo } from '@/components/ui/DolbyLogos';

function BookingComingSoonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams?.get('ref');
  const [matchedMovie, setMatchedMovie] = useState<{ title: string; language: string } | null>(null);

  useEffect(() => {
    if (!ref) return;
    getMovieById(ref).then((movie) => {
      if (movie) {
        setMatchedMovie({ title: movie.title, language: movie.language });
      } else {
        const mockMatch = nowShowingMovies.find(
          (m) =>
            m.id === ref ||
            m.title.toLowerCase() === ref.toLowerCase() ||
            ref.startsWith(m.id)
        );
        if (mockMatch) {
          setMatchedMovie({ title: mockMatch.title, language: mockMatch.language });
        }
      }
    }).catch(() => {});
  }, [ref]);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/#now-showing');
    }
  };

  return (
    <div
      className="relative min-h-[580px] lg:h-[calc(100vh-var(--nav-height,80px))] max-h-[900px] flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{ '--nav-height': '80px' } as React.CSSProperties}
    >
      {/* 1. Cinematic Background: Soft Projector Beam & Atmospheric Haze */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft overhead projector beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[520px] opacity-75"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0, 216, 246, 0.14) 0%, rgba(201, 168, 76, 0.08) 35%, transparent 70%)',
          }}
        />
        {/* Golden ambient floor reflection */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[320px] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201, 168, 76, 0.1) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid texture lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E263110_1px,transparent_1px),linear-gradient(to_bottom,#1E263110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* 2. Main Stage Content Container */}
      <div className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8">
        {/* Stylized Curved Cinema Screen Frame */}
        <div className="relative p-6 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0E1420]/90 via-[#0A0D15]/85 to-[#06080D]/95 border border-[#1E2631] shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-6 sm:space-y-8">
          {/* Cinema Screen Top Ambient Glow Bar */}
          <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/80 to-transparent shadow-[0_0_15px_#00D8F6]" />

          {/* Eyebrow Pill: ONLINE BOOKING */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141B26] border border-brand-gold/40 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00D8F6]" />
              <span className="text-[0.68rem] font-bold tracking-[0.25em] uppercase text-brand-gold">
                ONLINE BOOKING
              </span>
            </div>
          </div>

          {/* Main Title: The Show Is About to Begin. */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.08] text-cinema-pure-white">
              The Show Is{' '}
              <span className="block sm:inline text-gradient-gold">
                About to Begin.
              </span>
            </h1>

            {/* Optional Selected Movie Context */}
            {matchedMovie && matchedMovie.title.toUpperCase() !== 'COMING SOON' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#162030] border border-brand-cyan/30 text-xs font-semibold text-brand-cyan">
                <span>Selected:</span>
                <span className="text-cinema-pure-white font-bold">{matchedMovie.title}</span>
                <span className="text-cinema-gray-400">({matchedMovie.language})</span>
              </div>
            )}
          </div>

          {/* Body Description */}
          <p className="text-base sm:text-lg text-cinema-gray-300 max-w-xl mx-auto leading-relaxed">
            We&apos;re getting our online booking experience ready. Online ticket booking at EVM Cinemas will be available soon.
          </p>

          {/* Highlight Callout: Your next movie experience is just around the corner. */}
          <div className="py-1">
            <div className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold/10 via-brand-cyan/10 to-brand-gold/10 border border-brand-gold/30">
              <p className="text-xs sm:text-sm font-bold tracking-wide text-brand-gold">
                ✨ Your next movie experience is just around the corner.
              </p>
            </div>
          </div>

          {/* Primary Action Button: Back to Movies */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light active:bg-brand-gold-dark shadow-[0_0_25px_rgba(201,168,76,0.35)] hover:shadow-[0_0_35px_rgba(201,168,76,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to Movies</span>
            </button>

            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#141A24] border border-[#273244] text-cinema-gray-300 hover:text-white hover:border-brand-cyan/50 transition-colors"
            >
              <span>Contact Box Office</span>
            </Link>
          </div>

          {/* Box Office & Location Counter Information */}
          <div className="pt-8 border-t border-[#1E2631]/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3 rounded-lg bg-[#080B10]/90 border border-[#1E2631]">
              <span className="block text-[0.6rem] font-bold tracking-widest uppercase text-brand-gold">
                BOX OFFICE TICKETS
              </span>
              <p className="text-[0.75rem] text-cinema-gray-300 mt-0.5 leading-snug">
                Counter bookings open daily at the theatre.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#080B10]/90 border border-[#1E2631]">
              <span className="block text-[0.6rem] font-bold tracking-widest uppercase text-brand-cyan">
                PHONE INQUIRIES
              </span>
              <a
                href={`tel:${cinemaInfo.phone.replace(/[\s+]/g, '')}`}
                className="text-[0.75rem] text-cinema-gray-300 hover:text-white transition-colors mt-0.5 block font-semibold"
              >
                {cinemaInfo.phone}
              </a>
            </div>

            <div className="p-3 rounded-lg bg-[#080B10]/90 border border-[#1E2631]">
              <div className="flex items-center gap-1.5 min-h-[18px]">
                <DolbyCinemaLogo className="h-3.5 w-auto" alt="Dolby Cinema" />
              </div>
              <div className="text-[0.75rem] text-cinema-gray-300 mt-1.5 flex items-center gap-2 flex-wrap">
                <DolbyVisionLogo className="h-2.5 w-auto" alt="Dolby Vision" />
                <span className="text-brand-gold font-bold">&amp;</span>
                <DolbyAtmosLogo className="h-2.5 w-auto" alt="Dolby Atmos" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingComingSoon() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-cinema-gray-400 text-sm">
          Loading EVM Cinemas Booking Experience...
        </div>
      }
    >
      <BookingComingSoonContent />
    </Suspense>
  );
}
