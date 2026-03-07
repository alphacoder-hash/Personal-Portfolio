"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SiC, SiCplusplus, SiPython, SiJavascript, SiTypescript, SiHtml5,
    SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiDjango, SiTailwindcss, SiFramer,
    SiNumpy, SiPandas, SiScikitlearn, SiTensorflow,
    SiMysql, SiMongodb, SiPostgresql, SiGit, SiDocker, SiLinux
} from 'react-icons/si';
import { FaJava, FaAws, FaCss3Alt, FaBrain, FaServer, FaCode, FaLayerGroup } from 'react-icons/fa';

const categories = [
    { id: "all", label: "All Arsenal", icon: FaLayerGroup },
    { id: "languages", label: "Languages", icon: FaCode },
    { id: "frameworks", label: "Frameworks", icon: SiReact },
    { id: "ai", label: "AI & Data", icon: FaBrain },
    { id: "infrastructure", label: "Infrastructure & Tools", icon: FaServer },
];

const skillsData = [
    { name: "Python", category: "languages", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", category: "languages", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", category: "languages", icon: SiTypescript, color: "#3178C6" },
    { name: "C++", category: "languages", icon: SiCplusplus, color: "#00599C" },
    { name: "Java", category: "languages", icon: FaJava, color: "#007396" },
    { name: "C", category: "languages", icon: SiC, color: "#A8B9CC" },
    { name: "HTML5", category: "languages", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", category: "languages", icon: FaCss3Alt, color: "#1572B6" },

    { name: "React.js", category: "frameworks", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", category: "frameworks", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Node.js", category: "frameworks", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", category: "frameworks", icon: SiExpress, color: "#FFFFFF" },
    { name: "Django", category: "frameworks", icon: SiDjango, color: "#092E20" },
    { name: "Tailwind CSS", category: "frameworks", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Framer Motion", category: "frameworks", icon: SiFramer, color: "#0055FF" },

    { name: "TensorFlow", category: "ai", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Scikit-learn", category: "ai", icon: SiScikitlearn, color: "#F7931E" },
    { name: "Pandas", category: "ai", icon: SiPandas, color: "#150458" },
    { name: "NumPy", category: "ai", icon: SiNumpy, color: "#013243" },

    { name: "AWS", category: "infrastructure", icon: FaAws, color: "#FF9900" },
    { name: "Docker", category: "infrastructure", icon: SiDocker, color: "#2496ED" },
    { name: "PostgreSQL", category: "infrastructure", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", category: "infrastructure", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", category: "infrastructure", icon: SiMysql, color: "#4479A1" },
    { name: "Git", category: "infrastructure", icon: SiGit, color: "#F05032" },
    { name: "Linux", category: "infrastructure", icon: SiLinux, color: "#FCC624" },
];

export default function Skills() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredSkills = activeTab === "all"
        ? skillsData
        : skillsData.filter(skill => skill.category === activeTab);

    return (
        <section id="skills" className="py-20 relative z-10 w-full overflow-hidden bg-slate-950/50">
            {/* Background Ambient Effects */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Arsenal</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        An interactive constellation of technologies I leverage to build highly scalable systems and intelligent applications.
                    </p>
                </motion.div>

                {/* Interactive Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeTab === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 z-10 overflow-hidden ${isActive ? "text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <Icon className={`text-lg ${isActive ? "animate-pulse" : ""}`} />
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                {/* Auto-Scrolling Filterable Marquee */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] min-h-[300px] group/marquee py-4">
                    <style>{`
                        @keyframes scroll-skills {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(calc(-50% - 12px)); }
                        }
                        .animate-marquee-skills {
                            animation: scroll-skills 40s linear infinite;
                        }
                    `}</style>
                    <motion.div layout className="flex w-max gap-6 animate-marquee-skills hover:[animation-play-state:paused]">
                        <AnimatePresence mode="popLayout">
                            {[...filteredSkills, ...filteredSkills].map((skill, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    transition={{
                                        duration: 0.4,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                        delay: (index % filteredSkills.length) * 0.05 // Staggered entry
                                    }}
                                    key={`${skill.name}-${index}`}
                                    className="group relative shrink-0 w-44 md:w-52 h-44 md:h-52"
                                >
                                    {/* Floating Animation Wrapper */}
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{
                                            duration: 3 + Math.random() * 2, // Randomize float speed slightly out of sync
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="h-full"
                                    >
                                        <div className="relative flex flex-col items-center justify-center p-6 h-full bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-700/50 hover:border-transparent transition-all duration-300 cursor-pointer overflow-hidden z-10">

                                            {/* Dynamic Glow Background specific to skill color */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0"
                                                style={{ background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)` }}
                                            />

                                            {/* Animated Neon Border */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 border-2 rounded-2xl"
                                                style={{ borderColor: skill.color, boxShadow: `inset 0 0 20px ${skill.color}40, 0 0 20px ${skill.color}40` }}
                                            />

                                            <skill.icon
                                                className="text-5xl mb-4 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                                                style={{ color: skill.color }}
                                            />
                                            <span className="text-sm font-bold text-slate-300 group-hover:text-white z-10 text-center">
                                                {skill.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
