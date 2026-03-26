'use client';

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Briefcase, Building2, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Experience() {
  const data = [
    {
      title: "2026",
      content: (
        <div className="group relative">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <TrendingUp size={18} />
             </div>
             <h4 className="text-2xl font-black text-white tracking-tight">Freelance Data Analyst</h4>
          </div>

          <div className="flex items-center gap-4 text-neutral-400 font-bold text-xs uppercase tracking-widest mb-6">
             <span className="flex items-center gap-1.5"><Building2 size={12} className="text-cyan-500" /> Independent</span>
             <span className="flex items-center gap-1.5"><Calendar size={12} className="text-cyan-500" /> March 2026 - Present</span>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 mb-8">
            <p className="text-neutral-400 text-base leading-relaxed mb-6 italic">
              "Omkar transformed our raw sales data into a strategic asset. His dashboards are now used weekly by our executive team for global oversight."
            </p>
            <div className="space-y-3">
               {[
                 "Engineered high-fidelity Sales & Revenue dashboards.",
                 "Automated DAX-powered reporting systems in Power BI.",
                 "Reduced monthly reporting time by over 15 hours."
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-sm font-semibold text-neutral-500">
                    <CheckCircle2 size={14} className="text-cyan-400" /> {item}
                 </div>
               ))}
            </div>
          </div>

          <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10">
             <Image 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
              alt="Strategic Reporting"
              fill
              className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
             />
             <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Project_Highlight // Global Revenue Tracking</span>
             </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="group relative">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Briefcase size={18} />
             </div>
             <h4 className="text-2xl font-black text-white tracking-tight">Data Analyst Intern</h4>
          </div>
          
          <div className="flex items-center gap-4 text-neutral-400 font-bold text-xs uppercase tracking-widest mb-6">
             <span className="flex items-center gap-1.5"><Building2 size={12} className="text-blue-500" /> Elevate Labs</span>
             <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500" /> October 2025 - December 2025</span>
          </div>

          <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-2xl bg-white/[0.02] p-6 rounded-3xl border border-white/5">
            Architecting automated <span className="text-blue-400 font-bold">data integrity pipelines</span> using Python and SQL, remediating critical data quality bottlenecks to ensure high-fidelity analytics across cross-functional business units. 
            Leveraging advanced EDA to surface actionable trends and anomalies, directly informing enterprise-level reporting strategies. 
            Engineered dynamic Power BI ecosystems featuring real-time KPI orchestration, effectively replacing legacy manual reporting with an <span className="text-cyan-400 font-bold">automated executive intelligence hub</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="Data Visualization"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
            </div>
            <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
                alt="Business Analytics"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="bg-[#05070D] w-full border-t border-white/5">
      <Timeline data={data} />
    </section>
  );
}
