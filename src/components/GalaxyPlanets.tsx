'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function GalaxyPlanets() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const planets = [
    // Amethyst Gas Giant
    { size: 220, colors: 'from-[#A78BFA] via-[#4C1D95] to-[#020617]', glow: 'bg-[#8B5CF6]', x: '85%', y: '25%', speed: -120, ring: true },
    // Fiery Exoplanet
    { size: 140, colors: 'from-[#F84824] via-[#78350F] to-[#05070D]', glow: 'bg-[#F84824]', x: '25%', y: '85%', speed: 150, ring: true },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Starry Dust */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Planets */}
      {planets.map((planet, i) => {
        const yOffset = useTransform(scrollYProgress, [0, 1], [0, planet.speed]);
        return (
          <motion.div
            key={i}
            style={{
              width: isMobile ? planet.size * 0.6 : planet.size,
              height: isMobile ? planet.size * 0.6 : planet.size,
              top: planet.y,
              left: planet.x,
              y: yOffset,
            }}
            className="absolute rounded-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 60 + i * 20, // Slow continuous rotation
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-full relative"
            >
              {/* Atmospheric Glow behind planet */}
              <div className={`absolute inset-[-20%] rounded-full ${planet.glow} opacity-20 blur-2xl z-0`} />

            {/* Solid Planet Body */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${planet.colors} shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.9),inset_5px_5px_15px_rgba(255,255,255,0.1)] z-10 border border-white/5 overflow-hidden`}>
              {/* Realistic Texture Overlay */}
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40 z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
            </div>
            
            {/* Planet Ring */}
            {planet.ring && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[15%] border-t-2 border-b border-white/20 rounded-[100%] rotate-[25deg] shadow-[0_0_15px_rgba(255,255,255,0.1)] z-20" />
            )}
            {planet.ring && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[15%] border border-white/5 rounded-[100%] rotate-[25deg] blur-sm z-0 opacity-50" />
            )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
