import React from 'react';
import { motion } from 'framer-motion';
import { Video, Share2, Users2, BarChart3, Palette, Megaphone, Camera, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PatternBackground } from '../components/CardPatterns';

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

/* ─── Service card colors — IFP solid palette ────────────────────────────── */
const SERVICE_COLORS = [
  'bg-warm-yellow',
  'bg-[#FF47B5]',
  'bg-[#00E676]',
  'bg-[#FF47B5]',
  'bg-orange',
  'bg-red',
  'bg-warm-yellow',
  'bg-[#FF47B5]',
];

/* ─── Process step colors ────────────────────────────────────────────────── */
const PROCESS_COLORS = [
  'bg-warm-yellow', 'bg-[#00E676]', 'bg-red', 'bg-[#FF47B5]',
  'bg-[#FF47B5]', 'bg-orange', 'bg-[#00E676]', 'bg-warm-yellow',
];

const Services = () => {
  const services = [
    {
      id: 'production',
      title: 'Creative Content & Production',
      icon: Video,
      desc: 'We bring your brand story to life with cinematic excellence. From viral reels to large-scale brand films, our in-house production team handles everything.',
      features: ['Viral Reels & Shorts', 'Brand Storytelling Films', 'Vox Pop & Interviews', 'Podcasts & Talk Shows', 'Campaign Posters & Visuals'],
    },
    {
      id: 'social',
      title: 'Social Media Marketing',
      icon: Share2,
      desc: 'Building communities, not just followers. We manage your social presence with strategic content that drives engagement and loyalty.',
      features: ['Content Strategy', 'Daily Publishing', 'Community Management', 'Trend Hijacking', 'Analytics & Reporting'],
    },
    {
      id: 'influencer',
      title: 'Influencer Marketing (OIN)',
      icon: Users2,
      desc: 'Powered by Odisha Influencers Network (OIN). We connect you with the most authentic voices in Odisha to drive real impact.',
      features: ['Regional Creator Access', 'Data-driven Selection', 'Campaign Management', 'Performance Tracking', 'Niche-specific Targeting'],
    },
    {
      id: 'webdesign',
      title: 'Web Design & Development',
      icon: Palette,
      desc: 'Crafting stunning, responsive websites that convert. From landing pages to full-scale web apps, we blend creativity with technology.',
      features: ['Custom Website Design', 'Responsive & Mobile-First', 'Landing Pages & Microsites', 'E-commerce Solutions', 'Website Maintenance'],
    },
    {
      id: 'performance',
      title: 'Performance & AI Marketing',
      icon: BarChart3,
      desc: 'Scaling your business with data. We use AI-powered tools and expert ad strategies to ensure maximum ROI for every rupee spent.',
      features: ['Meta & Google Ads', 'AI-generated Creatives', 'Conversion Optimisation', 'Audience Retargeting', 'Odisha-specific Targeting'],
    },
    {
      id: 'branding',
      title: 'Branding & PR',
      icon: Palette,
      desc: 'Defining who you are. We build strong brand identities and manage your public image across online and offline channels.',
      features: ['Brand Identity Design', 'Messaging & Tone', 'Online PR & Articles', 'Crisis Management', 'Event Branding'],
    },
    {
      id: 'offline',
      title: 'Offline Marketing',
      icon: Megaphone,
      desc: 'Dominating the physical space. We design and execute high-impact outdoor campaigns that capture attention on the streets.',
      features: ['Billboard Creatives', 'Outdoor Campaigns', 'BTL Activities', 'Print Media Design', 'Event Visuals'],
    },
    {
      id: 'photography',
      title: 'Commercial Photography',
      icon: Camera,
      desc: 'Visuals that sell. High-end commercial photography for real estate, fashion, and premium brands across Odisha.',
      features: ['Real Estate Shoots', 'Product Photography', 'Fashion Portfolios', 'Corporate Portraits', 'Lifestyle Shoots'],
    },
  ];

  return (
    <div className="pt-16 bg-ink text-parchment">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-warm-yellow">
        <WatermarkText text="SERVICES" />
        <div className="relative z-10 text-center px-4 xs:px-6 py-16 xs:py-24 sm:py-32 max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 xs:gap-3 mb-6 xs:mb-10 border-2 border-ink px-3 xs:px-5 py-1.5 xs:py-2.5 rounded-full bg-ink/10"
          >
            <span className="w-2 xs:w-2.5 h-2 xs:h-2.5 rounded-full bg-red animate-pulse block" />
            <span className="font-display text-[10px] xs:text-xs tracking-[0.2em] uppercase text-ink">8 Service Disciplines</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-display font-bold text-ink leading-none mb-6 xs:mb-8 drop-shadow-2xl"
          >
            WHAT WE<br />
            <span className="italic text-red">DO BEST.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-ink/75 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            From cinematic content to performance marketing — the full-stack creative engine for Odisha's boldest brands.
          </motion.p>

          {/* Quick-nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 mt-8 xs:mt-10 sm:mt-12"
          >
            {services.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-1.5 xs:gap-2 border-2 border-ink/20 hover:border-ink bg-ink/5 hover:bg-ink/10 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-bold text-ink/60 hover:text-ink transition-all duration-200 whitespace-nowrap"
              >
                <span className="text-[8px] xs:text-[10px] font-display text-ink/30 leading-none">{String(i + 1).padStart(2, '0')}</span>
                <span className="hidden xs:inline">{s.title}</span>
                <span className="inline xs:hidden">{s.title.split(' ')[0]}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ INTRO DESCRIPTION ═══════════════════ */}
      <section className="py-12 xs:py-16 sm:py-24 px-4 xs:px-6 bg-ink">
        <div className="max-w-5xl mx-auto text-center space-y-6 xs:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-parchment/80 leading-relaxed"
          >
            We provide <span className="text-warm-yellow font-bold">complete, end-to-end</span> creative &amp; marketing solutions,
            tailored for <span className="text-cyan-500 font-bold">scale, performance</span>, and{' '}
            <span className="text-[#00ff66] font-bold">regional relevance</span> across Odisha and Pan India.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════ STATS GRID ═══════════════════ */}
      <section className="py-8 xs:py-12 sm:py-16 px-4 xs:px-6 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-warm-yellow rounded-[1.5rem] xs:rounded-[2rem] sm:rounded-[2.5rem] p-6 xs:p-8 sm:p-10 md:p-14 flex flex-col justify-center lg:row-span-2 border-4 border-ink/10"
            >
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-display font-bold text-ink leading-tight">
                HERE IS WHAT WE DO BEST
              </h2>
            </motion.div>
            {[
              { value: '8', label: 'Service Disciplines' },
              { value: '50+', label: 'Brands Served' },
              { value: '200+', label: 'Projects Delivered' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 150, damping: 20 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${i % 2 === 0 ? 'bg-[#00E676]' : 'bg-[#FFD600]'} rounded-[1.5rem] xs:rounded-[1.8rem] sm:rounded-[2rem] p-4 xs:p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] border-4 border-ink/10`}
              >
                <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ink leading-none mb-1 xs:mb-2">{stat.value}</h3>
                <p className="text-ink/70 font-semibold text-xs xs:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICE CARDS ═══════════════════ */}
      <section className="relative py-24 px-6 bg-orange overflow-hidden">
        <WatermarkText text="SERVICES" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-ink mb-4">OUR SERVICES</h2>
            <p className="text-xl text-ink/70 max-w-2xl">Everything your brand needs to grow, all under one roof.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 120, damping: 20 }}
                whileHover={{ scale: 1.02, y: -6 }}
                className={`${SERVICE_COLORS[i]} rounded-[2.5rem] p-10 md:p-12 border-4 border-ink/10 relative overflow-hidden`}
              >
                {/* Pattern Overlay */}
                <PatternBackground pattern="halftone" opacity={0.3} />
                
                {/* Animated glow */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: i * 0.5 }}
                />

                {/* Background number */}
                <span className="absolute top-6 right-8 text-7xl font-display font-bold text-ink/10 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon badge */}
                <div className="w-16 h-16 rounded-2xl bg-ink/10 flex items-center justify-center mb-6 relative z-10">
                  <service.icon size={32} className="text-ink" strokeWidth={2} />
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4 relative z-10 leading-tight pr-14">
                  {service.title}
                </h3>

                <p className="text-ink/75 text-base leading-relaxed mb-8 relative z-10 max-w-xl">{service.desc}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 relative z-10 mb-8">
                  {service.features.map((feat, fi) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 + fi * 0.05 }}
                      className="flex items-center gap-3 text-ink font-bold text-sm"
                    >
                      <CheckCircle2 className="text-ink/50 shrink-0" size={17} />
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 bg-ink text-parchment px-6 py-3 rounded-full font-bold text-sm hover:bg-ink/80 transition-all relative z-10 group/btn"
                >
                  Enquire Now
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW WE WORK ═══════════════════ */}
      <section className="relative py-24 px-6 bg-[#1a0a3e] overflow-hidden">
        <WatermarkText text="PROCESS" className="text-white" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold text-cyan-500 mb-4">HOW WE WORK</h2>
            <p className="text-lg text-white/60 max-w-2xl">
              Our workflow is designed to meet government-level and enterprise-level execution standards.
            </p>
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
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-center gap-6 ${PROCESS_COLORS[i]} rounded-2xl px-8 py-5 border-2 border-ink/10`}
              >
                <span className="text-3xl font-display font-bold text-ink/40 shrink-0">0{i + 1}</span>
                <p className="text-ink font-bold text-lg">{step}</p>
              </motion.div>
            ))}
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

      {/* ═══════════════════ INDUSTRIES WE SERVE ═══════════════════ */}
      <section className="py-24 px-6 bg-ink">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold text-warm-yellow mb-4"
          >
            INDUSTRIES WE SERVE
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-parchment/50 text-lg max-w-2xl mx-auto mb-12"
          >
            Our ecosystem allows us to adapt across industries while maintaining consistent quality and execution.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Government & Public Sector',
              'FMCG & Consumer Brands',
              'Food Delivery & Quick Commerce',
              'Real Estate Developers',
              'Hospitality & Hotel Brands',
              'Interior & Lifestyle Brands',
            ].map((industry, i) => (
              <motion.span
                key={industry}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`px-6 py-3 rounded-full text-base font-bold border-2 cursor-pointer transition-all ${
                  i % 3 === 0 ? 'bg-[#FF2D6B] text-white border-[#FF2D6B]' :
                  i % 3 === 1 ? 'bg-warm-yellow text-ink border-warm-yellow' :
                  'bg-[#00ff66] text-ink border-[#00ff66]'
                }`}
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative py-24 px-6 bg-warm-yellow overflow-hidden">
        <WatermarkText text="LET'S BUILD" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold text-ink mb-6"
          >
            LET'S BUILD SOMETHING ICONIC TOGETHER
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ink text-parchment px-10 py-5 rounded-full font-bold text-lg hover:bg-warm-yellow hover:text-ink transition-all"
            >
              Start a Project <ArrowRight size={20} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 bg-warm-yellow text-ink px-10 py-5 rounded-full font-bold text-lg hover:bg-ink hover:text-parchment transition-all"
            >
              View Our Work <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
