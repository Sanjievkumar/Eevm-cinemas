'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Movie, Showtime } from '@/types';
import { getBookingUrl } from '@/lib/api/cinema-service';
import { MoviePoster } from './MoviePoster';

interface MovieCardProps {
  movie: Movie;
  showtimes: Showtime[];
  onShowtimeSelect?: (showtime: Showtime) => void;
}

export function MovieCard({ movie, showtimes }: MovieCardProps) {
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(showtimes[0] || null);

  const formatDurationText = (mins: number) => {
    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    return hrs > 0 ? `${hrs}h ${m}m` : `${m}m`;
  };

  const bookingUrl = getBookingUrl(selectedShowtime?.id || movie.id);

  return (
    <div className="group relative bg-[#0C1017] border border-[#1E2631] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-gold/50 hover:shadow-[0_0_25px_rgba(201,168,76,0.15)]">
      {/* 1. 2:3 Portrait Poster Area */}
      <MoviePoster
        src={movie.posterUrl}
        alt={movie.title}
        title={movie.title}
        certificate={movie.certificate}
        formats={movie.formats}
        genre={movie.genres?.[0]}
      />

      {/* 2. Movie Information Section (Positioned directly below poster) */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Title & Metadata Line */}
        <div>
          {/* Movie Title (Displayed ONCE here) */}
          <h3 className="text-sm sm:text-base font-bold text-cinema-pure-white tracking-wide uppercase group-hover:text-brand-gold transition-colors line-clamp-1">
            {movie.title}
          </h3>

          {/* LANGUAGE · CERTIFICATE · RUNTIME · GENRE */}
          <div className="mt-1 flex flex-wrap items-center gap-1 text-[0.65rem] font-medium text-cinema-gray-400 uppercase tracking-wider">
            <span className="text-cinema-white font-semibold">{movie.language}</span>
            <span>&middot;</span>
            <span>{movie.certificate}</span>
            <span>&middot;</span>
            <span>{formatDurationText(movie.duration)}</span>
            {movie.genres?.[0] && (
              <>
                <span>&middot;</span>
                <span className="text-cinema-gray-400">{movie.genres[0]}</span>
              </>
            )}
          </div>
        </div>

        {/* 3. Divider & Available Showtimes Section */}
        <div className="pt-2.5 border-t border-[#1E2631]/80">
          <span className="block text-[0.58rem] font-semibold text-cinema-gray-400 uppercase tracking-widest mb-1.5">
            AVAILABLE SHOWTIMES
          </span>
          <div className="flex flex-wrap gap-1">
            {showtimes.length > 0 ? (
              showtimes.map((st) => {
                const isSelected = selectedShowtime?.id === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedShowtime(st)}
                    className={`px-2 py-0.5 rounded text-[0.65rem] font-bold tracking-wider transition-all ${
                      isSelected
                        ? 'bg-brand-cyan text-cinema-black shadow-[0_0_10px_rgba(0,216,246,0.35)]'
                        : 'bg-[#141A24] border border-[#273244] text-cinema-gray-300 hover:text-white hover:border-brand-cyan/50'
                    }`}
                  >
                    {st.time}
                  </button>
                );
              })
            ) : (
              <span className="text-[0.65rem] text-cinema-gray-400 italic">No showtimes for selected date</span>
            )}
          </div>
        </div>

        {/* 4. BOOK NOW Action Button */}
        <div className="pt-0.5">
          <Link
            href={bookingUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[0.7rem] font-bold tracking-wider uppercase bg-[#141A24] border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-cinema-black transition-all duration-300 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <span>BOOK NOW</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
