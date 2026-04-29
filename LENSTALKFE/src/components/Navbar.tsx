import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolling up or at the very top
      // Hide navbar if scrolling down and passed a threshold (100px)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={cn(
        isHomePage ? 'absolute' : 'fixed',
        'top-0 left-0 w-full z-[1000] transition-all duration-500 h-[64px] flex items-center bg-black',
        (!isHomePage) ? 'translate-y-0 opacity-100' : ''
      )}
    >
      <div className="max-w-[1440px] w-full mx-auto px-[5%] md:px-[8%] flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-4 group relative z-[2001]">
          <span
            className="text-xl md:text-2xl font-extrabold uppercase tracking-tighter text-white leading-none"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            LENSTALK<span className="text-[#00FF00]">MEDIA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-[30px]">
          <div className="flex items-center gap-[25px]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'relative text-[12px] font-bold uppercase tracking-[0.1em] transition-colors duration-200 py-1',
                  location.pathname === link.path
                    ? 'text-[#FF0055]'
                    : 'text-white hover:text-[#FF0055]'
                )}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-white"
                    layoutId="navUnderline"
                  />
                )}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className="compass-button"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <svg className="compass-svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
            </svg>
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden relative z-[2001] text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#000000] z-[2000] flex flex-col justify-center items-center px-6 min-h-screen w-screen"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-3xl font-bold uppercase tracking-[0.1em] transition-all duration-200',
                      location.pathname === link.path ? 'text-[#FF0055]' : 'text-white hover:text-[#FF0055]'
                    )}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="compass-button scale-125 origin-center"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  <svg className="compass-svgIcon" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                  </svg>
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


