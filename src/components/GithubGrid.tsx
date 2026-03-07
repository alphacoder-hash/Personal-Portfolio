"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Terminal } from 'lucide-react';

const langMeta: Record<string, { color: string; comment: string; keyword: string }> = {
    TypeScript: { color: "#3b82f6", comment: "// TypeScript  ·  Strongly typed", keyword: "interface" },
    JavaScript: { color: "#f59e0b", comment: "// JavaScript  ·  Dynamic scripting", keyword: "const" },
    Python: { color: "#10b981", comment: "# Python  ·  ML / Data Science", keyword: "def" },
    Java: { color: "#f97316", comment: "// Java  ·  OOP powerhouse", keyword: "class" },
    Jupyter: { color: "#f59e0b", comment: "# Jupyter  ·  Data notebooks", keyword: "import" },
    C: { color: "#64748b", comment: "// C  ·  Systems programming", keyword: "int" },
    "C++": { color: "#8b5cf6", comment: "// C++  ·  High performance", keyword: "class" },
    Go: { color: "#06b6d4", comment: "// Go  ·  Cloud native", keyword: "func" },
    Rust: { color: "#ef4444", comment: "// Rust  ·  Memory safe", keyword: "fn" },
    default: { color: "#a855f7", comment: "// Open Source  ·  Community driven", keyword: "export" },
};

// Per-repo custom descriptions — keyed by exact repo name (lowercase)
const repoDescriptions: Record<string, string> = {
    "-dog-vs-cat-classification---transfer-learning":
        "Deep learning image classifier using Transfer Learning (VGG16/ResNet) to classify dogs vs cats. Trained on Kaggle dataset achieving ~95% accuracy with Python & TensorFlow.",
    "crop_yeild_prediction":
        "AI precision agriculture web app predicting optimal crop yield from soil pH, rainfall & temperature using XGBoost + Random Forest ensemble models. Built with Flask & HTML.",
    "localo":
        "Hyperlocal services marketplace (v2) connecting users with nearby vendors in real-time. Full-stack Next.js + TypeScript app with Prisma ORM and WebSocket-powered live chat.",
    "localll":
        "Early prototype of the Localo hyperlocal platform — RESTful backend scaffolding with Node.js, Express and MongoDB Atlas for geolocation-based service discovery.",
    "movie-recommendation-system":
        "Content-based filtering engine recommending movies using TF-IDF vectorization & cosine similarity on 5,000+ TMDB titles. ML pipeline built with Python & scikit-learn.",
    "uber-video":
        "Animated Uber promotional landing page clone with scroll-triggered animations, parallax hero section, and fully responsive layout built with vanilla JS & CSS.",
    "ai-resume-analyzer1":
        "AI-powered resume analyzer that parses PDFs, scores resumes against job descriptions using NLP keyword extraction & returns structured feedback. Built with Node.js & OpenAI API.",
    "gitdemo":
        "Git workflow demo repository covering branching strategies, merge conflict resolution, rebase, cherry-pick, and collaborative PR workflows for real-world team projects.",
    "epj_practical":
        "Enterprise Java lab exercises covering Servlets, JSP, JDBC, Hibernate ORM, Spring MVC & RESTful APIs — complete practical assignments from the EPJ curriculum.",
    "savvy-segmentation-spark":
        "Customer segmentation dashboard using K-Means clustering to group e-commerce users by purchase behavior. Built with TypeScript, Recharts & Shadcn UI components.",
    "hotelbookingpro":
        "Full-stack hotel booking platform with JWT auth, dynamic room pricing (Segment Tree DSA), admin panel for booking management — built with TypeScript & Next.js.",
    "jovian-carrers-website":
        "Responsive careers page for Jovian featuring job listings, role/location filtered search, and an application form — built with HTML, CSS & vanilla JavaScript.",
    "alphacoder-hash":
        "GitHub profile README showcasing tech stack, real-time coding stats, contribution graphs and social links — animated markdown profile card.",
    "myblogsite":
        "Personal developer blog exploring web fundamentals — static HTML/CSS site with articles on DSA, web dev tips, and competitive programming insights.",
    "job_project":
        "Full-stack job board with role-based auth (Employer / Job Seeker), job posting & application flows, resume upload, and application status tracking. Built with Node.js & MongoDB.",
};

function getDescription(repoName: string, apiDescription: string | null): string {
    const key = repoName.toLowerCase();
    return repoDescriptions[key] || apiDescription || "Open-source project crafted for the developer community.";
}

function TypingText({ text, speed = 45 }: { text: string; speed?: number }) {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
        let i = 0;
        setDisplayed("");
        const t = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(t);
        }, speed);
        return () => clearInterval(t);
    }, [text, speed]);
    return (
        <span>
            {displayed}
            <span className="inline-block w-[2px] h-[1em] bg-current align-middle animate-pulse ml-0.5" />
        </span>
    );
}

