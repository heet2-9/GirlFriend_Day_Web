"use client";

import { motion } from "framer-motion";

interface PolaroidPhotoProps {
  imageSrc: string;
  caption?: string;
  rotation?: number;
  onClose?: () => void;
}

export default function PolaroidPhoto({
  imageSrc,
  caption,
  rotation = -3,
  onClose,
}: PolaroidPhotoProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ scale: 0.2, opacity: 0, rotate: rotation * 3, y: 120 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, y: -60, rotate: rotation * -2 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 100, damping: 14 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    >
      <div
        className="bg-white p-3 pb-14 md:p-4 md:pb-16 shadow-xl rounded-sm relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
        }}
      >
        {/* Photo */}
        <div className="w-52 h-40 md:w-64 md:h-48 bg-gray-100 overflow-hidden rounded-sm">
          <img
            src={imageSrc}
            alt={caption || "Memory"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Caption */}
        {caption && (
          <p className="absolute bottom-4 left-0 right-0 text-center font-[var(--font-hand)] text-sm md:text-base text-[#8B7355]">
            {caption}
          </p>
        )}

        {/* Heart sticker decoration */}
        <motion.div
          className="absolute -top-3 -right-3"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#F48BA5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Masking tape at top center */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm"
          style={{
            background: "linear-gradient(135deg, #D4BFA0 0%, #C4A882 50%, #B89E78 100%)",
            opacity: 0.55,
            transform: "translateX(-50%) rotate(-2deg)",
          }}
        />
      </div>
    </motion.div>
  );
}
