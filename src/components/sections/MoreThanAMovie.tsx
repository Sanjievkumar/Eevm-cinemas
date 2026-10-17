'use client';

import { useState, useEffect } from 'react';
import type { ExperienceFeature } from '@/types';
import { getExperienceFeatures } from '@/lib/api/cinema-service';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DolbyVisionLogo, DolbyAtmosLogo, DolbyCinemaLogo } from '@/components/ui/DolbyLogos';
import { CinemaVideoModal } from '@/components/ui/CinemaVideoModal';

export function MoreThanAMovie() {
  const [features, setFeatures] = useState<ExperienceFeature[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-cinema-pure-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-cyan/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
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
                <div>
                  <span className="text-[0.62rem] font-bold tracking-[0.2em] text-brand-gold uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-center min-h-[28px]">
                  {item.title.toUpperCase() === 'DOLBY VISION' ? (
                    <DolbyVisionLogo className="h-5 sm:h-5.5 w-auto" alt="Dolby Vision" />
                  ) : item.title.toUpperCase() === 'DOLBY ATMOS' ? (
                    <DolbyAtmosLogo className="h-5 sm:h-5.5 w-auto" alt="Dolby Atmos" />
                  ) : item.title.toUpperCase() === 'DOLBY CINEMA' ? (
                    <DolbyCinemaLogo className="h-5 sm:h-5.5 w-auto" alt="Dolby Cinema" />
                  ) : (
                    <h3 className="text-base sm:text-lg font-black tracking-wide text-cinema-pure-white group-hover:text-brand-cyan transition-colors uppercase">
                      {item.title}
                    </h3>
                  )}
                </div>

                <p className="text-xs text-cinema-gray-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Experience Video Modal */}
      <CinemaVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/videos/evm-experience.mp4"
        title="EVM CINEMAS — THE EXPERIENCE"
      />
    </section>
  );
}
