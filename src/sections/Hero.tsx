"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Mail, Code, Terminal, Cpu, Database, Layers } from 'lucide-react';

const roles = [
    "Pre-Final Year CSE Student",
    "Competitive Programmer (Java)",
    "Web Developer (MERN Stack)",
    "AI/ML Developer"
];

const RotatingRole = ({ role, index }: { role: string, index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [overflow, setOverflow] = useState(0);

    useEffect(() => {
        if (containerRef.current && textRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const textWidth = textRef.current.scrollWidth;
            if (textWidth > containerWidth) {
                setOverflow(textWidth - containerWidth + 20); // Add some padding
            } else {
                setOverflow(0);
            }
        }
    }, [role]);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden flex justify-center lg:justify-start">
            <motion.span
                ref={textRef}
                key={index}
                initial={{ opacity: 0, y: 20, x: 0 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    x: overflow > 0 ? [0, -overflow, 0] : 0
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    y: { duration: 0.4 },
                    opacity: { duration: 0.4 },
                    x: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                    }
                }}
                className="absolute text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 whitespace-nowrap px-4"
            >
                {role}
            </motion.span>
        </div>
    );
};

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3500); // Increased time to allow for marquee reading
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } }
    };

    const floatingIconVariants = {
        animate: (custom: number) => ({
            y: [0, -15, 0],
            rotate: [0, custom % 2 === 0 ? 10 : -10, 0],
            transition: {
                duration: 4 + (custom % 3),
                repeat: Infinity,
                ease: "easeInOut" as any,
                delay: custom * 0.5
            }
        })
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">

                {/* Left Column - Text Content */}
                <motion.div
                    className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-cyan-400 text-sm font-semibold tracking-wider bg-blue-900/10">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        AVAILABLE FOR OPPORTUNITIES
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 w-full">
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]">
                            Vaibhav <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">Pandey</span>
                        </h1>

                        {/* Rotating subtitle with auto-marquee */}
                        <div className="h-12 relative w-full overflow-hidden">
                            <AnimatePresence mode="wait">
                                <RotatingRole key={roleIndex} role={roles[roleIndex]} index={roleIndex} />
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-xl leading-relaxed">
                        Pre-Final Year Computer Science Student passionate about engineering efficient solutions and solving complex algorithmic challenges. Currently focused on building scalable applications and mastering technologies for the professional world.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <a href="#projects" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            <span className="relative z-10">View Projects</span>
                            <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                        </a>

                        <a href="https://drive.google.com/file/u/0/d/1oTOppMXbzDPIRicQrbQ8cpUAEb7md7Ip/view?usp=drivesdk&pli=1" target="_blank" className="px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                            <Download size={18} />
                            Resume
                        </a>

                        <a href="#contact" className="px-8 py-4 glass border-purple-500/30 text-purple-300 font-semibold rounded-full hover:bg-purple-900/30 transition-colors flex items-center gap-2">
                            <Mail size={18} />
                            Contact Me
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
                        {[
                            { label: 'GitHub', url: 'https://github.com/alphacoder-hash' },
                            { label: 'LinkedIn', url: 'https://linkedin.com/in/vaibhav-pandey-4532b8290' }
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-cyan-400 text-sm font-semibold tracking-widest uppercase transition-colors"
                            >
                                {social.label}
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Column - Avatar & Floating Objects */}
                <motion.div
                    className="flex-1 relative hidden lg:flex justify-center items-center w-full h-[500px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {/* Glowing background orbs */}
                    <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
                    <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[80px] translate-x-10 translate-y-10 pointer-events-none" />

                    {/* Main Avatar */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full glass border-4 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.3)] overflow-hidden flex items-center justify-center p-2"
                    >
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <img src="/avatar.png" alt="Vaibhav Pandey" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>

                    {/* Floating Tech Icons */}
                    <motion.div custom={1} variants={floatingIconVariants} animate="animate" className="absolute top-10 left-10 p-4 rounded-2xl glass border border-blue-400/30 text-blue-400 shadow-lg z-20">
                        <Code size={32} />
                    </motion.div>
                    <motion.div custom={2} variants={floatingIconVariants} animate="animate" className="absolute bottom-20 left-4 p-4 rounded-2xl glass border border-purple-400/30 text-purple-400 shadow-lg z-20">
                        <Terminal size={32} />
                    </motion.div>
                    <motion.div custom={3} variants={floatingIconVariants} animate="animate" className="absolute top-20 right-4 p-4 rounded-2xl glass border border-cyan-400/30 text-cyan-400 shadow-lg z-20">
                        <Cpu size={32} />
                    </motion.div>
                    <motion.div custom={4} variants={floatingIconVariants} animate="animate" className="absolute bottom-10 right-10 p-4 rounded-2xl glass border border-indigo-400/30 text-indigo-400 shadow-lg z-20">
                        <Database size={32} />
                    </motion.div>
                    <motion.div custom={5} variants={floatingIconVariants} animate="animate" className="absolute top-1/2 -right-8 p-4 rounded-2xl glass border border-pink-400/30 text-pink-400 shadow-lg z-20">
                        <Layers size={32} />
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
