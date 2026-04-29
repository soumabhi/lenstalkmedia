import React from 'react';
import { motion } from 'framer-motion';
import { Video, Share2, Users2, BarChart3, Palette, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Service } from '../../types';
import { CameraSticker, ShareSticker, GlobeSticker, ChartSticker, PaletteSticker, MegaphoneSticker } from '../StickerDesigns';
import { PatternBackground } from '../CardPatterns';

const ServicesOverview = () => {
  const { data: servicesData } = useApi<Service>('services', { publicOnly: true });

  const ICON_MAP: Record<string, any> = {
    'Video': Video,
    'Share2': Share2,
    'Users2': Users2,
    'BarChart3': BarChart3,
    'Palette': Palette,
    'Megaphone': Megaphone
  };

  const MOCK_SERVICES = [
    {
      id: '1',
      title: 'Creative Content & Production',
      description: 'Reels, brand videos, vox pop, and cinematic films.',
      icon: 'Video',
      sticker: CameraSticker,
      order: 1
    },
    {
      id: '2',
      title: 'Social Media Marketing',
      description: 'Strategy, content, and community management.',
      icon: 'Share2',
      sticker: ShareSticker,
      order: 2
    },
    {
      id: '3',
      title: 'Influencer Marketing',
      description: 'Powered by OIN – Odisha\'s largest creator network.',
      icon: 'Users2',
      sticker: GlobeSticker,
      order: 3
    },
    {
      id: '4',
      title: 'Performance Marketing',
      description: 'AI-powered ads and data-driven growth strategies.',
      icon: 'BarChart3',
      sticker: ChartSticker,
      order: 4
    },
    {
      id: '5',
      title: 'Branding & PR',
      description: 'Brand identity, messaging, and online/offline PR.',
      icon: 'Palette',
      sticker: PaletteSticker,
      order: 5
    },
    {
      id: '6',
      title: 'Offline Marketing',
      description: 'Billboards, outdoor creatives, and commercial visuals.',
      icon: 'Megaphone',
      sticker: MegaphoneSticker,
      order: 6
    }
  ];

  const services = servicesData.length > 0 ? servicesData.sort((a, b) => a.order - b.order) : MOCK_SERVICES;

  // Animation variants removed - using card-specific animations now

  const CARD_COLORS = [
    'bg-warm-yellow', 'bg-[#FF47B5]', 'bg-[#00E676]',
    'bg-[#FF2D6B]', 'bg-orange', 'bg-red',
  ];

  return (
    <section className="relative py-24 px-6 bg-ink overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-[0.04] text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap text-parchment">
          {Array.from({ length: 20 }).map((_, i) => <span key={i}>SERVICES</span>)}
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-warm-yellow mb-4">OUR CORE SERVICES</h2>
          <p className="text-xl text-parchment/60 max-w-2xl">Everything your brand needs — strategy, creation, and distribution.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComponent = ICON_MAP[service.icon] || Video;
            const StickerComponent = (service as any).sticker;
            const cardColor = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`${cardColor} rounded-[2rem] p-8 border-4 border-ink/10 relative overflow-hidden group cursor-pointer`}
              >
                {/* Pattern Overlay */}
                <PatternBackground pattern="halftone" opacity={0.3} />
                
                {/* Sticker Design Background */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-40 pointer-events-none">
                  {StickerComponent && <StickerComponent className="w-full h-full" />}
                </div>
                
                <motion.div
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10 blur-2xl"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: i * 0.4 }}
                />
                <span className="absolute top-4 right-6 text-6xl font-display font-bold text-ink/10 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-ink/10 flex items-center justify-center mb-5 relative z-10">
                  <IconComponent size={28} className="text-ink" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-3 relative z-10 pr-10">{service.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed mb-6 relative z-10">{service.description || (service as any).desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-ink text-parchment px-5 py-2.5 rounded-full font-bold text-xs hover:bg-ink/80 transition-all relative z-10 group/btn"
                >
                  Learn More
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
