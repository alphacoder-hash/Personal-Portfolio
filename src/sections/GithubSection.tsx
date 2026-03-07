import React from 'react';
import { getGithubProfile, getGithubRepos } from '@/lib/github';
import { FadeIn } from '@/components/FadeIn';
import { Github, BookOpen, Activity } from 'lucide-react';
import GithubGrid from '@/components/GithubGrid';

export default async function GithubSection() {
    const profile = await getGithubProfile();
    const repos = await getGithubRepos();

    if (!profile || !repos) return null;

    // Show all non-archived, original repos sorted by stars
    const fullyDeveloped = repos
        .filter((r: any) => !r.archived && !r.fork)
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return (
        <section id="github" className="py-20 relative z-10 w-full overflow-hidden">
            <div className="container mx-auto px-6 relative z-20">

                {/* Header */}
                <FadeIn delay={0} className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Open Source <span className="neon-text">Contributions</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                        A showcase of elite repositories, highlighting high-impact code, popular architectures, and open-source milestones.
                    </p>
                </FadeIn>

                <div className="max-w-6xl mx-auto flex flex-col gap-12">
                    {/* Stats Strip */}
                    <FadeIn delay={0.2} className="glass rounded-[2rem] p-8 flex flex-wrap justify-around items-center border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">{profile.public_repos}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                <BookOpen size={16} className="text-blue-400" /> Repositories
                            </div>
                        </div>
                        <div className="text-center mt-8 md:mt-0 md:border-l border-white/10 md:pl-20">
                            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2">{profile.followers}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                <Activity size={16} className="text-cyan-400" /> Followers
                            </div>
                        </div>
                        <a href={`https://github.com/${profile.login}`} target="_blank" rel="noreferrer" className="mt-8 md:mt-0 group relative px-8 py-4 bg-slate-900 overflow-hidden rounded-full flex items-center gap-3 text-white font-semibold border border-white/10 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Github className="group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                            <span className="relative z-10 group-hover:text-cyan-100 transition-colors">Follow on GitHub</span>
                        </a>
                    </FadeIn>

                    {/* Staggered Grid */}
                    <FadeIn delay={0.4}>
                        <GithubGrid repos={fullyDeveloped} />
                    </FadeIn>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
        </section>
    );
}
