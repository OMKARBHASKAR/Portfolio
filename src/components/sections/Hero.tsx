'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';

// Lazy load heavy interactive canvas
const InteractiveStars = lazy(() => import('@/components/InteractiveStars'));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Fade out and scale down hero text on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  // Reveal last line ONLY when scrolling down slightly
  const fadeOnScroll = useTransform(scrollYProgress, [0, 0.05, 0.2], [0, 0, 1]);
  const yOnScroll = useTransform(scrollYProgress, [0, 0.05, 0.2], [30, 30, 0]);

  // Each line fills the full viewport width: font-size ≈ 100vw / (charCount * ~0.6)
  // Updated lines to be 2 massive lines with segments
  // Updated lines for maximum impact and better balance - reduced to fit screen
  const lines = [
    {
      size: "4.2vw",
      tracking: "tracking-tight md:tracking-normal",
      segments: [
        { text: "GOOD ANALYST", color: "text-white/90" },
        { text: "MOVES TO INSIGHTS", gradient: "from-[#60A5FA] via-[#93C5FD] to-[#60A5FA]/60" }
      ]
    },
    {
      size: "4.6vw",
      tracking: "tracking-tighter",
      segments: [
        { text: "GREAT ANALYST", color: "text-white/90" },
        { text: "CONNECTS IT TO DECISION", gradient: "from-[#A78BFA] via-[#C4B5FD] to-[#A78BFA]/60" }
      ]
    }
  ];

  // Calculate cumulative character index for stagger delay
  let charOffset = 0;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen w-full bg-[#05070D] overflow-hidden flex flex-col items-center justify-center font-black"
    >
      {/* ── Interactive Particle Starfield ──────────────────────── */}
      <Suspense fallback={null}>
        <InteractiveStars />
      </Suspense>

      {/* ── Subtle vignette ─────────────────────── */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,13,0.6)_100%)] pointer-events-none" />

      {/* ── Cinematic fine grid grain ───────────────────────────── */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* ── Main Content: Massive Full-Width Typography ──────────── */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full px-[2vw] flex flex-col items-center justify-center select-none"
      >
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="w-full flex justify-center overflow-visible">
            <div
              className={`flex items-center justify-center whitespace-nowrap ${line.tracking || ''}`}
              style={{ lineHeight: 1.1 }}
            >
              {line.segments.map((segment, segmentIdx) => (
                <div key={`${lineIdx}-${segmentIdx}`} className="flex items-center">
                  {/* Space between segments if not the first segment */}
                  {segmentIdx > 0 && <span style={{ fontSize: line.size, width: '0.3em' }}>&nbsp;</span>}
                  
                  {segment.text.split('').map((char, i) => {
                    const isSpace = char === ' ';
                    charOffset++;

                    return (
                      <motion.span
                        key={`${lineIdx}-${segmentIdx}-${i}`}
                        initial={{ opacity: 0, y: 60, filter: 'blur(15px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 1.2,
                          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                          delay: 0.12 + charOffset * 0.012,
                        }}
                        className={`inline-block ${
                          segment.gradient
                            ? `text-transparent bg-clip-text bg-gradient-to-b ${segment.gradient}`
                            : segment.color
                        }`}
                        style={{
                          fontSize: line.size,
                          letterSpacing: '-0.05em',
                          fontFamily: 'var(--font-space-grotesk), sans-serif',
                          width: isSpace ? '0.25em' : undefined,
                        }}
                      >
                        {isSpace ? '\u00A0' : char}
                      </motion.span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll Area Content ─────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Revealed on scroll down */}
        <motion.div
          style={{ opacity: fadeOnScroll, y: yOnScroll }}
          className="mb-6 text-[13px] sm:text-[15px] font-black uppercase text-white/60 tracking-[0.5em] whitespace-nowrap"
        >
          And that&apos;s where I come in.
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#8B5CF6]/80 to-transparent" />
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/40">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
