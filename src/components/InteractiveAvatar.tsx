'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function InteractiveAvatar() {
  const prefersReducedMotion = useReducedMotion();

  // ── Motion values ──────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fluid spring — slow, natural, not snappy
  const springCfg = { damping: 35, stiffness: 90, mass: 1.2 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  // Map normalised [-0.5, 0.5] → ±8 deg
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  // ── Blink state ────────────────────────────────────────────────
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleBlink = useCallback(() => {
    const delay = 1800 + Math.random() * 700; // 1800–2500 ms
    blinkTimer.current = setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleBlink(); // chain next blink
      }, 150 + Math.random() * 50); // 150–200 ms duration
    }, delay);
  }, []);

  // ── Throttled mouse handler ────────────────────────────────────
  const throttleFlag = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttleFlag.current) return;
    throttleFlag.current = true;
    setTimeout(() => { throttleFlag.current = false; }, 16); // ~60fps cap

    mouseX.set((e.clientX / window.innerWidth) - 0.5);
    mouseY.set((e.clientY / window.innerHeight) - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    scheduleBlink();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, [prefersReducedMotion, handleMouseMove, handleMouseLeave, scheduleBlink]);

  // ── Idle breathing (disabled when reduced-motion) ─────────────
  const idleAnim = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -8, 0], scale: [1, 1.012, 1] },
        transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
      };

  return (
    <div
      style={{ perspective: '1200px' }}
      className="relative w-full h-[480px] lg:h-[680px] flex items-center justify-center select-none"
    >
      {/* ── Multi-layer radial glow — blends into #05070D bg ──── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        {/* outer soft halo */}
        <div
          className="absolute"
          style={{
            width: '90%',
            height: '90%',
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* mid purple core */}
        <div
          className="absolute"
          style={{
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.30) 0%, rgba(139,92,246,0.08) 55%, transparent 75%)',
            filter: 'blur(24px)',
            mixBlendMode: 'screen',
          }}
        />
        {/* inner cyan accent glint */}
        <div
          className="absolute translate-y-6"
          style={{
            width: '35%',
            height: '35%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.22) 0%, transparent 70%)',
            filter: 'blur(18px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* ── 3D reactive wrapper ─────────────────────────────────── */}
      <motion.div
        style={
          prefersReducedMotion
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        {...idleAnim}
        className="relative w-full h-full z-10 drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)]"
      >
        {/* Avatar image */}
        <Image
          src="/avatar_3d.png"
          alt="Interactive 3D avatar — Omkar Pawar"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-contain"
          draggable={false}
        />

        {/* ── Blink overlay — full-width eyelid strip ─────────── */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              // sits over the upper ~30% of the avatar where the eyes are
              background: 'linear-gradient(to bottom, #05070D 0%, #05070D 100%)',
              originY: 0,
              top: '22%',
              height: '14%',
              borderRadius: '0 0 50% 50% / 0 0 100% 100%',
            }}
            animate={{ scaleY: isBlinking ? 1 : 0 }}
            transition={{ duration: 0.09, ease: 'easeIn' }}
          />
        )}
      </motion.div>
    </div>
  );
}
