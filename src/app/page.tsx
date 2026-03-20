import { Suspense } from "react";
import Hero from "@/sections/Hero";
import CodolioDashboard from "@/sections/CodolioDashboard";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import GithubSection from "@/sections/GithubSection";

import Projects from "@/sections/Projects";
import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";
import LinkedInSection from "@/sections/LinkedInSection";

export const dynamic = 'force-dynamic';

// Fallback loading component
function LoadingFallback() {
  return (
    <div className="py-20 px-6 relative z-10 w-full overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="glass p-10 rounded-[2rem] border border-slate-800 animate-pulse">
          <div className="h-12 bg-slate-700 rounded-lg mb-4 w-1/3"></div>
          <div className="h-6 bg-slate-700 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden w-full">
      {/* Hero - First Impression (Critical - No Suspense) */}
      <Hero />
      
      {/* About Me - Professional Summary (Recruiter Hook) */}
      <About />
      
      {/* Skills - Technical Arsenal */}
      <Skills />
      
      {/* Projects - Showcase Work */}
      <Projects />
      
      {/* Achievements - Credibility & Recognition */}
      <Achievements />
      
      {/* Coding Profile - Competitive Programming & Coding Stats (Lazy Load) */}
      <Suspense fallback={<LoadingFallback />}>
        <CodolioDashboard />
      </Suspense>
      
      {/* GitHub - Open Source Contributions (Lazy Load) */}
      <Suspense fallback={<LoadingFallback />}>
        <GithubSection />
      </Suspense>
      
      {/* LinkedIn - Professional Network (Lazy Load) */}
      <Suspense fallback={<LoadingFallback />}>
        <LinkedInSection />
      </Suspense>
      
      {/* Contact - Call to Action */}
      <Contact />
    </div>
  );
}
