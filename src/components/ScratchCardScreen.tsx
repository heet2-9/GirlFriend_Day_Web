"use client";

import { motion } from "framer-motion";
import MaskingTape from "./MaskingTape";
import ScratchCard from "./ScratchCard";

interface ScratchCardScreenProps {
  onNext: () => void;
}

const scratchMessages = [
  "You make every day brighter ☀️",
  "My heart beats for you 💕",
  "You're my favorite person 🌸",
];

export default function ScratchCardScreen({ onNext }: ScratchCardScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title with masking tape */}
      <motion.div
        className="relative mb-10 md:mb-14"
        initial={{ y: -40, opacity: 0, rotate: -3 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <MaskingTape position="top-left" />
        <MaskingTape position="top-right" />
        <div
          className="px-10 py-5 rounded-sm shadow-sm relative"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FDFCF8 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="font-[var(--font-cursive)] text-2xl md:text-3xl text-[#5C4033] italic font-semibold">
            You Charge My Heart
          </h2>
        </div>
      </motion.div>

      {/* Scratch Cards Stack */}
      <div className="flex flex-col gap-5 md:gap-6 items-center">
        {scratchMessages.map((msg, idx) => (
          <ScratchCard
            key={idx}
            revealText={msg}
            width={340}
            height={80}
            index={idx}
          />
        ))}
      </div>

      {/* Tap to continue */}
      <motion.div
        className="mt-14 flex flex-col items-center gap-3 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onNext}
      >
        <p className="text-xs md:text-sm tracking-[0.25em] text-text-muted uppercase font-sans">
          TAP HERE TO CONTINUE
        </p>
        {/* Dashed circle with cute arrow */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#F9B8CB"
              strokeWidth="1.5"
              strokeDasharray="5 3.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
