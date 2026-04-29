import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="relative py-12 xs:py-16 sm:py-24 px-4 xs:px-5 sm:px-6 bg-ink overflow-hidden" style={{ borderTop: '4px solid #FFD600', borderBottom: '4px solid #FFD600' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 xs:gap-4 opacity-[0.06] text-3xl xs:text-5xl sm:text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => <span key={i}>LET'S BUILD</span>)}
        </div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-display font-bold text-parchment mb-4 xs:mb-5 sm:mb-6 leading-tight"
        >
          READY TO <span className="italic text-red">GROW</span> YOUR BRAND?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm xs:text-base sm:text-lg md:text-xl text-parchment/70 mb-8 xs:mb-10 sm:mb-12 max-w-2xl mx-auto font-medium"
        >
          Let's create something extraordinary together. Our team is ready to take your brand to the next level.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 xs:gap-4 sm:gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-ink text-parchment px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 rounded-full font-bold text-sm xs:text-base sm:text-lg hover:bg-warm-yellow hover:text-ink transition-all"
          >
            Get in Touch <ArrowRight size={18} className="sm:size-[20px]" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 bg-warm-yellow text-ink px-6 xs:px-8 sm:px-10 py-3 xs:py-4 sm:py-5 rounded-full font-bold text-sm xs:text-base sm:text-lg hover:bg-ink hover:text-parchment transition-all"
          >
            View Our Work <ArrowRight size={18} className="sm:size-[20px]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
