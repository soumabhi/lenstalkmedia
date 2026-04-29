import React from 'react';
import { Link } from 'react-router-dom';

// Wavy Pattern SVG Component
const WavyPatternSVG = ({ className, fill }: { className?: string; fill: string }) => (
  <svg className={className} width="2096" height="268" viewBox="0 0 2096 268" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M261.985 129C260.916 57.5729 202.681 0 131 0C59.3185 0 1.08396 57.5729 0.0149573 129H0V131V268H2096V131V129H2095.99C2094.92 57.5729 2036.68 0 1965 0C1893.32 0 1835.08 57.5729 1834.02 129H1833.98C1832.92 57.5729 1774.68 0 1703 0C1631.32 0 1573.08 57.5729 1572.02 129H1571.98C1570.92 57.5729 1512.68 0 1441 0C1369.32 0 1311.08 57.5729 1310.02 129H1309.98C1308.92 57.5729 1250.68 0 1179 0C1107.32 0 1049.08 57.5729 1048.02 129H1047.98C1046.92 57.5729 988.681 0 917 0C845.319 0 787.084 57.5729 786.015 129H785.985C784.916 57.5729 726.681 0 655 0C583.319 0 525.084 57.5729 524.015 129H523.985C522.916 57.5729 464.681 0 393 0C321.319 0 263.084 57.5729 262.015 129H261.985Z"
      fill={fill}
    />
  </svg>
);

// Icon Components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.1006 0H6.89891C3.09485 0 0 3.095 0 6.89906V18.1008C0 21.905 3.09485 24.9999 6.89891 24.9999H18.1006C21.905 24.9999 24.9999 21.9049 24.9999 18.1008V6.89906C25 3.095 21.905 0 18.1006 0ZM22.7819 18.1008C22.7819 20.6819 20.6819 22.7817 18.1008 22.7817H6.89891C4.31792 22.7819 2.21811 20.6819 2.21811 18.1008V6.89906C2.21811 4.31806 4.31792 2.21811 6.89891 2.21811H18.1006C20.6818 2.21811 22.7817 4.31806 22.7817 6.89906V18.1008H22.7819Z" fill="currentColor" />
    <path d="M12.4965 6.05859C8.94444 6.05859 6.05469 8.94834 6.05469 12.5004C6.05469 16.0524 8.94444 18.942 12.4965 18.942C16.0486 18.942 18.9383 16.0524 18.9383 12.5004C18.9383 8.94834 16.0486 6.05859 12.4965 6.05859ZM12.4965 16.7237C10.1677 16.7237 8.2728 14.8291 8.2728 12.5003C8.2728 10.1713 10.1675 8.27655 12.4965 8.27655C14.8255 8.27655 16.7202 10.1713 16.7202 12.5003C16.7202 14.8291 14.8254 16.7237 12.4965 16.7237Z" fill="currentColor" />
    <circle cx="19.2126" cy="5.80435" r="1.62661" fill="currentColor" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.36536 0.0234375C1.50561 0.0234375 0.000300881 1.4776 0 3.26686C0 5.05787 1.50531 6.51174 3.36566 6.51174C5.22089 6.51174 6.7283 5.05787 6.7283 3.26686C6.7283 1.47731 5.22059 0.0234375 3.36536 0.0234375Z" fill="currentColor" />
    <rect x="0.460938" y="8.97266" width="5.80309" height="18.004" fill="currentColor" />
    <path d="M21.0404 8.52539C18.2175 8.52539 16.3246 10.0178 15.5499 11.4331H15.4723V8.97307H9.90625V26.9768H15.7042V18.0703C15.7042 15.7222 16.1679 13.4478 19.1869 13.4478C22.1626 13.4478 22.2024 16.1333 22.2024 18.2208V26.9766H28.0012V17.1015C28.0012 12.2542 26.9166 8.52539 21.0404 8.52539Z" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.125 0H4.875C2.182 0 0 2.182 0 4.875V21.125C0 23.818 2.182 26 4.875 26H21.125C23.818 26 26 23.818 26 21.125V4.875C26 2.182 23.818 0 21.125 0ZM20.464 14.002H18.031V23.006H13.968V14.002H12.392V10.969H13.968V9.037C13.969 6.504 15.021 5 18.006 5H21.031V8.022H19.274C18.112 8.022 18.036 8.455 18.036 9.265L18.031 10.968H20.795L20.464 14.002Z" fill="currentColor" />
  </svg>
);

