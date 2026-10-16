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
  src = '/images/hero/hero-building.jpg',
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Deep Pitch Obsidian Base Background */}
      <div className="absolute inset-0 bg-[#060709]" />

      {/* 2. Original Architectural Theatre Building Photograph (Starry sky, blue neon pillars, wet pavement reflection) */}
      <div className="absolute inset-0">
        <img
          src={src}
          alt="EVM Cinemas Building at Night"
          className="w-full h-full object-cover object-[55%_30%] sm:object-[60%_35%] lg:object-[68%_38%] transition-transform duration-700"
        />
      </div>

      {/* 3. Left-to-Right Dissolve: Ensures left-aligned typography has 100% crisp contrast while allowing illuminated facade and neon to shine on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/90 sm:via-[#060709]/80 to-[#060709]/30 lg:to-transparent" />

      {/* 4. Left & Right Seamless Edge Dissolves: Blends the master container into the outer pitch black background on ultra-wide screens */}
      <div className="hidden xl:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060709] to-transparent pointer-events-none" />
      <div className="hidden xl:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060709] to-transparent pointer-events-none" />

      {/* 5. Mobile Vertical Protection: Deepens contrast on small viewports */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/80 lg:hidden" />

      {/* 6. Top Dissolve for Navbar */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#060709] via-[#060709]/80 to-transparent" />

      {/* 7. Bottom Dissolve for HeroBottomBar */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#060709] via-[#060709]/90 to-transparent" />

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
