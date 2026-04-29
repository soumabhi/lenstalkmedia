import React from 'react';

/**
 * Card Pattern Backgrounds - Halftone, Dotted, and Geometric Patterns
 */

export const HalftonePattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="halftone-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#halftone-dots)" />
  </svg>
);

export const DiagonalLinePattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="diagonal-lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#diagonal-lines)" />
  </svg>
);

export const GridPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="grid-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid-pattern)" />
  </svg>
);

export const WavePattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none">
    <defs>
      <pattern id="wave-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M0,25 Q12.5,10 25,25 T50,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="200" height="200" fill="url(#wave-pattern)" />
  </svg>
);

export const NoisePattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" />
        <feDisplacementMap in="SourceGraphic" scale="15" />
      </filter>
    </defs>
    <rect width="100" height="100" fill="currentColor" opacity="0.05" filter="url(#noise-filter)" />
  </svg>
);

export const DotGridPattern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="dot-grid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.12" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#dot-grid)" />
  </svg>
);

/**
 * Pattern Component with dynamic styling
 */
interface PatternBackgroundProps {
  pattern?: 'halftone' | 'diagonal' | 'grid' | 'wave' | 'noise' | 'dotgrid';
  opacity?: number;
  className?: string;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  pattern = 'halftone',
  opacity = 1,
  className = '',
}) => {
  const patterns: Record<string, React.ComponentType> = {
    halftone: HalftonePattern,
    diagonal: DiagonalLinePattern,
    grid: GridPattern,
    wave: WavePattern,
    noise: NoisePattern,
    dotgrid: DotGridPattern,
  };

  const PatternComponent = patterns[pattern] || HalftonePattern;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] ${className}`}
      style={{ opacity }}
    >
      <PatternComponent />
    </div>
  );
};

/**
 * Gradient Background with Pattern
 */
export const GradientPatternCard: React.FC<{
  children?: React.ReactNode;
  gradient: string;
  pattern?: 'halftone' | 'diagonal' | 'grid' | 'wave' | 'noise' | 'dotgrid';
  className?: string;
}> = ({ children, gradient, pattern = 'halftone', className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-[2rem] ${className}`}
    style={{
      background: gradient,
    }}
  >
    <PatternBackground pattern={pattern} opacity={0.4} />
    <div className="relative z-10">{children}</div>
  </div>
);

export default PatternBackground;
