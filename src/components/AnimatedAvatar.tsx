"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedAvatar() {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full glass border-4 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.3)] overflow-hidden flex items-center justify-center p-2"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: [
            "linear-gradient(45deg, #0ea5e9, #06b6d4)",
            "linear-gradient(90deg, #06b6d4, #0284c7)",
            "linear-gradient(135deg, #0284c7, #0ea5e9)",
            "linear-gradient(45deg, #0ea5e9, #06b6d4)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Avatar container */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <img
          src="/avatar.png"
          alt="Vaibhav Pandey"
          className="w-full h-full object-cover"
        />

        {/* Animated overlay shine effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Rotating border glow */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          animate={{
            borderColor: [
              "rgba(34, 211, 238, 0.5)",
              "rgba(59, 130, 246, 0.5)",
              "rgba(168, 85, 247, 0.5)",
              "rgba(34, 211, 238, 0.5)",
            ],
            boxShadow: [
              "0 0 20px rgba(34, 211, 238, 0.3)",
              "0 0 30px rgba(59, 130, 246, 0.3)",
              "0 0 20px rgba(168, 85, 247, 0.3)",
              "0 0 20px rgba(34, 211, 238, 0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
