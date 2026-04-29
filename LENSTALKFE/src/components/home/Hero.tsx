import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide } from '../../types';
import { Link } from 'react-router-dom';

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (!slides.length) return null;

  const currentSlide = slides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* IFP Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-[0.04] text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap text-parchment">
          {Array.from({ length: 20 }).map((_, i) => <span key={i}>LENSTALK</span>)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Media */}
          <div className="absolute inset-0 z-0">
            {currentSlide.videoUrl ? (
              <video
                src={currentSlide.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-15 mix-blend-luminosity"
              />
            ) : (
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="h-full w-full object-cover opacity-15 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 border-2 border-warm-yellow/30 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-warm-yellow/10"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-warm-yellow animate-pulse block" />
                <span className="font-display text-[10px] sm:text-xs tracking-[0.2em] uppercase text-warm-yellow">Odisha's Creative Agency</span>
              </motion.div>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold text-parchment tracking-tight leading-tight sm:leading-none mb-4 sm:mb-6"
              >
                {currentSlide.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 2 ? 'italic text-warm-yellow' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-2xl text-parchment/60 mb-6 sm:mb-10 max-w-2xl mx-auto font-medium px-2 sm:px-0"
              >
                {currentSlide.subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
              >
                <Link
                  to={currentSlide.ctaLink || '/contact'}
                  className="bg-warm-yellow text-ink px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:bg-parchment hover:shadow-xl"
                >
                  {currentSlide.ctaText || 'Get Started'}
                </Link>
                <Link
                  to="/portfolio"
                  className="bg-parchment/10 border-2 border-parchment/30 hover:bg-parchment hover:text-ink text-parchment px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold text-base sm:text-lg transition-all duration-300"
                >
                  Our Work
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-parchment/10 hover:bg-warm-yellow text-parchment hover:text-ink transition-all duration-300 border border-parchment/20"
          >
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-parchment/10 hover:bg-warm-yellow text-parchment hover:text-ink transition-all duration-300 border border-parchment/20"
          >
            <ChevronRight size={28} />
          </motion.button>
          
          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 transition-all duration-500 rounded-full ${
                  current === i ? 'w-8 bg-warm-yellow shadow-lg' : 'w-2 bg-parchment/30 hover:bg-parchment/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
