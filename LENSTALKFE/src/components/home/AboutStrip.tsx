import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { CompanyStats } from '../../types';
import { TrophySticker, RocketSticker, GlobeSticker, ChartSticker } from '../StickerDesigns';
import { PatternBackground } from '../CardPatterns';

const STAT_COLORS = ['bg-[#FFD600]', 'bg-[#00E676]', 'bg-[#FFD600]', 'bg-[#00E676]'];

const AboutStrip = () => {
  const { data: statsData } = useApi<CompanyStats>('company_stats', { publicOnly: true });

  const MOCK_STATS = [
    { id: '1', label: 'Projects Completed', value: '200', suffix: '+', order: 1, sticker: RocketSticker },
    { id: '2', label: 'Clients Served', value: '50', suffix: '+', order: 2, sticker: GlobeSticker },
    { id: '3', label: 'Years Experience', value: '5', suffix: '+', order: 3, sticker: TrophySticker },
    { id: '4', label: 'Business Verticals', value: '3', suffix: '', order: 4, sticker: ChartSticker },
  ];

  const stats = statsData.length > 0 ? statsData.sort((a, b) => a.order - b.order) : MOCK_STATS;

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-16 px-4 xs:px-5 sm:px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-stretch">

          {/* Left tall card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-warm-yellow rounded-2xl xs:rounded-[2.2rem] sm:rounded-[2.5rem] p-5 xs:p-7 sm:p-10 md:p-14 flex flex-col justify-between lg:row-span-2 border-4 border-ink/10"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              WE ARE A CREATIVE POWERHOUSE
            </h2>
            <div>
              <p className="text-ink/70 text-sm xs:text-base sm:text-lg leading-relaxed mb-6 xs:mb-7 sm:mb-8">
                Bridging the gap between strategy, production, and distribution — all under one roof.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-ink text-parchment px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full font-bold text-xs xs:text-xs sm:text-sm hover:bg-red transition-all"
              >
                Our Story <ArrowRight size={16} className="sm:size-[16px]" />
              </Link>
            </div>
          </motion.div>

          {/* Stat cards */}
          {stats.slice(0, 4).map((stat, i) => {
            const StickerComponent = (stat as any).sticker;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 150, damping: 20 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${STAT_COLORS[i % STAT_COLORS.length]} rounded-xl xs:rounded-[1.5rem] sm:rounded-[2rem] p-4 xs:p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] border-4 border-ink/10 relative overflow-hidden`}
            >
              {/* Pattern Overlay */}
              <PatternBackground pattern="halftone" opacity={0.25} />
              
              {/* Sticker Background */}
              <div className="absolute top-2 right-2 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 opacity-60 pointer-events-none">
                {StickerComponent && <StickerComponent className="w-full h-full" />}
              </div>
              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-none mb-1 xs:mb-1.5 sm:mb-2 relative z-10">
                {stat.value}{stat.suffix}
              </h3>
              <p className="text-ink/70 font-semibold text-xs xs:text-xs sm:text-sm relative z-10">{stat.label}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
