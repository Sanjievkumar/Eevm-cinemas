import { DolbyCinemaLogo, DolbyAtmosLogo } from '@/components/ui/DolbyLogos';

export function HeroBottomBar() {
  const features: Array<{
    label: string;
    customContent: React.ReactNode | null;
  }> = [
    {
      label: 'Dolby Cinema',
      customContent: <DolbyCinemaLogo className="h-4 sm:h-4.5 w-auto" alt="Dolby Cinema" />,
    },
    {
      label: 'Dolby Atmos Sound',
      customContent: <DolbyAtmosLogo className="h-4 sm:h-4.5 w-auto" alt="Dolby Atmos" />,
    },
    {
      label: '4K Laser Projection',
      customContent: null,
    },
    {
      label: 'Two Modern Screens',
      customContent: null,
    },
    {
      label: 'Premium Seating',
      customContent: null,
    },
  ];

  return (
    <div className="relative z-20 w-full bg-[#060709]/90 backdrop-blur-md border-t border-[#1E2631]/60 py-3 sm:py-4 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Feature Specifications: Horizontal swipeable on mobile, grid on desktop */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar w-full md:w-auto md:grid md:grid-cols-5 md:gap-6 py-1 scrollbar-none">
          {features.map((item) => (
            <div key={item.label} className="flex items-center flex-shrink-0 md:flex-shrink">
              {item.customContent ? (
                <div className="flex items-center">
                  {item.customContent}
                </div>
              ) : (
                <span className="text-[0.68rem] sm:text-xs font-semibold tracking-wider text-cinema-gray-300 uppercase leading-tight whitespace-nowrap md:whitespace-normal">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex items-center gap-3 text-cinema-gray-400 text-[0.65rem] font-semibold tracking-[0.2em] uppercase flex-shrink-0">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-4 h-7 rounded-full border border-cinema-gray-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-brand-gold animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
