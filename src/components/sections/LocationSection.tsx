'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { contactDetails } from '@/lib/data/mock-data';

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
                Opp. EVM Theater, Chullickal, Kochi, Keralam 682005
              </p>
              {contactDetails.phone && (
                <div className="mt-2 flex items-center gap-2 text-xs text-cinema-gray-300">
                  <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <a
                    href={`tel:${contactDetails.phone.replace(/[\s+]/g, '')}`}
                    className="hover:text-brand-gold transition-colors font-semibold"
                  >
                    {contactDetails.phone}
                  </a>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-cinema-gray-300 font-light leading-relaxed">
              {contactDetails.locationDescription}
            </p>

            <div>
              <a
                href={contactDetails.mapsUrl || 'https://maps.google.com/?q=Opp.+EVM+Theater,+Chullickal,+Kochi,+Kerala+682005'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-[#141A24] border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-cinema-black transition-all shadow-[0_0_20px_rgba(201,168,76,0.25)] hover:shadow-[0_0_25px_rgba(201,168,76,0.45)] transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold text-center"
              >
                <svg className="w-4 h-4 text-current flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              </a>
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
