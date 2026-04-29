import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useApi } from '../../hooks/useApi';
import { Testimonial as TestimonialType } from '../../types';

// Palette from HorizontalScroll + Deep Purple
const CARD_STYLES = [
  { bg: 'bg-[#64a546]', text: 'text-[#eafde4]', border: 'border-[#eafde4]/20' }, // Moss Green
  { bg: 'bg-[#15559c]', text: 'text-[#e8f3ff]', border: 'border-[#e8f3ff]/20' }, // Deep Blue
  { bg: 'bg-[#f97a47]', text: 'text-[#fff3e8]', border: 'border-[#fff3e8]/20' }, // Burnt Coral
  { bg: 'bg-[#7b503f]', text: 'text-[#fff3e8]', border: 'border-[#fff3e8]/20' }, // Earthy Brown
  { bg: 'bg-[#4b1d6e]', text: 'text-[#FCFBE4]', border: 'border-[#FCFBE4]/20' }, // Deep Purple
];

const TestimonialCard = ({ t, i }: { t: TestimonialType, i: number }) => {
  const style = CARD_STYLES[i % CARD_STYLES.length];
  
  return (
    <div
      className={`flex-shrink-0 w-[280px] sm:w-[320px] aspect-square ${
        style.bg
      } rounded-[2.5rem] mx-4 sm:mx-6 p-8 flex flex-col justify-center items-center shadow-lg relative group cursor-pointer overflow-hidden transition-all duration-500`}
    >
      {/* Front State: The Quote */}
      <div className="absolute inset-0 p-8 flex items-center justify-center text-center transition-all duration-500 group-hover:scale-110 group-hover:opacity-0 group-hover:blur-sm">
        <p className={`text-base sm:text-lg font-display font-black ${style.text} leading-[1.4] tracking-[0.1em] uppercase`}>
          "{t.content}"
        </p>
      </div>
      
      {/* Hover State: The Person */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center translate-y-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 ${style.border} overflow-hidden mb-4 shadow-xl`}>
          {t.avatarUrl ? (
            <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className={`w-full h-full ${style.text} opacity-20 flex items-center justify-center text-2xl font-bold`}>
              {t.name.charAt(0)}
            </div>
          )}
        </div>
        <h4 className={`text-xl sm:text-2xl font-display font-black ${style.text} uppercase leading-none tracking-[0.15em]`}>
          {t.name}
        </h4>
        <p className={`${style.text} font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] mt-3 opacity-60`}>
          {t.role} {t.role && t.company ? '—' : ''} {t.company}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data: testimonialsData } = useApi<TestimonialType>('testimonials', { publicOnly: true });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const MOCK_TESTIMONIALS: TestimonialType[] = [
    { id: '1', name: 'Sameer Shah', role: 'CEO', company: 'AltCo', content: 'THE PRODUCTION QUALITY IS ABSOLUTELY TOP-NOTCH! IT HELPED US SCALE OUR BRAND PRESENCE INSTANTLY.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', rating: 5, order: 1 },
    { id: '2', name: 'Priya Singh', role: 'Marketing Head', company: 'EcoVibe', content: 'THE INFLUENCER NETWORK IS A GAME CHANGER. WE REACHED MILLIONS IN ODISHA WITHIN WEEKS!', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', rating: 5, order: 2 },
    { id: '3', name: 'Amit Patil', role: 'Founder', company: 'Patil Groups', content: 'FAST, CREATIVE, AND PROFESSIONAL. LENSTALK IS EASILY THE BEST AGENCY WE HAVE WORKED WITH.', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', rating: 5, order: 3 },
    { id: '4', name: 'Rina Desai', role: 'Product Lead', company: 'Aura', content: 'THEIR CREATIVE VISION IS UNMATCHED. THEY TRANSFORMED OUR CONTENT STRATEGY COMPLETELY.', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', rating: 5, order: 4 }
  ];

  const testimonials = testimonialsData.length > 0 ? testimonialsData : MOCK_TESTIMONIALS;
  
  const isMobile = windowWidth < 768;
  const shouldMarquee = isMobile ? testimonials.length > 1 : testimonials.length > 3;

  if (testimonials.length === 0) return null;

  return (
    <section className="py-12 sm:py-24 bg-[#FCFBE4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20 text-center"
        >
          <h2 
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#1A2B5E] tracking-[0.05em] uppercase leading-none"
            style={{ fontFamily: "'Titillium Web', sans-serif" }}
          >
            HAPPY CUSTOMERS.
          </h2>
          <div className="h-2 w-24 bg-[#FF2D6B] mx-auto mt-6 rounded-full" />
        </motion.div>
      </div>

      {shouldMarquee ? (
        <Marquee direction="right" speed={40} pauseOnHover={true} gradient={false} className="flex items-center">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} />
          ))}
        </Marquee>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-y-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id || i} t={t} i={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
