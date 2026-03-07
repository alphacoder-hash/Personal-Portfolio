"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBadgeProps {
    badge: {
        platform: string;
        displayName: string;
        icon: string;
        creationDate?: string;
    };
    index: number;
}

export default function AnimatedBadge({ badge, index }: AnimatedBadgeProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: index * 0.1,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex flex-col items-center justify-center shrink-0 w-52 min-w-[200px] snap-center p-5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-3xl border border-slate-800 shadow-xl overflow-hidden group cursor-pointer"
        >
            {/* Animated Glow Backdrop */}
            <motion.div
                className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotate: isHovered ? [0, 90, 180] : 0,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />

            <motion.div
                className="w-20 h-20 mb-5 relative flex items-center justify-center z-10"
                animate={{
                    y: isHovered ? [-5, 5, -5] : [0, -8, 0],
                }}
                transition={{
                    duration: isHovered ? 1.5 : 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2 // offset floating slightly
                }}
            >
                {badge.icon && badge.icon.startsWith("http") ? (
                    <img
                        src={badge.icon}
                        alt={badge.displayName}
                        className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(234,179,8,0.3)] group-hover:drop-shadow-[0_10px_25px_rgba(234,179,8,0.6)] transition-all duration-300"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shadow-inner">
                        <span className="text-yellow-500 font-bold text-2xl">🏆</span>
                    </div>
                )}
            </motion.div>

            <div className="z-10 text-center">
                <p className="text-sm font-black text-slate-200 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors">
                    {badge.displayName}
                </p>
                <div className="flex flex-col items-center mt-3 gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-slate-900 font-bold px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-md uppercase tracking-wider">
                        {badge.platform ? badge.platform : "LeetCode"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-widest mt-1">
                        {badge.creationDate ? badge.creationDate.split("-")[0] : "EARNED"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
