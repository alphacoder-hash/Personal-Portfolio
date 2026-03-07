"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    Mail, MapPin, Send, Github, Linkedin, Twitter,
    CheckCircle, Loader2, Sparkles, ArrowRight, MessageSquare,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const INFO_ITEMS = [
    { icon: Mail, label: "Email", value: "Vpandey1707@gmail.com", href: "mailto:Vpandey1707@gmail.com", color: "#06b6d4" },
    { icon: MapPin, label: "Location", value: "Parul Institute of Technology", href: "#", color: "#f59e0b" },
];

const SOCIALS = [
    { icon: Github, label: "GitHub", href: "https://github.com/alphacoder-hash", color: "#e2e8f0" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vaibhav-pandey-alphacoder", color: "#0ea5e9" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/", color: "#38bdf8" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Dot-grid animated background
// ─────────────────────────────────────────────────────────────────────────────

function DotGrid() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
            <svg width="100%" height="100%">
                <defs>
                    <pattern id="dot-pattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#475569" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic info card
// ─────────────────────────────────────────────────────────────────────────────

function InfoCard({ item, idx }: { item: typeof INFO_ITEMS[number]; idx: number }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 18 });
    const sy = useSpring(y, { stiffness: 200, damping: 18 });
    const Icon = item.icon;

    const onMove = (e: React.MouseEvent) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.a
            ref={ref}
            href={item.href}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm hover:border-white/20 transition-colors duration-300 cursor-pointer"
        >
            {/* Glow dot */}
            <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                style={{ background: `${item.color}18`, borderColor: `${item.color}40`, color: item.color, boxShadow: "none" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 20px ${item.color}55`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
                <Icon size={20} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: item.color }}>{item.label}</p>
                <p className="text-sm font-semibold text-white truncate">{item.value}</p>
            </div>

            <motion.div animate={{ x: 0 }} whileHover={{ x: 4 }} className="shrink-0 text-slate-600 group-hover:text-white transition-colors">
                <ArrowRight size={16} />
            </motion.div>

            {/* Bottom scan line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] rounded-b-2xl pointer-events-none"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 + 0.3 }}
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`, originX: 0 }}
            />
        </motion.a>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated input / textarea with floating label + glowing focus ring
// ─────────────────────────────────────────────────────────────────────────────

type FieldProps = {
    id: string; label: string; type?: string; value: string; rows?: number;
    onChange: (v: string) => void; placeholder: string; delay?: number; disabled?: boolean;
};

function Field({ id, label, type = "text", value, rows, onChange, placeholder, delay = 0, disabled }: FieldProps) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;
    const active = focused || filled;
    const Tag = rows ? "textarea" : "input";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay }}
            className="relative"
        >
            {/* Glowing border ring */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
                style={{
                    boxShadow: focused ? "0 0 0 2px #06b6d490, 0 0 20px #06b6d430" : "none",
                    borderRadius: "0.75rem",
                }}
            />
            {/* Floating label */}
            <motion.label
                htmlFor={id}
                animate={{ y: active ? -22 : 0, scale: active ? 0.8 : 1, color: active ? "#06b6d4" : "#94a3b8" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute left-4 top-3.5 text-sm font-semibold pointer-events-none origin-left z-10"
                style={{ transformOrigin: "left center" }}
            >
                {label}
            </motion.label>

            <Tag
                id={id}
                type={type}
                required
                rows={rows}
                value={value}
                disabled={disabled}
                onChange={e => onChange((e.target as HTMLInputElement | HTMLTextAreaElement).value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={active ? placeholder : ""}
                className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 pt-6 pb-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-400/60 transition-all resize-none disabled:opacity-50"
                style={{ minHeight: rows ? 120 : undefined }}
            />
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Confetti burst
// ─────────────────────────────────────────────────────────────────────────────

function Confetti() {
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        color: ["#06b6d4", "#a855f7", "#f59e0b", "#10b981", "#f97316"][i % 5],
        angle: (i / 18) * 360,
        dist: 50 + Math.random() * 60,
    }));
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <motion.div key={p.id}
                    className="absolute w-2 h-2 rounded-full left-1/2 top-1/2"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
                        y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
                        opacity: 0, scale: 0.3,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{ background: p.color, marginLeft: -4, marginTop: -4 }}
                />
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact section
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [showConfetti, setShowConfetti] = useState(false);

    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => {
            setStatus("success");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 800);
            setTimeout(() => {
                setForm({ name: "", email: "", subject: "", message: "" });
                setStatus("idle");
            }, 3200);
        }, 1800);
    };

    return (
        <section id="contact" className="relative py-20 overflow-hidden">

            {/* ── Background layers ── */}
            <DotGrid />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-yellow-500/5 blur-2xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── Heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6"
                    >
                        <MessageSquare size={14} />
                        Let&apos;s Connect
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                        Get in <span className="neon-text">Touch</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Have a project in mind? I&apos;m always open to new ideas, collaborations, and opportunities.
                    </p>
                </motion.div>

                {/* ── Two‑column ── */}
                <div className="grid lg:grid-cols-[380px_1fr] gap-10 max-w-5xl mx-auto">

                    {/* ── Left: Info panel ── */}
                    <div className="flex flex-col gap-6">
                        {/* Quote card */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-2xl p-6 border border-white/8 bg-gradient-to-br from-cyan-500/10 via-purple-500/8 to-transparent overflow-hidden"
                        >
                            <div className="absolute top-3 right-4 text-5xl font-black text-white/5 select-none">"</div>
                            <Sparkles size={20} className="text-cyan-400 mb-3" />
                            <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
                                Let&apos;s build something great together. I&apos;m currently available for freelance & internship opportunities.
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-xs text-green-400 font-semibold">Available for work</span>
                            </div>
                        </motion.div>

                        {/* Info cards */}
                        <div className="flex flex-col gap-3">
                            {INFO_ITEMS.map((item, i) => (
                                <div className="relative" key={i}>
                                    <InfoCard item={item} idx={i} />
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-3"
                        >
                            {SOCIALS.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all hover:border-white/25"
                                        style={{ color: s.color }}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* ── Right: Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="relative rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-8 overflow-hidden"
                        >
                            {/* Decorative corner glows */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/12 blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-purple-500/12 blur-3xl pointer-events-none" />

                            {/* Animated top border */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl overflow-hidden">
                                <motion.div
                                    className="h-full w-full"
                                    style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)" }}
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            <div className="relative z-10 space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <Field id="name" label="Your Name" value={form.name} onChange={set("name")} placeholder="Vaibhav Pandey" delay={0.1} disabled={status !== "idle"} />
                                    <Field id="email" label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="hello@example.com" delay={0.15} disabled={status !== "idle"} />
                                </div>
                                <Field id="subject" label="Subject" value={form.subject} onChange={set("subject")} placeholder="Project inquiry, collaboration..." delay={0.2} disabled={status !== "idle"} />
                                <Field id="message" label="Message" value={form.message} onChange={set("message")} placeholder="Tell me more..." delay={0.25} rows={5} disabled={status !== "idle"} />

                                {/* Submit button */}
                                <motion.button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    whileHover={status === "idle" ? { scale: 1.02 } : {}}
                                    whileTap={status === "idle" ? { scale: 0.97 } : {}}
                                    className="relative w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 overflow-hidden transition-all disabled:cursor-not-allowed"
                                    style={{
                                        background: status === "success"
                                            ? "linear-gradient(135deg, #10b981, #059669)"
                                            : "linear-gradient(135deg, #0891b2, #7c3aed)",
                                        boxShadow: status === "success"
                                            ? "0 0 30px #10b98155"
                                            : "0 0 30px #06b6d430",
                                    }}
                                >
                                    {/* Shimmer on idle */}
                                    {status === "idle" && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", width: "40%" }}
                                            animate={{ x: ["-100%", "300%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                        />
                                    )}

                                    {/* Confetti burst on success */}
                                    {showConfetti && <Confetti />}

                                    <AnimatePresence mode="wait">
                                        {status === "idle" && (
                                            <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                                <Send size={16} /> Send Message
                                            </motion.span>
                                        )}
                                        {status === "loading" && (
                                            <motion.span key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin" /> Sending…
                                            </motion.span>
                                        )}
                                        {status === "success" && (
                                            <motion.span key="success" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                <CheckCircle size={16} /> Message Sent! 🎉
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
