import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroBottomBar } from './HeroBottomBar';

interface HeroProps {
  /** Optional custom image or video background URI */
  src?: string;
}

/**
 * Hero section — full-viewport cinematic theatre introduction.
 * Composes HeroBackground (theatre building visual), HeroContent (left-aligned text), and HeroBottomBar.
 */
export function Hero({ src }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[600px] lg:h-[calc(100vh-var(--nav-height,80px))] max-h-[900px] flex flex-col justify-between overflow-hidden bg-[#060709]"
      style={{ '--nav-height': '80px' } as React.CSSProperties}
      aria-label="Welcome to EVM Cinemas"
    >
      {/* Unified Master Stage Container: Background and Content share the exact same centered coordinate frame */}
      <div className="relative w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-center overflow-hidden">
        {/* Photographic background image bounded within the master coordinate frame */}
        <HeroBackground src={src} />

        {/* Foreground typography and actions overlay */}
        <div className="relative z-10 w-full flex-1 flex items-center">
          <HeroContent />
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <HeroBottomBar />
    </section>
  );
}
