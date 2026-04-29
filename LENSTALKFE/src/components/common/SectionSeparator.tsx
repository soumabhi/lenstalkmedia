import React from 'react';
import WavyPatternSVG from './WavyPatternSVG';

/**
 * SectionSeparator - Exactly matches the Footer's wavy pattern logic.
 * Place this at the TOP of a section to make it peak into the section above.
 */
const SectionSeparator = ({ 
  waveColor = '#3B0017',
  className = '' 
}: {
  waveColor?: string;
  className?: string;
}) => {
  return (
    <div 
      className={`absolute top-0 left-0 flex w-[200vw] -translate-y-1/2 pointer-events-none z-20 ${className}`}
    >
      <WavyPatternSVG className="w-1/2 h-auto" fill={waveColor} />
      <WavyPatternSVG className="w-1/2 h-auto" fill={waveColor} />
    </div>
  );
}

export default SectionSeparator;
