'use client';

interface QuickBookingBarProps {
  className?: string;
}

/**
 * BookMyShow Booking Panel — Section 2
 * Embeds the official BookMyShow booking iframe for EVM Cinemas.
 */
export function QuickBookingBar({ className = '' }: QuickBookingBarProps) {
  return (
    <div
      className={`w-full bg-[#0C1017]/90 border border-[#1E2631] rounded-2xl p-2 sm:p-4 shadow-2xl shadow-black/80 backdrop-blur-lg overflow-hidden transition-all duration-300 ${className}`}
      aria-label="EVM Cinemas BookMyShow Online Ticket Booking"
    >
      <iframe
        src="https://cinemas.bookmyshow.com/iframe?domain=evmcinemas.com"
        title="EVM Cinemas BookMyShow Booking"
        scrolling="auto"
        frameBorder="0"
        width="100%"
        referrerPolicy="no-referrer"
        className="w-full border-0 rounded-xl"
        style={{ minHeight: '600px', width: '100%', border: 0 }}
      />
    </div>
  );
}
