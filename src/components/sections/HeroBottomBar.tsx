import { DolbyIcon } from '@/components/ui/DolbyIcon';

export function HeroBottomBar() {
  const features = [
    {
      label: 'Dolby Cinemas',
      icon: <DolbyIcon className="w-5 h-5 text-white" />,
    },
    {
      label: 'Dolby Atmos Sound',
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.287a5 5 0 010 7.427M12 6v12l-4-4H4V10h4l4-4z" />
        </svg>
      ),
    },
    {
      label: '4K Laser Projection',
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-6-3v3m-6.9-6h13.8m-13.8 0A2.25 2.25 0 013 12V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V12a2.25 2.25 0 01-2.25 2.25M6.75 14.25h10.5" />
        </svg>
      ),
    },
    {
      label: 'Two Modern Screens',
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6z" />
        </svg>
      ),
    },
    {
      label: 'Premium Seating',
      icon: (
        <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m10-2.5V14M5 8h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2zM7 8V5a2 2 0 012-2h6a2 2 0 012 2v3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative z-20 w-full bg-[#060709]/90 backdrop-blur-md border-t border-[#1E2631]/60 py-3 sm:py-4 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Feature Specifications: Horizontal swipeable on mobile, grid on desktop */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto md:grid md:grid-cols-5 md:gap-6 py-1 scrollbar-none">
          {features.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 flex-shrink-0 md:flex-shrink">
              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-[0.65rem] sm:text-xs font-semibold tracking-wider text-cinema-gray-300 uppercase leading-tight whitespace-nowrap md:whitespace-normal">
                {item.label}
              </span>
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
