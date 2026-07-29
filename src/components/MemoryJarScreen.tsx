"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaskingTape from "./MaskingTape";
import PolaroidPhoto from "./PolaroidPhoto";

interface MemoryJarScreenProps {
  onNext: () => void;
}

const memories = [
  {
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop",
    caption: "Our first sunset 🌅",
    rotation: -4,
  },
  {
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop",
    caption: "Adventures together 💫",
    rotation: 3,
  },
  {
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop",
    caption: "My favorite moment 💕",
    rotation: -2,
  },
  {
    image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=300&fit=crop",
    caption: "Always & forever ❤️",
    rotation: 5,
  },
];

export default function MemoryJarScreen({ onNext }: MemoryJarScreenProps) {
  const [currentMemory, setCurrentMemory] = useState(-1);
  const [shownMemories, setShownMemories] = useState<number[]>([]);

  const handleJarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = shownMemories.length;
    if (nextIdx < memories.length) {
      setCurrentMemory(nextIdx);
      setShownMemories((prev) => [...prev, nextIdx]);
    }
  };

  const handlePhotoClose = () => {
    setCurrentMemory(-1);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title with masking tape */}
      <motion.div
        className="relative mb-4 sm:mb-6 md:mb-8"
        initial={{ y: -30, opacity: 0, rotate: -2 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <MaskingTape position="top-left" />
        <MaskingTape position="top-right" />
        <div
          className="px-6 sm:px-10 py-3 sm:py-4 rounded-sm shadow-sm"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FDFCF8 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <h2 className="font-[var(--font-cursive)] text-xl sm:text-2xl md:text-3xl text-[#5C4033] italic font-semibold text-center">
            Memory Jar
          </h2>
          <p className="font-[var(--font-hand)] text-xs sm:text-sm md:text-base text-[#A09080] text-center mt-1">
            Tap the jar to pull out a memory
          </p>
        </div>
      </motion.div>

      {/* Polaroid photo display area */}
      <div className="min-h-[200px] sm:min-h-[230px] md:min-h-[290px] flex items-center justify-center mb-3 sm:mb-4">
        <AnimatePresence mode="wait">
          {currentMemory >= 0 && (
            <PolaroidPhoto
              key={currentMemory}
              imageSrc={memories[currentMemory].image}
              caption={memories[currentMemory].caption}
              rotation={memories[currentMemory].rotation}
              onClose={handlePhotoClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Memory Jar — refined glass effect */}
      <motion.div
        className="cursor-pointer relative"
        onClick={handleJarClick}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.03 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="90" height="125" viewBox="0 0 110 150" className="sm:w-[100px] sm:h-[135px] md:w-[130px] md:h-[175px] drop-shadow-sm">
            <defs>
              <linearGradient id="jarBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE8EE" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F8D0DC" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#F0B8CA" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="20%" stopColor="white" stopOpacity="0.15" />
                <stop offset="80%" stopColor="white" stopOpacity="0.05" />
                <stop offset="100%" stopColor="white" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Jar lid */}
            <rect x="28" y="8" width="54" height="16" rx="5" fill="#FDFCF8" stroke="#E8D8C8" strokeWidth="1" />
            {/* Lid top */}
            <rect x="38" y="3" width="34" height="8" rx="4" fill="#FAF7EE" stroke="#E0D0C0" strokeWidth="0.8" />

            {/* Jar neck */}
            <rect x="32" y="22" width="46" height="8" rx="2" fill="url(#jarBody)" />

            {/* Jar body */}
            <path
              d="M22 30 Q17 32 15 45 L12 115 Q12 140 35 145 L75 145 Q98 140 98 115 L95 45 Q93 32 88 30 Z"
              fill="url(#jarBody)"
              stroke="#F0C0D0"
              strokeWidth="0.8"
            />

            {/* Glass reflection */}
            <path
              d="M22 30 Q17 32 15 45 L12 115 Q12 140 35 145 L75 145 Q98 140 98 115 L95 45 Q93 32 88 30 Z"
              fill="url(#jarGlass)"
            />

            {/* Left glass shine */}
            <path
              d="M26 38 Q23 38 22 48 L20 108 Q20 128 32 133"
              fill="none"
              stroke="white"
              strokeWidth="3"
              opacity="0.35"
              strokeLinecap="round"
            />

            {/* Pink ribbon bow */}
            <g transform="translate(34, 24)">
              {/* Left bow loop */}
              <ellipse cx="6" cy="3" rx="8" ry="5" fill="#F9A8BE" opacity="0.8" />
              {/* Right bow loop */}
              <ellipse cx="36" cy="3" rx="8" ry="5" fill="#F9A8BE" opacity="0.8" />
              {/* Center knot */}
              <rect x="18" y="0" width="6" height="6" rx="2" fill="#F48BA5" />
              {/* Ribbon tails */}
              <path d="M20 6 L16 14" stroke="#F48BA5" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 6 L26 14" stroke="#F48BA5" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Photos inside jar */}
            {shownMemories.length < memories.length && (
              <g transform="translate(30, 75)" opacity="0.7">
                <rect x="3" y="8" width="16" height="13" fill="white" rx="1" transform="rotate(-12, 11, 14)" />
                <rect x="5" y="10" width="12" height="9" fill="#E8C9A0" rx="0.5" transform="rotate(-12, 11, 14)" />
                <rect x="22" y="3" width="16" height="13" fill="white" rx="1" transform="rotate(8, 30, 10)" />
                <rect x="24" y="5" width="12" height="9" fill="#D4A574" rx="0.5" transform="rotate(8, 30, 10)" />
                <rect x="12" y="22" width="16" height="13" fill="white" rx="1" transform="rotate(-5, 20, 28)" />
                <rect x="14" y="24" width="12" height="9" fill="#F9B8CB" rx="0.5" transform="rotate(-5, 20, 28)" />
              </g>
            )}

            {/* Sparkle when tappable */}
            {shownMemories.length < memories.length && (
              <g>
                <motion.circle
                  cx="55" cy="60" r="2"
                  fill="white"
                  animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.circle
                  cx="40" cy="80" r="1.5"
                  fill="white"
                  animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                />
                <motion.circle
                  cx="68" cy="70" r="1.5"
                  fill="white"
                  animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1.3 }}
                />
              </g>
            )}
          </svg>
        </motion.div>

        {/* Tap hint */}
        {shownMemories.length === 0 && (
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M2 2 L10 9 L18 2" stroke="#A09080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Open the letter button */}
      <motion.button
        className="mt-6 sm:mt-8 md:mt-10 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-sm font-sans text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-[#8B7355] uppercase transition-all duration-200"
        style={{
          background: "linear-gradient(180deg, #FDFCF8 0%, #F5F0E1 100%)",
          border: "1px solid rgba(180, 160, 130, 0.2)",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
        whileTap={{ scale: 0.97 }}
      >
        OPEN THE LETTER →
      </motion.button>
    </motion.div>
  );
}
