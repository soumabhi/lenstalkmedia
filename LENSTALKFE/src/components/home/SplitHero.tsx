import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroSlide } from '../../types';
import { ArrowRight } from 'lucide-react';

interface SplitHeroProps {
  slides: HeroSlide[];
}

const SplitHero: React.FC<SplitHeroProps> = ({ slides }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // matching lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  // Always aim for 4 panels to match IFP aesthetic
  const panelCount = 4;
  const displaySlides = slides.slice(0, panelCount);

  // Fill remaining slots with null to trigger skeleton state
  const panels = Array.from({ length: panelCount }).map((_, i) => displaySlides[i] || null);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-black pt-[64px] p-4 gap-4">
      {panels.map((slide, index) => (
        <motion.div
          key={slide?.id || index}
          className={`relative flex-1 h-full overflow-hidden group ${index === 0 ? 'rounded-l-[2rem]' : ''
            } ${index === panels.length - 1 ? 'rounded-r-[2rem]' : ''
            } rounded-2xl`}
          animate={{
            flex: hoveredIndex === null
              ? 1
              : hoveredIndex === index
                ? (isMobile ? 2.5 : 1.2)
                : (isMobile ? 0.5 : 0.93),

          }}

          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
        >
          {slide ? (
            <>
              {/* Background Media */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  {slide.videoUrl ? (
                    <video
                      key="video"
                      src={slide.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={`h-full w-full object-cover transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-85' : 'opacity-40'
                        }`}
                    />
                  ) : (
                    <img
                      key="image"
                      src={slide.imageUrl}
                      alt={slide.title}
                      className={`h-full w-full object-cover transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-85' : 'opacity-40'
                        }`}
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Content Wrapper */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-16 lg:p-12 lg:pb-32 min-w-[320px]">
                <motion.div layout className="space-y-3 flex flex-col items-start text-left">
                  <motion.h2
                    className="text-xl lg:text-2xl xl:text-3xl font-titillium font-[900] uppercase text-white leading-tight tracking-tight"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/60 text-xs lg:text-sm max-w-[260px] font-medium leading-relaxed">
                      {slide.subtitle}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Vertical Title (Visible when not hovered) */}
              {/* <motion.div
                className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none hidden lg:block"
                animate={{
                  opacity: hoveredIndex === null ? 0.3 : hoveredIndex === index ? 0 : 0.1,
                  y: hoveredIndex === null ? 0 : -20
                }}
              >
                <span className="text-white font-titillium font-[900] text-2xl uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
                  {slide.title}
                </span>
              </motion.div> */}
            </>
          ) : (
            /* Skeleton Placeholder */
            <div className="h-full w-full bg-black flex flex-col justify-end p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
              <div className="absolute inset-0 animate-pulse bg-white/[0.01]" />

              <div className="space-y-4 relative z-10 opacity-20">
                <div className="w-20 h-2 bg-white/20 rounded-full" />
                <div className="w-48 h-12 bg-white/20 rounded-xl" />
                <div className="w-32 h-8 bg-white/10 rounded-full" />
              </div>

              <div className="absolute top-12 left-1/2 -translate-x-1/2 hidden lg:block opacity-10">
                <span className="text-white font-titillium font-[900] text-2xl uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
                  EMPTY PANEL
                </span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SplitHero;
