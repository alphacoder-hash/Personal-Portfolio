"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ChevronLeft, ChevronRight, Github } from 'lucide-react';

export default function GithubCarousel({ repos }: { repos: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % repos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + repos.length) % repos.length);
    };

    // We show up to 5 items on screen if we have them
    const visibleItems = repos.slice(0, 10); // Take top 10 for the carousel

    if (!repos || repos.length === 0) return null;

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[2000px] overflow-hidden py-10">

            {/* Navigation Controls */}
            <button
                onClick={handlePrev}
                className="absolute left-2 md:left-10 z-50 p-4 rounded-full glass border border-white/10 text-white hover:bg-white/10 hover:border-blue-400 hover:text-blue-400 transition-all focus:outline-none"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 md:right-10 z-50 p-4 rounded-full glass border border-white/10 text-white hover:bg-white/10 hover:border-blue-400 hover:text-blue-400 transition-all focus:outline-none"
            >
                <ChevronRight size={32} />
            </button>

            {/* 3D Carousel Track */}
            <div className="relative w-full max-w-lg h-full flex items-center justify-center transform-style-3d">
                <AnimatePresence initial={false}>
                    {visibleItems.map((repo, idx) => {
                        // Calculate relative offset from current index
                        let offset = idx - currentIndex;

                        // Adjust offset to loop logically around the carousel (e.g. -2, -1, 0, 1, 2)
                        if (offset < -Math.floor(visibleItems.length / 2)) {
                            offset += visibleItems.length;
                        }
                        if (offset > Math.floor(visibleItems.length / 2)) {
                            offset -= visibleItems.length;
                        }

                        // Only render items that are close to the center
                        if (Math.abs(offset) > 2) return null;

                        const isCenter = offset === 0;
                        const xOffset = offset * 250; // Horizontal spacing
                        const zOffset = Math.abs(offset) * -150; // Depth spacing
                        const scale = 1 - Math.abs(offset) * 0.15; // Scale down elements further back
                        const opacity = 1 - Math.abs(offset) * 0.3; // Fade elements further back
                        const rotateY = offset * -15; // Angle them towards the center

                        return (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, x: 0, z: -500 }}
                                animate={{
                                    opacity,
                                    x: xOffset,
                                    z: zOffset,
                                    scale,
                                    rotateY,
                                }}
                                exit={{ opacity: 0, scale: 0.5, z: -500 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    zIndex: visibleItems.length - Math.abs(offset), // Center item on top
                                }}
                                className={`absolute w-full h-full max-h-[350px] p-8 rounded-[2rem] glass border ${isCenter ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-white/10'} flex flex-col justify-between cursor-pointer`}
                                onClick={() => {
                                    if (!isCenter) {
                                        // Click to center this item
                                        setCurrentIndex(idx);
                                    }
                                }}
                            >
                                {/* Background Glow */}
                                <div className={`absolute inset-0 rounded-[2rem] pointer-events-none transition-opacity duration-500 ${isCenter ? 'opacity-100 bg-gradient-to-br from-blue-500/10 to-transparent' : 'opacity-0'}`} />

                                <div className="relative z-10 w-full">
                                    <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-6 border border-white/5 text-slate-100 mb-6 mx-auto">
                                        <Github size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-400 text-center mb-4 line-clamp-2">
                                        {repo.name}
                                    </h3>

                                    <p className="text-slate-400 text-center leading-relaxed line-clamp-3">
                                        {repo.description || "A powerful open-source contribution to the developer ecosystem."}
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1.5 font-medium text-yellow-500/90 text-sm">
                                            <Star size={16} /> {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1.5 font-medium text-emerald-500/90 text-sm">
                                            <GitFork size={16} /> {repo.forks_count}
                                        </span>
                                    </div>
                                    {repo.language && (
                                        <span className="px-3 py-1 bg-white/5 text-xs font-semibold rounded-lg border border-white/10 text-cyan-200">
                                            {repo.language}
                                        </span>
                                    )}
                                </div>

                                {isCenter && (
                                    <div className="absolute -bottom-16 left-0 w-full flex justify-center">
                                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="glass px-6 py-2 rounded-full text-sm font-semibold text-white/90 hover:text-white hover:border-blue-400 transition-colors">
                                            View Source
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

        </div>
    );
}
