"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaskingTape from "./MaskingTape";
import MemoryVideo from "./MemoryVideo";

/* ─────────────────────────────────────────────────────────────
   CONFIGURABLE — Video Memory Items
   To change your videos or captions, simply update the array below.
   Place your .mp4 video files into public/videos/
   (e.g. public/videos/memory-1.mp4).
   ───────────────────────────────────────────────────────────── */

interface MemoryItem {
  src: string;
  caption: string;
  poster?: string;
  rotation?: number;
}

const memories: MemoryItem[] = [
  {
    src: "/videos/memory-1.mp4",
    caption: "Our beautiful moment ❤️",
    rotation: -4,
  },
  {
    src: "/videos/memory-2.mp4",
    caption: "Forever together 💕",
    rotation: 3,
  },
  {
    src: "/videos/memory-3.mp4",
    caption: "Every memory with you ✨",
    rotation: -2,
  },
  {
    src: "/videos/memory-4.mp4",
    caption: "My favorite person 🥹",
    rotation: 5,
  },
  {
    src: "/videos/memory-5.mp4",
    caption: "You are my happiness ❤️",
    rotation: -3,
  },
];

/** Delay (ms) before auto-advancing after a video ends */
const AUTO_ADVANCE_DELAY = 1200;

/* ─────────────────────────────────────────────────────────────
   INTERFACE
   ───────────────────────────────────────────────────────────── */

interface MemoryJarScreenProps {
  onNext: () => void;
}

/* ─────────────────────────────────────────────────────────────
   SLIDE DIRECTION — for prev / next transitions
   ───────────────────────────────────────────────────────────── */

type SlideDirection = "next" | "prev" | "initial";