function RepoCard({ repo, index }: { repo: any; index: number }) {
    const [hovered, setHovered] = useState(false);
    const lang = repo.language || "default";
    const meta = langMeta[lang] || langMeta.default;
    const driftDelay = (index % 5) * -5;

    const repoTitle = repo.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase());

    return (
        <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ y: [0, -12, 0] }}
            transition={{ y: { duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: driftDelay } }}
            className="relative shrink-0 w-[340px] h-[360px] block cursor-pointer group"
        >
            {/* Outer glow */}
            <motion.div
                className="absolute -inset-1 rounded-2xl blur-xl z-0 pointer-events-none"
                animate={{ opacity: hovered ? 0.7 : 0.15, scale: hovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
                style={{ background: `linear-gradient(135deg, ${meta.color}88, ${meta.color}22)` }}
            />

            {/* Terminal window */}
            <div
                className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 flex flex-col"
                style={{ background: "linear-gradient(160deg, #0d1117 0%, #0f172a 100%)" }}
            >
                {/* ── Title bar ── */}
                <div
                    className="flex items-center gap-2 px-4 py-3 border-b border-white/8 shrink-0"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                >
                    {/* macOS traffic lights */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors" />
                    </div>
                    {/* Window title */}
                    <div className="flex-1 text-center">
                        <span className="text-xs text-slate-500 font-mono">~/repos/{repo.name}</span>
                    </div>
                    {/* External link */}
                    <motion.div
                        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6 }}
                        transition={{ duration: 0.3 }}
                        className="text-slate-500 hover:text-white"
                    >
                        <ExternalLink size={13} />
                    </motion.div>
                </div>

                {/* ── Code body ── */}
                <div className="flex-1 px-5 pt-5 pb-3 font-mono text-sm overflow-hidden flex flex-col gap-1">
                    {/* Comment line */}
                    <span className="text-slate-500 text-xs">
                        {meta.comment}
                    </span>

                    {/* Language accent line */}
                    <div className="flex items-center gap-2 mt-1">
                        <span style={{ color: meta.color }} className="font-bold">{meta.keyword}</span>
                        <span className="text-white font-bold">{repoTitle.split(" ")[0]}</span>
                        {repoTitle.split(" ")[1] && (
                            <span className="text-slate-300">{repoTitle.split(" ").slice(1).join(" ")}</span>
                        )}
                        <span className="text-slate-500">{"{"}</span>
                    </div>

                    {/* Description — always visible, typing animation on hover */}
                    <div className="mt-3 pl-4 border-l-2 leading-relaxed line-clamp-3"
                        style={{ borderColor: meta.color + "66" }}>
                        <span className="text-slate-500 text-xs mr-1">{"/*"}</span>
                        <span className="text-xs text-slate-300">
                            {hovered
                                ? <TypingText text={getDescription(repo.name, repo.description)} speed={18} />
                                : getDescription(repo.name, repo.description)
                            }
                        </span>
                        <span className="text-slate-500 text-xs ml-1">{"*/"}</span>
                    </div>

                    <div className="text-slate-500 mt-1">{"}"}</div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Bottom "return" line */}
                    <motion.div
                        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-xs"
                    >
                        <span style={{ color: meta.color }}>return</span>
                        <span className="text-slate-400"> &#123; </span>
                        <span className="text-yellow-400">stars</span>
                        <span className="text-slate-400">: </span>
                        <span className="text-emerald-400">{repo.stargazers_count}</span>
                        <span className="text-slate-400">, </span>
                        <span className="text-yellow-400">forks</span>
                        <span className="text-slate-400">: </span>
                        <span className="text-emerald-400">{repo.forks_count}</span>
                        <span className="text-slate-400"> &#125;</span>
                    </motion.div>
                </div>

                {/* ── Status bar ── */}
                <div
                    className="flex items-center justify-between px-4 py-2 border-t border-white/5 shrink-0"
                    style={{ background: `linear-gradient(90deg, ${meta.color}22, transparent)` }}
                >
                    <div className="flex items-center gap-2">
                        <Terminal size={11} style={{ color: meta.color }} />
                        <span className="text-xs font-mono" style={{ color: meta.color }}>
                            {lang}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                            <Star size={11} className="text-yellow-500" />{repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                            <GitFork size={11} className="text-emerald-500" />{repo.forks_count}
                        </span>
                    </div>
                </div>

                {/* Scanline overlay for terminal feel */}
                <div
                    className="absolute inset-0 pointer-events-none z-20 rounded-2xl opacity-[0.03]"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                    }}
                />

                {/* Active language accent line on left */}
                <motion.div
                    className="absolute left-0 top-12 bottom-0 w-[3px] rounded-r-full"
                    animate={{ opacity: hovered ? 1 : 0.3, scaleY: hovered ? 1 : 0.5 }}
                    style={{ background: `linear-gradient(to bottom, ${meta.color}, transparent)`, originY: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.a>
    );
}

export default function GithubGrid({ repos }: { repos: any[] }) {
    if (!repos || repos.length === 0) return null;

    return (
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <style>{`
                @keyframes scroll-repos {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 12px)); }
                }
                .animate-repos { animation: scroll-repos 45s linear infinite; }
            `}</style>
            <div className="relative z-10 flex gap-8 py-10 pb-16 w-max animate-repos hover:[animation-play-state:paused] items-center">
                {[...repos, ...repos].map((repo, idx) => (
                    <RepoCard
                        key={`${repo.id}-${idx}`}
                        repo={repo}
                        index={idx % repos.length}
                    />
                ))}
            </div>
        </div>
    );
}
