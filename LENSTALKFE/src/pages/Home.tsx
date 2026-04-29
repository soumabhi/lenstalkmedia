import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitHero from '../components/home/SplitHero';
import HorizontalScroll from '../components/home/HorizontalScroll';
import AboutStrip from '../components/home/AboutStrip';
import ThreePillars from '../components/home/ThreePillars';
import ServicesOverview from '../components/home/ServicesOverview';
import WorkProcess from '../components/home/WorkProcess';
import LatestContent from '../components/home/LatestContent';
import ClientLogos from '../components/home/ClientLogos';
import Testimonials from '../components/home/Testimonials';
import CTABanner from '../components/home/CTABanner';
import AgencyMetrics from '../components/home/AgencyMetrics';
import { useApi } from '../hooks/useApi';
import { HeroSlide } from '../types';

const Home = () => {
  const { data: slides, loading } = useApi<HeroSlide>('hero', { publicOnly: true });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="home-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {/* New 4-Panel Video Hero */}
        <SplitHero slides={slides} />

        {/* {loading && slides.length === 0 && (
          <div className="h-screen bg-[#FCFBE4] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#FF2D6B] border-t-transparent rounded-full animate-spin" />
          </div>
        )} */}

        {/* GSAP Horizontal Scroll Section */}
        <HorizontalScroll />

        {/* About Strip with stat blocks */}
        {/* <section className="bg-ink halftone-bg py-20 px-6">
          <AboutStrip />
        </section> */}

        {/* Three Pillars with alternating colors */}
        {/* <section className="bg-red halftone-bg py-20 px-6">
          <ThreePillars />
        </section> */}

        {/* Services Overview with maximalist cards */}
        {/* <section className="bg-orange halftone-bg py-24 px-6">
          <ServicesOverview />
        </section> */}

        {/* Work Process with colored steps */}
        {/* <section className="bg-[#1a0a3e] halftone-bg py-24 px-6">
          <WorkProcess />
        </section> */}

        {/* Latest Content in cream for contrast */}
        {/* <section className="bg-ink halftone-bg py-24 px-6">
          <LatestContent />
        </section> */}

        {/* Unified Cream Section */}
        <section className="bg-[#FCFBE4] w-full relative overflow-hidden">
          <AgencyMetrics />
          <ClientLogos />
          <Testimonials />
        </section>

        {/* CTA Banner in cyan for action */}
        {/* <section className="bg-cyan-800 halftone-bg py-24 px-6">
          <CTABanner />
        </section> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
