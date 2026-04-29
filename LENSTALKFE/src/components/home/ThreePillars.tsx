import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Camera } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { BusinessPillar } from '../../types';

const ThreePillars = () => {
  const { data: pillars } = useApi<BusinessPillar>('business_pillars', { publicOnly: true });

  const MOCK_PILLARS = [
    {
      title: 'Lenstalk Media',
      subtitle: 'Agency',
      description: 'Full-service creative planning, digital marketing, and brand strategy tailored for growth.',
      icon: 'Rocket',
      color: 'bg-orange-500'
    },
    {
      title: 'OIN',
      subtitle: 'Odisha Influencers Network',
      description: 'The region\'s largest creator ecosystem connecting brands with authentic local voices.',
      icon: 'Users',
      color: 'bg-black'
    },
    {
      title: 'Lenstalk Production',
      subtitle: 'Production House',
      description: 'In-house high-end equipment and expert crew for cinematic visual storytelling.',
      icon: 'Camera',
      color: 'bg-orange-500'
    }
  ];

  const displayPillars = pillars.length > 0 ? pillars.sort((a, b) => a.order - b.order) : MOCK_PILLARS;

  return (
    <section className="relative py-12 xs:py-16 sm:py-24 px-4 xs:px-5 sm:px-6 bg-orange overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 xs:gap-4 opacity-[0.06] text-3xl xs:text-5xl sm:text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => <span key={i}>PILLARS</span>)}
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 xs:mb-12 sm:mb-16"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-display font-bold text-ink mb-2 xs:mb-3 sm:mb-4">OUR THREE PILLARS</h2>
          <p className="text-base xs:text-lg sm:text-xl text-ink/70 max-w-2xl">Three verticals. One ecosystem. Infinite possibilities.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
          {displayPillars.map((pillar, i) => {
            const PILLAR_COLORS = ['bg-warm-yellow', 'bg-ink', 'bg-[#00ff66]'];
            const cardColor = PILLAR_COLORS[i % PILLAR_COLORS.length];
            const isDark = cardColor === 'bg-ink';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 20 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`group relative p-5 xs:p-7 sm:p-10 md:p-12 rounded-xl xs:rounded-2xl sm:rounded-[2.5rem] border-4 border-ink/10 overflow-hidden cursor-pointer ${cardColor}`}
              >
                <motion.div
                  className="absolute -top-8 xs:-top-10 -right-8 xs:-right-10 w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 rounded-full bg-white/10 blur-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: i * 0.8 }}
                />
                <span className="absolute top-4 xs:top-5 sm:top-6 right-5 xs:right-7 sm:right-8 text-4xl xs:text-5xl sm:text-7xl font-display font-bold text-ink/10 leading-none select-none">
                  0{i + 1}
                </span>
                <div className={`w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 ${isDark ? 'bg-warm-yellow' : 'bg-ink/10'}`}>
                  {pillar.icon === 'Rocket' ? <Rocket size={24} className={`sm:size-[32px] ${isDark ? 'text-ink' : 'text-ink'}`} /> : pillar.icon === 'Users' ? <Users size={24} className={`sm:size-[32px] ${isDark ? 'text-ink' : 'text-ink'}`} /> : <Camera size={24} className={`sm:size-[32px] ${isDark ? 'text-ink' : 'text-ink'}`} />}
                </div>
                <span className={`font-bold text-[10px] xs:text-xs uppercase tracking-widest mb-1.5 xs:mb-2 sm:mb-2 block ${isDark ? 'text-warm-yellow' : 'text-ink/60'}`}>
                  {pillar.subtitle}
                </span>
                <h3 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 xs:mb-3 sm:mb-4 ${isDark ? 'text-parchment' : 'text-ink'}`}>{pillar.title}</h3>
                <p className={`leading-relaxed text-sm xs:text-base sm:text-base ${isDark ? 'text-parchment/70' : 'text-ink/70'}`}>{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
