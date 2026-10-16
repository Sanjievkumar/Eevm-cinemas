import Link from 'next/link';
import { cinemaInfo, contactDetails, navigationItems } from '@/lib/data/mock-data';

import { DolbyCinemaLogo, DolbyAtmosLogo } from '@/components/ui/DolbyLogos';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060709] border-t border-[#1E2631]" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="EVM Cinemas — Home" className="inline-flex items-center">
              <img
                src="/images/brand/evm-logo.png"
                alt="EVM Cinemas Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-cinema-gray-400 max-w-xs">{cinemaInfo.description}</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-overline mb-4">Explore</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-cinema-gray-400 hover:text-cinema-pure-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Location */}
          <div>
            <h3 className="text-overline mb-4">Location</h3>
            <address className="not-italic space-y-2 text-sm text-cinema-gray-400">
              <p>{cinemaInfo.name}</p>
              <p>
                {contactDetails.mapsUrl ? (
                  <a
                    href={contactDetails.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cinema-pure-white transition-colors"
                  >
                    {contactDetails.addressLine}
                  </a>
                ) : (
                  contactDetails.addressLine
                )}
              </p>
              {contactDetails.phone && (
                <p>
                  <a href={`tel:${contactDetails.phone.replace(/[\s+]/g, '')}`} className="hover:text-brand-gold transition-colors">
                    {contactDetails.phone}
                  </a>
                </p>
              )}
              <div className="pt-1 space-y-1">
                <p>
                  <a href="mailto:Admin@evmcinemas.com" className="hover:text-brand-gold transition-colors">
                    Admin@evmcinemas.com
                  </a>
                </p>
                <p>
                  <a href="mailto:Projection@evmcinemas.com" className="hover:text-brand-gold transition-colors">
                    Projection@evmcinemas.com
                  </a>
                </p>
              </div>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-overline mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              {contactDetails.socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-cinema-gray-400 hover:text-brand-gold transition-colors">
                      {s.label}
                    </a>
                  ) : (
                    <span className="text-cinema-gray-600">{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E2631] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cinema-gray-500">
            &copy; {year} {cinemaInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 opacity-75 hover:opacity-100 transition-opacity">
            <span className="text-[0.6rem] font-bold tracking-widest text-cinema-gray-500 uppercase">
              Technology Partner
            </span>
            <DolbyCinemaLogo className="h-3 w-auto" alt="Dolby Cinema" />
            <DolbyAtmosLogo className="h-2.5 w-auto" alt="Dolby Atmos" />
          </div>
        </div>
      </div>
    </footer>
  );
}
