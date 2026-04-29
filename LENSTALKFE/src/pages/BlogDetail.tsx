import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
import { BlogPost } from '../types';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import InfiniteWavySeparator from '../components/common/InfiniteWavySeparator';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const response = await fetch(`${API_URL}/blog_posts/slug/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setPost(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen bg-[#FCFBE4] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FCFBE4] text-center px-6">
        <h1 className="text-5xl font-black text-ink mb-6 uppercase tracking-widest" style={{ fontFamily: "'Titillium Web', sans-serif" }}>Article Not Found</h1>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-red text-warm-yellow px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm shadow-xl"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBE4] text-ink overflow-x-hidden pt-16">
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative h-[35vh] md:h-[45vh] bg-red flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={post.featuredImage} className="w-full h-full object-cover blur-2xl" alt="" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-5xl mx-auto -translate-y-6 md:-translate-y-10"
        >
          <h1 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-warm-yellow leading-[1.1] uppercase tracking-widest"
            style={{ fontFamily: "'Titillium Web', sans-serif" }}
          >
            {post.title}
          </h1>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full">
          <InfiniteWavySeparator waveColor="#FCFBE4" direction={-1} speed={25} />
        </div>
      </section>

      {/* ── META & CONTENT ────────────────────────────────────────────────── */}
      <section className="bg-[#FCFBE4] relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Post Meta */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16 border-b border-ink/5 pb-8">
            <div className="text-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-1">Author</h3>
              <p className="font-black text-sm text-ink uppercase tracking-wider">{post.author}</p>
            </div>
            <div className="text-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-1">Published</h3>
              <p className="font-black text-sm text-ink uppercase tracking-wider">
                {post.publishedAt ? format(new Date(post.publishedAt || (post as any).createdAt), 'MMM dd, yyyy') : 'N/A'}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-1">Category</h3>
              <p className="font-black text-sm text-ink uppercase tracking-wider">{post.category}</p>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="markdown-body text-ink/80 leading-[1.8] text-lg sm:text-xl font-medium" style={{ fontFamily: "'Syne', sans-serif" }}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK BUTTON ──────────────────────────────────────────────────── */}
      <section className="pb-24 text-center">
        <button
          onClick={() => navigate('/blog')}
          className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-red hover:text-ink transition-colors"
        >
          <span className="w-12 h-px bg-red/30 group-hover:bg-ink/30 transition-colors" />
          Back to Insights
          <span className="w-12 h-px bg-red/30 group-hover:bg-ink/30 transition-colors" />
        </button>
      </section>
    </div>
  );
};

export default BlogDetail;
