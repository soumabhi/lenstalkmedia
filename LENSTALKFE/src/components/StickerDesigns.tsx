import React from 'react';

/* ═══════════════════════════════════════════════════════════════════════════ */
/* STICKER DESIGNS - Sketchy, Fun, Vibrant SVG Illustrations */
/* ═══════════════════════════════════════════════════════════════════════════ */

/* Trophy/Award Sticker - for stats */
export const TrophySticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="trophy-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#trophy-sketch)">
      {/* Cup */}
      <path d="M 25 35 Q 25 20 35 15 L 65 15 Q 75 20 75 35 L 75 50 Q 75 60 60 65 L 40 65 Q 25 60 25 50 Z" stroke="#1A2B5E" strokeWidth="2.5" fill="#FFF" />
      {/* Handles */}
      <path d="M 20 35 Q 15 35 15 45" stroke="#1A2B5E" strokeWidth="2.5" fill="none" />
      <path d="M 80 35 Q 85 35 85 45" stroke="#1A2B5E" strokeWidth="2.5" fill="none" />
      {/* Base */}
      <rect x="30" y="65" width="40" height="8" stroke="#1A2B5E" strokeWidth="2.5" fill="#1A2B5E" />
      <rect x="25" y="73" width="50" height="5" stroke="#1A2B5E" strokeWidth="2.5" fill="#1A2B5E" />
      {/* Star inside cup */}
      <path d="M 50 30 L 52 38 L 60 38 L 54 43 L 56 51 L 50 46 L 44 51 L 46 43 L 40 38 L 48 38 Z" fill="#FFD600" />
    </g>
  </svg>
);

/* Video Camera Sticker - for creative content */
export const CameraSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="camera-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#camera-sketch)">
      {/* Lens front */}
      <circle cx="50" cy="55" r="18" stroke="#1A2B5E" strokeWidth="2.5" fill="#FF2D6B" />
      <circle cx="50" cy="55" r="12" stroke="#1A2B5E" strokeWidth="2" fill="#FFF" />
      <circle cx="50" cy="55" r="8" fill="#1A2B5E" />
      {/* Body */}
      <rect x="20" y="25" width="60" height="35" rx="8" stroke="#1A2B5E" strokeWidth="2.5" fill="#1A2B5E" />
      {/* Screen */}
      <rect x="28" y="32" width="20" height="12" rx="2" fill="#FFD600" />
      {/* Recording indicator */}
      <circle cx="56" cy="36" r="2.5" fill="#FF2D6B" />
    </g>
  </svg>
);

/* Handshake/People Sticker - for clients */
export const PeopleSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="people-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#people-sketch)">
      {/* Left person - head */}
      <circle cx="30" cy="25" r="8" stroke="#1A2B5E" strokeWidth="2" fill="#FFD600" />
      {/* Left person - body */}
      <path d="M 30 33 L 25 50 Q 25 55 20 55" stroke="#1A2B5E" strokeWidth="2.5" fill="none" />
      {/* Right person - head */}
      <circle cx="70" cy="25" r="8" stroke="#1A2B5E" strokeWidth="2" fill="#00E676" />
      {/* Right person - body */}
      <path d="M 70 33 L 75 50 Q 75 55 80 55" stroke="#1A2B5E" strokeWidth="2.5" fill="none" />
      {/* Handshake */}
      <path d="M 40 45 Q 50 40 60 45" stroke="#1A2B5E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Heart */}
      <path d="M 50 65 L 53 62 Q 55 60 57 62 L 54 65 Q 52 67 50 65 Z" fill="#FF2D6B" />
    </g>
  </svg>
);

/* Rocket Sticker - for projects/growth */
export const RocketSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="rocket-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#rocket-sketch)">
      {/* Rocket body */}
      <path d="M 50 15 L 58 35 L 58 60 L 42 60 L 42 35 Z" stroke="#1A2B5E" strokeWidth="2.5" fill="#FF2D6B" />
      {/* Window */}
      <circle cx="50" cy="28" r="5" fill="#FFD600" />
      {/* Left fin */}
      <path d="M 42 50 L 30 65 L 42 60 Z" stroke="#1A2B5E" strokeWidth="2" fill="#00E676" />
      {/* Right fin */}
      <path d="M 58 50 L 70 65 L 58 60 Z" stroke="#1A2B5E" strokeWidth="2" fill="#00E676" />
      {/* Flame 1 */}
      <path d="M 45 60 L 40 75 L 47 68 Z" fill="#FF6B00" />
      {/* Flame 2 */}
      <path d="M 55 60 L 60 75 L 53 68 Z" fill="#FFD600" />
      {/* Star */}
      <path d="M 50 15 L 52 20 L 57 20 L 53 24 L 55 29 L 50 25 L 45 29 L 47 24 L 43 20 L 48 20 Z" fill="#FFD600" />
    </g>
  </svg>
);

