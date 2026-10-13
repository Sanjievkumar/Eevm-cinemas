'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';

export function LocationSection() {
  return (
    <section
      id="location"
      className="relative bg-[#090C12] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Location"
    >
      {/* Subtle Cyan Ambient Depth */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[350px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0, 216, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="07"
          eyebrowText="LOCATION"
          titleWhite="FIND"
          titleGold="EVM CINEMAS."
        />

        {/* Two-Column Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column: Address Details & CTA */}
          <div className="bg-[#0C1017] border border-[#1E2631] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-cyan">
                DESTINATION &middot; KERALAM
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-wide text-cinema-pure-white uppercase mt-1">
                EVM CINEMAS
              </h3>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-brand-gold mt-1">
                Kochi, Keralam
              </p>
            </div>

            <p className="text-xs sm:text-sm text-cinema-gray-300 font-light leading-relaxed">
              EVM Cinemas is located in Kochi, Keralam. Complete map coordinates and turn-by-turn navigation links will be integrated here upon official location launch.
            </p>

            <div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#141A24] border border-[#273244] text-cinema-gray-400 cursor-not-allowed"
                aria-disabled="true"
              >
                <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>GET DIRECTIONS — LINK COMING SOON</span>
              </button>
            </div>
          </div>

          {/* Right Column: Kochi Map Image Card */}
          <div className="group relative aspect-[4/3] w-full rounded-2xl border border-[#273244] bg-[#0A0D14] overflow-hidden shadow-2xl transition-all duration-300 hover:border-brand-cyan/60">
            <img
              src="/images/location/kochi-map.jpg"
              alt="EVM Cinemas Location Map — Kochi, Keralam"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Location Tag Overlay */}
            <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/85 border border-brand-cyan/60 text-[0.65rem] font-bold text-brand-cyan uppercase tracking-wider backdrop-blur-md shadow-lg">
              OUR LOCATION &middot; KOCHI, KERALAM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
