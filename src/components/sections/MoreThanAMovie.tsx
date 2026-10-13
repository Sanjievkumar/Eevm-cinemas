'use client';

import { useState, useEffect } from 'react';
import type { ExperienceFeature } from '@/types';
import { getExperienceFeatures } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DolbyIcon } from '@/components/ui/DolbyIcon';

export function MoreThanAMovie() {
  const [features, setFeatures] = useState<ExperienceFeature[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getExperienceFeatures();
      setFeatures(data);
    }
    loadData();
  }, []);

  return (
    <section
      id="experience"
      className="relative bg-[#060709] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="More Than a Movie"
    >
      {/* Radial Cyan Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0, 216, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="04"
          eyebrowText="THE EVM CINEMAS EXPERIENCE"
          titleWhite="MORE THAN A"
          titleGold="MOVIE."
          description="At EVM Cinemas, every detail comes together to create a complete cinematic experience — from the screen and sound to the comfort and everything in between."
          action={
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-cinema-pure-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              <span className="text-brand-gold text-xs">▶</span>
              <span>WATCH THE EXPERIENCE</span>
            </button>
          }
        />

        {/* 4-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#0C1017] border border-[#1E2631] rounded-xl p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(0,216,246,0.1)] hover:-translate-y-1"
            >
              {/* Badge & Icon Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold tracking-[0.2em] text-brand-gold uppercase">
                    {item.badge}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                    {(item.iconName === 'vision' || item.iconName === 'dolby') && (
                      <DolbyIcon className="w-4.5 h-4.5 text-white" />
                    )}
                    {(item.iconName === 'atmos' || item.iconName === 'sound') && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.287a5 5 0 010 7.427M12 6v12l-4-4H4V10h4l4-4z" />
                      </svg>
                    )}
                    {item.iconName === 'seating' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m10-2.5V14M5 8h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2zM7 8V5a2 2 0 012-2h6a2 2 0 012 2v3" />
                      </svg>
                    )}
                    {item.iconName === 'amenities' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625A2.625 2.625 0 1114.625 7.5H12m0-2.625V7.5m-9 3h18" />
                      </svg>
                    )}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black tracking-wide text-cinema-pure-white group-hover:text-brand-cyan transition-colors uppercase inline-flex items-center gap-2">
                  {item.title.toUpperCase().includes('DOLBY') && (
                    <DolbyIcon className="h-3.5 sm:h-4 w-auto text-white flex-shrink-0" />
                  )}
                  <span>{item.title}</span>
                </h3>

                <p className="text-xs text-cinema-gray-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Bottom CTA: LEARN MORE → */}
              <div className="pt-3 border-t border-[#1E2631]/80">
                <span className="text-[0.68rem] font-bold tracking-wider text-brand-gold uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>LEARN MORE</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
