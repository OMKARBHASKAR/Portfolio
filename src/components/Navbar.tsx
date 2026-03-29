'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 md:top-8 inset-x-4 md:inset-x-8 z-40 pointer-events-none opacity-100 flex justify-between items-start">
      <div className="pointer-events-auto">
        
        {/* Left-aligned Navbar */}
        <div className={`
          flex items-center gap-6 px-4 md:px-8 py-3 transition-all duration-500 bg-transparent
        `}>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.filter(link => link.name !== 'Contact').map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-black uppercase tracking-widest text-white hover:text-white/80 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Top Right Contact Link */}
      <div className="hidden md:block pointer-events-auto px-8 py-3">
        <a
          href="#contact"
          className="text-sm font-black uppercase tracking-widest text-white hover:text-white/80 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300"
        >
          Contact
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12 md:hidden"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold tracking-tighter text-white hover:text-white/80 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
