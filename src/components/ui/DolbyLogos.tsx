import React from 'react';

export interface DolbyLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  variant?: 'white' | 'black';
}

/**
 * Official Dolby Atmos horizontal brand logo lockup.
 * Uses the authentic Dolby typographical emblem provided by EVM Cinemas.
 */
export function DolbyAtmosLogo({
  className = 'h-4 w-auto',
  variant = 'white',
  alt = 'Dolby Atmos',
  ...props
}: DolbyLogoProps) {
  const src = variant === 'white' ? '/images/brand/dolby-atmos-white.png' : '/images/brand/dolby-atmos.png';
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block object-contain flex-shrink-0 ${className}`}
      loading="lazy"
      {...props}
    />
  );
}

/**
 * Official Dolby Vision horizontal brand logo lockup.
 * Uses the authentic Dolby typographical emblem provided by EVM Cinemas.
 */
export function DolbyVisionLogo({
  className = 'h-4 w-auto',
  variant = 'white',
  alt = 'Dolby Vision',
  ...props
}: DolbyLogoProps) {
  const src = variant === 'white' ? '/images/brand/dolby-vision-white.png' : '/images/brand/dolby-vision.png';
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block object-contain flex-shrink-0 ${className}`}
      loading="lazy"
      {...props}
    />
  );
}

/**
 * Official Dolby Cinema horizontal brand logo lockup.
 * Uses the authentic Dolby typographical emblem provided by EVM Cinemas.
 */
export function DolbyCinemaLogo({
  className = 'h-4 w-auto',
  variant = 'white',
  alt = 'Dolby Cinema',
  ...props
}: DolbyLogoProps) {
  const src = variant === 'white' ? '/images/brand/dolby-cinema-white.png' : '/images/brand/dolby-cinema.png';
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block object-contain flex-shrink-0 ${className}`}
      loading="lazy"
      {...props}
    />
  );
}

/**
 * Renders the matching official Dolby lockup for a given format string or key.
 */
export function DolbyFormatBadge({
  format,
  className = 'h-3.5 w-auto',
  variant = 'white',
}: {
  format: string;
  className?: string;
  variant?: 'white' | 'black';
}) {
  const upper = format.toUpperCase();
  if (upper.includes('CINEMA')) {
    return <DolbyCinemaLogo className={className} variant={variant} />;
  }
  if (upper.includes('VISION')) {
    return <DolbyVisionLogo className={className} variant={variant} />;
  }
  if (upper.includes('ATMOS')) {
    return <DolbyAtmosLogo className={className} variant={variant} />;
  }
  return null;
}
