'use client';

interface HeroBackgroundProps {
  /** Optional custom image background URI */
  src?: string;
  /** Optional background video URI */
  videoSrc?: string;
}

/**
 * HeroBackground — Full-bleed video and photographic background for EVM CINEMAS.
 */
export function HeroBackground({
  src = '/images/hero/hero-building.jpg',
  videoSrc = '/videos/evm-experience.mp4',
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {videoSrc ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={src}
            className="w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
            <img
              src={src}
              alt="EVM Cinemas Building"
              className="w-full h-full object-cover object-center"
            />
          </video>
          {/* Cinematic dark gradients for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/90 via-[#060709]/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/70" />
        </div>
      ) : src ? (
        /* Photographic Image Asset Container */
        <div className="absolute inset-0 animate-ken-burns">
          <img
            src={src}
            alt="EVM Cinemas Building"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ) : (
        /* Simplified Cinema Building Visual — Temporary Placeholder Media */
        <div className="absolute inset-0 bg-[#060709]">
          {/* Night Sky Atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 75% 25%, rgba(0, 216, 246, 0.12) 0%, transparent 65%),
                radial-gradient(ellipse 50% 40% at 45% 35%, rgba(201, 168, 76, 0.06) 0%, transparent 70%),
                linear-gradient(180deg, #040609 0%, #0A0F17 40%, #060709 100%)
              `,
            }}
          />

          {/* Right-Side Theatre Building Silhouette & Lighting */}
          <div className="absolute right-0 top-0 w-full lg:w-[60%] h-full opacity-80">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1200 800"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="cyanSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="goldSoftGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="warmInteriorGlass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE094" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#060709" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="cyanPillar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D8F6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#007A94" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#060709" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Theatre Building Mass */}
              <path d="M460 190 L1100 130 L1150 720 L420 780 Z" fill="#0A0E15" stroke="#1B2432" strokeWidth="1.5" />

              {/* Slanted Roof Accent Line */}
              <path d="M490 170 L960 120 L940 240 L470 300 Z" fill="#061523" stroke="#00D8F6" strokeOpacity="0.3" strokeWidth="1.5" />

              {/* Glass Atrium Windows (Warm Interior Golden Glow) */}
              <g filter="url(#goldSoftGlow)">
                <polygon points="470,340 1010,260 990,680 440,730" fill="url(#warmInteriorGlass)" />
                <line x1="600" y1="320" x2="570" y2="700" stroke="#0A0804" strokeWidth="2.5" opacity="0.4" />
                <line x1="750" y1="300" x2="720" y2="670" stroke="#0A0804" strokeWidth="2.5" opacity="0.4" />
                <line x1="900" y1="280" x2="870" y2="650" stroke="#0A0804" strokeWidth="2.5" opacity="0.4" />
              </g>

              {/* Architectural Vertical Cyan Lighting Pillars */}
              <g filter="url(#cyanSoftGlow)">
                <polygon points="460,310 482,306 462,735 440,740" fill="url(#cyanPillar)" />
                <polygon points="570,295 592,291 572,715 550,720" fill="url(#cyanPillar)" />
                <polygon points="680,280 702,276 682,695 660,700" fill="url(#cyanPillar)" />
                <polygon points="790,265 812,261 792,675 770,680" fill="url(#cyanPillar)" />
              </g>

              {/* Ground Reflection */}
              <polygon points="350,710 1150,600 1200,800 300,800" fill="#04060A" opacity="0.95" />
            </svg>
          </div>
        </div>
      )}

      {/* Left-to-Right Vignette Gradient for Content Readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, #060709 0%, rgba(6, 7, 9, 0.95) 40%, rgba(6, 7, 9, 0.6) 65%, rgba(6, 7, 9, 0.1) 100%),
            linear-gradient(to top, #060709 0%, transparent 20%),
            linear-gradient(to bottom, rgba(6, 7, 9, 0.7) 0%, transparent 20%)
          `,
        }}
      />
    </div>
  );
}
