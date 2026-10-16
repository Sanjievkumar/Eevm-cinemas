'use client';

interface HeroBackgroundProps {
  /** Optional custom image background URI */
  src?: string;
}

/**
 * HeroBackground — Photographic theatre background for EVM CINEMAS.
 * Placed with tailored responsive positioning (theatre building on the right, content on the left)
 * and directional lighting vignette for maximum clarity and sharpness.
 */
export function HeroBackground({
  src = '/images/gallery/evm-exterior-night.png',
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Theatre Exterior Photograph Container */}
      <div className="absolute inset-0">
        <img
          src={src}
          alt="EVM Cinemas Building at Night"
          className="w-full h-full object-cover object-[center_30%] lg:object-[75%_35%] xl:object-[80%_35%] transition-transform duration-700"
        />
      </div>

      {/* 2. Soft Ambient Cyan Aura (Amplifies the theatre's blue neon roof lighting) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 75% 30%, rgba(0, 216, 246, 0.14) 0%, transparent 65%)',
        }}
      />

      {/* 3. Directional Vignette Gradient (Ensures left text is razor sharp while right building is clear & bright) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, #060709 0%, rgba(6, 7, 9, 0.88) 32%, rgba(6, 7, 9, 0.35) 60%, transparent 88%),
            linear-gradient(to top, #060709 0%, rgba(6, 7, 9, 0.6) 8%, transparent 24%),
            linear-gradient(to bottom, rgba(6, 7, 9, 0.75) 0%, transparent 18%)
          `,
        }}
      />
    </div>
  );
}
