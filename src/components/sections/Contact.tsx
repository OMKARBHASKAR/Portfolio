'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const marqueeText = "OMKAR BHASKAR PAWAR ".repeat(6);
  
  return (
    <section id="contact" className="relative bg-black pt-40 overflow-hidden">
      {/* Galaxy Ambiance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(248,72,36,0.05)_0%,transparent_70%)] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[#f84824] font-mono text-[10px] tracking-[0.5em] mb-8 uppercase"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#f84824] animate-pulse" />
            INITIATE CONTACT
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black tracking-tight max-w-5xl leading-[0.9] mb-12"
          >
            Ready to <span className="text-white/40 italic">Architect</span> Your Data <span className="text-[#f84824] outline-text">Journey?</span>
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.a 
              href="https://wa.link/bk275q"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-black tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Get in Touch
              <ArrowUpRight size={20} />
            </motion.a>
            
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/omkar-bhaskar" 
                target="_blank"
                className="p-5 glass rounded-full border border-white/10 hover:border-[#f84824] hover:text-[#f84824] transition-all duration-500"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/OMKARBHASKAR" 
                target="_blank"
                className="p-5 glass rounded-full border border-white/10 hover:border-[#f84824] hover:text-[#f84824] transition-all duration-500"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Cinematic Footer Marquee */}
      <div className="relative z-10 w-full border-t border-white/5 pt-20 bg-neutral-950/20 backdrop-blur-sm">
        <div className="overflow-hidden whitespace-nowrap pb-10">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <span 
              className="text-[12rem] md:text-[22rem] font-black text-white/5 select-none tracking-tighter inline-block pr-20 uppercase"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.03)' }}
            >
              {marqueeText}
            </span>
          </motion.div>
        </div>
        
        {/* Footer bottom bar */}
        <div className="border-t border-white/5 py-10 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-mono text-neutral-600 tracking-widest">
              © 2024 OMKAR PAWAR // ALL_RIGHTS_RESERVED
            </div>
            <div className="flex gap-10 text-[10px] font-black text-neutral-400 tracking-widest uppercase">
              <a href="#" className="hover:text-[#f84824] transition-colors">Back to Top</a>
              <div className="text-neutral-800">|</div>
              <div>Available for Hire</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1.5px #f84824;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
