"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ChevronRight, Share2 } from 'lucide-react';
import { LinkedInPost } from '@/lib/linkedin';

interface LinkedInPostCardProps {
    post: LinkedInPost;
    index: number;
}

export const LinkedInPostCard = ({ post, index }: LinkedInPostCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative glass rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full bg-slate-900/40 hover:bg-slate-900/60"
        >
            {/* Post Image Container */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img
                    src={post.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                        {post.type}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 font-medium">
                    <Calendar size={14} className="text-blue-500" />
                    {post.date}
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                    {post.title}
                </h4>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.summary}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-bold group/link"
                    >
                        Read Post <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>

                    <button className="p-2 rounded-full hover:bg-blue-500/10 text-slate-500 hover:text-blue-400 transition-colors">
                        <Share2 size={16} />
                    </button>
                </div>
            </div>

            {/* Decorative Shine */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:animate-shine transition-opacity" />
        </motion.div>
    );
};
