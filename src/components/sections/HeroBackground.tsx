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

      {/* 2. Full-bleed Theatre Exterior Photo (spans 100% of hero background so zooming out scales seamlessly) */}
      <img
        src={src}
        alt="EVM Cinemas Building at Night"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-[center_center] lg:object-[68%_center] transition-transform duration-700"
      />

      {/* 3. Left-to-Right Dissolve: Ensures left-aligned typography has 100% crisp contrast while allowing building & neon to illuminate the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/90 sm:via-[#060709]/80 to-[#060709]/40 lg:to-transparent" />

      {/* 4. Mobile Vertical Protection: Deepens contrast on small viewports */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/80 lg:hidden" />

      {/* 5. Top Dissolve for Navbar */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-[#060709] via-[#060709]/80 to-transparent" />

      {/* 6. Bottom Dissolve for HeroBottomBar */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#060709] via-[#060709]/90 to-transparent" />

      {/* 7. Subtle Ambient Cyan Glow (Harmonizes with EVM's blue neon canopy lighting) */}
      <div
        className="absolute top-1/3 right-[10%] sm:right-[15%] w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 216, 246, 0.25) 0%, rgba(201, 168, 76, 0.08) 50%, transparent 75%)',
        }}
      />
    </div>
  );
}
