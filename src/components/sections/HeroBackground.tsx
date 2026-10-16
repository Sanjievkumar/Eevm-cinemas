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
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* 1. Deep Pitch Obsidian Base Background */}
      <div className="absolute inset-0 bg-[#060709]" />

      {/* 2. Atmospheric Ambient Light Beams */}
      <div
        className="absolute top-1/4 right-[15%] w-[600px] h-[500px] pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 216, 246, 0.25) 0%, rgba(201, 168, 76, 0.08) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute top-1/3 left-[10%] w-[500px] h-[400px] pointer-events-none opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* 3. Subtle Cinema Grid Lines Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E263112_1px,transparent_1px),linear-gradient(to_bottom,#1E263112_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      {/* 4. Top Dissolve for Navbar */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-[#060709] via-[#060709]/80 to-transparent" />

      {/* 5. Bottom Dissolve for HeroBottomBar */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#060709] via-[#060709]/90 to-transparent" />
    </div>
  );
}
