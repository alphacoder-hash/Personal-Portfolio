"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Download } from 'lucide-react';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

    // Track scroll for blur + active section
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            // Determine active section by scroll position
            const sections = navLinks.map(l => l.href.slice(1));
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Move the underline indicator to the active link
    useEffect(() => {
        const activeEl = linkRefs.current.get(activeSection);
        if (activeEl) {
            const { offsetLeft, offsetWidth } = activeEl;
            setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeSection]);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed left-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'py-3 border-b border-white/8 bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    : 'py-5 bg-transparent border-b border-transparent'
                    }`}
                style={{ top: 'var(--announcement-height, 0px)' }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between gap-6">

                    {/* ── Logo ── */}
                    <a href="#" className="flex items-center gap-2.5 shrink-0 group">
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-1.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                        >
                            <Code2 size={18} className="text-white" />
                        </motion.div>
                        <span className="text-xl font-extrabold tracking-tight text-white">
                            Vaibhav<span className="neon-text">.dev</span>
                        </span>
                    </a>

                    {/* ── Desktop Nav ── */}
                    <div className="hidden md:flex items-center gap-1 relative bg-white/5 border border-white/8 rounded-2xl px-2 py-1.5 backdrop-blur-sm">
                        {/* Sliding active background pill */}
                        {activeSection && (
                            <motion.div
                                className="absolute h-[calc(100%-12px)] top-[6px] rounded-xl bg-white/10 pointer-events-none"
                                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        )}

                        {navLinks.map(({ label, href }) => {
                            const id = href.slice(1);
                            const isActive = activeSection === id;
                            return (
                                <a
                                    key={label}
                                    href={href}
                                    ref={el => { if (el) linkRefs.current.set(id, el); }}
                                    className={`relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 whitespace-nowrap ${isActive
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {label}
                                </a>
                            );
                        })}
                    </div>

                    {/* ── CTA Button ── */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
                        >
                            <Download size={15} />
                            Hire Me
                        </motion.a>
                    </div>

                    {/* ── Mobile Toggle ── */}
                    <button
                        className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                            className="fixed top-0 right-0 h-full w-[75%] max-w-sm z-50 bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 flex flex-col md:hidden"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                                <span className="text-lg font-extrabold text-white">
                                    Vaibhav<span className="neon-text">.dev</span>
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Drawer links */}
                            <nav className="flex-1 flex flex-col gap-2 px-4 py-8">
                                {navLinks.map(({ label, href }, i) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-5 py-4 rounded-2xl text-slate-300 font-medium hover:text-white hover:bg-white/8 transition-all text-lg"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60" />
                                        {label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Drawer CTA */}
                            <div className="px-4 pb-8">
                                <a
                                    href="#contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg"
                                >
                                    <Download size={18} />
                                    Hire Me
                                </a>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute top-1/3 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
