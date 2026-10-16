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
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#060709]"
      aria-label="Welcome to EVM Cinemas"
    >
      {/* 1. Atmospheric Ambient Backdrop */}
      <HeroBackground />

      {/* 2. Coordinated Stage: Headline and Theatre Visual shrink together */}
      <div className="flex-1 flex items-center">
        <HeroContent src={src} />
      </div>

      {/* 3. Bottom Feature Bar */}
      <HeroBottomBar />
    </section>
  );
}
