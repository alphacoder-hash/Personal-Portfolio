"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Calendar, Flame, Code, Zap, Target, Terminal } from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface AutoScrollCardsProps {
    stats: {
        totalQuestionsSolved: number;
        totalActiveDays: number;
        maxStreak: number;
    };
    displayPlatforms: {
        platform: string;
        totalQuestions: number;
        rating?: string | number | null;
    }[];
}

export function AutoScrollCards({ stats, displayPlatforms }: AutoScrollCardsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Smooth scroll tracking
    const scrollX = useMotionValue(0);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;
        let lastTime: number;
        const speed = 50; // Standard smooth speed

        const step = (time: number) => {
            if (lastTime !== undefined && !isPaused) {
                const deltaTime = (time - lastTime) / 1000;
                container.scrollLeft += speed * deltaTime;
                scrollX.set(container.scrollLeft);

                // Seamless infinite loop
                const halfWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                    scrollX.set(container.scrollLeft);
                }
            }
            lastTime = time;
            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, scrollX]);

    const allItems = [
        { label: 'Total Solved', value: stats.totalQuestionsSolved.toLocaleString(), icon: <Trophy className="text-yellow-400 group-hover:scale-110 transition-transform" size={24} />, footer: 'Across all platforms', color: 'cyan' },
        { label: 'Active Days', value: `${stats.totalActiveDays}+`, icon: <Calendar className="text-blue-400 group-hover:scale-110 transition-transform" size={24} />, footer: 'Cumulative Coding', color: 'blue' },
        { label: 'Max Streak', value: stats.maxStreak, icon: <Flame className="text-orange-400 group-hover:scale-110 transition-transform" size={24} />, footer: 'Days of Consistency', color: 'orange' },
        ...displayPlatforms.map(p => ({
            label: p.platform,
            value: p.totalQuestions.toLocaleString(),
            icon: <TerminalIcon platform={p.platform} className="text-blue-400 group-hover:scale-110 transition-transform" />,
            footer: p.rating ? `Rating: ${p.rating}` : 'Evaluation Sync...',
            color: 'blue'
        }))
    ];

    return (
        <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex flex-nowrap overflow-x-auto gap-8 mb-12 pb-12 hide-scrollbar touch-pan-x py-4"
        >
            {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex flex-nowrap gap-8">
                    {allItems.map((item, itemIndex) => (
                        <div key={`${setIndex}-${itemIndex}`} className="min-w-[280px] flex-shrink-0 h-full">
                            <div className={`glass p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 group h-full flex flex-col justify-between hover:shadow-lg`}>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-slate-400 font-medium tracking-wide uppercase text-xs">{item.label}</h3>
                                        {item.icon}
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-1">
                                        {item.value}
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase border-t border-white/5 pt-2 mt-2">
                                    {item.footer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function TerminalIcon({ platform, className }: { platform: string, className?: string }) {
    if (platform.toLowerCase() === 'leetcode') return <Code className={className} size={24} />;
    if (platform.toLowerCase() === 'codeforces') return <Zap className={className} size={24} />;
    if (platform.toLowerCase() === 'codechef') return <Target className={className} size={24} />;
    return <Terminal className={className} size={24} />;
}
