'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const skills = [
  { name: 'Python', category: 'Analysis', level: 90 },
  { name: 'SQL', category: 'Data', level: 95 },
  { name: 'Pandas', category: 'Analysis', level: 85 },
  { name: 'Power BI', category: 'Viz', level: 92 },
  { name: 'Tableau', category: 'Viz', level: 80 },
  { name: 'Excel', category: 'Tools', level: 98 },
  { name: 'Git', category: 'Tools', level: 75 },
];

export default function SkillsViz() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 100 };

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');

    svg.selectAll('*').remove();

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(skills.map(s => s.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.3);

    // Bars
    svg.selectAll('.bar')
      .data(skills)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', margin.left)
      .attr('y', d => y(d.name)!)
      .attr('height', y.bandwidth())
      .attr('fill', 'var(--accent)')
      .attr('rx', 4)
      .transition()
      .duration(1500)
      .attr('width', d => x(d.level) - margin.left);

    // Labels
    svg.selectAll('.label')
      .data(skills)
      .join('text')
      .attr('class', 'label')
      .attr('x', margin.left - 10)
      .attr('y', d => y(d.name)! + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'var(--foreground)')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .text(d => d.name);

    // Values
    svg.selectAll('.value')
      .data(skills)
      .join('text')
      .attr('class', 'value')
      .attr('y', d => y(d.name)! + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('fill', 'var(--muted-foreground)')
      .style('font-size', '12px')
      .text(d => `${d.level}%`)
      .attr('x', margin.left + 5)
      .transition()
      .duration(1500)
      .attr('x', d => x(d.level) + 10);

  }, []);

  return (
    <section id="skills" className="relative min-h-screen flex items-center py-32 md:py-48 bg-black overflow-hidden">
      {/* Galaxy theme elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.05)_0%,transparent_60%)]" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 1 + 0.5}px`,
              height: `${Math.random() * 1 + 0.5}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-6xl md:text-8xl font-black mb-20 tracking-tighter leading-none">
          Technical <span className="text-white/20 italic">Arsenal</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 glass p-8 rounded-2xl border border-border">
            <svg ref={svgRef} className="w-full h-auto" />
          </div>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Data Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Statistical modeling, hypothesis testing, and deep-dive exploratory data analysis using Python and SQL.
              </p>
            </div>
            <div className="glass p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Visualization
              </h3>
              <p className="text-sm text-muted-foreground">
                Transforming raw data into meaningful stories through interactive dashboards in Power BI and Tableau.
              </p>
            </div>
            <div className="glass p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Modern Tools
              </h3>
              <p className="text-sm text-muted-foreground">
                Proficient in Git for version control and Excel for rapid data modeling and quantitative analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