/* Chart/Analytics Sticker - for performance */
export const ChartSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="chart-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#chart-sketch)">
      {/* Bars */}
      <rect x="20" y="50" width="12" height="25" stroke="#1A2B5E" strokeWidth="2" fill="#FFD600" />
      <rect x="38" y="35" width="12" height="40" stroke="#1A2B5E" strokeWidth="2" fill="#FF2D6B" />
      <rect x="56" y="25" width="12" height="50" stroke="#1A2B5E" strokeWidth="2" fill="#00E676" />
      <rect x="74" y="15" width="12" height="60" stroke="#1A2B5E" strokeWidth="2" fill="#FF6B00" />
      {/* Baseline */}
      <line x1="15" y1="75" x2="90" y2="75" stroke="#1A2B5E" strokeWidth="2.5" />
      {/* Upward arrow */}
      <path d="M 82 8 L 88 15 L 76 15 Z" fill="#00E676" stroke="#1A2B5E" strokeWidth="1.5" />
    </g>
  </svg>
);

/* Palette/Design Sticker - for branding */
export const PaletteSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="palette-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="6" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#palette-sketch)">
      {/* Palette shape */}
      <path d="M 25 35 Q 20 50 30 65 Q 45 75 60 70 Q 75 65 75 50 Q 75 35 60 30 Q 45 25 25 35 Z" stroke="#1A2B5E" strokeWidth="2.5" fill="#FFD600" />
      {/* Color dots */}
      <circle cx="35" cy="40" r="4" fill="#FF2D6B" stroke="#1A2B5E" strokeWidth="1.5" />
      <circle cx="45" cy="35" r="4" fill="#00E676" stroke="#1A2B5E" strokeWidth="1.5" />
      <circle cx="55" cy="38" r="4" fill="#00B8D9" stroke="#1A2B5E" strokeWidth="1.5" />
      <circle cx="60" cy="50" r="4" fill="#FF6B00" stroke="#1A2B5E" strokeWidth="1.5" />
      <circle cx="50" cy="58" r="4" fill="#FFD600" stroke="#1A2B5E" strokeWidth="1.5" />
      <circle cx="38" cy="55" r="4" fill="#FF47B5" stroke="#1A2B5E" strokeWidth="1.5" />
    </g>
  </svg>
);

/* Megaphone/Broadcast Sticker - for offline marketing */
export const MegaphoneSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="megaphone-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#megaphone-sketch)">
      {/* Megaphone cone */}
      <path d="M 30 25 L 75 45 L 75 65 L 30 55 Z" stroke="#1A2B5E" strokeWidth="2.5" fill="#FF6B00" />
      {/* Handle */}
      <rect x="20" y="38" width="12" height="20" rx="4" stroke="#1A2B5E" strokeWidth="2" fill="#FFD600" />
      {/* Sound waves */}
      <path d="M 78 35 Q 85 35 85 45" stroke="#1A2B5E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 82 30 Q 92 30 92 45" stroke="#1A2B5E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 78 55 Q 85 55 85 45" stroke="#1A2B5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

/* Social Share Sticker - for social media */
export const ShareSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="share-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="8" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#share-sketch)">
      {/* Network nodes */}
      <circle cx="50" cy="25" r="6" fill="#FFD600" stroke="#1A2B5E" strokeWidth="2" />
      <circle cx="30" cy="55" r="6" fill="#FF2D6B" stroke="#1A2B5E" strokeWidth="2" />
      <circle cx="70" cy="55" r="6" fill="#00E676" stroke="#1A2B5E" strokeWidth="2" />
      <circle cx="50" cy="70" r="6" fill="#00B8D9" stroke="#1A2B5E" strokeWidth="2" />
      {/* Connecting lines */}
      <line x1="50" y1="31" x2="32" y2="49" stroke="#1A2B5E" strokeWidth="2" />
      <line x1="50" y1="31" x2="68" y2="49" stroke="#1A2B5E" strokeWidth="2" />
      <line x1="50" y1="31" x2="50" y2="64" stroke="#1A2B5E" strokeWidth="2" />
      <line x1="30" y1="61" x2="50" y2="64" stroke="#1A2B5E" strokeWidth="2" />
      <line x1="70" y1="61" x2="50" y2="64" stroke="#1A2B5E" strokeWidth="2" />
    </g>
  </svg>
);

