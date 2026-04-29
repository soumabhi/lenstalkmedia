import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PokemonCard from './PokemonCard';

gsap.registerPlugin(ScrollTrigger);

const bgColors = ["#64a546ff", "#15559c", "#f97a47", "#7b503f"];
const textColors = ["#eafde4ff", "#e8f3ff", "#fff3e8", "#fff3e8"];

interface Slide {
  id: number;
  bg: string;
  textColor: string;
  panelBackground: string;
  title: string;
  cardTitle: string;
  attack1: { name: string; damage: string };
  attack2: { name: string; desc: string; damage: string };
  bgGradient: string;
  innerGradient: string;
  typeColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bg: bgColors[0],
    textColor: "#1A2B5E",
    panelBackground: "rgba(255, 255, 255, 0.7)",
    title: 'CRAFT',
    cardTitle: 'BRAND STRATEGY',
    attack1: { name: 'Market Analysis', damage: '24h' },
    attack2: { 
      name: 'Identity Design', 
      desc: 'High-impact visual identity that resonates with your core audience.', 
      damage: '90' 
    },
    bgGradient: "linear-gradient(to bottom right, #a7d08c, #64a546)",
    innerGradient: "radial-gradient(circle at center, #cfffbf 20%, #a7d08c 80%)",
    typeColor: "#1A2B5E"
  },
  {
    id: 2,
    bg: bgColors[1],
    textColor: "#FFFFFF",
    panelBackground: "rgba(0, 0, 0, 0.3)",
    title: 'IMPACT',
    cardTitle: 'VISUAL CONTENT',
    attack1: { name: 'Fast Turnaround', damage: '12h' },
    attack2: { 
      name: '4K Production', 
      desc: 'Cinematic storytelling through high-end video and photo production.', 
      damage: '120' 
    },
    bgGradient: "linear-gradient(to bottom right, #5c96d8, #15559c)",
    innerGradient: "radial-gradient(circle at center, #e8f3ff 20%, #5c96d8 80%)",
    typeColor: "#15559c"
  },
  {
    id: 3,
    bg: bgColors[2],
    textColor: "#1A2B5E",
    panelBackground: "rgba(255, 255, 255, 0.75)",
    title: 'VISION',
    cardTitle: 'DIGITAL GROWTH',
    attack1: { name: 'SEO Audit', damage: '7d' },
    attack2: { 
      name: 'Ad Campaigns', 
      desc: 'Data-driven strategies that maximize your ROI and visibility.', 
      damage: '150' 
    },
    bgGradient: "linear-gradient(to bottom right, #fbaf8d, #f97a47)",
    innerGradient: "radial-gradient(circle at center, #fff3e8 20%, #fbaf8d 80%)",
    typeColor: "#f97a47"
  },
  {
    id: 4,
    bg: bgColors[3],
    textColor: "#3D2B1F",
    panelBackground: "rgba(255, 255, 255, 0.15)",
    title: 'STORY',
    cardTitle: 'WEB EXPERIENCE',
    attack1: { name: 'UI/UX Design', damage: '48h' },
    attack2: { 
      name: 'Custom Coding', 
      desc: 'Building immersive digital experiences with modern web technologies.', 
      damage: '200' 
    },
    bgGradient: "linear-gradient(to bottom right, #b48a7b, #7b503f)",
    innerGradient: "radial-gradient(circle at center, #f5e6d3 20%, #b48a7b 80%)",
    typeColor: "#7b503f"
  }
];

