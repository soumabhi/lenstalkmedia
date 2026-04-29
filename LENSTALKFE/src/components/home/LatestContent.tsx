import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const LatestContent = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const content = [
    { type: 'video', thumb: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Brand Campaign 2024' },
    { type: 'image', thumb: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000', title: 'Corporate Event' },
    { type: 'video', thumb: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Product Launch' },
    { type: 'image', thumb: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=1000', title: 'Influencer Meet' },
    { type: 'video', thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Odisha Tourism Film' },
    { type: 'image', thumb: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1000', title: 'Studio Session' },
  ];

  return (
    <section className="py-24 px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-warm-yellow mb-4">LATEST CONTENT</h2>
          <p className="text-parchment/60 text-xl max-w-2xl">Fresh visuals, campaigns and stories from our studio.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => item.type === 'video' && setSelectedVideo(item.url || null)}
            >
              <img
                src={item.thumb}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h3 className="text-parchment font-display font-bold text-2xl mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <p className="text-cyan-800 text-xs font-bold uppercase tracking-[0.3em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.type === 'video' ? 'Motion Picture' : 'Still Image'}
                </p>
              </div>
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-800 text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 p-4 md:p-10">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-parchment hover:text-cyan-800 transition-colors"
          >
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-parchment/10">
            <iframe
              src={selectedVideo}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestContent;
