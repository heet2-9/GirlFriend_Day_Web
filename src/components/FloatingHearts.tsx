"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingHearts() {
  const hearts = useMemo(
    () => [
      { x: "8%", y: "10%", size: 14, delay: 0, duration: 5.5, opacity: 0.35 },
      { x: "18%", y: "30%", size: 9, delay: 1.5, duration: 4.8, opacity: 0.25 },
      { x: "28%", y: "7%", size: 11, delay: 0.6, duration: 5.2, opacity: 0.3 },
      { x: "42%", y: "4%", size: 8, delay: 2.2, duration: 4.2, opacity: 0.2 },
      { x: "58%", y: "9%", size: 10, delay: 0.9, duration: 5.8, opacity: 0.28 },
      { x: "72%", y: "15%", size: 12, delay: 1.7, duration: 4.5, opacity: 0.32 },
      { x: "85%", y: "6%", size: 9, delay: 0.3, duration: 5.0, opacity: 0.22 },
      { x: "92%", y: "28%", size: 10, delay: 2.8, duration: 4.6, opacity: 0.26 },
      { x: "32%", y: "82%", size: 8, delay: 2.0, duration: 5.4, opacity: 0.2 },
      { x: "65%", y: "85%", size: 10, delay: 0.8, duration: 4.4, opacity: 0.25 },
      { x: "80%", y: "72%", size: 7, delay: 1.3, duration: 5.6, opacity: 0.18 },
      { x: "15%", y: "60%", size: 9, delay: 2.5, duration: 4.9, opacity: 0.22 },
    ],
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: heart.x, top: heart.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: heart.opacity,
            scale: 1,
          }}
          transition={{
            opacity: { duration: 1, delay: heart.delay },
            scale: { duration: 0.8, delay: heart.delay },
          }}
        >
          <motion.svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="#F9B8CB"
            animate={{
              y: [0, -heart.size * 0.8, 0],
              x: [0, i % 2 === 0 ? 3 : -3, 0],
              rotate: [0, i % 3 === 0 ? 8 : -8, 0],
            }}
            transition={{
              y: { duration: heart.duration, repeat: Infinity, ease: "easeInOut", delay: heart.delay },
              x: { duration: heart.duration * 1.3, repeat: Infinity, ease: "easeInOut", delay: heart.delay },
              rotate: { duration: heart.duration * 1.5, repeat: Infinity, ease: "easeInOut", delay: heart.delay },
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}