const StarSVG = ({ fill, className }: { fill: string; className?: string }) => (
  <svg className={className} width="112" height="166" viewBox="0 0 112 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M56.0115 4.37021C56.0115 47.7972 32.259 83.0018 2.95888 83.0018C1.96598 83.0018 0.979451 82.9613 0 82.8815V83.1223C0.979451 83.0425 1.96598 83.0021 2.95888 83.0021C32.259 83.0021 56.0115 118.207 56.0115 161.634C56.0115 163.099 55.9845 164.555 55.9311 166H56.1038C56.0505 164.555 56.0234 163.099 56.0234 161.634C56.0234 118.207 79.7759 83.0021 109.076 83.0021C110.057 83.0021 111.032 83.0416 112 83.1195V82.8844C111.032 82.9623 110.057 83.0018 109.076 83.0018C79.7759 83.0018 56.0234 47.7972 56.0234 4.37021C56.0234 2.90375 56.0505 1.44667 56.104 0H55.931C55.9844 1.44667 56.0115 2.90375 56.0115 4.37021Z"
      fill={fill}
    />
  </svg>
);

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardRefs.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      // Set initial background and CSS variables for BOTH trigger and mover
      gsap.set([section, container], {
        backgroundColor: bgColors[0],
        '--b': textColors[0]
      });

      // Ensure all cards start fully visible and on top
      gsap.set(cards, { opacity: 1, zIndex: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => '+=' + (container.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          // Force background matching during pin
          onEnter: () => gsap.set(section, { backgroundColor: bgColors[0] }),
          onEnterBack: () => gsap.set(section, { backgroundColor: bgColors[3] })
        }
      });

      // Slide 1 to 2
      tl.to([section, container], {
        backgroundColor: bgColors[1],
        ease: 'none'
      })
      .to(container, {
        x: '-100vw',
        ease: 'none'
      }, '<')
        .to(container, {
          '--b': textColors[1],
          ease: 'none'
        }, '<')
        .to(cards[0], { yPercent: -100, xPercent: -50, rotation: -15, ease: 'none' }, '<')
        .from(cards[1], { yPercent: 100, xPercent: 50, rotation: 15, ease: 'none' }, '<')

        // Slide 2 to 3
        .to([section, container], {
          backgroundColor: bgColors[2],
          ease: 'none'
        })
        .to(container, {
          x: '-200vw',
          ease: 'none'
        }, '<')
        .to(container, {
          '--b': textColors[2],
          ease: 'none'
        }, '<')
        .to(cards[1], { yPercent: 100, xPercent: -50, rotation: 15, ease: 'none' }, '<')
        .from(cards[2], { yPercent: -100, xPercent: 50, rotation: -15, ease: 'none' }, '<')

        // Slide 3 to 4
        .to([section, container], {
          backgroundColor: bgColors[3],
          ease: 'none'
        })
        .to(container, {
          x: '-300vw',
          ease: 'none'
        }, '<')
        .to(container, {
          '--b': textColors[3],
          ease: 'none'
        }, '<')
        .to(cards[2], { scale: 0.5, ease: 'none' }, '<')
        .from(cards[3], { scale: 1.5, ease: 'none' }, '<');

      // Floating animation for cards
      cards.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            y: 15,
            duration: 2 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      });

      // Stars shining (scale pulse)
      const stars = section.querySelectorAll('.star');
      stars.forEach((star, i) => {
        gsap.fromTo(star,
          { scale: 0.8, opacity: 0.4 },
          {
            scale: 1.2,
            opacity: 1,
            duration: 1.5 + (i * 0.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="horizontal w-full h-screen overflow-hidden relative p-0 m-0"
      style={{ backgroundColor: bgColors[0] }}
    >
      <div
        ref={containerRef}
        className="mover flex h-full relative"
        style={{
          width: `${slides.length * 100}vw`,
          backgroundColor: bgColors[0],
          '--b': textColors[0]
        } as React.CSSProperties}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-screen h-full flex-shrink-0 flex items-center justify-center overflow-hidden px-4"
          >
            {/* Content Container */}
            <div className="relative z-20 pointer-events-auto flex flex-col items-center gap-6 sm:gap-8">
              {/* Animated Card Wrapper */}
              <div
                ref={el => { cardRefs.current[index] = el; }}
                style={{ opacity: 1, zIndex: 30, position: 'relative' }}
              >
                <PokemonCard
                  name={slide.cardTitle}
                  hp={99 + index}
                  attack1Name={slide.attack1.name}
                  attack1Damage={slide.attack1.damage}
                  attack2Name={slide.attack2.name}
                  attack2Desc={slide.attack2.desc}
                  attack2Damage={slide.attack2.damage}
                  bgGradient={slide.bgGradient}
                  innerGradient={slide.innerGradient}
                  textColor={slide.textColor}
                  panelBackground={slide.panelBackground}
                  typeColor={slide.typeColor}
                  illustratorInfo={`Illus. LensTalk Media • 0${index + 1}/04`}
                />
              </div>

              {/* Static Button */}
              <button
                onClick={() => navigate('/contact')}
                className="uppercase text-2xl sm:text-3xl font-black px-8 py-4 sm:p-5 border-2 rounded-xl transition-all duration-300 ease-in-out hover:bg-white hover:border-white font-display text-[var(--b)] border-[var(--b)]"
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.color = "#006450";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.color = "var(--b)";
                }}
              >
                contact now
              </button>
            </div>

            <h1
              className="bg-text uppercase text-[25vw] sm:text-[20vw] lg:text-[15vw] font-black font-display pointer-events-none select-none whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 z-10 text-[var(--b)]"
            >
              {slide.title}
            </h1>

            <div className="stars size-full absolute top-0 left-0 pointer-events-none z-0">
              <StarSVG
                className="star absolute size-10 sm:size-16 left-[5%] top-[8%] scale-x-[1.4]"
                fill="var(--b)"
              />
              <StarSVG
                className="star absolute size-8 sm:size-14 left-[90%] top-[85%] scale-x-[1.4]"
                fill="var(--b)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
