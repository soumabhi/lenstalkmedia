import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ArrowRight, Eye, Image as ImageIcon, Video as VideoIcon, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, Filter } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { GalleryItem, Campaign } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { FilmReelSticker, PhotographySticker } from '../components/StickerDesigns';
import { PatternBackground } from '../components/CardPatterns';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';

/* ─── Video Embed Helper ─────────────────────────────────────────────────── */
const getEmbedUrl = (url: string) => {
  if (!url) return '';
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
    else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0];
    else if (url.includes('embed/')) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  
  // Instagram
  if (url.includes('instagram.com')) {
    const cleanUrl = url.split('?')[0].replace(/\/$/, '');
    return `${cleanUrl}/embed`;
  }
  
  return url;
};

/* ─── Word-cloud watermark ───────────────────────────────────────────────── */
const WatermarkText = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
    <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 opacity-[0.06] text-6xl md:text-8xl font-display font-bold uppercase leading-none tracking-tight whitespace-nowrap text-white">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  </div>
);

const CampaignCard = ({ campaign, index, onClick }: { campaign: Campaign; index: number; onClick: () => void }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative aspect-video overflow-hidden rounded-[1rem] md:rounded-[1.2rem] border-[3px] border-[#FFDB2E] cursor-pointer shadow-2xl bg-black"
    >
      <img
        src={campaign.thumbnailUrl}
        alt={campaign.title}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
        <div className="bg-[#1D0B3D] px-4 md:px-6 py-2 md:py-2.5 inline-block shadow-lg">
          <h3 className="text-white font-display font-black text-base md:text-2xl lg:text-3xl uppercase tracking-tight leading-none italic italic-bold">
            {campaign.title}
          </h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
    </motion.div>
  );
};

