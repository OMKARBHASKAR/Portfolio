'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function InteractiveStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    class Star {
      x: number;
      y: number;
      originX: number;
      originY: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      baseAlpha: number;
      alpha: number;
      angle: number;
      driftSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.originX = this.x;
        this.originY = this.y;
        this.size = Math.random() * 1.5 + 0.5; // 0.5px to 2px
        this.color = Math.random() > 0.85 ? '#60A5FA' : '#FFFFFF'; // Subtle blue accent
        this.vx = 0;
        this.vy = 0;
        this.baseAlpha = Math.random() * 0.4 + 0.2; // 0.2 to 0.6
        this.alpha = this.baseAlpha;
        this.angle = Math.random() * Math.PI * 2;
        this.driftSpeed = Math.random() * 0.15 + 0.05;
      }

      update(mouseX: number, mouseY: number) {
        // Twinkle subtle breathing
        this.angle += 0.015;
        this.alpha = this.baseAlpha + Math.sin(this.angle) * 0.15;

        // Mouse interaction scatter logic
        if (mouseX !== -1000 && mouseY !== -1000) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const interactionRadius = 220; // Shatter range
          if (distance < interactionRadius) {
            // Apply repulsion force proportional to closeness
            const force = (interactionRadius - distance) / interactionRadius;
            this.vx -= (dx / distance) * force * 0.8;
            this.vy -= (dy / distance) * force * 0.8;
          }
        }

        // Apply natural momentum decay
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94; // Friction
        this.vy *= 0.94;

        // Apply constant slow space drift mapped to origin so spring doesn't fight it completely
        this.originX -= this.driftSpeed;
        if (this.originX < 0) {
          this.originX = canvas!.width;
          this.x = this.originX;
        }

        // Spring back to flowing origin
        const dx2 = this.originX - this.x;
        const dy2 = this.originY - this.y;
        this.vx += dx2 * 0.015;
        this.vy += dy2 * 0.015;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Render crisp circular stars
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const initStars = () => {
      stars = [];
      const numStars = window.innerWidth < 768 ? 150 : 350;
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    resize();

    const loop = () => {
      // Clear with dark transparent layer for slight motion trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.update(mouseX, mouseY);
        star.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className="absolute inset-0 bg-[#05070D]" />;
  }

  // Pure canvas behind all hero elements
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
