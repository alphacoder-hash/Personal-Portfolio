import Hero from "@/sections/Hero";
import CodolioDashboard from "@/sections/CodolioDashboard";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import GithubSection from "@/sections/GithubSection";

import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden w-full">
      <Hero />
      <CodolioDashboard />
      <About />
      <Skills />
      <GithubSection />

      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}
