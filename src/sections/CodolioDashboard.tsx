import React from 'react';
import { getCodolioStats } from '@/lib/codolio';
import { getLeetCodeStats, getLeetCodeBadges } from '@/lib/leetcode';
import CodolioHeatmap from '@/components/CodolioHeatmap';
import RefreshButton from '@/components/RefreshButton';
import { Code, Trophy, Activity, GitCommit, Target, Zap, Terminal, Medal, Award, Flame, Calendar } from 'lucide-react';
import { FadeIn } from '@/components/FadeIn';
import AnimatedBadge from '@/components/AnimatedBadge';
import { AutoScrollCards } from '@/components/AutoScrollCards';

export default async function CodolioDashboard() {
    const stats = await getCodolioStats('Alphacoder07_');
    const lcStats = await getLeetCodeStats();
    const lcBadges = await getLeetCodeBadges();

    if (!stats) return null;

    // Combine LeetCode standalone badges with any aggregated Codolio badges
    const allBadges = [...(lcBadges?.badges || []), ...(stats.badges || [])];

    // Build uniform platform cards
    const codolioPlatforms = stats.platformStats.filter(p => ['codeforces', 'codechef'].includes(p.platform.toLowerCase()));

    const displayPlatforms = [
        {
            platform: "LeetCode",
            totalQuestions: lcStats?.totalSolved || stats.platformStats.find(p => p.platform.toLowerCase() === 'leetcode')?.totalQuestions || 0,
            rating: "1761 (Max)"
        },
        ...codolioPlatforms
    ].slice(0, 3);

    return (
        <section id="coding-stats" className="py-20 px-6 relative z-10 w-full overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                            <div className="flex items-center gap-4">
                                <Activity className="text-cyan-400 shrink-0" size={40} />
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500">
                                        Real-Time Coding Activity
                                    </span>
                                </h2>
                            </div>
                            <RefreshButton />
                        </div>
                        <p className="text-slate-400 max-w-2xl mx-auto">Live statistics and annual submission data synced directly from my Codolio profile across multiple competitive programming platforms.</p>
                    </div>
                </FadeIn>

                <AutoScrollCards stats={stats} displayPlatforms={displayPlatforms} />

                {/* Heatmap Section (Full Width) */}
                <FadeIn delay={0.6}>
                    <div className="glass p-6 md:p-10 rounded-[2rem] border border-cyan-500/20 relative overflow-hidden h-full flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <GitCommit className="text-purple-400" size={28} />
                                <h3 className="text-2xl font-bold text-white">Annual Contribution Graph</h3>
                            </div>

                            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-inner">
                                <CodolioHeatmap heatmapData={stats.heatmapData} />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-wrap gap-4 justify-between items-center text-sm text-slate-400 font-medium uppercase tracking-wider">
                            <div className="flex items-center gap-2 text-xs">
                                <Target size={14} className="text-cyan-400" /> Aggregated securely via Codolio
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Zap size={14} className="text-yellow-400" /> Live Web Sync Enabled
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Cross-Platform Badges Leaderboard */}
                <FadeIn delay={0.8}>
                    <div className="mt-8 glass p-6 md:p-10 rounded-[2rem] border border-yellow-500/20 relative overflow-hidden h-full flex flex-col justify-between hover:border-yellow-500/40 transition-colors group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400 group-hover:bg-yellow-400/20 transition-all">
                                <Medal size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Platform Achievements & Badges</h3>
                                <p className="text-xs text-slate-400 tracking-wider">Verified Leaderboard Honors</p>
                            </div>
                        </div>

                        {allBadges.length > 0 ? (
                            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] group/marquee">
                                <style>{`
                                    @keyframes scroll-x {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(calc(-50% - 12px)); }
                                    }
                                    .animate-marquee {
                                        animation: scroll-x 30s linear infinite;
                                    }
                                `}</style>
                                <div className="flex w-max gap-6 py-4 animate-marquee hover:[animation-play-state:paused]">
                                    {[...allBadges, ...allBadges].map((badge: any, index: number) => (
                                        <AnimatedBadge key={`${badge.platform}-${badge.displayName}-${index}`} badge={badge} index={index} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-950/80 rounded-2xl p-8 border border-slate-800 shadow-inner flex flex-col items-center justify-center text-slate-400 min-h-[150px]">
                                <Award size={32} className="mb-3 opacity-30" />
                                <p className="text-sm font-medium tracking-wide">Evaluating API synchronization for Cross-Platform Badges...</p>
                            </div>
                        )}

                        <div className="mt-4 pt-6 border-t border-slate-800/50 flex flex-wrap gap-4 justify-between items-center text-sm text-slate-400 font-medium uppercase tracking-wider">
                            <div className="flex items-center gap-2 text-xs">
                                <Trophy size={14} className="text-yellow-400" /> Exclusive Honors
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Target size={14} className="text-cyan-400" /> Aggregated Live
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


