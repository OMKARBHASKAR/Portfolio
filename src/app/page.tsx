import Hero from "@/components/sections/Hero";
import Navbar from '@/components/Navbar';
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import GalaxyPlanets from '@/components/GalaxyPlanets';

export default function Home() {
  return (
    <main className="relative bg-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
