'use client';

import { useState, useEffect } from 'react';
import type { Movie, Showtime } from '@/types';
import {
  getNowShowingMovies,
  getAvailableShowDates,
  getShowtimesForMovieAndDate,
} from '@/lib/api/cinema-service';
import { QuickBookingBar } from '@/components/ui/QuickBookingBar';
import { MovieCard } from '@/components/ui/MovieCard';

export function NowShowing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dates, setDates] = useState<{ date: string; dayLabel: string; monthLabel: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedMovieId, setSelectedMovieId] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [movieShowtimes, setMovieShowtimes] = useState<Record<string, Showtime[]>>({});
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getNowShowingMovies('ALL'), getAvailableShowDates()])
      .then(async ([fetchedMovies, fetchedDates]) => {
        if (!isMounted) return;
        setMovies(fetchedMovies);
        setDates(fetchedDates);

        if (fetchedMovies.length > 0) {
          setSelectedMovieId(fetchedMovies[0].id);
        }

        if (fetchedDates.length > 0) {
          const initialDate = fetchedDates[0].date;
          setSelectedDate(initialDate);

          const showtimeMap: Record<string, Showtime[]> = {};
          await Promise.all(
            fetchedMovies.map(async (movie) => {
              const st = await getShowtimesForMovieAndDate(movie.id, initialDate);
              showtimeMap[movie.id] = st;
            })
          );
          if (isMounted) {
            setMovieShowtimes(showtimeMap);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Failed to load cinema schedule:', err);
        setError('Unable to load showtimes from cinema schedule. Please try again.');
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([getNowShowingMovies('ALL'), getAvailableShowDates()])
      .then(async ([fetchedMovies, fetchedDates]) => {
        setMovies(fetchedMovies);
        setDates(fetchedDates);

        if (fetchedMovies.length > 0) {
          setSelectedMovieId(fetchedMovies[0].id);
        }

        if (fetchedDates.length > 0) {
          const initialDate = fetchedDates[0].date;
          setSelectedDate(initialDate);

          const showtimeMap: Record<string, Showtime[]> = {};
          await Promise.all(
            fetchedMovies.map(async (movie) => {
              const st = await getShowtimesForMovieAndDate(movie.id, initialDate);
              showtimeMap[movie.id] = st;
            })
          );
          setMovieShowtimes(showtimeMap);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load cinema schedule:', err);
        setError('Unable to load showtimes from cinema schedule. Please try again.');
        setIsLoading(false);
      });
  };

  // Handle Date Selection Change
  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);
    try {
      const showtimeMap: Record<string, Showtime[]> = {};
      await Promise.all(
        movies.map(async (movie) => {
          const st = await getShowtimesForMovieAndDate(movie.id, date);
          showtimeMap[movie.id] = st;
        })
      );
      setMovieShowtimes(showtimeMap);
    } catch (err) {
      console.error('Failed to update showtimes:', err);
    }
  };

  // Derive dynamic language filters based on movies currently in schedule
  const availableLanguages = [
    'ALL',
    ...Array.from(new Set(movies.map((m) => m.language.toUpperCase()))),
  ];

  // Handle Language Filter
  const filteredMovies = movies.filter((movie) => {
    if (selectedLanguage === 'ALL') return true;
    return movie.language.toUpperCase() === selectedLanguage.toUpperCase();
  });

  const activeMovieId = selectedMovieId || movies[0]?.id || '';
  const activeShowtimesForQuickBar = activeMovieId
    ? movieShowtimes[activeMovieId] || []
    : [];

  return (
    <section
      id="now-showing"
      className="relative bg-[#060709] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Book Your Experience — Now Showing"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">

        {/* 1. Section Header matching EVM Mockup */}
        <div className="flex flex-col items-start space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-cyan">
            <span>02</span>
            <span>|</span>
            <span>BOOK YOUR EXPERIENCE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-cinema-pure-white uppercase leading-tight">
            YOUR <span className="text-brand-cyan">MOVIE.</span>{' '}
            YOUR <span className="text-brand-gold">SCREEN.</span>{' '}
            YOUR <span className="text-cinema-white">MOMENT.</span>
          </h2>

          <p className="text-xs sm:text-sm text-cinema-gray-300 max-w-xl font-light">
            Book your tickets and step into a cinematic experience at EVM Cinemas.
          </p>
        </div>

        {/* 2. Quick Booking Filter Selector Bar */}
        <QuickBookingBar
          movies={movies}
          dates={dates}
          showtimes={activeShowtimesForQuickBar}
          selectedDate={selectedDate}
          selectedMovieId={activeMovieId}
          onDateChange={handleDateSelect}
          onMovieChange={(id) => setSelectedMovieId(id)}
        />

        {/* 3. Section Tabs Header: NOW SHOWING | COMING SOON */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2631] pb-4">
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              type="button"
              className="text-sm sm:text-lg font-bold tracking-wider uppercase text-cinema-pure-white border-b-2 border-brand-cyan pb-4 -mb-4"
            >
              NOW SHOWING
            </button>
            <a
              href="#coming-soon"
              className="text-sm sm:text-lg font-bold tracking-wider uppercase text-cinema-gray-500 hover:text-cinema-gray-300 transition-colors pb-4 -mb-4"
            >
              COMING SOON
            </a>
          </div>

          {/* View All Movies Link */}
          <a
            href="#now-showing"
            className="text-xs font-semibold tracking-wider text-brand-cyan hover:text-brand-cyan-glow uppercase inline-flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW ALL</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* 4. Date Selection Tabs & Language Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Date Selector Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {dates.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => handleDateSelect(d.date)}
                  className={`flex flex-col items-center px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-brand-gold text-cinema-black shadow-[0_0_18px_rgba(201,168,76,0.35)]'
                      : 'bg-[#0E121A] border border-[#1E2631] text-cinema-gray-300 hover:border-cinema-gray-600 hover:text-white'
                  }`}
                >
                  <span className="text-[0.62rem] opacity-80">{d.dayLabel}</span>
                  <span className="text-xs font-black">{d.monthLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Language Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {availableLanguages.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-[0.68rem] font-semibold tracking-wider uppercase transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-brand-cyan text-cinema-black font-bold'
                      : 'bg-[#141A24] text-cinema-gray-400 hover:text-white hover:bg-[#1E2631]'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Main Content: Responsive Movie Grid / Loading / Empty / Error States */}
        {isLoading ? (
          /* Loading Skeleton State */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[2/3] rounded-xl bg-[#0E121A] border border-[#1E2631] animate-pulse p-4 flex flex-col justify-between">
                <div className="w-16 h-4 bg-white/10 rounded" />
                <div className="space-y-2">
                  <div className="w-3/4 h-5 bg-white/10 rounded" />
                  <div className="w-1/2 h-3 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-[#140C0C] border border-[#3A1818] rounded-xl p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-red-400">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2 rounded-lg bg-red-950 text-red-200 text-xs font-bold uppercase tracking-wider hover:bg-red-900 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : movies.length === 0 ? (
          /* Empty Cinema Schedule State */
          <div className="bg-[#0E121A] border border-[#1E2631] rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-wider text-cinema-pure-white">
              No Movies Currently Showing
            </h4>
            <p className="text-xs sm:text-sm text-cinema-gray-400 font-light">
              We are updating our showtimes. Check back soon or explore upcoming movies.
            </p>
            <a
              href="#coming-soon"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light transition-all"
            >
              View Coming Soon
            </a>
          </div>
        ) : filteredMovies.length === 0 ? (
          /* Empty Filter State */
          <div className="bg-[#0E121A] border border-[#1E2631] rounded-xl p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-cinema-gray-400">
              No movies currently available for {selectedLanguage}.
            </p>
            <button
              type="button"
              onClick={() => setSelectedLanguage('ALL')}
              className="px-4 py-2 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan text-xs font-bold uppercase tracking-wider hover:bg-brand-cyan/30 transition-colors"
            >
              Show All Movies
            </button>
          </div>
        ) : (
          /* Responsive Movie Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showtimes={movieShowtimes[movie.id] || []}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
