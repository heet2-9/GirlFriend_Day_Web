"use client";

import { motion } from "framer-motion";
import MaskingTape from "./MaskingTape";

export default function LoveLetterScreen() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Love Letter Paper */}
      <motion.div
        className="relative max-w-lg w-full"
        initial={{ y: 80, opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Masking tape decorations */}
        <MaskingTape position="top-left" />
        <MaskingTape position="top-right" />

        {/* Paper card */}
        <div
          className="rounded-md shadow-lg p-8 md:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #FFFEF7 0%, #FBF8EE 40%, #F7F2E4 100%)",
            border: "1px solid rgba(180, 160, 130, 0.15)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Lined paper effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full"
                style={{
                  top: `${36 + i * 26}px`,
                  height: "1px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(147, 196, 228, 0.12) 10%, rgba(147, 196, 228, 0.12) 90%, transparent 100%)",
                }}
              />
            ))}
            {/* Red margin line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: "42px",
                width: "1px",
                background: "linear-gradient(180deg, transparent 0%, rgba(220, 130, 130, 0.12) 5%, rgba(220, 130, 130, 0.12) 95%, transparent 100%)",
              }}
            />
          </div>

          {/* Heart decorations */}
          <motion.svg
            className="absolute top-4 right-5"
            width="16" height="16" viewBox="0 0 24 24" fill="#F9B0C4"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          <motion.svg
            className="absolute top-7 left-5"
            width="12" height="12" viewBox="0 0 24 24" fill="#FFB6C1"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          {/* Star sticker */}
          <motion.div
            className="absolute bottom-4 left-5"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD54F" opacity="0.7">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>

          {/* Letter content */}
          <div className="relative z-10 space-y-4 pl-6 md:pl-8">
            <motion.p
              className="font-[var(--font-cursive)] text-2xl md:text-3xl text-[#5C4033] font-bold"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              My Dearest,
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p className="font-[var(--font-hand)] text-[17px] md:text-lg text-[#7A6555] leading-[1.75]">
                I just wanted you to know how incredibly special you are to me.
                Every moment with you feels like a beautiful dream that I never
                want to wake up from.
              </p>
              <p className="font-[var(--font-hand)] text-[17px] md:text-lg text-[#7A6555] leading-[1.75]">
                You bring so much joy, laughter, and love into my life. I&apos;m so
                grateful for every memory we&apos;ve made together, and I can&apos;t wait
                to create a million more.
              </p>
              <p className="font-[var(--font-hand)] text-[17px] md:text-lg text-[#7A6555] leading-[1.75]">
                Thank you for being you — my best friend, my partner, my
                everything. You make my world complete. 💕
              </p>
            </motion.div>

            <motion.div
              className="pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <p className="font-[var(--font-cursive)] text-lg md:text-xl text-[#5C4033]">
                Forever yours,
              </p>
              <p className="font-[var(--font-cursive)] text-xl md:text-2xl text-[#E8789A] mt-1 font-semibold">
                With all my love ❤️
              </p>
            </motion.div>
          </div>

          {/* Bottom heart */}
          <motion.svg
            className="absolute bottom-4 right-5"
            width="22" height="22" viewBox="0 0 24 24" fill="#F48BA5"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </div>

        {/* Bottom masking tape */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
          <div
            className="w-16 h-5 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #D4BFA0 0%, #C4A882 100%)",
              opacity: 0.55,
              transform: "rotate(2deg)",
            }}
          />
        </div>
      </motion.div>

      {/* Made with love footer */}
      <motion.p
        className="mt-10 text-xs tracking-[0.2em] text-text-muted/40 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        Made with 💕
      </motion.p>
    </motion.div>
  );
}
