"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedAvatar() {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden flex items-center justify-center"
    >
      {/* Animated outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
        animate={{
          boxShadow: [
            "0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)",
            "0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 30px rgba(34, 211, 238, 0.2)",
            "0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Middle glow ring */}
      <motion.div
        className="absolute inset-2 rounded-full border border-purple-500/30"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Avatar container with illustration */}
      <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <img
          src="/avatar.png?v=5"
          alt="Vaibhav Pandey"
          className="w-full h-full object-cover"
        />

        {/* Animated overlay shine effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Rotating border glow */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          animate={{
            borderColor: [
              "rgba(34, 211, 238, 0.6)",
              "rgba(59, 130, 246, 0.6)",
              "rgba(168, 85, 247, 0.6)",
              "rgba(34, 211, 238, 0.6)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
