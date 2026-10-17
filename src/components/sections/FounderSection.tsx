'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DolbyCinemaLogo, DolbyAtmosLogo } from '@/components/ui/DolbyLogos';

export function FounderSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="leadership"
      className="relative bg-[#070A0F] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Leadership and Vision"
    >
      {/* Subtle Gold Ambient Radial Depth */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 168, 76, 0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="07"
          eyebrowText="LEADERSHIP & VISION"
          titleWhite="THE VISION"
          titleGold="BEHIND EVM."
        />

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Founder Portrait Space */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="group relative w-full max-w-[420px] aspect-[4/5] rounded-2xl border border-brand-gold/50 bg-[#0A0D14] overflow-hidden shadow-[0_0_40px_rgba(201,168,76,0.18)] transition-all duration-500 hover:border-brand-gold/80 hover:shadow-[0_0_50px_rgba(201,168,76,0.28)]">
              {/* Projector Overhead Light Cone */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-80 pointer-events-none opacity-60 z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.25) 0%, rgba(0, 216, 246, 0.12) 40%, transparent 75%)',
                }}
              />

              {/* Founder Image or Refined Bespoke Placeholder */}
              {!imageError ? (
                <img
                  src="/images/founder/Jose%20Mathew.jpeg"
                  alt="Mr. Jose Mathew — Managing Director, EVM Cinemas"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : null}

              {/* Sophisticated Placeholder Frame (rendered when photo is pending) */}
              {imageError && (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-5">
                  {/* Gold Monogram Crest */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-brand-gold/60 bg-[#0A0E16] flex items-center justify-center shadow-[0_0_25px_rgba(201,168,76,0.25)] group-hover:scale-105 transition-transform duration-300">
                    <span className="text-3xl sm:text-4xl font-black text-gradient-gold tracking-widest font-serif">
                      JM
                    </span>
                    {/* Orbit Ring */}
                    <div className="absolute -inset-2 rounded-full border border-dashed border-brand-gold/30 animate-[spin_30s_linear_infinite]" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                      MANAGING DIRECTOR
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-cinema-pure-white uppercase tracking-wider">
                      Mr. Jose Mathew
                    </h4>
                    <p className="text-[0.7rem] text-cinema-gray-400 uppercase tracking-widest">
                      EVM Cinemas &bull; EVM Group
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[0.65rem] font-medium text-cinema-gray-500 tracking-wider uppercase border border-[#1E2631] bg-black/40 px-3 py-1.5 rounded-md">
                      Official Portrait Reserved
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Card Glass Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 flex flex-col justify-end pointer-events-none">
                <div className="flex items-center justify-between border-t border-brand-gold/40 pt-2.5">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-cinema-pure-white uppercase tracking-wide drop-shadow">
                      Mr. Jose Mathew
                    </h4>
                    <p className="text-[0.65rem] text-brand-gold font-semibold uppercase tracking-wider">
                      Managing Director &bull; EVM Group
                    </p>
                  </div>
                  <span className="text-[0.58rem] font-bold tracking-widest text-brand-cyan uppercase bg-black/60 backdrop-blur-md border border-brand-cyan/30 px-2 py-0.5 rounded shadow">
                    FORT KOCHI
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Caption Under Portrait */}
            <p className="mt-3 text-[0.7rem] text-cinema-gray-400 italic text-center lg:text-left max-w-[400px]">
              &ldquo;Bringing the same warmth and quality to every guest experience.&rdquo; &mdash; Mr. Jose Mathew
            </p>
          </div>

          {/* Right Column: Editorial Narrative & Group Highlights */}
          <div className="lg:col-span-7 space-y-6">
            {/* Designation Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_#C9A84C]" />
              <span className="text-[0.68rem] font-bold tracking-[0.25em] text-brand-gold uppercase">
                MANAGING DIRECTOR &bull; LEADERSHIP
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-cinema-pure-white tracking-tight uppercase leading-[1.1]">
                Mr. Jose Mathew
              </h3>
              <p className="text-base sm:text-lg font-bold text-gradient-gold tracking-wide">
                Steering cinema and luxury hospitality with visionary excellence.
              </p>
            </div>

            {/* Core Narrative — Faithful to Official EVM Group Overview */}
            <div className="space-y-4 text-xs sm:text-sm text-cinema-gray-300 leading-relaxed font-light">
              <p className="text-sm sm:text-base text-cinema-pure-white leading-relaxed font-normal">
                <strong className="text-brand-gold font-bold">Mr. Jose Mathew</strong>, Managing Director of EVM Cinemas, Fort Kochi, leads a diversified group with a strong presence in cinema and hospitality.
              </p>
              <p>
                Under his guidance, the group also runs hotels and resorts in <span className="text-cinema-pure-white font-medium">Munnar, Thekkady, Guruvayur and more</span>, bringing the same warmth and quality to every guest experience.
              </p>

              {/* Highlighted Historical Milestone Box */}
              <div className="p-4 rounded-xl bg-[#0C1017] border border-brand-gold/40 flex items-center gap-3.5 shadow-lg">
                <div className="w-9 h-9 rounded-lg bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold flex-shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[0.62rem] font-bold text-brand-gold uppercase tracking-widest">
                    THEATRE HERITAGE &bull; KEY MILESTONES
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-cinema-pure-white tracking-wide">
                    1983 theatre started &middot; 2011 EVM group took over.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Feature Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              {/* Card 1: Hospitality & Cinema */}
              <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2631] space-y-1.5 transition-colors hover:border-brand-gold/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <span className="text-[0.62rem] font-bold tracking-widest text-brand-gold uppercase">
                    HOSPITALITY &amp; CINEMA
                  </span>
                </div>
                <p className="text-xs text-cinema-gray-300 font-normal leading-snug">
                  Premier hotels and luxury resorts in Munnar, Thekkady, Guruvayur &amp; beyond.
                </p>
              </div>

              {/* Card 2: 1983 to 2011 Timeline */}
              <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2631] space-y-1.5 transition-colors hover:border-brand-cyan/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[0.62rem] font-bold tracking-widest text-brand-cyan uppercase">
                    1983 &bull; 2011 STEWARDSHIP
                  </span>
                </div>
                <p className="text-xs text-cinema-gray-300 font-normal leading-snug">
                  Theatre opened in 1983; EVM Group took over in 2011, establishing a modern benchmark.
                </p>
              </div>

              {/* Card 3: Uncompromising Quality */}
              <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2631] space-y-1.5 transition-colors hover:border-brand-gold/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <span className="text-[0.62rem] font-bold tracking-widest text-brand-gold uppercase">
                    GUEST-FIRST PHILOSOPHY
                  </span>
                </div>
                <p className="text-xs text-cinema-gray-300 font-normal leading-snug">
                  Impeccable customer service and warmth infused into every screening and resort stay.
                </p>
              </div>

              {/* Card 4: Flagship Audio-Visual Tech */}
              <div className="p-4 rounded-xl bg-[#0C1017] border border-[#1E2631] space-y-1.5 transition-colors hover:border-brand-cyan/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <DolbyCinemaLogo className="h-2.5 w-auto" alt="Dolby Cinema" />
                  </div>
                  <span className="text-[0.62rem] font-bold tracking-widest text-cinema-pure-white uppercase">
                    TECHNOLOGY LEADERSHIP
                  </span>
                </div>
                <p className="text-xs text-cinema-gray-300 font-normal leading-snug flex items-center gap-1.5 flex-wrap">
                  <span>Dual screens with</span>
                  <DolbyAtmosLogo className="h-2.5 w-auto" alt="Dolby Atmos" />
                  <span>&amp; 4K laser.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
