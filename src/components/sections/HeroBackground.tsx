'use client';

interface HeroBackgroundProps {
  /** Optional custom image background URI */
  src?: string;
}

/**
 * HeroBackground — Photographic theatre background for EVM CINEMAS.
 * Anchored to the right on desktop so the illuminated theatre facade, EVM logo,
 * and Dolby Cinema entrance are prominently displayed without competing with the headline.
 */
export function HeroBackground({
  src = '/images/gallery/evm-exterior-night.png',
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Deep Pitch Obsidian Base Background */}
      <div className="absolute inset-0 bg-[#060709]" />

      {/* 2. Right-Anchored Theatre Exterior Photo */}
      <div className="absolute right-0 top-0 w-full lg:w-[64%] xl:w-[58%] h-full overflow-hidden flex items-center justify-end">
        <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
          <img
            src={src}
            alt="EVM Cinemas Building at Night"
            className="w-full h-full object-cover object-[center_35%] lg:object-[center_center] transition-transform duration-700"
          />

          {/* Left-to-Right Dissolve: Seamlessly merges the left edge of the photo into the pitch black backdrop */}
          <div className="absolute inset-y-0 left-0 w-28 sm:w-48 lg:w-72 bg-gradient-to-r from-[#060709] via-[#060709]/80 to-transparent" />

          {/* Top Dissolve for Navbar */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060709] via-[#060709]/60 to-transparent" />

          {/* Bottom Dissolve for HeroBottomBar */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060709] via-[#060709]/60 to-transparent" />

          {/* Right Edge Soft Vignette */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#060709]/40 to-transparent" />
        </div>
      </div>

      {/* 3. Subtle Ambient Cyan Glow (Harmonizes with EVM's blue neon canopy lighting) */}
      <div
        className="absolute top-1/4 right-[15%] w-[500px] h-[350px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 216, 246, 0.2) 0%, rgba(201, 168, 76, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* 4. Left Hero Content Protection Gradient (Ensures white and gold typography has 100% crisp contrast) */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] bg-gradient-to-r from-[#060709] via-[#060709]/90 to-transparent pointer-events-none" />
    </div>
  );
}
