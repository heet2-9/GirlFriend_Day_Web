"use client";

import { motion } from "framer-motion";

interface EnvelopeScreenProps {
  onNext: () => void;
}

export default function EnvelopeScreen({ onNext }: EnvelopeScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onNext}
    >
      {/* Sticky Note - Top Right */}
      <motion.div
        className="absolute top-20 right-4 md:top-24 md:right-12 z-30"
        initial={{ rotate: 15, scale: 0, opacity: 0 }}
        animate={{ rotate: 3, scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: "spring", stiffness: 180 }}
      >
        <div
          className="px-5 py-3.5 shadow-md relative"
          style={{
            background: "linear-gradient(145deg, #FFF9C4 0%, #FFF59D 40%, #FFEE58 100%)",
            borderRadius: "2px",
          }}
        >
          {/* Tape on top of sticky */}
          <div
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 opacity-50 rounded-sm"
            style={{ background: "linear-gradient(135deg, #D4BFA0, #C4A882)" }}
          />
          <span className="font-[var(--font-cursive)] text-lg md:text-xl text-[#6B5B3A] font-semibold">
            For My Cutie :)
          </span>
        </div>
      </motion.div>

      {/* Main Envelope Assembly */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[380px] flex items-center justify-center">
        
        {/* Letter (pops up from envelope) */}
        <motion.div
          className="absolute z-10"
          style={{ top: "0%", left: "50%", transform: "translateX(-50%)" }}
          initial={{ y: 100, opacity: 0, rotate: -1 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="w-[240px] md:w-[320px] rounded-lg p-6 md:p-8 relative shadow-sm"
            style={{
              background: "linear-gradient(180deg, #FFFEF7 0%, #FBF8EE 100%)",
              border: "1px solid rgba(200, 180, 155, 0.2)",
            }}
          >
            {/* Floating hearts on the letter */}
            <motion.div
              className="absolute -top-3 left-6"
              animate={{ y: [0, -4, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F9B0C4">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute -top-2 right-8"
              animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB6C1">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            {/* Letter text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="text-center"
            >
              <p className="font-[var(--font-cursive)] text-2xl md:text-3xl text-[#5C4033] font-bold mb-3">
                Hey, Babe!
              </p>
              <p className="font-[var(--font-cursive)] text-base md:text-lg text-[#8B7355] leading-relaxed">
                I made a little surprise
              </p>
              <p className="font-[var(--font-cursive)] text-base md:text-lg text-[#8B7355] leading-relaxed">
                just for you...
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Envelope */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg
            width="300"
            height="180"
            viewBox="0 0 300 180"
            className="md:w-[380px] md:h-[220px] drop-shadow-md"
          >
            <defs>
              <linearGradient id="envBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8C9A0" />
                <stop offset="100%" stopColor="#D4A574" />
              </linearGradient>
              <linearGradient id="envFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EDD5B0" />
                <stop offset="100%" stopColor="#DEBB8A" />
              </linearGradient>
              <linearGradient id="envFlap" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#D4A574" />
                <stop offset="100%" stopColor="#C8975E" />
              </linearGradient>
            </defs>

            {/* Envelope back panel */}
            <rect x="8" y="30" width="284" height="142" rx="6" fill="url(#envBody)" />

            {/* Envelope front panel (bottom triangle) */}
            <path d="M8 30 L150 120 L292 30 L292 172 L8 172 Z" fill="url(#envFront)" />

            {/* Fold line */}
            <path d="M8 30 L150 120 L292 30" fill="none" stroke="#C8975E" strokeWidth="0.8" opacity="0.5" />

            {/* Envelope flap (opened, folded back) */}
            <path d="M8 32 L150 -25 L292 32 Z" fill="url(#envFlap)" opacity="0.75" />
            <path d="M8 32 L150 -25 L292 32" fill="none" stroke="#B8895A" strokeWidth="0.5" opacity="0.4" />

            {/* Heart seal on front */}
            <g transform="translate(138, 105)">
              <path
                d="M12 20 C12 20 1 13 1 7.5 C1 3.5 3.8 1 6.5 1 C8.5 1 10 2.2 12 4.5 C14 2.2 15.5 1 17.5 1 C20.2 1 23 3.5 23 7.5 C23 13 12 20 12 20Z"
                fill="#F48BA5"
              />
              {/* Heart shine */}
              <ellipse cx="8" cy="6" rx="3" ry="3.5" fill="white" opacity="0.2" transform="rotate(-15,8,6)" />
            </g>

            {/* Envelope texture lines */}
            <line x1="20" y1="145" x2="130" y2="145" stroke="#C8975E" strokeWidth="0.3" opacity="0.3" />
            <line x1="20" y1="155" x2="100" y2="155" stroke="#C8975E" strokeWidth="0.3" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Cute bunny sticker */}
        <motion.div
          className="absolute z-30"
          style={{ bottom: "5%", right: "-8%" }}
          initial={{ scale: 0, rotate: 20 }}
          animate={{ scale: 1, rotate: 5 }}
          transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="70" height="85" viewBox="0 0 70 85">
              {/* Ears */}
              <ellipse cx="24" cy="14" rx="7" ry="15" fill="#FFE8EE" />
              <ellipse cx="24" cy="14" rx="4.5" ry="11" fill="#FFB8C8" opacity="0.6" />
              <ellipse cx="46" cy="14" rx="7" ry="15" fill="#FFE8EE" />
              <ellipse cx="46" cy="14" rx="4.5" ry="11" fill="#FFB8C8" opacity="0.6" />

              {/* Head */}
              <circle cx="35" cy="38" r="20" fill="#FFE8EE" />

              {/* Body */}
              <ellipse cx="35" cy="65" rx="16" ry="14" fill="#FFE8EE" />

              {/* Blush cheeks */}
              <circle cx="22" cy="42" r="4.5" fill="#FFB8C8" opacity="0.4" />
              <circle cx="48" cy="42" r="4.5" fill="#FFB8C8" opacity="0.4" />

              {/* Eyes */}
              <circle cx="28" cy="35" r="2.5" fill="#4A3540" />
              <circle cx="42" cy="35" r="2.5" fill="#4A3540" />
              {/* Eye shines */}
              <circle cx="29.2" cy="34" r="1" fill="white" />
              <circle cx="43.2" cy="34" r="1" fill="white" />

              {/* Smile */}
              <path d="M31 44 Q35 48 39 44" fill="none" stroke="#4A3540" strokeWidth="1.3" strokeLinecap="round" />

              {/* Tiny arms */}
              <ellipse cx="19" cy="58" rx="5" ry="4" fill="#FFE8EE" transform="rotate(-20,19,58)" />
              <ellipse cx="51" cy="58" rx="5" ry="4" fill="#FFE8EE" transform="rotate(20,51,58)" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Tap to begin */}
      <motion.p
        className="mt-10 text-xs md:text-sm tracking-[0.25em] text-text-muted uppercase font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.8 }}
      >
        TAP ANYWHERE TO BEGIN
      </motion.p>
    </motion.div>
  );
}
