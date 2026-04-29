import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { CompanyStats } from '../../types';

const Digit = ({ digit, isVisible }: { digit: string; isVisible: boolean }) => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return (
    <div className="relative h-[1em] overflow-hidden inline-block leading-none">
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isVisible ? `-${parseInt(digit) * 10}%` : '0%' }}
        transition={{ 
          duration: 2, 
          ease: [0.16, 1, 0.3, 1],
          delay: Math.random() * 0.5 
        }}
        className="flex flex-col"
      >
        {digits.map((d, i) => (
          <span key={i} className="inline-block">{d}</span>
        ))}
      </motion.div>
    </div>
  );
};

const RollingNumber = ({ value, isVisible }: { value: string; isVisible: boolean }) => {
  const strValue = value.padStart(2, '0');
  return (
    <div className="flex">
      {strValue.split('').map((char, i) => (
        isNaN(parseInt(char)) ? (
          <span key={i}>{char}</span>
        ) : (
          <Digit key={i} digit={char} isVisible={isVisible} />
        )
      ))}
    </div>
  );
};

const MetricCard = ({ metric, index }: { metric: CompanyStats; index: number }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    amount: 0.3,
    margin: "-10% 0px -10% 0px"
  });

  return (
    <div ref={containerRef} className="relative flex flex-col items-center text-center group py-4 sm:py-8">
      {/* Background Decorative Element */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, transparent 70%)',
          scale: isInView ? 1.2 : 0.8
        }}
      />

      {/* Metric Value */}
      <motion.div
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl sm:text-7xl md:text-8xl font-black mb-2 sm:mb-4 tracking-tighter flex items-center justify-center text-black selection:bg-black selection:text-white"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        <RollingNumber value={metric.value} isVisible={isInView} />
        <motion.span 
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl ml-1 font-bold"
        >
          {metric.suffix}
        </motion.span>
      </motion.div>

      {/* Creative Divider */}
      <div className="relative w-12 sm:w-16 h-[2px] bg-black/10 mb-4 sm:mb-6 overflow-hidden">
        <motion.div 
          animate={isInView ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-black/40"
        />
      </div>

      {/* Metric Label */}
      <motion.div
        animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[10px] sm:text-xs font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase text-black/60 group-hover:text-black transition-colors duration-300 px-4"
        style={{ fontFamily: "'Titillium Web', sans-serif" }}
      >
        {metric.label}
      </motion.div>
    </div>
  );
};

const AgencyMetrics = () => {
  const { data: stats } = useApi<CompanyStats>('company_stats');
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotateSlower = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const smoothRotate = useSpring(rotateSlower, { stiffness: 100, damping: 30 });

  // Filter and sort stats
  const metrics = stats
    .filter(s => s.published !== false)
    .sort((a, b) => a.order - b.order);

  return (
    <section 
      ref={sectionRef} 
      style={{ position: 'relative' }}
      className={`w-full overflow-hidden bg-[#FCFBE4] cursor-default transition-all duration-700 ${metrics.length > 0 ? 'py-16 sm:py-24' : 'h-0 opacity-0'}`}
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y: backgroundY, rotate: smoothRotate }}
        className="absolute -top-1/4 -right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full border-[1px] border-black/5 -z-0"
      />
      <motion.div 
        style={{ y: backgroundY, rotate: rotateSlower }}
        className="absolute -bottom-1/4 -left-1/4 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full border-[1px] border-black/5 -z-0"
      />

      {/* Watermark Parallax */}
      <motion.div 
        style={{ 
          x: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]),
          fontFamily: 'Syne, sans-serif'
        }}
        className="absolute top-1/2 left-0 w-full text-center -translate-y-1/2 text-[25vw] md:text-[20vw] font-black text-black/[0.01] whitespace-nowrap select-none -z-0 pointer-events-none"
      >
        LENSTALK IMPACT
      </motion.div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 md:gap-32">
          {metrics.map((metric, index) => (
            <div key={metric.id || index} className="flex-shrink-0">
              <MetricCard metric={metric} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-4 h-4 border-t-2 border-l-2 border-black/10" />
      <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-4 h-4 border-t-2 border-r-2 border-black/10" />
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-4 h-4 border-b-2 border-l-2 border-black/10" />
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-4 h-4 border-b-2 border-r-2 border-black/10" />
    </section>
  );
};

export default AgencyMetrics;