// Lenstalk Logo adapted to the Dark Red style
const LenstalkLogoSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#3B0017" fontSize="80" fontWeight="900" style={{ fontFamily: "'Titillium Web', sans-serif" }}>LENSTALK</text>
    <text x="50%" y="95%" dominantBaseline="middle" textAnchor="middle" fill="#3B0017" fontSize="30" fontWeight="700" letterSpacing="0.4em" style={{ fontFamily: "'Titillium Web', sans-serif" }}>MEDIA</text>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const leftLinks = [
    { label: 'about us', path: '/about' },
    { label: 'portfolio', path: '/portfolio' },
    { label: 'blog', path: '/blog' },
    { label: 'map', href: 'https://www.google.com/maps?q=Baramunda,+Bhubaneswar,+Odisha,+India' },
  ];

  const rightLinks = [
    { label: 'instagram', href: 'https://www.instagram.com/lenstalkmedia.in/' },
    { label: 'facebook', href: 'https://www.facebook.com/profile.php?id=61553707079331' },
    { label: 'linkedin', href: 'https://www.linkedin.com/company/105131148/' },
    { label: 'contact', path: '/contact' },
  ];

  return (
    <footer className="relative flex flex-col min-h-screen lg:h-[98vh] bg-[#EF9AAA] rounded-t-[40px] overflow-hidden">
      {/* Center Logo - Fixed position to prevent jumping */}
      <div className="absolute top-[8vh] sm:top-[12vh] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <LenstalkLogoSVG className="h-[10vh] xs:h-[15vh] sm:h-[20vh] md:h-[25vh] lg:h-[30vh] w-auto opacity-70" />
      </div>

      {/* Links Container - Responsive Stack */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center md:justify-between px-6 sm:px-12 md:px-16 lg:px-20 w-full relative z-10 pt-[18vh] xs:pt-[22vh] md:pt-0 pb-12 md:pb-0">
        {/* Left Links */}
        <div className="flex flex-col text-center md:text-left gap-y-3 xs:gap-y-4 sm:gap-y-6">
          {leftLinks.map((link) => (
            link.path ? (
              <Link
                key={link.label}
                to={link.path}
                className="uppercase text-base xs:text-lg sm:text-xl md:text-2xl text-[#3B0017] font-bold tracking-tight whitespace-nowrap hover:underline transition-all duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase text-base xs:text-lg sm:text-xl md:text-2xl text-[#3B0017] font-bold tracking-tight whitespace-nowrap hover:underline transition-all duration-300"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Right Links */}
        <div className="flex flex-col text-center md:text-right gap-y-3 xs:gap-y-4 sm:gap-y-6 mt-10 md:mt-0">
          {rightLinks.map((link) => (
            link.path ? (
              <Link
                key={link.label}
                to={link.path}
                className="uppercase text-base xs:text-lg sm:text-xl md:text-2xl text-[#3B0017] font-bold tracking-tight hover:underline transition-all duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="uppercase text-base xs:text-lg sm:text-xl md:text-2xl text-[#3B0017] font-bold tracking-tight hover:underline transition-all duration-300"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative h-auto md:h-[15%] bg-[#3B0017] flex md:items-end py-12 md:py-0 md:pb-[2vw]">
        {/* Wavy Pattern */}
        <div className="infinite-mover absolute top-0 left-0 flex w-[400vw] sm:w-[200vw]">
          <WavyPatternSVG className="w-1/2" fill="#3B0017" />
          <WavyPatternSVG className="w-1/2" fill="#3B0017" />
        </div>

        {/* Copyright & Social */}
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 text-[#EF9AAA] px-6 sm:px-10 w-full gap-10 md:gap-0 pb-10 md:pb-0">
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-2">
            <h1 className="font-bold tracking-wider text-xs xs:text-sm sm:text-lg lg:text-xl">LENSTALK MEDIA {currentYear}</h1>

            {/* Mobile Social Icons - hidden on desktop */}
            <div className="flex gap-6 items-center md:hidden mt-2">
              <a href="https://www.instagram.com/lenstalkmedia.in/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/105131148/" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-7 h-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61553707079331" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 md:gap-1">
            <p className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
              <span className="opacity-60 uppercase text-[10px] tracking-widest">Email:</span>
              <a className="underline hover:no-underline font-bold text-sm sm:text-base lg:text-lg" href="mailto:lenstalkmediahouse@gmail.com">
                lenstalkmediahouse@gmail.com
              </a>
            </p>
            <p className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
              <span className="opacity-60 uppercase text-[10px] tracking-widest">Contact:</span>
              <a className="font-bold text-sm sm:text-base lg:text-lg" href="tel:+917656880081">+91 7656880081</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
