import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <h1 className="text-[12rem] md:text-[18rem] font-display font-bold text-ink/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink">Page Not Found</h2>
          </div>
        </motion.div>
        
        <p className="text-ink/60 text-lg leading-relaxed font-body">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-cyan-800 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-ink transition-all shadow-xl hover:shadow-2xl"
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
