import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Share2, Instagram, Video, Image as ImageIcon, ArrowRight, Play, X } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { Campaign } from '../types';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';

const CampaignDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: campaigns, loading } = useApi<Campaign>('campaigns');
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  useEffect(() => {
    if (campaigns.length > 0 && slug) {
      const found = campaigns.find(c => c.slug === slug);
      if (found) {
        setCampaign(found);
      } else {
        // Fallback or 404
        navigate('/portfolio');
      }
    }
  }, [campaigns, slug, navigate]);

  if (loading || !campaign) {
    return (
      <div className="h-screen bg-parchment flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-red border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const allMedia = [
    ...campaign.reelUrls.map(url => ({ type: 'reel', url })),
    ...campaign.staticPosts.map(url => ({ type: 'static', url })),
    ...campaign.feedImages.map(url => ({ type: 'feed', url }))
  ];

  return (
    <div className="min-h-screen bg-[#FCFBE4] text-ink overflow-x-hidden pt-16">
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative h-[30vh] md:h-[40vh] bg-red flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={campaign.thumbnailUrl} className="w-full h-full object-cover blur-2xl" alt="" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-7xl mx-auto"
        >
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-warm-yellow leading-none uppercase tracking-widest -mt-4 md:-mt-8"
            style={{ fontFamily: "'Titillium Web', sans-serif" }}
          >
            {campaign.title}
          </h1>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full">
          <InfiniteWavySeparator waveColor="#FCFBE4" direction={-1} speed={25} />
        </div>
      </section>

      {/* ── DESCRIPTION ──────────────────────────────────────────────────── */}
      <section className="bg-[#FCFBE4] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
            <div className="lg:col-span-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-red mb-6">About the Project</h2>
              <p className="text-xl sm:text-2xl md:text-4xl font-bold leading-[1.3] text-ink/90" style={{ fontFamily: "'Syne', sans-serif" }}>
                {campaign.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-2 border-b border-ink/5 pb-2">Client</h3>
                  <p className="font-black text-base md:text-lg text-ink uppercase">{campaign.clientName}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-2 border-b border-ink/5 pb-2">Service</h3>
                  <p className="font-black text-base md:text-lg text-ink uppercase">{campaign.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-full max-h-full aspect-[9/16] relative bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedMedia} className="w-full h-full object-contain" alt="" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignDetail;
