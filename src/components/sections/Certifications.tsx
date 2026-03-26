'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu } from 'lucide-react';
import dynamic from 'next/dynamic';

const GalaxyPlanets = dynamic(() => import('@/components/GalaxyPlanets'), { ssr: false });

const certs = [
  {
    title: "Microsoft Excel Expert",
    issuer: "Simplilearn",
    date: "DEC 2025",
    id: "VERIFIED_0xSLN"
  },
  {
    title: "Advanced Data Analyst With AI",
    issuer: "Haris & Co",
    date: "2025",
    id: "VERIFIED_0xHAI"
  },
  {
    title: "Advanced SQL Certification",
    issuer: "HackerRank Professional",
    date: "MARCH 2026",
    id: "VERIFIED_0x44D"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-32 bg-[#05070D] overflow-hidden">
      {/* Galaxy Background Theme */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <GalaxyPlanets />
      </div>
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-[2] text-[#f84824]/5">
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(248,72,36,0.04)_0%,transparent_60%)]" />
      </div>

      <div className="w-full mx-auto px-6 lg:px-12 xl:px-24 max-w-[1600px] relative z-10">
        <div className="flex flex-col mb-20 text-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#60A5FA] font-mono text-[10px] tracking-[0.4em] mb-4 uppercase"
          >
            <ShieldCheck size={14} />
            Verified Credentials
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Technical <span className="text-white/50">Validation</span>
          </h2>
        </div>
        
        {/* Widened Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full mx-auto">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-[#0a0d16]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 hover:border-[#f84824]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Scan Line Effect */}
              <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f84824]/20 to-transparent -translate-y-full group-hover:animate-[scan_2s_linear_infinite]" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-[#f84824]/5 border border-[#f84824]/10 text-[#f84824]">
                    <Award size={24} />
                  </div>
                  <div className="text-[10px] font-mono text-[#f84824]/50 group-hover:text-[#f84824] transition-colors">
                    {cert.id}
                  </div>
                </div>

                <h3 className="font-black text-xl mb-2 tracking-tight line-height-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-neutral-500 font-bold mb-6">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600">
                    <Cpu size={12} />
                    ISSUE_DATE
                  </div>
                  <span className="text-xs font-black text-white px-3 py-1 bg-white/[0.03] rounded-md tracking-widest border border-white/5 uppercase">
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Hologram Background Accent */}
              <div className="absolute -bottom-8 -right-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                <Award size={160} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
