'use client';

import { useState, useEffect } from 'react';
import type { ScreenDetail } from '@/types';
import { getScreenDetails } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DolbyCinemaLogo, DolbyVisionLogo, DolbyAtmosLogo } from '@/components/ui/DolbyLogos';

export function TwoScreens() {
  const [screens, setScreens] = useState<ScreenDetail[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getScreenDetails();
      setScreens(data);
    }
    loadData();
  }, []);

  return (
    <section
      id="screens"
      className="relative bg-[#070A0F] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Two Screens"
    >
      {/* Radial Gold Ambient Glow */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="05"
          eyebrowText="TWO SCREENS. ONE UNFORGETTABLE EXPERIENCE."
          titleWhite="TWO SCREENS."
          titleGold="ONE UNFORGETTABLE EXPERIENCE."
        />

        {/* Two Screens Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {screens.map((screen) => (
            <div
              key={screen.id}
              className="group relative bg-[#0C1017] border border-[#1E2631] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand-gold/60 hover:shadow-[0_0_30px_rgba(201,168,76,0.12)]"
            >
              {/* Screen Visual Header Banner */}
              <div className="relative aspect-[16/9] w-full bg-[#101520] overflow-hidden">
                {screen.imageUrl ? (
                  <img
                    src={screen.imageUrl}
                    alt={screen.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Central Technology Visual Display Fallback */
                  <div className="absolute inset-0 bg-gradient-to-br from-[#162030] via-[#0E1522] to-[#06090F] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-full max-w-sm h-28 sm:h-32 rounded-xl border-2 border-brand-cyan/70 bg-brand-cyan/10 flex flex-col items-center justify-center p-4 shadow-[0_0_30px_rgba(0,216,246,0.3)] transition-transform group-hover:scale-105">
                      <span className="text-2xl sm:text-3xl font-black tracking-widest text-cinema-pure-white uppercase drop-shadow-md">
                        {screen.title}
                      </span>
                      <span className="text-[0.62rem] font-bold tracking-[0.2em] text-brand-cyan uppercase mt-1">
                        {screen.projection} &middot; {screen.audio}
                      </span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C1017] via-[#0C1017]/60 to-transparent pointer-events-none" />
              </div>

              {/* Lower Section: Title, Description & Specifications */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-cinema-pure-white tracking-wide uppercase group-hover:text-brand-gold transition-colors inline-flex items-center gap-3">
                    {screen.title.toUpperCase() === 'DOLBY CINEMA' ? (
                      <DolbyCinemaLogo className="h-6 sm:h-7 w-auto" alt="Dolby Cinema" />
                    ) : screen.title.toUpperCase().includes('DOLBY ATMOS') ? (
                      <div className="inline-flex items-center gap-2.5">
                        <span>{screen.title.replace(/DOLBY ATMOS/i, '').trim()}</span>
                        <DolbyAtmosLogo className="h-5 sm:h-6 w-auto" alt="Dolby Atmos" />
                      </div>
                    ) : (
                      <span>{screen.title}</span>
                    )}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-cinema-gray-300 leading-relaxed font-light">
                    {screen.description}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#1E2631]">
                  {screen.specs.map((spec) => {
                    const valUpper = spec.value.toUpperCase();
                    return (
                      <div key={spec.label} className="p-2.5 rounded-lg bg-[#141A24] border border-[#273244] flex flex-col justify-between">
                        <span className="block text-[0.58rem] font-semibold text-cinema-gray-400 uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <div className="mt-1 flex items-center min-h-[20px]">
                          {valUpper.includes('DOLBY VISION') ? (
                            <DolbyVisionLogo className="h-3 sm:h-3.5 w-auto" alt="Dolby Vision" />
                          ) : valUpper.includes('DOLBY ATMOS') ? (
                            <div className="inline-flex items-center gap-1.5 flex-wrap">
                              {valUpper.includes('STUDIO GRADE') && (
                                <span className="text-[0.6rem] font-bold text-cinema-gray-300">STUDIO GRADE</span>
                              )}
                              <DolbyAtmosLogo className="h-3 sm:h-3.5 w-auto" alt="Dolby Atmos" />
                            </div>
                          ) : (
                            <span className="text-xs font-black text-brand-cyan uppercase tracking-wider">
                              {spec.value}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
