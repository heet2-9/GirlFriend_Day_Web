"use client";

import { motion } from "framer-motion";
import MaskingTape from "./MaskingTape";

export default function LoveLetterScreen() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-12 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Love Letter Paper */}
      <motion.div
        className="relative max-w-lg w-full mx-2"
        initial={{ y: 80, opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Masking tape decorations */}
        <MaskingTape position="top-left" />
        <MaskingTape position="top-right" />

        {/* Paper card */}
        <div
          className="rounded-md shadow-lg p-5 sm:p-8 md:p-12 relative overflow-hidden"
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
                left: "32px",
                width: "1px",
                background: "linear-gradient(180deg, transparent 0%, rgba(220, 130, 130, 0.12) 5%, rgba(220, 130, 130, 0.12) 95%, transparent 100%)",
              }}
            />
          </div>

          {/* Heart decorations */}
          <motion.svg
            className="absolute top-4 right-4 sm:right-5"
            width="14" height="14" viewBox="0 0 24 24" fill="#F9B0C4"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          <motion.svg
            className="absolute top-6 sm:top-7 left-4 sm:left-5"
            width="10" height="10" viewBox="0 0 24 24" fill="#FFB6C1"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          {/* Star sticker */}
          <motion.div
            className="absolute bottom-4 left-4 sm:left-5"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD54F" opacity="0.7">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>

          {/* Letter content */}
          <div className="relative z-10 space-y-3 sm:space-y-4 pl-4 sm:pl-6 md:pl-8">
            <motion.p
              className="font-[var(--font-cursive)] text-xl sm:text-2xl md:text-3xl text-[#5C4033] font-bold"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              My Dearest Aaru😘
            </motion.p>

            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p className="font-[var(--font-hand)] text-[15px] sm:text-[17px] md:text-lg text-[#7A6555] leading-[1.7] sm:leading-[1.75]">
                Happiest Girlfriend Day Aaru😘
              </p>
              <p className="font-[var(--font-hand)] text-[15px] sm:text-[17px] md:text-lg text-[#7A6555] leading-[1.7] sm:leading-[1.75]">
                Aarya i just want you to thank you for loving me...supporting me...teasing me...making me laugh...and staying always by my side🥰💕
              </p>
              <p className="font-[var(--font-hand)] text-[15px] sm:text-[17px] md:text-lg text-[#7A6555] leading-[1.7] sm:leading-[1.75]">
                I don&apos;t have words to describe what you mean to me madam ji🫣🤭...but I aarya hope you feel it in every moment, every late-night call, and every stupid joke I make just to see you smile.
                Aaru, I promise to keep making you smile, to stand beside you when life gets hard, to celebrate your victories, and to remind you every single day how incredibly loved you are.
                Cauzz you arent my just GirlfriendYou're my best friend..you&apos;re my safe place whenever life gets hard
                Aarya Thank you soo much for being mine 💗💗
                Happy Girlfriend's Day...aarya

              </p>
            </motion.div>

            <motion.div
              className="pt-2 sm:pt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <p className="font-[var(--font-cursive)] text-base sm:text-lg md:text-xl text-[#5C4033]">
                Forever yours,
              </p>
              <p className="font-[var(--font-cursive)] text-lg sm:text-xl md:text-2xl text-[#E8789A] mt-1 font-semibold">
                Heetu ❤️
              </p>
            </motion.div>
          </div>

          {/* Bottom heart */}
          <motion.svg
            className="absolute bottom-4 right-4 sm:right-5"
            width="18" height="18" viewBox="0 0 24 24" fill="#F48BA5"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </div>

        {/* Bottom masking tape */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
          <div
            className="w-14 sm:w-16 h-4 sm:h-5 rounded-sm"
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
        className="mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs tracking-[0.2em] text-text-muted/40 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        Made with 💕
      </motion.p>
    </motion.div>
  );
}
