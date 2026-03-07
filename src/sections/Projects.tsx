"use client";
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projectData = [
    {
        title: "AI-Powered Crop Yield Prediction",
        description: "Machine learning system trained on 50,000+ agricultural records to predict crop yield using regression models with 92% accuracy.",
        tech: ["Python", "Django", "Scikit-learn", "Pandas", "NumPy", "JavaScript"],
        github: "https://github.com/alphacoder-hash/Crop_Yeild_Prediction",
        color: "from-green-400 to-emerald-600"
    },
    {
        title: "Movie Recommendation System",
        description: "Content-based recommendation system using NLP and cosine similarity on 4800+ movies dataset.",
        tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "NLP"],
        github: "https://github.com/alphacoder-hash/movie-recommendation-system",
        color: "from-pink-500 to-rose-600"
    }
];

const TiltCard = ({ project, index }: { project: any, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * 20); // max rotation
        y.set(yPct * -20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full rounded-3xl glass p-8 border border-white/10 hover:border-white/20 transition-colors"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="flex flex-col h-full justify-between"
            >
                <div>
                    <div className={`w-16 h-2 mb-6 rounded-full bg-gradient-to-r ${project.color}`} />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {project.title}
                    </h3>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div style={{ transform: "translateZ(30px)" }}>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t: string) => (
                            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-cyan-200 border border-white/5">
                                {t}
                            </span>
                        ))}
                    </div>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors"
                    >
                        <Github size={20} />
                        <span>View Source</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="container mx-auto px-6 py-20 relative z-10" style={{ perspective: "1000px" }}>
            <div className="mb-20 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Featured <span className="neon-text">Projects</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {projectData.map((project, idx) => (
                    <TiltCard key={project.title} project={project} index={idx} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
