import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Linkedin, Instagram, Twitter, ArrowRight, Mail } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { TeamMember } from '../types';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';
import SectionSeparator from '../components/common/SectionSeparator';

/* ─── Word-cloud watermark ───────────────────────────────────────────────── */
const WatermarkText = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
    <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-[0.06] text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
);

/* ─── Brand Colors ────────────────────────────────────────────────────── */
const BRAND_COLORS = [
  { bg: 'bg-[#64a546]', text: 'text-[#eafde4]', border: 'border-[#eafde4]/20' }, // Moss Green
  { bg: 'bg-[#15559c]', text: 'text-[#e8f3ff]', border: 'border-[#e8f3ff]/20' }, // Deep Blue
  { bg: 'bg-[#f97a47]', text: 'text-[#fff3e8]', border: 'border-[#fff3e8]/20' }, // Burnt Coral
  { bg: 'bg-[#7b503f]', text: 'text-[#fff3e8]', border: 'border-[#fff3e8]/20' }, // Earthy Brown
  { bg: 'bg-[#4b1d6e]', text: 'text-[#FCFBE4]', border: 'border-[#FCFBE4]/20' }, // Deep Purple
];

/* ─── Animated SVG Underline ──────────────────────────────────────────────── */
const AnimatedUnderline = ({ children, color = '#FFDB2E', alwaysVisible = false }: { children: React.ReactNode; color?: string; alwaysVisible?: boolean }) => {
  const underlineVariants = {
    initial: { pathLength: alwaysVisible ? 1 : 0, opacity: alwaysVisible ? 1 : 0 },
    hover: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.span
      className="relative group inline-block cursor-pointer mx-1"
      initial="initial"
      whileHover="hover"
      whileTap="hover"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-4 overflow-visible pointer-events-none">
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            fill="transparent"
            variants={underlineVariants}
            {...(alwaysVisible ? { initial: "hover", animate: "hover" } : {})}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </svg>
      </div>
    </motion.span>
  );
};

