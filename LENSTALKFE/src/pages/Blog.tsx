import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Eye, ChevronDown, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { BlogPost } from '../types';
import { format } from 'date-fns';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';

/* ─── Card Colors ────────────────────────────────────────────────────────── */
const CARD_COLORS = [
  'bg-[#FFDB2E]', // Canary Yellow
  'bg-[#7BB2E8]', // Sky Blue
  'bg-[#F2A3B3]', // Blush Pink
  'bg-[#00DADC]', // Cyan
  'bg-[#FF9B9B]', // Soft Coral
  'bg-[#FF5C35]'  // Bright Orange
];

const BlogCard = ({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) => {
  const bgColor = CARD_COLORS[index % CARD_COLORS.length];
  const dateStr = post.publishedAt ? format(new Date(post.publishedAt), 'MMM dd, yyyy') : '';

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`${bgColor} rounded-[2rem] border-4 border-ink/10 cursor-pointer group relative overflow-hidden flex flex-col shadow-xl`}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Square image frame */}
        <div className="aspect-square w-full overflow-hidden border-b-4 border-ink/10 relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur border-2 border-white/40 flex items-center justify-center text-white shadow-xl">
              <Eye size={22} />
            </div>
          </div>
          {/* Category Tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-ink/80 text-parchment backdrop-blur">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 text-center flex-grow flex flex-col justify-center">
          <div className="flex items-center justify-center gap-3 mb-2 opacity-40">
            <span className="text-[10px] font-black uppercase tracking-widest">{dateStr}</span>
          </div>
          <h3 className="text-ink font-black text-xl md:text-2xl uppercase tracking-widest leading-none mb-4 group-hover:scale-105 transition-transform">
            {post.title}
          </h3>

          <div className="flex items-center justify-center gap-2 flex-wrap mt-auto opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-black uppercase tracking-widest text-ink">
              Read Article
            </span>
            <ArrowRight size={14} className="text-ink" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const { data: posts, loading } = useApi<BlogPost>('blog_posts');

  const displayPosts = posts.filter(p => p.published);
  const categories = ['All', 'Strategy', 'Creative', 'Influencer', 'Insights'];

  const filteredPosts = displayPosts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="pt-16 bg-[#FCFBE4] min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-red">
        <div className="relative z-10 text-center px-4 sm:px-6 -mt-8 md:-mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black text-warm-yellow leading-none drop-shadow-2xl"
            style={{ fontFamily: "'Titillium Web', sans-serif", fontWeight: 900 }}
          >
            OUR BLOG
          </motion.h1>
        </div>
      </section>

      {/* ── NAVIGATION / FILTERS ─────────────────────────────────────────── */}
      <section className="relative bg-[#FCFBE4] pt-8 md:pt-28 pb-2 md:pb-4">
        <InfiniteWavySeparator
          waveColor="#FCFBE4"
          direction={-1}
          speed={25}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:gap-10">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 border-b-2 border-ink/5 pb-8 md:pb-12">
              <div className="space-y-3">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-black uppercase tracking-[0.4em] text-red/70 block"
                >
                  Insights & Perspectives
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-8xl font-black text-ink leading-none"
                  style={{ fontFamily: "'Titillium Web', sans-serif" }}
                >
                  SELECT READS
                </motion.h2>
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-ink/5 border-2 border-transparent focus:border-red focus:bg-white transition-all outline-none font-bold text-ink uppercase tracking-wider text-xs"
                />
              </div>
            </div>

            {/* Sub-Filters / Tags */}
            <div className="py-2 relative">
              {/* Desktop Tags */}
              <div className="hidden md:flex flex-wrap items-center gap-4">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border-2 ${activeCategory === cat
                      ? 'bg-red border-red text-warm-yellow shadow-lg'
                      : 'border-ink/5 text-ink/40 hover:border-red/30 hover:text-red'
                      }`}
                  >
                    {cat}
                    <span className={`text-[9px] w-5 h-5 flex items-center justify-center rounded-full transition-colors ${activeCategory === cat ? 'bg-warm-yellow/20 text-warm-yellow' : 'bg-ink/5 text-ink/30 group-hover:bg-red/10'
                      }`}>
                      {cat === 'All' ? displayPosts.length : displayPosts.filter(p => p.category === cat).length}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Dropdown */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white border-2 border-ink/5 shadow-sm text-ink font-black uppercase tracking-widest text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Filter size={16} className="text-red" />
                    {activeCategory}
                  </span>
                  <motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-2xl shadow-2xl border border-ink/5 z-50 overflow-hidden"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${activeCategory === cat ? 'bg-red text-warm-yellow' : 'text-ink/60 hover:bg-red/5 hover:text-red'
                            }`}
                        >
                          {cat}
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat ? 'bg-warm-yellow/20 text-warm-yellow' : 'bg-ink/5 text-ink/30'
                            }`}>
                            {cat === 'All' ? displayPosts.length : displayPosts.filter(p => p.category === cat).length}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG POSTS GRID ────────────────────────────────────────────────── */}
      <section className="px-6 py-12 md:py-24 bg-[#FCFBE4]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square rounded-[2rem] bg-ink/5 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <BlogCard
                    key={post.id || idx}
                    post={post}
                    index={idx}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-ink/30 font-black uppercase tracking-widest text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;