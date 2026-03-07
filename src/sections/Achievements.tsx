"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Zap, Cloud, Server, Brain, ExternalLink, Star, Flame, CheckCircle2, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const hackathons = [
    { title: "Smart India Hackathon 2025", result: "Institute Level Qualifier", venue: "Parul Institute of Technology", color: "#f59e0b", icon: Trophy, rank: "01", tag: "Qualifier" },
    { title: "Ignita Startup Fest 2025", result: "Top 25 Startup Pitches", venue: "Nationwide Competition", color: "#a855f7", icon: Flame, rank: "02", tag: "Top 25" },
    { title: "PU Code Hackathon 3.0 (2026)", result: "Grand Finale Selection", venue: "Parul University", color: "#06b6d4", icon: Zap, rank: "03", tag: "Finalist" },
    { title: "PU Code Hackathon 2.0 (2025)", result: "Grand Finale Selection", venue: "Parul University", color: "#3b82f6", icon: Zap, rank: "04", tag: "Finalist" },
    { title: "AI/ML Hackathon 2.0", result: "Selected Participant", venue: "Hackathon", color: "#10b981", icon: Brain, rank: "05", tag: "Selected" },
    { title: "Intel Unnati Industrial Training", result: "Selected for Training", venue: "Intel", color: "#2563eb", icon: Cpu, rank: "06", tag: "Selected" },
];

