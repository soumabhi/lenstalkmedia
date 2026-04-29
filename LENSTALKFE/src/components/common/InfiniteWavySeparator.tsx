import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import WavyPatternSVG from './WavyPatternSVG';

/**
 * InfiniteWavySeparator - Exactly matches the Footer's animated pattern logic.
 */
const InfiniteWavySeparator = ({
  waveColor = '#fcfbe4',
  direction = 1, // 1 = left to right, -1 = right to left
  speed = 25, // seconds per loop
  className = ''
}: {
  waveColor?: string;
  direction?: 1 | -1;
  speed?: number;
  className?: string;
}) => {
  const moverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mover = moverRef.current;
    if (!mover) return;

    // Set initial position
    gsap.set(mover, { x: direction === 1 ? '0%' : '-50%' });

    // Animate
    gsap.to(mover, {
      x: direction === 1 ? '-50%' : '0%',
      duration: speed,
      ease: 'none',
      repeat: -1
    });
  }, [direction, speed]);

  return (
    <div 
      className={`absolute top-0 left-0 flex w-[400vw] sm:w-[200vw] -translate-y-1/2 z-20 pointer-events-none ${className}`}
      ref={moverRef}
    >
      <WavyPatternSVG className="w-1/2 h-auto" fill={waveColor} />
      <WavyPatternSVG className="w-1/2 h-auto -ml-px" fill={waveColor} />
    </div>
  );
}

export default InfiniteWavySeparator;
