import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, centered = false, light = false }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block bg-linear-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent font-bold tracking-[0.3em] text-xs uppercase mb-4"
      >
        {subtitle || 'Lenstalk Media'}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight ${light ? 'text-parchment' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`h-1.5 w-24 bg-linear-to-r from-cyan-500 to-cyan-600 mt-6 rounded-full shadow-lg ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionHeading;
