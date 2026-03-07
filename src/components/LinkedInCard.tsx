"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, ExternalLink, MapPin, Briefcase, GraduationCap, Users, Bookmark, Send } from 'lucide-react';
import { LinkedInProfile } from '@/lib/linkedin';

interface LinkedInCardProps {
    profile: LinkedInProfile;
}

export const LinkedInCard = ({ profile }: LinkedInCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Smooth 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="perspective-1000 w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                ref={cardRef}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative glass p-1 rounded-[2.5rem] border border-blue-500/10 hover:border-blue-500/30 transition-shadow duration-500 overflow-hidden shadow-2xl hover:shadow-blue-500/10"
            >
                {/* Premium Shine Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
                    <div className="absolute -inset-[100%] group-hover:animate-shine bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="relative glass p-6 sm:p-8 md:p-10 rounded-[2.4rem] bg-slate-900/60 backdrop-blur-xl flex flex-col gap-8 md:gap-10">
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        {/* Profile Image with Advanced Glow */}
                        <motion.div
                            style={{ translateZ: "50px" }}
                            className="relative shrink-0"
                        >
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-800 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl z-10">
                                <img
                                    src={profile.image || "/avatar.png"}
                                    alt={profile.name}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="absolute -bottom-1 -right-1 bg-blue-600 p-3 rounded-2xl text-white shadow-xl z-20 border-4 border-slate-900"
                            >
                                <Linkedin size={24} fill="currentColor" />
                            </motion.div>
                        </motion.div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-4" style={{ transform: "translateZ(40px)" } as any}>
                            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
                                <div>
                                    <motion.h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-blue-400 group-hover:to-cyan-400 transition-all duration-500">
                                        {profile.name}
                                    </motion.h3>
                                    <p className="text-blue-400 font-semibold tracking-wider text-sm uppercase mt-1">LinkedIn Verified Professional</p>
                                </div>
                                <a
                                    href={profile.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 rounded-full transition-all duration-300 font-bold text-sm"
                                >
                                    Connect <ExternalLink size={16} />
                                </a>
                            </div>

                            <p className="text-slate-300 text-xl leading-relaxed max-w-2xl italic font-medium">
                                "{profile.headline}"
                            </p>

                            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                                <span className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <MapPin size={16} className="text-blue-500" /> India
                                </span>
                                <span className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <Users size={16} className="text-blue-500" /> 500+ Connections
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Grid/Stats */}
                    <motion.div
                        style={{ translateZ: "30px" }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {[
                            { icon: Briefcase, label: "Availability", value: "Open to Work", color: "text-emerald-400" },
                            { icon: GraduationCap, label: "Education", value: "B.Tech CSE", color: "text-blue-400" },
                            { icon: Bookmark, label: "Interests", value: "Tech Innovation", color: "text-purple-400" }
                        ].map((stat, i) => (
                            <div key={i} className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors bg-slate-800/20 group/stat">
                                <stat.icon size={20} className={`${stat.color} mb-3 group-hover/stat:scale-110 transition-transform`} />
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-white font-bold">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Mobile Only CTA */}
                    <a
                        href={profile.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex md:hidden items-center justify-center gap-2 w-full py-5 bg-blue-600 rounded-2xl text-white font-black text-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
                    >
                        Connect on LinkedIn <Send size={20} />
                    </a>
                </div>

                {/* Decorative border elements */}
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            </motion.div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
};