/* Film Reel Sticker - for reels/videos */
export const FilmReelSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="filmreel-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#filmreel-sketch)">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="30" stroke="#1A2B5E" strokeWidth="2.5" fill="none" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="20" stroke="#1A2B5E" strokeWidth="2" fill="#FFD600" />
      {/* Film strip segments */}
      <rect x="42" y="22" width="5" height="8" fill="#1A2B5E" />
      <rect x="53" y="22" width="5" height="8" fill="#1A2B5E" />
      <rect x="68" y="45" width="8" height="5" fill="#1A2B5E" />
      <rect x="68" y="55" width="8" height="5" fill="#1A2B5E" />
      <rect x="42" y="70" width="5" height="8" fill="#1A2B5E" />
      <rect x="53" y="70" width="5" height="8" fill="#1A2B5E" />
      <rect x="24" y="45" width="8" height="5" fill="#1A2B5E" />
      <rect x="24" y="55" width="8" height="5" fill="#1A2B5E" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill="#FF2D6B" />
    </g>
  </svg>
);

/* Globe/Network Sticker - for influencer/network */
export const GlobeSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="globe-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="10" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#globe-sketch)">
      {/* Globe */}
      <circle cx="50" cy="50" r="25" stroke="#1A2B5E" strokeWidth="2.5" fill="#00E676" />
      {/* Continents */}
      <path d="M 40 35 Q 45 32 50 35 Q 48 40 43 40 Z" fill="#1A2B5E" />
      <path d="M 55 50 Q 60 48 62 55 Q 60 60 55 58 Z" fill="#1A2B5E" />
      <path d="M 38 60 Q 42 62 45 60 Q 44 65 38 65 Z" fill="#1A2B5E" />
      {/* Equator line */}
      <line x1="25" y1="50" x2="75" y2="50" stroke="#1A2B5E" strokeWidth="1.5" strokeDasharray="3,3" />
      {/* Connection points */}
      <circle cx="38" cy="38" r="2" fill="#FF2D6B" />
      <circle cx="60" cy="52" r="2" fill="#FFD600" />
    </g>
  </svg>
);

/* Play Button Sticker - for video content */
export const PlayButtonSticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="playbutton-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="11" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#playbutton-sketch)">
      {/* Circle background */}
      <circle cx="50" cy="50" r="28" stroke="#1A2B5E" strokeWidth="2.5" fill="#FF2D6B" />
      {/* Play triangle */}
      <path d="M 40 35 L 40 65 L 65 50 Z" fill="#FFD600" stroke="#1A2B5E" strokeWidth="1.5" />
    </g>
  </svg>
);

/* Camera with Focus Sticker - for photography */
export const PhotographySticker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="photography-sketch">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="12" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
      </filter>
    </defs>
    <g filter="url(#photography-sketch)">
      {/* Camera body */}
      <rect x="20" y="30" width="60" height="45" rx="5" stroke="#1A2B5E" strokeWidth="2.5" fill="#00B8D9" />
      {/* Lens */}
      <circle cx="50" cy="52" r="15" stroke="#1A2B5E" strokeWidth="2.5" fill="#FFD600" />
      <circle cx="50" cy="52" r="10" stroke="#1A2B5E" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="52" r="5" fill="#1A2B5E" />
      {/* Flash */}
      <rect x="28" y="32" width="8" height="6" rx="1" stroke="#1A2B5E" strokeWidth="1.5" fill="#FFD600" />
      {/* Shutter button */}
      <circle cx="70" cy="38" r="3.5" fill="#1A2B5E" stroke="#1A2B5E" strokeWidth="1" />
    </g>
  </svg>
);

/* Sticker Component Mapping */
export const STICKER_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'trophy': TrophySticker,
  'camera': CameraSticker,
  'people': PeopleSticker,
  'rocket': RocketSticker,
  'chart': ChartSticker,
  'palette': PaletteSticker,
  'megaphone': MegaphoneSticker,
  'share': ShareSticker,
  'filmreel': FilmReelSticker,
  'globe': GlobeSticker,
  'playbutton': PlayButtonSticker,
  'photography': PhotographySticker,
};

export const getStickerComponent = (stickerName: string): React.ComponentType<{ className?: string }> => {
  return STICKER_MAP[stickerName] || TrophySticker;
};
