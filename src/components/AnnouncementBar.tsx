"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const QUOTES = [
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Programs must be written for people to read, and incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
];

export default function AnnouncementBar() {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current && visible) {
                const height = containerRef.current.offsetHeight;
                document.documentElement.style.setProperty('--announcement-height', `${height}px`);
                document.body.style.paddingTop = `${height}px`;
            } else {
                document.documentElement.style.setProperty('--announcement-height', '0px');
                document.body.style.paddingTop = '0px';
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
            document.documentElement.style.setProperty('--announcement-height', '0px');
            document.body.style.paddingTop = '0px';
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <motion.div
            ref={containerRef}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-[100] h-11 overflow-hidden"
            style={{
                background: "rgba(10, 15, 30, 0.98)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 50px rgba(0,0,0,0.8)",
            }}
        >
            {/* Background "Digital Bits" / Particles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
                        animate={{
                            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1 h-1 bg-cyan-500 rounded-full blur-[1px]"
                    />
                ))}
            </div>

            {/* Rainbow animated border glow */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
                <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 via-purple-500 via-cyan-400 to-transparent opacity-80"
                />
            </div>

            {/* Holographic Scanline Light Sweep */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-10 opacity-30"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), rgba(255, 255, 255, 0.6), rgba(34, 211, 238, 0.4), transparent)",
                    width: "40%",
                    transform: "skewX(-20deg)"
                }}
            />

            <div className="relative h-full flex items-center">
                {/* Fixed Label on the left */}
                <div className="absolute left-0 h-full px-5 flex items-center bg-[#050810]/95 z-30 border-r border-white/5 shadow-[15px_0_20px_rgba(0,0,0,0.5)]">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                            filter: ["drop-shadow(0 0 2px #22d3ee)", "drop-shadow(0 0 8px #22d3ee)", "drop-shadow(0 0 2px #22d3ee)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mr-3 text-cyan-400"
                    >
                        <Sparkles size={16} />
                    </motion.div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
                        Daily <span className="text-cyan-400/80">Input</span>
                    </span>
                </div>

                {/* Marquee Content */}
                <div className="flex-1 overflow-hidden h-full flex items-center bg-black/20">
                    <div className="marquee-container flex items-center whitespace-nowrap min-w-full pl-32">
                        <style>{`
                            @keyframes marquee-pulse {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(calc(-50%)); }
                            }
                            .animate-marquee-pulse {
                                animation: marquee-pulse 45s linear infinite;
                            }
                            .animate-marquee-pulse:hover {
                                animation-play-state: paused;
                            }
                        `}</style>
                        <div className="animate-marquee-pulse flex gap-20 items-center">
                            {[...QUOTES, ...QUOTES].map((quote, i) => (
                                <div key={i} className="flex items-center gap-6 group px-4">
                                    <motion.div
                                        animate={{
                                            textShadow: [
                                                "0 0 0px transparent",
                                                "2px 0 2px rgba(255,0,0,0.3), -2px 0 2px rgba(0,255,255,0.3)",
                                                "0 0 0px transparent"
                                            ]
                                        }}
                                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 + Math.random() * 5 }}
                                        className="flex items-center gap-4"
                                    >
                                        <span className="text-sm md:text-base text-slate-200 font-medium group-hover:text-cyan-300 transition-colors tracking-wide">
                                            &ldquo;{quote.text}&rdquo;
                                        </span>
                                        <span className="text-[10px] md:text-xs font-bold text-cyan-500/60 font-mono italic">
                                            // {quote.author}
                                        </span>
                                    </motion.div>

                                    {/* Tech Divider */}
                                    <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1 h-3 bg-cyan-500/50 skew-x-[-20deg]" />
                                        <div className="w-1 h-3 bg-cyan-400 skew-x-[-20deg]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Close Button on the right */}
                <div className="absolute right-0 h-full px-4 flex items-center bg-[#050810]/95 z-30 border-l border-white/5 shadow-[-15px_0_20px_rgba(0,0,0,0.5)]">
                    <button
                        onClick={() => setVisible(false)}
                        className="p-1 px-3 hover:bg-white/5 rounded-full transition-all group text-slate-500 hover:text-cyan-400"
                        aria-label="Close Announcement"
                    >
                        <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
