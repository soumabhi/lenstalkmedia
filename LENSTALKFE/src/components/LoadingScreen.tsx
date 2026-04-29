import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const DURATION = 3000; // 3 seconds

const FloatingShape = ({
  color, size, x, y, shape, delay, rotate = 0,
}: {
  color: string; size: number; x: string; y: string;
  shape: 'star' | 'circle' | 'rect' | 'triangle' | 'diamond' | 'bolt' | 'donut';
  delay?: number; rotate?: number;
}) => {
  const variants: Variants = {
    initial: { opacity: 0, scale: 0, rotate: rotate - 20 },
    animate: { opacity: 1, scale: 1, rotate, transition: { delay: delay ?? 0, duration: 0.6, type: 'spring' as const } },
    float: {
      y: [0, -12, 0, 8, 0],
      rotate: [rotate, rotate + 8, rotate - 4, rotate + 6, rotate],
      transition: { type: 'tween' as const, duration: 3 + (delay ?? 0), repeat: Infinity, ease: 'easeInOut', delay: delay ?? 0 },
    },
  };

  const shapeEl = () => {
    switch (shape) {
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} />
          </svg>
        );
      case 'circle':
        return <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />;
      case 'rect':
        return <div style={{ width: size, height: size * 0.6, borderRadius: 4, background: color }} />;
      case 'triangle':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <polygon points="12,3 22,21 2,21" fill={color} />
          </svg>
        );
      case 'diamond':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <polygon points="12,2 22,12 12,22 2,12" fill={color} />
          </svg>
        );
      case 'bolt':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" fill={color} />
          </svg>
        );
      case 'donut':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="4" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial="initial"
      animate={['animate', 'float']}
      variants={variants}
      style={{ position: 'absolute', left: x, top: y, zIndex: 1 }}
    >
      {shapeEl()}
    </motion.div>
  );
};