const About = () => {
  const { data: teamMembers } = useApi<TeamMember>('team', { publicOnly: true });

  const MOCK_TEAM: TeamMember[] = [
    { id: '1', name: 'Sourav Panda', role: 'Founder & CEO', bio: 'Visionary leader driving creative excellence.', photoUrl: 'https://i.pravatar.cc/300?u=sourav', socials: { linkedin: '#', instagram: '#' }, order: 1 },
    { id: '2', name: 'Creative Mind', role: 'Creative Director', bio: 'Creative genius behind every campaign.', photoUrl: 'https://i.pravatar.cc/300?u=creative', socials: { linkedin: '#', instagram: '#' }, order: 2 },
    { id: '3', name: 'Production Lead', role: 'Head of Production', bio: 'Production expert ensuring cinematic quality.', photoUrl: 'https://i.pravatar.cc/300?u=prod', socials: { linkedin: '#', instagram: '#' }, order: 3 },
    { id: '4', name: 'Strategy Expert', role: 'Marketing Strategist', bio: 'Strategy master crafting growth plans.', photoUrl: 'https://i.pravatar.cc/300?u=strat', socials: { linkedin: '#', instagram: '#' }, order: 4 },
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : MOCK_TEAM;

  const timeline = [
    { year: '2020', text: 'Lenstalk Media founded in Bhubaneswar with a vision to transform regional brand building in Odisha.' },
    { year: '2021', text: 'Expanded to full-service social media marketing, handling multiple regional brands and events.' },
    { year: '2022', text: 'Launched OIN (Odisha Influencers Network) — building Odisha\'s largest curated creator community.' },
    { year: '2023', text: 'Started working with government organisations including CBCID and ORMAS on large-scale documentary projects.' },
    { year: '2024', text: 'Lenstalk Production House established with professional equipment and experienced shoot crew.' },
    { year: '2025', text: 'Serving 50+ clients across government, FMCG, real estate, hospitality, and lifestyle sectors.' },
  ];

  return (
    <div className="pt-16 bg-ink text-parchment overflow-x-hidden">

      {/* ═══════════════════ HERO: WHO WE ARE ═══════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-red px-4 py-20 md:py-32">
        <div className="relative z-10 text-center w-full max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-5xl xs:text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black text-warm-yellow leading-none mb-8 md:mb-16 drop-shadow-2xl"
            style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 900 }}
          >
            WHO WE ARE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 max-w-5xl mx-auto leading-relaxed md:leading-[1.4] font-bold tracking-tight px-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Lenstalk Media is a Bhubaneswar-based{' '}
            <AnimatedUnderline>creative</AnimatedUnderline> and{' '}
            <AnimatedUnderline>marketing agency</AnimatedUnderline> delivering{' '}
            <AnimatedUnderline color="#ffffff">
              <span className="text-warm-yellow">end-to-end content</span>
            </AnimatedUnderline> and{' '}
            <AnimatedUnderline alwaysVisible>growth solutions</AnimatedUnderline> for government organisations, national brands, and fast-growing businesses.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════ WORKING PROCESS ═══════════════════ */}
      <section className="relative py-20 md:py-32 px-4 xs:px-6 bg-[#3B0017]">
        {/* Animated wave peaking into Hero exactly like Footer */}
        <InfiniteWavySeparator
          waveColor="#3B0017"
          direction={-1}
          speed={25}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl xs:text-5xl md:text-7xl font-display font-bold text-[#00FF00] mb-4">OUR WORKING PROCESS</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              'Brand objective & requirement understanding',
              'Market & audience insight (Odisha-focused)',
              'Creative strategy & concept development',
              'Scriptwriting & pre-production planning',
              'Production via Lenstalk Production House',
              'Editing & quality control',
              'Influencer / ad deployment via OIN & Meta',
              'Reporting & optimisation',
            ].map((step, i) => {
              const colorStyle = BRAND_COLORS[i % BRAND_COLORS.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-6 ${colorStyle.bg} rounded-md px-8 py-6 border-2 border-white/10 shadow-sm`}
                >
                  <span className={`text-3xl font-display font-black ${colorStyle.text} opacity-40 shrink-0`}>0{i + 1}</span>
                  <p className={`${colorStyle.text} font-display font-black text-lg uppercase leading-[1.3] tracking-[0.1em]`}>{step}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-2xl font-display font-bold text-warm-yellow">
              One partner. One timeline. One accountable team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ THE JOURNEY TIMELINE ═══════════════════ */}
      <section className="relative py-20 md:py-32 px-4 xs:px-6 bg-[#B57EE5]">
        {/* Animated wave peaking into the Dark Chocolate section above */}
        <InfiniteWavySeparator
          waveColor="#B57EE5"
          direction={1}
          speed={25}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl xs:text-5xl md:text-7xl font-display font-bold text-[#3D1414] mb-12 md:mb-16"
          >
            THE LENSTALK JOURNEY
          </motion.h2>

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-[#461A63] rounded-[1.5rem] px-6 md:px-8 py-5 md:py-6 border-4 border-white/10"
                style={{ marginLeft: `${i * 1.5}%`, maxWidth: '100%' }}
              >
                <span className="text-3xl xs:text-4xl md:text-5xl font-display font-bold text-warm-yellow shrink-0">{item.year}</span>
                <div className="hidden sm:block w-4 h-4 rounded-full bg-white/20 shrink-0" />
                <p className="text-white font-display font-bold text-sm xs:text-base md:text-lg uppercase tracking-widest leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════ TEAM SECTION ═══════════════════ */}
      <section className="relative py-12 md:py-24 px-0 bg-[#FCFBE4]">
        {/* Animated wave peaking into the Purple section above */}
        <InfiniteWavySeparator
          waveColor="#FCFBE4"
          direction={-1}
          speed={25}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16 px-4"
        >
          <h2 
            className="text-3xl xs:text-4xl md:text-7xl font-display font-black text-[#3D1414] tracking-[0.05em] uppercase leading-none"
            style={{ fontFamily: "'Titillium Web', sans-serif" }}
          >
            MEET THE TEAM
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-[#FF2D6B] mx-auto mt-4 sm:mt-6 rounded-full" />
        </motion.div>

        <div className="w-full">
          <Marquee speed={80} gradient={false} pauseOnHover={true} className="py-8">
            {displayTeam.map((member, i) => {
              const colorStyle = BRAND_COLORS[i % BRAND_COLORS.length];
              return (
                <motion.div
                  key={member.id || i}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`flex flex-col w-[240px] md:w-[320px] mx-4 md:mx-6 ${colorStyle.bg} rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 md:border-4 border-white/10 cursor-pointer transition-all`}
                >
                  <div className={`aspect-square w-full overflow-hidden border-b-2 md:border-b-4 ${colorStyle.border}`}>
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8 md:p-10 text-center">
                    <h3 className={`${colorStyle.text} font-display font-black text-xl md:text-2xl uppercase tracking-[0.12em] mb-2 leading-tight`}>
                      {member.name}
                    </h3>
                    <p className={`${colorStyle.text} opacity-60 font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]`}>
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </Marquee>
        </div>

        {/* Career Query Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center px-4"
        >
          <p className="text-[#3D1414] font-display font-black text-lg md:text-2xl uppercase tracking-[0.15em] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="opacity-60">FOR CAREER EMAIL QUERY —</span>
            <a 
              href="mailto:hr@lenstalkmedia.com" 
              className="text-[#FF2D6B] hover:text-[#1A2B5E] transition-colors flex items-center gap-2 group"
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              hr@lenstalkmedia.com
            </a>
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