const certifications = [
    { name: "The Web Developer Bootcamp 2025", issuer: "Udemy", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg", icon: Server, color: "#a435f0", url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-48dd8044-c343-4064-8388-b007a3a6d181.pdf", year: "2024", tag: "Web Development", skills: ["MongoDB", "Express", "React", "Node.js", "JavaScript"] },
    { name: "Complete Data Science & ML", issuer: "Udemy", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg", icon: Brain, color: "#a435f0", url: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-8f2825cc-d403-40fb-81db-a003e0ac0d0a.pdf", year: "2024", tag: "Data Science & AI", skills: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "NLP"] },
    { name: "AI Fundamentals", issuer: "Cisco NetAcad", logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg", icon: Cpu, color: "#1ba0d7", url: "https://www.credly.com/earner/earned/badge/ce22200d-92e2-48bf-8a33-608c272b3fb9", year: "2024", tag: "Artificial Intelligence", skills: ["Neural Networks", "Deep Learning", "IBM SkillsBuild"] },
    { name: "Cloud Foundations Graduate", issuer: "AWS Academy", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", icon: Cloud, color: "#ff9900", url: "https://www.credly.com/badges/2ec21372-b0de-43a2-beb9-614e350f998b/public_url", year: "2023", tag: "Cloud Computing", skills: ["AWS EC2", "S3", "IAM", "VPC Architecture"] },
    { name: "Smart Coder Silver Certificate", issuer: "Smart Interviews", logoText: "SI", icon: Award, color: "#34d399", url: "https://smartinterviews.in/certificate/bda5986e?trk=public_profile_see-credential", year: "2024", tag: "Competitive Programming", skills: ["Data Structures", "Algorithms", "Dynamic Programming"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hackathon banner card
// ─────────────────────────────────────────────────────────────────────────────

function HackCard({ item, idx }: { item: typeof hackathons[number]; idx: number }) {
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative rounded-2xl overflow-hidden cursor-default"
            style={{
                background: `linear-gradient(120deg, #0f172a 55%, ${item.color}10)`,
                border: `1px solid ${hovered ? item.color + "55" : "rgba(255,255,255,0.07)"}`,
                boxShadow: hovered ? `0 0 36px ${item.color}28, inset 0 0 24px ${item.color}08` : "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
            }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ x: hovered ? "110%" : "-110%" }}
                initial={{ x: "-110%" }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}20, transparent)`, width: "55%" }}
            />
            <div className="relative z-10 flex items-center gap-5 px-7 py-6">
                <div className="shrink-0 text-6xl font-black font-sans tracking-tight tabular-nums leading-none select-none"
                    style={{ color: "transparent", WebkitTextStroke: `1.5px ${item.color}45` }}>
                    {item.rank}
                </div>
                <motion.div
                    animate={{ rotate: hovered ? 360 : 0 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border"
                    style={{ background: `${item.color}18`, borderColor: `${item.color}50`, color: item.color, boxShadow: hovered ? `0 0 18px ${item.color}50` : "none", transition: "box-shadow 0.3s" }}
                >
                    <Icon size={22} />
                </motion.div>
                <div className="flex-1 min-w-0 font-sans">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2"
                        style={{ background: `${item.color}18`, color: item.color }}>
                        {item.tag}
                    </span>
                    <div className="text-lg font-bold text-slate-100 leading-tight tracking-tight">{item.title}</div>
                    <div className="text-sm font-semibold mt-1" style={{ color: item.color }}>{item.result}</div>
                    <div className="text-sm text-slate-400 mt-0.5">{item.venue}</div>
                </div>
                <motion.div animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }} transition={{ duration: 0.2 }}
                    className="shrink-0" style={{ color: item.color }}>
                    <CheckCircle2 size={22} />
                </motion.div>
            </div>
            <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]"
                animate={{ scaleX: hovered ? 1 : 0 }} initial={{ scaleX: 0 }} transition={{ duration: 0.35 }}
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, originX: 0.5 }}
            />
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Spotlight Carousel
// ─────────────────────────────────────────────────────────────────────────────

function SpotlightCarousel() {
    const [active, setActive] = useState(0);
    const [dir, setDir] = useState<1 | -1>(1);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const n = certifications.length;

    const go = (next: number, d: 1 | -1) => {
        setDir(d);
        setActive((next + n) % n);
    };

    const restart = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => { setDir(1); setActive(a => (a + 1) % n); }, 3500);
    };

    useEffect(() => {
        restart();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [n]);

    // Protection against hot-reload array size shrinks
    const activeIndex = active >= n ? 0 : active;
    const cert = certifications[activeIndex] || certifications[0];
    const Icon = cert.icon || Cpu;

    // Positions: prev (left) | active (center) | next (right)
    const prev = (activeIndex - 1 + n) % n;
    const next = (activeIndex + 1) % n;

    // Helper to render brand logo or fallback icon inside the containers
    const renderLogo = (item: typeof certifications[number], size = 28) => {
        if (item.logo) {
            return (
                <div className="relative flex items-center justify-center p-1.5 w-full h-full bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.logo} alt={item.issuer} className="w-full h-full object-contain" />
                </div>
            );
        }
        if (item.logoText) {
            return (
                <div className="relative flex items-center justify-center w-full h-full bg-white text-black font-bold font-sans tracking-tighter text-lg">
                    {item.logoText}
                </div>
            );
        }
        return React.createElement(item.icon, { size });
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.75, rotateY: d > 0 ? 25 : -25 }),
        center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
        exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.75, rotateY: d > 0 ? -25 : 25 }),
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full" style={{ perspective: "1000px" }}>

            {/* Spotlight beam above card */}
            <div className="relative w-full flex items-center justify-center -ml-12" style={{ height: 380 }}>

                {/* Left ghost */}
                <div
                    className="absolute left-0 rounded-2xl overflow-hidden cursor-pointer opacity-35 scale-[0.78] transition-all duration-300 hover:opacity-55 z-0"
                    style={{
                        width: 260, height: 350,
                        background: "#0f172a",
                        border: `1px solid ${certifications[prev].color}30`,
                        transform: "scale(0.8) translateX(50px)",
                        filter: "blur(1.5px)",
                    }}
                    onClick={() => { go(prev, -1); restart(); }}
                >
                    <div className="h-[2px]" style={{ background: certifications[prev].color }} />
                    <div className="p-5 flex flex-col gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden">
                            {renderLogo(certifications[prev], 16)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-white/5"
                                style={{ borderColor: `${certifications[prev].color}50`, color: certifications[prev].color }}>
                                {certifications[prev].tag}
                            </span>
                        </div>
                        <div className="text-base font-bold text-slate-200 font-sans tracking-tight">{certifications[prev].name}</div>
                    </div>
                </div>

                {/* Center spotlight glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${cert.color}35 0%, transparent 70%)` }} />

                {/* Active card */}
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={activeIndex}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        className="relative z-10 rounded-2xl overflow-hidden"
                        style={{
                            width: 280,
                            height: 380,
                            background: `linear-gradient(155deg, ${cert.color}20, #0f172a 60%)`,
                            border: `1px solid ${cert.color}70`,
                            boxShadow: `0 0 50px ${cert.color}35, 0 20px 60px rgba(0,0,0,0.6), inset 0 0 30px ${cert.color}10`,
                        }}
                    >
                        {/* Top bar */}
                        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />

                        {/* Shimmer sweep */}
                        <motion.div
                            initial={{ x: "-120%" }}
                            animate={{ x: "120%" }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: `linear-gradient(90deg, transparent, ${cert.color}20, transparent)`, width: "40%", skewX: "-10deg" }}
                        />

                        <div className="p-5 flex flex-col h-full">
                            {/* Icon + year */}
                            <div className="flex items-center justify-between mb-4">
                                <motion.div
                                    initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                    className="w-14 h-14 rounded-xl flex items-center justify-center border-2 bg-white/5 overflow-hidden"
                                    style={{ borderColor: `${cert.color}40`, boxShadow: `0 0 20px ${cert.color}30` }}
                                >
                                    {renderLogo(cert)}
                                </motion.div>
                                <span className="text-xs font-black px-3 py-1 rounded-full border"
                                    style={{ borderColor: `${cert.color}50`, color: cert.color, background: `${cert.color}15` }}>
                                    {cert.year}
                                </span>
                            </div>

                            {/* Issuer and Field Tag */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-black uppercase tracking-widest font-sans" style={{ color: cert.color }}>{cert.issuer}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-white/5"
                                    style={{ borderColor: `${cert.color}50`, color: cert.color }}>
                                    {cert.tag}
                                </span>
                            </div>

                            {/* Name */}
                            <div className="text-2xl font-bold text-slate-100 leading-snug mb-4 font-sans tracking-tight">{cert.name}</div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mb-auto font-sans">
                                {cert.skills.map(s => (
                                    <span key={s} className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/10 text-slate-300 bg-white/5">{s}</span>
                                ))}
                            </div>

                            {/* Link */}
                            <a href={cert.url} target="_blank" rel="noreferrer"
                                className="flex items-center justify-center gap-2 mt-auto mb-1 py-2.5 rounded-xl text-sm font-bold text-white border transition-all hover:brightness-125"
                                style={{ background: `${cert.color}28`, borderColor: `${cert.color}60` }}>
                                <ExternalLink size={14} /> View Certificate
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Right ghost */}
                <div
                    className="absolute right-0 rounded-2xl overflow-hidden cursor-pointer opacity-35 scale-[0.78] transition-all duration-300 hover:opacity-55 z-0"
                    style={{
                        width: 260, height: 350,
                        background: "#0f172a",
                        border: `1px solid ${certifications[next].color}30`,
                        transform: "scale(0.8) translateX(-15px)",
                        filter: "blur(1.5px)",
                    }}
                    onClick={() => { go(next, 1); restart(); }}
                >
                    <div className="h-[2px]" style={{ background: certifications[next].color }} />
                    <div className="p-5 flex flex-col gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden">
                            {renderLogo(certifications[next], 16)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-white/5"
                                style={{ borderColor: `${certifications[next].color}50`, color: certifications[next].color }}>
                                {certifications[next].tag}
                            </span>
                        </div>
                        <div className="text-base font-bold text-slate-200 font-sans tracking-tight">{certifications[next].name}</div>
                    </div>
                </div>
            </div>

            {/* Nav controls */}
            <div className="flex items-center gap-4">
                <button onClick={() => { go(prev, -1); restart(); }}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                    <ChevronLeft size={16} />
                </button>

                {/* Progress dots */}
                <div className="flex gap-2">
                    {certifications.map((c, i) => (
                        <button key={i} onClick={() => { go(i, i > active ? 1 : -1); restart(); }}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === activeIndex ? 24 : 6,
                                height: 6,
                                background: i === activeIndex ? c.color : "rgba(255,255,255,0.2)",
                                boxShadow: i === activeIndex ? `0 0 8px ${c.color}` : "none",
                            }}
                        />
                    ))}
                </div>

                <button onClick={() => { go(next, 1); restart(); }}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────

const Achievements = () => (
    <section id="achievements" className="relative py-20 overflow-hidden">
        <div className="absolute top-16 left-8 w-72 h-72 rounded-full bg-yellow-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-8 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="text-center mb-16"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -8 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm font-semibold mb-6"
                >
                    <Star size={14} className="fill-yellow-400" />
                    Recognition &amp; Growth
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                    Milestones &amp; <span className="neon-text">Achievements</span>
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                    Competitions won, certifications earned — every milestone a step forward.
                </p>
            </motion.div>

            {/* Two-column */}
            <div className="grid lg:grid-cols-2 gap-14 max-w-6xl mx-auto items-center">

                {/* Hackathons flexed with custom style for auto scroll */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-xl font-extrabold text-white mb-6"
                    >
                        <span className="p-2 rounded-xl bg-yellow-500/15 text-yellow-400"><Trophy size={20} /></span>
                        Hackathons &amp; Competitions
                    </motion.h3>

                    <style>{`
                        @keyframes verticalScroll {
                            0% { transform: translateY(0); }
                            100% { transform: translateY(calc(-50% - 0.5rem)); }
                        }
                        .animate-vertical-scroll {
                            animation: verticalScroll 25s linear infinite;
                        }
                        .animate-vertical-scroll:hover {
                            animation-play-state: paused;
                        }
                    `}</style>

                    <div className="relative h-[480px] overflow-hidden rounded-2xl -mx-4 px-4" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
                        <div className="flex flex-col gap-4 animate-vertical-scroll w-full">
                            {[...hackathons, ...hackathons, ...hackathons, ...hackathons].map((item, idx) => (
                                <HackCard key={idx} item={item} idx={idx} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spotlight Carousel */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-xl font-extrabold text-white mb-8"
                    >
                        <span className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400"><Award size={20} /></span>
                        Professional Certifications
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <SpotlightCarousel />
                    </motion.div>
                </div>

            </div>
        </div>
    </section >
);

export default Achievements;