const GalleryCard = ({ item, index, onPlay }: { item: GalleryItem; index: number; onPlay: (url: string) => void }) => {
  const isVideo = item.type === 'video';
  const imgSrc = isVideo ? item.thumbnailUrl : item.mediaUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        if (isVideo) {
          onPlay(item.mediaUrl);
        }
      }}
      className="group relative overflow-hidden rounded-[1rem] md:rounded-[1.2rem] cursor-pointer border-[3px] border-[#FFDB2E] shadow-lg hover:shadow-2xl transition-all bg-black"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imgSrc}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 pointer-events-none">
          <PatternBackground pattern="dotgrid" opacity={0.1} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-20 h-20 opacity-35 pointer-events-none">
          {item.type === 'video' && <FilmReelSticker className="w-full h-full" />}
          {item.type === 'image' && <PhotographySticker className="w-full h-full" />}
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/50 text-white backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity">
          <h3 className="font-display font-bold text-white text-lg drop-shadow">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'gallery'>('campaigns');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const { data: galleryItems, loading: galleryLoading } = useApi<GalleryItem>('gallery');
  const { data: campaigns, loading: campaignsLoading } = useApi<Campaign>('campaigns');

  const displayCampaigns = campaigns.filter(c => c.published);
  const displayGallery = galleryItems.filter(i => i.published);

  const campaignCategories = ['All', 'Social Media Campaigns', 'Video Ads', 'Documentary'];
  const filteredCampaigns = campaignFilter === 'All'
    ? displayCampaigns
    : displayCampaigns.filter(c => c.category === campaignFilter);

  const photoItems = displayGallery.filter(i => i.type === 'image');

  const isInstagram = selectedVideo?.includes('instagram.com');

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  return (
    <div className="pt-16 bg-[#3D1414] min-h-screen text-parchment overflow-x-hidden">
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-red">
        <div className="relative z-10 text-center px-4 sm:px-6 -mt-8 md:-mt-16">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black text-warm-yellow leading-none drop-shadow-2xl"
            style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 900 }}
          >
            OUR WORK
          </motion.h1>
        </div>
      </section>

      <section className="relative bg-[#3D1414] pt-8 md:pt-28 pb-2 md:pb-4">
        <InfiniteWavySeparator waveColor="#3D1414" direction={-1} speed={25} />
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 border-b-2 border-white/5 pb-8 md:pb-12">
              <div className="space-y-3">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-black uppercase tracking-[0.4em] text-red/90 block">Our Portfolio</motion.span>
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-8xl font-black text-white leading-none" style={{ fontFamily: "'Titillium Web', sans-serif" }}>SELECT WORKS</motion.h2>
              </div>
              <div className="flex bg-white/5 p-1.5 rounded-3xl w-fit self-start lg:self-end">
                {(['campaigns', 'gallery'] as const).map(tab => (
                  <motion.button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 rounded-2xl text-base font-black uppercase tracking-widest transition-all duration-500 ${activeTab === tab ? 'bg-red text-warm-yellow shadow-2xl' : 'text-white/40 hover:text-red hover:bg-white/5'}`}>{tab === 'campaigns' ? 'Campaigns' : 'Gallery'}</motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeTab === 'campaigns' && (
        <section className="px-6 pt-6 pb-24 md:pb-32 bg-[#3D1414]">
          <div className="max-w-[1600px] mx-auto">
            <div className="py-2 mb-8 md:mb-12 relative">
              <div className="hidden md:flex flex-wrap items-center gap-4">
                {campaignCategories.map((cat, i) => (
                  <motion.button key={cat} onClick={() => setCampaignFilter(cat)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`group relative px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-2 ${campaignFilter === cat ? 'bg-red border-red text-warm-yellow shadow-lg' : 'border-white/5 text-white/40 hover:border-red/30 hover:text-red'}`}>{cat}<span className={`text-[9px] w-5 h-5 flex items-center justify-center rounded-full transition-colors ${campaignFilter === cat ? 'bg-warm-yellow/20 text-warm-yellow' : 'bg-white/5 text-white/30 group-hover:bg-red/10'}`}>{cat === 'All' ? campaigns.length : campaigns.filter(c => c.category === cat).length}</span></motion.button>
                ))}
              </div>
              <div className="md:hidden relative">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/5 shadow-sm text-white font-black uppercase tracking-widest text-sm"><span className="flex items-center gap-2"><Filter size={16} className="text-red" />{campaignFilter}</span><motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }}><ChevronDown size={20} /></motion.div></button>
                <AnimatePresence>{isFilterOpen && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#4D1A1A] rounded-2xl shadow-2xl border border-white/5 z-50 overflow-hidden">{campaignCategories.map((cat) => (
                    <button key={cat} onClick={() => { setCampaignFilter(cat); setIsFilterOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${campaignFilter === cat ? 'bg-red text-warm-yellow' : 'text-white/60 hover:bg-red/5 hover:text-red'}`}>{cat}<span className={`text-[10px] px-2 py-0.5 rounded-full ${campaignFilter === cat ? 'bg-warm-yellow/20 text-warm-yellow' : 'bg-white/5 text-white/30'}`}>{cat === 'All' ? campaigns.length : campaigns.filter(c => c.category === cat).length}</span></button>
                  ))}</motion.div>
                )}</AnimatePresence>
              </div>
            </div>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredCampaigns.sort((a, b) => a.order - b.order).map((campaign, idx) => (
                  <CampaignCard key={campaign.id || `campaign-${idx}`} campaign={campaign} index={idx} onClick={() => navigate(`/portfolio/campaign/${campaign.slug}`)} />
                ))}
              </AnimatePresence>
            </motion.div>
            {filteredCampaigns.length === 0 && <p className="text-center text-white/30 py-24 text-lg">No campaigns in this category yet.</p>}
          </div>
        </section>
      )}

      {activeTab === 'gallery' && (
        <section className="px-6 pt-8 pb-24 md:pb-32 bg-[#3D1414]">
          <div className="max-w-[1600px] mx-auto">
            {galleryLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div key={i} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="rounded-2xl bg-white/5 aspect-video" />
                ))}
              </div>
            ) : displayGallery.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <AnimatePresence mode="popLayout">
                  {displayGallery.map((item, idx) => (
                    <GalleryCard key={item.id || `photo-${idx}`} item={item} index={idx} onPlay={setSelectedVideo} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-24">
                <ImageIcon size={48} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/40 text-lg">Items will appear here once uploaded from the admin panel.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="relative py-12 md:py-20 px-6 bg-[#FCFBE4]">
        <InfiniteWavySeparator waveColor="#FCFBE4" direction={1} speed={25} className="z-30" />
        <div className="max-w-[1600px] mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-4 md:space-y-6">
            <h2 className="text-3xl xs:text-4xl md:text-7xl font-black text-[#3D1414] leading-tight uppercase" style={{ fontFamily: "'Titillium Web', sans-serif" }}>GOT A VISION? <br /> <span className="text-[#FF2D6B]">LET'S BUILD IT.</span></h2>
            <p className="text-[#3D1414]/70 font-display font-bold text-xs xs:text-sm md:text-xl max-w-2xl mx-auto uppercase tracking-widest">READY TO TAKE YOUR BRAND TO THE NEXT LEVEL?</p>
            <motion.div className="pt-4 md:pt-8">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[#FF2D6B] text-warm-yellow px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#1A2B5E] transition-all">Start a Project<ArrowRight size={24} className="md:w-7 md:h-7" /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Persistent Portal for the Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              key="video-modal-portal" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedVideo(null)} 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-3xl p-4 md:p-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 1 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1 }} 
                transition={{ duration: 0.3 }} 
                onClick={e => e.stopPropagation()} 
                className={`relative w-[95vw] md:w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border-[3px] md:border-[6px] border-[#FFDB2E] shadow-[0_0_80px_rgba(255,219,46,0.25)] bg-black/40 backdrop-blur-md ${
                  isInstagram 
                    ? 'max-w-[420px] aspect-[9/16] max-h-[85vh]' 
                    : 'max-w-6xl aspect-video'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Enhanced Close button for better visibility on all devices */}
                <button 
                  onClick={() => setSelectedVideo(null)} 
                  className="absolute top-3 right-3 md:top-6 md:right-6 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black transition-all border-2 border-white/20 shadow-2xl"
                >
                  <X size={24} className="md:w-8 md:h-8" strokeWidth={2.5} />
                </button>
                <iframe 
                  src={getEmbedUrl(selectedVideo)} 
                  className="w-full h-full border-0 overflow-hidden bg-transparent" 
                  allow="autoplay; encrypted-media; fullscreen" 
                  allowFullScreen 
                  title="Video" 
                  scrolling="no"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Portfolio;
