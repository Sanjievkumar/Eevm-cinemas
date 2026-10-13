import React from 'react';

interface DolbyIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Official Dolby Laboratories "Double D" Emblem
 * Crisp scalable SVG with evenodd fill rule for negative space "D" cutouts.
 */
export function DolbyIcon({ className = 'w-4 h-4', ...props }: DolbyIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M0 3.648v16.704h24V3.648H0zm2.831 2.158h2.736c2.839 0 5.214 2.767 5.214 6.194s-2.375 6.194-5.214 6.194H2.831V5.806zm18.338 12.388h-2.736c-2.839 0-5.214-2.767-5.214-6.194s2.375-6.194 5.214-6.194h2.736v12.388z" />
    </svg>
  );
}
