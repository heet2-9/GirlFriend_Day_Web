"use client";

import { motion } from "framer-motion";

interface HeartBalloonScreenProps {
  onNext: () => void;
}

export default function HeartBalloonScreen({ onNext }: HeartBalloonScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onNext}
    >
      {/* Heart Balloon + String + Ribbon — all one connected unit */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* The heart balloon */}
          <svg
            width="280"
            height="260"
            viewBox="0 0 280 260"
            className="md:w-[340px] md:h-[310px]"
          >
            <defs>
              <radialGradient id="heartGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFB8CA" />
                <stop offset="40%" stopColor="#F9A0B8" />
                <stop offset="100%" stopColor="#E87898" />
              </radialGradient>
              <filter id="heartShadow" x="-10%" y="-5%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#E87898" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Main heart shape */}
            <path
              d="M140 235 C140 235 18 160 18 88 C18 38 58 10 95 10 C118 10 133 25 140 38 C147 25 162 10 185 10 C222 10 262 38 262 88 C262 160 140 235 140 235Z"
              fill="url(#heartGrad)"
              filter="url(#heartShadow)"
            />

            {/* Shine highlight on left lobe */}
            <ellipse cx="85" cy="55" rx="28" ry="35" fill="white" opacity="0.15" transform="rotate(-20, 85, 55)" />
            <ellipse cx="78" cy="48" rx="12" ry="18" fill="white" opacity="0.12" transform="rotate(-25, 78, 48)" />

            {/* Text inside heart */}
            <text
              x="140"
              y="95"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-cursive)"
              fontSize="38"
              fontWeight="700"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              Happy
            </text>
            <text
              x="140"
              y="140"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-cursive)"
              fontSize="38"
              fontWeight="700"
            >
              Girlfriend
            </text>
            <text
              x="140"
              y="185"
              textAnchor="middle"
              fill="white"
              fontFamily="var(--font-cursive)"
              fontSize="38"
              fontWeight="700"
            >
              Day
            </text>
          </svg>

          {/* Balloon string (connecting heart to ribbon) */}
          <svg width="6" height="45" viewBox="0 0 6 45" className="md:h-[55px] -mt-1">
            <path
              d="M3 0 C4 10, 2 20, 3 30 C4 35, 2 40, 3 45"
              fill="none"
              stroke="#C4A882"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Ribbon / Banner */}
          <div className="relative -mt-1">
            <svg
              width="320"
              height="70"
              viewBox="0 0 320 70"
              className="md:w-[400px] md:h-[80px]"
            >
              {/* Left ribbon tail */}
              <path
                d="M0 15 L30 15 Q35 15 35 20 L35 50 Q35 55 30 55 L0 55 L12 35 Z"
                fill="#FFE0E8"
              />
              <path
                d="M0 15 L30 15 Q35 15 35 20 L35 50 Q35 55 30 55 L0 55 L12 35 Z"
                fill="none"
                stroke="#F9C0D0"
                strokeWidth="0.5"
              />

              {/* Right ribbon tail */}
              <path
                d="M320 15 L290 15 Q285 15 285 20 L285 50 Q285 55 290 55 L320 55 L308 35 Z"
                fill="#FFE0E8"
              />
              <path
                d="M320 15 L290 15 Q285 15 285 20 L285 50 Q285 55 290 55 L320 55 L308 35 Z"
                fill="none"
                stroke="#F9C0D0"
                strokeWidth="0.5"
              />

              {/* Main ribbon center */}
              <rect x="30" y="10" width="260" height="50" rx="8" fill="#FFF5F7" />
              <rect
                x="30"
                y="10"
                width="260"
                height="50"
                rx="8"
                fill="none"
                stroke="#F9C0D0"
                strokeWidth="1"
              />

              {/* Subtle inner shadow on ribbon */}
              <rect x="30" y="10" width="260" height="3" rx="2" fill="#FFE8EE" opacity="0.5" />
            </svg>

            {/* Text overlay on ribbon */}
            <div className="absolute inset-0 flex items-center justify-center px-14 md:px-16">
              <p className="font-[var(--font-cursive)] text-sm md:text-[16px] text-[#8B5E6B] text-center leading-snug">
                To the most amazing girl who makes my world so much better :)
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tap to continue */}
      <motion.p
        className="mt-10 text-xs md:text-sm tracking-[0.25em] text-text-muted uppercase font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
      >
        TAP ANYWHERE TO CONTINUE ✨
      </motion.p>
    </motion.div>
  );
}
