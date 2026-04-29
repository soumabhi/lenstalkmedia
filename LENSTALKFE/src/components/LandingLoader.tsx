import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Lenstalk Media Logo Component (Minimalist style)
const LenstalkLogo = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <h1 
      className="text-6xl sm:text-8xl font-black text-[#3B0017] tracking-[0.15em]"
      style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 900 }}
    >
      LENSTALK
    </h1>
    <span 
      className="text-xl sm:text-2xl font-bold text-[#3B0017] tracking-[0.8em] mt-2 ml-4"
      style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 900 }}
    >
      MEDIA
    </span>
  </div>
);

const LandingLoader = ({ onComplete }: { onComplete?: () => void }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoConRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main loader animation timeline
    const tl = gsap.timeline({
      onUpdate: () => window.scrollTo(0, 0),
      onComplete: () => {
        onComplete?.();
      }
    });

    // 1. Initial breathing room
    tl.to({}, { duration: 0.8 })
    
    // 2. Slow and steady reveal
    .fromTo(
      logoRef.current,
      { 
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' 
      },
      { 
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
        ease: 'power2.inOut',
        duration: 3.5 
      }
    )
    
    // 3. Steady pause for reading
    .to({}, { duration: 1.2 })

    // 4. Smooth scale down
    .to(logoConRef.current, {
      scale: 0.95,
      opacity: 0,
      filter: 'blur(8px)',
      ease: 'power2.in',
      duration: 1.0
    })

    // 5. Graceful slide up
    .to(loaderRef.current, {
      y: '-100%',
      ease: 'power4.inOut',
      duration: 1.8
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <section 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#fcfbe4] w-full h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Center Logo Container */}
      <div className="relative z-10">
        <div ref={logoConRef} className="relative">
          {/* Animated Logo */}
          <div 
            ref={logoRef}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
          >
            <LenstalkLogo className="w-auto h-auto" />
          </div>
          
          {/* Static Ghost Logo (subtle hint) */}
          <LenstalkLogo className="w-auto h-auto opacity-10" />
        </div>
      </div>
    </section>
  );
};

export default LandingLoader;
