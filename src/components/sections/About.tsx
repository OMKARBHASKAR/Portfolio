'use client';

import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const GalaxyPlanets = dynamic(() => import('@/components/GalaxyPlanets'), { ssr: false });

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useSpring(0, { stiffness: 30, damping: 15, restDelta: 0.001 });
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
};

export default function About() {
  const skills = [
    "PYTHON", "SQL", "TABLEAU", "POWER BI", "EXCEL", "MACHINE LEARNING", "STATISTICS", "DATA MODELING"
  ];

  return (
    <section id="about" className="relative min-h-screen py-40 md:py-48 bg-[#05070D] overflow-hidden text-white font-sans">
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <GalaxyPlanets />
      </div>
      <div className="w-full mx-auto px-8 md:px-16 xl:px-24 max-w-[1600px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[2px] bg-blue-500" />
                <span className="text-blue-500 font-bold tracking-widest text-sm uppercase">About Me</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-12 tracking-tighter leading-[0.95]">
                Data with <span className="text-cyan-400 italic">purpose</span> <br />
                and precision.
              </h2>

              <div className="space-y-8 text-xl md:text-2xl text-neutral-400 font-medium leading-relaxed max-w-3xl">
                <p>
                  I'm <span className="text-white font-black">Omkar Pawar</span>, a <span className="text-blue-400 font-bold">Data Analytics With AI</span> expert based in India. 
                  I build <span className="text-blue-400 underline decoration-blue-500/30 decoration-4 underline-offset-8">high-velocity data ecosystems</span> that real businesses rely on every day.
                </p>
                <p>
                  I have analyzed and transformed complex datasets — successfully driving <span className="text-white font-black">actionable business intelligence</span> for advanced decision-making. 
                  I'm passionate about clean architecture, scalable analytics, and delivering impactful digital solutions.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <div key={skill} className="px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-300 text-sm font-bold tracking-widest hover:border-[#60A5FA] hover:text-[#60A5FA] hover:scale-105 hover:bg-[#60A5FA]/10 transition-all cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex flex-col items-center"
            >
              {/* Profile Image with Orbit / Ring effect */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 mb-16 mt-8 lg:mt-0">
                {/* Outermost faint ring */}
                <div className="absolute inset-[-12%] rounded-full border border-neutral-800/60" />
                
                {/* Secondary accent ring (partial) with rotation */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-12%] w-[124%] h-[124%]"
                >
                  <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="49" 
                      fill="none" 
                      stroke="#1E90FF" 
                      strokeWidth="0.5" 
                      strokeDasharray="60 250" 
                      className="opacity-80"
                    />
                  </svg>
                  {/* The glowing dot on the ring */}
                  <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-blue-500/30 bg-[#05070D] flex items-center justify-center z-20">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(30,144,255,0.8)]" />
                  </div>
                </motion.div>

                {/* Inner smaller orbiting dot */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-5%] w-[110%] h-[110%]"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 opacity-90 shadow-[0_0_8px_rgba(0,255,198,0.8)]" />
                </motion.div>

                {/* Main circular image with cinematic filters */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-neutral-800 bg-[#0A0A0A] z-10 shadow-[0_0_80px_rgba(0,0,0,0.6)] group/avatar">
                  <Image 
                    src="/omkar.png" 
                    alt="Omkar Pawar - Data Analytics With AI" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                    className="object-cover object-[center_15%] transition-all duration-1000 scale-100 group-hover:scale-105 brightness-[1.05] contrast-[1.1] saturate-[1.05] rounded-full shadow-inner"
                  />
                  {/* Cinematic Thematic Overlays - soft blending */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-[#05070D]/40 pointer-events-none" />
                  <div className="absolute inset-0 ring-4 ring-inset ring-black/20 pointer-events-none" />
                </div>
              </div>

              {/* Stats Row */}
              <div className="w-full flex justify-between items-center px-2 py-8 border-y border-neutral-800/80">
                <div className="text-center">
                  <div className="text-5xl lg:text-7xl font-black text-white flex items-baseline justify-center">
                    <Counter value={1} />
                  </div>
                  <div className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-3">Year Exp.</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl lg:text-7xl font-black text-white flex items-baseline justify-center">
                    <Counter value={10} /><span className="text-blue-500 text-3xl lg:text-4xl">+</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-3">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl lg:text-7xl font-black text-white flex items-baseline justify-center">
                    <Counter value={5} /><span className="text-blue-500 text-3xl lg:text-4xl">+</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-3">Dashboards</div>
                </div>
              </div>

              {/* CV Download Button */}
              <div className="w-full flex justify-center mt-12 mb-4">
                <a 
                  href="/omkar_cv.pdf" 
                  download="Omkar_Pawar_CV.pdf"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#60A5FA]/10 hover:border-[#60A5FA]/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]"
                >
                  <span className="text-[11px] font-black tracking-[0.2em] text-neutral-300 uppercase group-hover:text-[#60A5FA] transition-colors">
                    Download CV
                  </span>
                  <svg className="w-4 h-4 text-neutral-500 group-hover:text-[#60A5FA] transition-all group-hover:-translate-y-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
