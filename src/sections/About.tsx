"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Trophy, Database, GraduationCap, ChevronRight } from 'lucide-react';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 100 } }
    };

    const interests = [
        { title: 'Full Stack Development', icon: <Code2 size={28} className="text-blue-400" />, desc: "Building scalable web apps" },
        { title: 'AI & Machine Learning', icon: <BrainCircuit size={28} className="text-purple-400" />, desc: "Training intelligent models" },
        { title: 'Competitive Programming', icon: <Trophy size={28} className="text-cyan-400" />, desc: "Solving complex algorithms" },
        { title: 'Communication Skills', icon: <ChevronRight size={28} className="text-indigo-400" />, desc: "Effective technical storytelling" }
    ];

    return (
        <section id="about" className="container mx-auto px-6 py-20 relative z-10 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="mb-20 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    About <span className="neon-text">Me</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto w-full">
                {/* Left Side: Text and Bio */}
                <motion.div
                    className="flex-1 space-y-8"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-70" />

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <GraduationCap size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Pre-Final Year CSE Student</h3>
                                <p className="text-cyan-400 font-medium">Parul Institute of Technology</p>
                            </div>
                        </div>

                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            I am a <strong className="text-white">Pre-Final Year CSE Student</strong> at Parul Institute of Technology, currently maintaining a <strong className="text-cyan-400">CGPA of 8.17</strong>. I possess <strong className="text-white">good problem-solving skills</strong> and specialize in bridging technical complexity with <strong className="text-white">clear professional communication</strong>, ensuring that complex solutions are not just built, but also effectively understood.
                        </p>

                        <p className="text-lg text-slate-300 leading-relaxed">
                            I am actively seeking <strong className="text-blue-400 font-bold uppercase tracking-tight">Internship Opportunities</strong> or <strong className="text-blue-400 font-bold uppercase tracking-tight">Full-time Roles</strong> where I can apply my expertise in MERN stack development and AI/ML to solve real-world challenges.
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
                                    600+
                                </p>
                                <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-1">
                                    Problems Solved
                                </p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-300">
                                    Top 25
                                </p>
                                <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-1">
                                    Startup Pitches
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Interest Grid */}
                <motion.div
                    className="flex-1 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {interests.map((interest, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="glass p-6 rounded-2xl flex flex-col items-start gap-4 hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20 hover:-translate-y-1 group"
                            >
                                <div className="p-3 bg-slate-900/80 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    {interest.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-100 mb-1">{interest.title}</h3>
                                    <p className="text-sm text-slate-400">{interest.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        variants={itemVariants}
                        href="#projects"
                        className="mt-8 inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
                    >
                        <span>See my work in action</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
