'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Movie, Showtime } from '@/types';
import { getBookingUrl } from '@/lib/api/cinema-service';

interface QuickBookingBarProps {
  movies: Movie[];
  dates: { date: string; dayLabel: string; monthLabel: string }[];
  showtimes: Showtime[];
  onMovieChange?: (movieId: string) => void;
  onDateChange?: (date: string) => void;
  selectedMovieId?: string;
  selectedDate?: string;
}

export function QuickBookingBar({
  movies,
  dates,
  showtimes,
  onMovieChange,
  onDateChange,
  selectedMovieId,
  selectedDate,
}: QuickBookingBarProps) {
  const [localMovieId, setLocalMovieId] = useState(selectedMovieId || movies[0]?.id || '');
  const [localDate, setLocalDate] = useState(selectedDate || dates[0]?.date || '');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string>('');

  const handleMovieSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setLocalMovieId(val);
    onMovieChange?.(val);
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setLocalDate(val);
    onDateChange?.(val);
  };

  const currentBookingUrl = getBookingUrl(selectedShowtimeId || localMovieId);

  return (
    <div className="w-full bg-[#0C1017]/90 border border-[#1E2631] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* 1. Select Movie */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quick-select-movie" className="text-[0.65rem] font-semibold tracking-wider uppercase text-cinema-gray-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25-3h17.25M3.375 6h17.25m-17.25 3h17.25m-16.5 3h15.75" />
            </svg>
            Select Movie
          </label>
          <select
            id="quick-select-movie"
            value={localMovieId}
            onChange={handleMovieSelect}
            className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-cinema-white focus:outline-none focus:border-brand-gold transition-colors"
          >
            <option value={localMovieId || movies[0]?.id || ''} className="bg-[#0C1017]">
              Coming Soon
            </option>
          </select>
        </div>

        {/* 2. Select Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quick-select-date" className="text-[0.65rem] font-semibold tracking-wider uppercase text-cinema-gray-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
            </svg>
            Select Date
          </label>
          <select
            id="quick-select-date"
            value={localDate}
            onChange={handleDateSelect}
            className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-cinema-white focus:outline-none focus:border-brand-gold transition-colors"
          >
            {dates.map((d) => (
              <option key={d.date} value={d.date} className="bg-[#0C1017]">
                {d.dayLabel} — {d.monthLabel}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Select Show Time */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quick-select-showtime" className="text-[0.65rem] font-semibold tracking-wider uppercase text-cinema-gray-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Select Show Time
          </label>
          <select
            id="quick-select-showtime"
            value={selectedShowtimeId}
            onChange={(e) => setSelectedShowtimeId(e.target.value)}
            className="w-full bg-[#141A24] border border-[#273244] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-cinema-white focus:outline-none focus:border-brand-gold transition-colors"
          >
            <option value="">Choose a time</option>
            {showtimes.map((st) => (
              <option key={st.id} value={st.id} className="bg-[#0C1017]">
                {st.time} ({st.format})
              </option>
            ))}
          </select>
        </div>

        {/* 4. BOOK NOW Button */}
        <div className="flex flex-col justify-end pt-2 sm:pt-0">
          <Link
            href={currentBookingUrl}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <span>BOOK NOW</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