const slideVariants = {
  enter: (direction: SlideDirection) => ({
    x: direction === "next" ? 80 : direction === "prev" ? -80 : 0,
    scale: 0.2,
    opacity: 0,
    y: direction === "initial" ? 120 : 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    y: 0,
  },
  exit: (direction: SlideDirection) => ({
    x: direction === "next" ? -80 : direction === "prev" ? 80 : 0,
    scale: 0.2,
    opacity: 0,
    y: direction === "initial" ? -60 : 0,
  }),
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

export default function MemoryJarScreen({ onNext }: MemoryJarScreenProps) {
  /** -1 = no memory open (show jar), 0…n = active memory index */
  const [currentMemory, setCurrentMemory] = useState(-1);
  /** Track which memories have been "pulled from jar" */
  const [shownMemories, setShownMemories] = useState<number[]>([]);
  /** Direction for slide transition */
  const [direction, setDirection] = useState<SlideDirection>("initial");
  /** Auto-advance timer ref */
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Clear any pending auto-advance timer ─────────────────── */
  const clearAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  }, []);

  /* ── Tap the jar → reveal first unseen memory ─────────────── */
  const handleJarClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextIdx = shownMemories.length;
      if (nextIdx < memories.length) {
        setDirection("initial");
        setCurrentMemory(nextIdx);
        setShownMemories((prev) => [...prev, nextIdx]);
      }
    },
    [shownMemories],
  );

  /* ── Close popup → back to jar ────────────────────────────── */
  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      clearAutoAdvance();
      setCurrentMemory(-1);
    },
    [clearAutoAdvance],
  );

  /* ── Navigate to next memory ──────────────────────────────── */
  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      clearAutoAdvance();
      if (currentMemory < memories.length - 1) {
        const nextIdx = currentMemory + 1;
        setDirection("next");
        setCurrentMemory(nextIdx);
        if (!shownMemories.includes(nextIdx)) {
          setShownMemories((prev) => [...prev, nextIdx]);
        }
      }
    },
    [currentMemory, shownMemories, clearAutoAdvance],
  );

  /* ── Navigate to previous memory ──────────────────────────── */
  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      clearAutoAdvance();
      if (currentMemory > 0) {
        setDirection("prev");
        setCurrentMemory(currentMemory - 1);
      }
    },
    [currentMemory, clearAutoAdvance],
  );

  /* ── Video ended → auto-advance after delay ───────────────── */
  const handleVideoEnded = useCallback(() => {
    clearAutoAdvance();
    if (currentMemory < memories.length - 1) {
      autoAdvanceRef.current = setTimeout(() => {
        setDirection("next");
        setCurrentMemory((prev) => {
          const nextIdx = prev + 1;
          setShownMemories((shown) =>
            shown.includes(nextIdx) ? shown : [...shown, nextIdx],
          );
          return nextIdx;
        });
      }, AUTO_ADVANCE_DELAY);
    }
  }, [currentMemory, clearAutoAdvance]);

  /* ── Whether popup is open ────────────────────────────────── */
  const isPopupOpen = currentMemory >= 0;
  const currentItem = isPopupOpen ? memories[currentMemory] : null;

  /* ── Remaining items in jar ──────────────────────────────── */
  const remainingInJar = memories.length - shownMemories.length;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Title with masking tape ──────────────────────────── */}
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
            Our Video Memories
          </h2>
          <p className="font-[var(--font-hand)] text-xs sm:text-sm md:text-base text-[#A09080] text-center mt-1">
            {isPopupOpen
              ? "Every moment with you is my favorite memory"
              : "Tap the jar to watch our video memories"}
          </p>
        </div>
      </motion.div>

      {/* ── Memory display area (popup OR jar) ───────────────── */}
      <div className="min-h-[310px] sm:min-h-[370px] md:min-h-[440px] flex items-center justify-center mb-3 sm:mb-4 relative w-full max-w-xl">
        <AnimatePresence mode="wait" custom={direction}>
          {isPopupOpen && currentItem ? (
            <motion.div
              key={`memory-${currentMemory}`}
              className="relative flex flex-col items-center"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.55,
                type: "spring",
                stiffness: 120,
                damping: 16,
              }}
            >
              {/* ── Close button (✕) ────────────────────────── */}
              <motion.button
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md transition-all focus-visible:outline-2 focus-visible:outline-pink-heart"
                style={{
                  background: "linear-gradient(180deg, #FDFCF8 0%, #F5F0E1 100%)",
                  border: "1px solid rgba(180,160,130,0.2)",
                }}
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close memory"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </motion.button>

              {/* ── Render Video Memory ────────────────────── */}
              <MemoryVideo
                videoSrc={currentItem.src}
                posterSrc={currentItem.poster}
                caption={currentItem.caption}
                rotation={currentItem.rotation}
                isActive={isPopupOpen}
                onEnded={handleVideoEnded}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* ── Navigation arrows ──────────────────────────────── */}
        <AnimatePresence>
          {isPopupOpen && (
            <>
              {/* Previous arrow */}
              <motion.button
                className="absolute left-0 sm:left-2 md:left-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-pink-heart"
                style={{
                  background: "linear-gradient(180deg, #FDFCF8 0%, #F5F0E1 100%)",
                  border: "1px solid rgba(180,160,130,0.2)",
                  opacity: currentMemory === 0 ? 0.35 : 1,
                  cursor: currentMemory === 0 ? "default" : "pointer",
                }}
                onClick={currentMemory > 0 ? handlePrev : undefined}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                whileHover={currentMemory > 0 ? { scale: 1.08 } : undefined}
                whileTap={currentMemory > 0 ? { scale: 0.93 } : undefined}
                aria-label="Previous memory"
                disabled={currentMemory === 0}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>

              {/* Next arrow */}
              <motion.button
                className="absolute right-0 sm:right-2 md:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-pink-heart"
                style={{
                  background: "linear-gradient(180deg, #FDFCF8 0%, #F5F0E1 100%)",
                  border: "1px solid rgba(180,160,130,0.2)",
                  opacity: currentMemory === memories.length - 1 ? 0.35 : 1,
                  cursor: currentMemory === memories.length - 1 ? "default" : "pointer",
                }}
                onClick={currentMemory < memories.length - 1 ? handleNext : undefined}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                whileHover={currentMemory < memories.length - 1 ? { scale: 1.08 } : undefined}
                whileTap={currentMemory < memories.length - 1 ? { scale: 0.93 } : undefined}
                aria-label="Next memory"
                disabled={currentMemory === memories.length - 1}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Counter ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="flex items-center justify-center gap-1.5 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {memories.map((_, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentMemory ? 18 : 6,
                    height: 6,
                    borderRadius: idx === currentMemory ? 3 : 3,
                    background:
                      idx === currentMemory
                        ? "linear-gradient(90deg, #F48BA5, #FFB6C1)"
                        : shownMemories.includes(idx)
                          ? "rgba(244,139,165,0.35)"
                          : "rgba(160,144,128,0.2)",
                  }}
                  layout
                />
              ))}
            </div>
            <span className="font-[var(--font-hand)] text-xs sm:text-sm text-[#A09080] ml-2">
              {currentMemory + 1} / {memories.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Memory Jar — SVG Glass Jar ──────────────────────── */}
      <AnimatePresence>
        {!isPopupOpen && (
          <motion.div
            className="cursor-pointer relative"
            onClick={handleJarClick}
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.03 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="90"
                height="125"
                viewBox="0 0 110 150"
                className="sm:w-[100px] sm:h-[135px] md:w-[130px] md:h-[175px] drop-shadow-sm"
              >
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

                {/* Film strips inside jar */}
                {remainingInJar > 0 && (
                  <g transform="translate(30, 75)" opacity="0.75">
                    {/* Video strip 1 */}
                    <rect x="3" y="8" width="16" height="13" fill="white" rx="1" transform="rotate(-12, 11, 14)" />
                    <rect x="5" y="10" width="12" height="9" fill="#F9B8CB" rx="0.5" transform="rotate(-12, 11, 14)" />
                    <path d="M10 12 L14 14.5 L10 17 Z" fill="white" transform="rotate(-12, 11, 14)" />

                    {/* Video strip 2 */}
                    <rect x="22" y="3" width="16" height="13" fill="white" rx="1" transform="rotate(8, 30, 10)" />
                    <rect x="24" y="5" width="12" height="9" fill="#D4A574" rx="0.5" transform="rotate(8, 30, 10)" />
                    <path d="M29 7 L33 9.5 L29 12 Z" fill="white" transform="rotate(8, 30, 10)" />

                    {/* Video strip 3 */}
                    <rect x="12" y="22" width="16" height="13" fill="white" rx="1" transform="rotate(-5, 20, 28)" />
                    <rect x="14" y="24" width="12" height="9" fill="#F48BA5" rx="0.5" transform="rotate(-5, 20, 28)" />
                    <path d="M19 26 L23 28.5 L19 31 Z" fill="white" transform="rotate(-5, 20, 28)" />
                  </g>
                )}

                {/* Sparkle when tappable */}
                {remainingInJar > 0 && (
                  <g>
                    <motion.circle
                      cx="55"
                      cy="60"
                      r="2"
                      fill="white"
                      animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.circle
                      cx="40"
                      cy="80"
                      r="1.5"
                      fill="white"
                      animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                    />
                    <motion.circle
                      cx="68"
                      cy="70"
                      r="1.5"
                      fill="white"
                      animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.1, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 1.3 }}
                    />
                  </g>
                )}

                {/* All opened check */}
                {remainingInJar === 0 && (
                  <g>
                    <text x="55" y="90" textAnchor="middle" fill="#F48BA5" fontSize="10" fontFamily="var(--font-hand)" opacity="0.6">
                      ✓
                    </text>
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
                  <path
                    d="M2 2 L10 9 L18 2"
                    stroke="#A09080"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}

            {/* Remaining count badge */}
            {shownMemories.length > 0 && remainingInJar > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F48BA5, #E8789A)",
                  boxShadow: "0 2px 6px rgba(244,139,165,0.35)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-white text-[9px] sm:text-[10px] font-sans font-semibold">
                  {remainingInJar}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Open the letter button ──────────────────────────── */}
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