/* ─── Camera SVG icon ─────────────────────────────────────────────────── */
const CameraIcon = ({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: -20 }}
    animate={{ opacity: 1, scale: 1, rotate: -8, y: [0, -10, 0, 6, 0] }}
    transition={{ delay, duration: 0.7, type: 'spring' as const, y: { type: 'tween' as const, delay, duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
    style={{ position: 'absolute', left: x, top: y, zIndex: 2 }}
  >
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="14" width="40" height="28" rx="5" fill={color} />
      <circle cx="24" cy="28" r="9" fill="white" opacity="0.3" />
      <circle cx="24" cy="28" r="6" fill="white" opacity="0.6" />
      <rect x="18" y="8" width="12" height="8" rx="3" fill={color} stroke="white" strokeWidth="2" />
      <circle cx="38" cy="18" r="2.5" fill="#FFD600" />
    </svg>
  </motion.div>
);

/* ─── Film clapper SVG ─────────────────────────────────────────────────── */
const ClapperIcon = ({ color, x, y, delay }: { color: string; x: string; y: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: [0, -8, 0, 5, 0], rotate: [0, 4, -2, 3, 0] }}
    transition={{ delay, duration: 0.7, type: 'spring' as const, y: { type: 'tween' as const, delay, duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { type: 'tween' as const, delay, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
    style={{ position: 'absolute', left: x, top: y, zIndex: 2 }}
  >
    <svg width="52" height="44" viewBox="0 0 52 44" fill="none">
      <rect x="1" y="12" width="50" height="32" rx="4" fill={color} />
      <rect x="1" y="4" width="50" height="12" rx="4" fill="#1A2B5E" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={3 + i * 10} y="4" width="5" height="12" fill="#FFD600" opacity={i % 2 === 0 ? 1 : 0.5} />
      ))}
      <circle cx="26" cy="29" r="8" fill="white" opacity="0.2" />
      <circle cx="26" cy="29" r="5" fill="white" opacity="0.35" />
    </svg>
  </motion.div>
);

/* ─── Sparkle burst ─────────────────────────────────────────────────────── */
const Sparkle = ({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0] }}
    transition={{ delay, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
    style={{ position: 'absolute', left: x, top: y, zIndex: 3 }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
    </svg>
  </motion.div>
);

/* ─── Main Loading Screen ───────────────────────────────────────────────── */
const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // 400ms fade-out before calling onFinish
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 500);
        }, 200);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #00B8D9 0%, #00D4F0 40%, #00A8C8 100%)' }}
        >
          {/* ── Background shimmer ── */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 40% 40%, #FFD600 0%, transparent 60%)' }}
          />
          <motion.div
            animate={{ opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 70% 70%, #FF47B5 0%, transparent 55%)' }}
          />

          {/* ── Floating background shapes ── */}
          <FloatingShape color="#FF2D6B" size={36} x="3%" y="8%" shape="star" delay={0.1} rotate={15} />
          <FloatingShape color="#FFD600" size={28} x="8%" y="18%" shape="bolt" delay={0.2} rotate={-10} />
          <FloatingShape color="#00E676" size={44} x="1%" y="38%" shape="triangle" delay={0.15} rotate={20} />
          <FloatingShape color="#B832FF" size={32} x="5%" y="60%" shape="diamond" delay={0.3} rotate={45} />
          <FloatingShape color="#FF6B00" size={22} x="12%" y="80%" shape="star" delay={0.25} rotate={-30} />
          <FloatingShape color="#FF47B5" size={50} x="0%" y="72%" shape="rect" delay={0.18} rotate={-8} />
          <FloatingShape color="#FFD600" size={30} x="15%" y="5%" shape="donut" delay={0.35} rotate={0} />

          <FloatingShape color="#FFD600" size={44} x="82%" y="5%" shape="star" delay={0.2} rotate={-15} />
          <FloatingShape color="#FF2D6B" size={32} x="90%" y="18%" shape="bolt" delay={0.1} rotate={10} />
          <FloatingShape color="#00E676" size={26} x="95%" y="42%" shape="circle" delay={0.3} rotate={0} />
          <FloatingShape color="#B832FF" size={38} x="88%" y="60%" shape="triangle" delay={0.15} rotate={-25} />
          <FloatingShape color="#FF6B00" size={24} x="80%" y="78%" shape="diamond" delay={0.22} rotate={30} />
          <FloatingShape color="#FF47B5" size={42} x="92%" y="72%" shape="star" delay={0.28} rotate={5} />
          <FloatingShape color="#00E676" size={28} x="78%" y="8%" shape="donut" delay={0.35} rotate={0} />

          <FloatingShape color="#FF6B00" size={22} x="30%" y="2%" shape="star" delay={0.4} rotate={20} />
          <FloatingShape color="#B832FF" size={18} x="55%" y="3%" shape="bolt" delay={0.45} rotate={-5} />
          <FloatingShape color="#FF2D6B" size={20} x="70%" y="88%" shape="circle" delay={0.38} rotate={0} />
          <FloatingShape color="#FFD600" size={24} x="40%" y="92%" shape="star" delay={0.42} rotate={-12} />
          <FloatingShape color="#00E676" size={20} x="22%" y="90%" shape="triangle" delay={0.36} rotate={15} />

          {/* ── Camera & production icons ── */}
          <CameraIcon color="#1A2B5E" size={56} x="6%" y="25%" delay={0.4} />
          <CameraIcon color="#FF2D6B" size={40} x="84%" y="30%" delay={0.5} />
          <ClapperIcon color="#FFD600" x="75%" y="70%" delay={0.45} />
          <ClapperIcon color="#FF47B5" x="14%" y="50%" delay={0.55} />

          {/* ── Sparkle bursts ── */}
          {[
            { x: '25%', y: '15%', color: '#FFD600', delay: 0.5 },
            { x: '72%', y: '18%', color: '#FF47B5', delay: 0.9 },
            { x: '18%', y: '68%', color: '#00E676', delay: 1.4 },
            { x: '80%', y: '55%', color: '#FF2D6B', delay: 0.6 },
            { x: '48%', y: '88%', color: '#FFD600', delay: 1.1 },
            { x: '60%', y: '10%', color: '#B832FF', delay: 0.7 },
          ].map((s, i) => <Sparkle key={i} {...s} />)}

          {/* ── Central card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 22 }}
            className="relative z-10 flex flex-col items-center"
            style={{ width: 'min(88vw, 420px)' }}
          >
            {/* Card body */}
            <div
              className="w-full rounded-3xl border-4 overflow-hidden shadow-2xl"
              style={{ background: '#1A2B5E', borderColor: '#FFD600', boxShadow: '0 0 60px rgba(0,184,217,0.5), 0 25px 80px rgba(0,0,0,0.5)' }}
            >
              {/* Top coloured stripe */}
              <div className="flex h-3">
                {['#FF2D6B', '#FFD600', '#00E676', '#B832FF', '#FF6B00', '#FF47B5'].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>

              <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-5">
                {/* Logo badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}
                  className="relative"
                >
                  {/* Glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'radial-gradient(circle, #FFD600 0%, transparent 70%)', filter: 'blur(14px)' }}
                  />
                  <div
                    className="relative rounded-2xl border-4 px-6 py-3 flex flex-col items-center"
                    style={{ borderColor: '#FFD600', background: 'linear-gradient(135deg, #0D1A40 0%, #1A2B5E 100%)' }}
                  >
                    {/* Letter tiles */}
                    <div className="flex gap-2 mb-2">
                      {[
                        { letter: 'L', bg: '#FF2D6B' },
                        { letter: 'T', bg: '#FFD600', text: '#1A2B5E' },
                        { letter: 'M', bg: '#00E676', text: '#1A2B5E' },
                      ].map(({ letter, bg, text }) => (
                        <span
                          key={letter}
                          className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-base"
                          style={{ background: bg, color: text ?? '#fff' }}
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                    <span
                      className="font-display font-black tracking-widest"
                      style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', color: '#FFFFFF', letterSpacing: '0.08em' }}
                    >
                      LENSTALK
                    </span>
                    <span
                      className="font-display font-black tracking-widest"
                      style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', color: '#00B8D9', letterSpacing: '0.08em', marginTop: '-4px' }}
                    >
                      MEDIA
                    </span>
                  </div>
                </motion.div>

                {/* Tagline box */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="rounded-xl px-5 py-2 text-center border-2"
                  style={{ background: 'rgba(0,184,217,0.12)', borderColor: '#FFD600' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Odisha's Premier Creative Agency
                  </p>
                  <p className="font-display font-black text-sm">
                    <span style={{ color: '#FFD600' }}>Strategy</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}> × </span>
                    <span style={{ color: '#00E5FF' }}>Production</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}> × </span>
                    <span style={{ color: '#00E676' }}>Culture</span>
                  </p>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="w-full"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Loading
                    </span>
                    <span className="text-[10px] font-black" style={{ color: '#FFD600' }}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  {/* Track */}
                  <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {/* Bar */}
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #FF2D6B 0%, #FF6B00 20%, #FFD600 40%, #00E676 60%, #00B8D9 80%, #B832FF 100%)',
                        boxShadow: '0 0 12px rgba(255,214,0,0.6)',
                        transition: 'width 0.05s linear',
                      }}
                    />
                  </div>

                  {/* Pulsing dots below bar */}
                  <div className="flex justify-center gap-2 mt-3">
                    {['#FF2D6B', '#FFD600', '#00E676', '#00B8D9', '#B832FF'].map((c, i) => (
                      <motion.span
                        key={i}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
                        className="block w-1.5 h-1.5 rounded-full"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bottom coloured stripe */}
              <div className="flex h-2">
                {['#B832FF', '#FF47B5', '#FF6B00', '#FFD600', '#00E676', '#FF2D6B'].map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }} />
                ))}
              </div>
            </div>

            {/* Powered-by tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: 'rgba(26,43,94,0.7)' }}
            >
              Bhubaneswar · Odisha · India
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
