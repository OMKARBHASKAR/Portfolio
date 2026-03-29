'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, BarChart3, CloudSun, Users, Film } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "FreeStyle Libre Sales",
    category: "Retail Analytics",
    description: "Deep-dive analysis of retail sales and revenue performance for medical devices.",
    impact: "Optimized inventory distribution based on seasonal demand.",
    tools: ["Power BI", "SQL", "DAX"],
    icon: <BarChart3 className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/OMKARBHASKAR/FreeStyle-Libre-December-Month-Sales-Revenue-Overview"
  },
  {
    title: "Movie Recommendation",
    category: "Machine Learning",
    description: "A content-based recommendation system that suggests movies based on similarity metrics.",
    impact: "Engineered a vector-space model for high-accuracy user profiling.",
    tools: ["Python", "Scikit-learn", "NLTK"],
    icon: <Film className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/OMKARBHASKAR/OMKARBHASKAR-OMKARBHASKAR-Movie-recommendation-system.git"
  },
  {
    title: "Weather Intelligence",
    category: "Environmental",
    description: "Real-time system for weather forecasting and air quality reporting.",
    impact: "Enabled predictive alerts for hazardous air quality levels.",
    tools: ["Python", "APIs", "Data Viz"],
    icon: <CloudSun className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/OMKARBHASKAR/Weather-Intelligence-Dashboard-Forecast-Air-Quality-Environmental-Monitoring"
  },
  {
    title: "Customer Segmentations",
    category: "Predictive",
    description: "Advanced clustering analysis to identify distinct customer personas.",
    impact: "Improved ROI by 15% through data-driven targeting.",
    tools: ["Python", "Scikit", "K-Means"],
    icon: <Users className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    link: "https://github.com/OMKARBHASKAR/Customer-Segementaions"
  }
];

const ProjectSpark = ({ values }: { values: number[] }) => (
  <div className="flex items-end gap-1 h-6">
    {values.map((v, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${v}%` }}
        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
        className="w-1 bg-blue-500/40 rounded-t-sm"
      />
    ))}
  </div>
);

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal translation
  // Adjusted for 4 items: "-75%" roughly handles the movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-[#05070D]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Text Overlay */}
        <div className="absolute top-20 left-10 z-0 pointer-events-none opacity-5">
           <h2 className="text-[20vw] font-black uppercase leading-none tracking-tighter">
              Projects
           </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-12 px-[5vw] md:px-[10vw]">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[50vh] md:h-[70vh] rounded-[2rem] md:rounded-[3rem] bg-neutral-900 border border-white/5 overflow-hidden shadow-2xl transition-all duration-700"
            >
              {/* Project Image */}
              <div className="absolute inset-0 z-0 bg-[#05070D]">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-1000 group-hover:scale-110 opacity-65 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/80 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end backdrop-blur-[2px]">
                <div className="max-w-xl">
                  {/* Category Badge */}
                  <div className="mb-4 md:mb-6">
                    <span className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter group-hover:text-cyan-400 transition-colors duration-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>

                  <p className="text-neutral-300 text-lg md:text-xl font-medium leading-relaxed mb-8 line-clamp-3 md:line-clamp-none">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                         <ProjectSpark values={[30, 60, 45, 80, 55]} />
                         <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Analysis_Stream</span>
                       </div>
                       <div className="hidden md:flex gap-2">
                          {project.tools.map(tool => (
                             <span key={tool} className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                                {tool}
                             </span>
                          ))}
                       </div>
                    </div>

                    <a 
                      href={project.link}
                      target="_blank"
                      className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                      <ArrowUpRight size={24} strokeWidth={3} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer at end */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>
      </div>
      
      {/* Background Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
