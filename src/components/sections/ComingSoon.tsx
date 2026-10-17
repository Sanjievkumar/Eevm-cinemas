'use client';

import { useState, useEffect } from 'react';
import type { ComingSoonMovie } from '@/types';
import { getComingSoonMovies } from '@/lib/api/cinema-service';
import { MoviePoster } from '@/components/ui/MoviePoster';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ComingSoon() {
  const [movies, setMovies] = useState<ComingSoonMovie[]>([]);
  const [notifiedIds, setNotifiedIds] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getComingSoonMovies();
        setMovies(data);
      } catch (err) {
        console.error('Failed to load coming soon movies:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleNotify = (id: string) => {
    setNotifiedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="coming-soon"
      className="relative bg-[#080B10] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Coming Soon"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="03"
          eyebrowText="COMING SOON"
          titleWhite="RELEASING"
          titleGold="SOON"
          description="Get ready for the next big blockbusters arriving at EVM Cinemas."
          rightElement={
            <span className="text-xs font-bold tracking-wider uppercase text-cinema-gray-400 border border-[#1E2631] px-3.5 py-2 rounded-full bg-[#0C1017]">
              {movies.length || 5} UPCOMING RELEASES
            </span>
          }
        />

        {/* 5-Column Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[2/3] rounded-xl bg-[#0C1017] border border-[#1E2631] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => {
              const isNotified = notifiedIds[movie.id];
              return (
                <div
                  key={movie.id}
                  className="group relative bg-[#0C1017] border border-[#1E2631] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-[0_0_20px_rgba(0,216,246,0.12)]"
                >
                  {/* Poster Area */}
                  <div className="relative">
                    <MoviePoster
                      src={movie.posterUrl}
                      alt={movie.title}
                      title={movie.title}
                      certificate={movie.certificate}
                      formats={movie.formats}
                      genre={movie.genres?.[0]}
                    />

                    {/* Release Date Badge Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 px-2 py-1 rounded bg-[#060709]/90 border border-brand-gold/50 text-[0.62rem] font-bold text-brand-gold uppercase tracking-wider text-center backdrop-blur-md">
                      {movie.releaseDate.toUpperCase().includes('COMING') ? 'COMING SOON' : `RELEASING ${movie.releaseDate}`}
                    </div>
                  </div>

                  {/* Movie Information & Actions */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-cinema-pure-white tracking-wide uppercase group-hover:text-brand-cyan transition-colors line-clamp-1">
                        {movie.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-1 text-[0.65rem] font-medium text-cinema-gray-400 uppercase tracking-wider">
                        <span className="text-cinema-white font-semibold">{movie.language}</span>
                        {movie.certificate && (
                          <>
                            <span>&middot;</span>
                            <span>{movie.certificate}</span>
                          </>
                        )}
                        {movie.genres?.[0] && (
                          <>
                            <span>&middot;</span>
                            <span>{movie.genres[0]}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* REMIND ME Action Button */}
                    <button
                      type="button"
                      onClick={() => toggleNotify(movie.id)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[0.68rem] font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
                        isNotified
                          ? 'bg-brand-cyan text-cinema-black shadow-[0_0_12px_rgba(0,216,246,0.35)]'
                          : 'bg-[#141A24] border border-[#273244] text-cinema-gray-300 hover:border-brand-cyan/60 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill={isNotified ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                      <span>{isNotified ? 'NOTIFIED' : 'REMIND ME'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
