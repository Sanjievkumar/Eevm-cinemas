'use client';

import { useState, useEffect } from 'react';
import type { LegacyMilestone } from '@/types';
import { getLegacyMilestones } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DolbyIcon } from '@/components/ui/DolbyIcon';

export function LegacySection() {
  const [milestones, setMilestones] = useState<LegacyMilestone[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      const data = await getLegacyMilestones();
      setMilestones(data);
    }
    loadData();
  }, []);

  const activeMilestone = milestones[activeIdx] || milestones[0];

  return (
    <section
      id="about"
      className="relative bg-[#080B10] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Our Legacy"
    >
      {/* Subtle Gold Ambient Radial Depth */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="06"
          eyebrowText="OUR LEGACY"
          titleWhite="A STORY"
          titleGold="WORTH TELLING."
        />

        {/* 3-Tab Era Selector Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {milestones.map((m, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={m.year}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                  isActive
                    ? 'bg-brand-gold text-cinema-black shadow-[0_0_20px_rgba(201,168,76,0.35)]'
                    : 'bg-[#141A24] border border-[#273244] text-cinema-gray-300 hover:border-brand-gold/60 hover:text-white'
                }`}
              >
                <span>{m.year} &middot; {m.title}</span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Editorial Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Featured Theatre Era Photograph */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="group relative aspect-[4/3] w-full rounded-2xl border border-[#273244] bg-[#0A0D14] overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-gold/60">
              {activeMilestone?.imageUrl ? (
                <img
                  src={activeMilestone.imageUrl}
                  alt={`EVM Cinemas ${activeMilestone.year} - ${activeMilestone.title}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#121924] to-[#070A0F]">
                  <span className="text-xs font-semibold tracking-widest text-cinema-gray-400 uppercase">
                    EVM CINEMAS THEATRE PHOTOGRAPH
                  </span>
                </div>
              )}

              {/* Bottom Gradient Tag Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end">
                <span className="text-[0.62rem] font-bold tracking-[0.25em] text-brand-gold uppercase inline-flex items-center gap-1.5">
                  <span>ERA {activeMilestone?.year} &middot;</span>
                  {activeMilestone?.subtitle.toUpperCase().includes('DOLBY') && (
                    <DolbyIcon className="h-2.5 w-auto flex-shrink-0" />
                  )}
                  <span>{activeMilestone?.subtitle}</span>
                </span>
                <h4 className="text-lg sm:text-xl font-black text-cinema-pure-white uppercase tracking-wide mt-0.5">
                  {activeMilestone?.title}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Story Chapters Grid */}
          <div className="lg:col-span-6 space-y-5">
            {milestones.map((m, idx) => {
              const isActive = idx === activeIdx;
              return (
                <article
                  key={m.title}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative rounded-xl p-6 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#0C1017] border-brand-gold/70 shadow-[0_0_25px_rgba(201,168,76,0.12)]'
                      : 'bg-[#0C1017]/50 border-[#1E2631]/80 hover:bg-[#0C1017] hover:border-brand-gold/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="inline-flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-brand-gold shadow-[0_0_8px_#C9A84C]' : 'bg-cinema-gray-600'}`} />
                      <span className="text-[0.68rem] font-bold tracking-[0.25em] text-brand-gold uppercase">
                        {m.year}
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-bold tracking-widest text-brand-cyan uppercase bg-brand-cyan/10 border border-brand-cyan/20 px-2.5 py-0.5 rounded inline-flex items-center gap-1.5">
                      {m.subtitle.toUpperCase().includes('DOLBY') && (
                        <DolbyIcon className="h-2.5 w-auto flex-shrink-0" />
                      )}
                      <span>{m.subtitle}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-cinema-pure-white uppercase tracking-wide group-hover:text-brand-gold transition-colors">
                    {m.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-cinema-gray-300 font-light leading-relaxed">
                    {m.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
