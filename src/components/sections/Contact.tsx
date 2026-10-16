'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { contactDetails } from '@/lib/data/mock-data';

export function Contact() {
  const directionsUrl =
    contactDetails.mapsUrl ||
    'https://www.google.com/maps/place/EVM+Cinemas/@9.9468237,76.2556623,17z/data=!3m1!4b1!4m6!3m5!1s0x3b0873400b95738d:0x247a16fecf1f31f9!8m2!3d9.9468237!4d76.2556623!16s%2Fg%2F11b8zcg34q';

  return (
    <section
      id="contact"
      className="relative bg-[#060709] border-t border-[#1E2631] py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      aria-label="Contact and Location"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          number="09"
          eyebrowText="CONTACT &amp; LOCATION"
          titleWhite="VISIT &amp;"
          titleGold="GET IN TOUCH."
        />

        {/* Two-Column Contact & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Details & Social Links (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-8">
            <dl className="space-y-6">
              {/* Phone */}
              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  PHONE ENQUIRIES
                </dt>
                <dd className="text-base font-semibold text-cinema-pure-white mt-1">
                  {contactDetails.phone ? (
                    <a
                      href={`tel:${contactDetails.phone.replace(/[\s+]/g, '')}`}
                      className="hover:text-brand-gold transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <span>{contactDetails.phone}</span>
                    </a>
                  ) : (
                    'To be supplied'
                  )}
                </dd>
              </div>

              {/* Official Emails */}
              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  OFFICIAL EMAIL DIRECTORY
                </dt>
                <dd className="mt-2 space-y-2">
                  <div className="p-3 rounded-lg bg-[#0C1017] border border-[#1E2631]">
                    <span className="block text-[0.62rem] font-semibold text-cinema-gray-400 uppercase tracking-wider">
                      Administration &amp; Management
                    </span>
                    <a
                      href="mailto:Admin@evmcinemas.com"
                      className="text-xs sm:text-sm font-semibold text-cinema-pure-white hover:text-brand-gold transition-colors inline-flex items-center gap-2 mt-0.5"
                    >
                      <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <span>Admin@evmcinemas.com</span>
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0C1017] border border-[#1E2631]">
                    <span className="block text-[0.62rem] font-semibold text-cinema-gray-400 uppercase tracking-wider">
                      Projection &amp; Technical Operations
                    </span>
                    <a
                      href="mailto:Projection@evmcinemas.com"
                      className="text-xs sm:text-sm font-semibold text-cinema-pure-white hover:text-brand-gold transition-colors inline-flex items-center gap-2 mt-0.5"
                    >
                      <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <span>Projection@evmcinemas.com</span>
                    </a>
                  </div>
                </dd>
              </div>

              {/* Physical Address */}
              <div>
                <dt className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                  THEATRE ADDRESS
                </dt>
                <dd className="text-sm font-semibold text-cinema-pure-white mt-1 leading-relaxed">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors inline-flex items-start gap-1.5"
                  >
                    <span>{contactDetails.addressLine}</span>
                    <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </dd>
              </div>

              {/* Box Office Counter Hours */}
              <div className="p-3.5 rounded-lg bg-[#0C1017] border border-[#1E2631] space-y-1">
                <span className="block text-[0.62rem] font-bold tracking-widest uppercase text-brand-cyan">
                  BOX OFFICE COUNTER
                </span>
                <p className="text-xs text-cinema-gray-300">
                  Open Daily &bull; 9:30 AM &ndash; 11:30 PM
                </p>
                <p className="text-[0.68rem] text-cinema-gray-400">
                  Counter bookings and ticket collections open at theatre entrance.
                </p>
              </div>
            </dl>

            {/* Social Channels */}
            <div className="pt-2 space-y-3">
              <span className="block text-[0.62rem] font-bold tracking-[0.2em] uppercase text-brand-cyan">
                CONNECT WITH US
              </span>
              <div className="flex flex-wrap gap-2.5">
                {contactDetails.socials.map((platform) =>
                  platform.href ? (
                    <a
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-[#273244] bg-[#0C1017] text-xs font-bold uppercase tracking-wider text-cinema-gray-300 hover:border-brand-gold hover:text-cinema-pure-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold inline-flex items-center gap-1.5"
                    >
                      <span>{platform.label}</span>
                      <svg className="w-3 h-3 text-cinema-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  ) : null
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Accurate Interactive Google Map (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#0C1017] border border-[#1E2631] rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
            {/* Map Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2631]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_#00D8F6]" />
                  <span className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-brand-gold">
                    LIVE THEATRE LOCATION
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-cinema-pure-white uppercase tracking-wide">
                  EVM Cinemas, Fort Kochi
                </h4>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-gold text-cinema-black hover:bg-brand-gold-light transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold flex-shrink-0"
              >
                <span>Get Directions</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>

            {/* Embedded Google Map Iframe with Prominent Landmark Pin */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:h-[420px] rounded-xl overflow-hidden border border-[#273244] bg-[#0A0D14] shadow-inner">
              {/* Floating Landmark Pin Badge */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#060709]/95 border border-brand-gold/60 shadow-2xl backdrop-blur-md">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
                    <svg className="w-4 h-4 text-red-500 fill-current relative z-10" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[0.58rem] font-bold text-brand-gold uppercase tracking-wider leading-none">
                      LANDMARK PINNED
                    </span>
                    <span className="block text-xs font-black text-cinema-pure-white uppercase tracking-wide mt-0.5">
                      EVM Cinemas &bull; Fort Kochi
                    </span>
                  </div>
                </div>
              </div>

              <iframe
                title="EVM Cinemas Accurate Google Map Location with Landmark Pin"
                src="https://maps.google.com/maps?q=EVM+Cinemas,+Opp+EVM+Theater,+Chullickal,+Kochi,+Kerala+682005&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Map Footer Information Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-[#141A24] border border-[#273244] text-center">
                <span className="block text-[0.62rem] font-bold text-brand-gold uppercase tracking-wider">
                  PARKING
                </span>
                <span className="text-[0.68rem] text-cinema-gray-300 font-medium">
                  Ample car &amp; two-wheeler parking
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141A24] border border-[#273244] text-center">
                <span className="block text-[0.62rem] font-bold text-brand-cyan uppercase tracking-wider">
                  LANDMARK
                </span>
                <span className="text-[0.68rem] text-cinema-gray-300 font-medium">
                  Opp. EVM Theater, Chullickal
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141A24] border border-[#273244] text-center">
                <span className="block text-[0.62rem] font-bold text-cinema-pure-white uppercase tracking-wider">
                  TRANSPORT
                </span>
                <span className="text-[0.68rem] text-cinema-gray-300 font-medium">
                  Minutes from Fort Kochi &amp; Mattancherry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
