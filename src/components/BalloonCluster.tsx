"use client";

import { motion } from "framer-motion";

export default function BalloonCluster() {
  return (
    <div className="fixed bottom-0 left-0 z-20 pointer-events-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <motion.svg
          width="90"
          height="150"
          viewBox="0 0 90 150"
          className="md:w-[110px] md:h-[175px]"
          animate={{ rotate: [-1, 1.5, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Strings */}
          <path d="M30 150 C30 130, 28 110, 25 80 C22 60, 20 45, 22 35" stroke="#B89E78" strokeWidth="1" fill="none" />
          <path d="M40 150 C40 125, 42 105, 40 75 C38 55, 42 40, 44 25" stroke="#B89E78" strokeWidth="1" fill="none" />
          <path d="M50 150 C50 130, 55 110, 58 80 C60 60, 62 50, 60 30" stroke="#B89E78" strokeWidth="1" fill="none" />

          {/* Heart balloon 1 - back left (lighter pink) */}
          <g transform="translate(10, 8)">
            <path
              d="M14 28 C14 28 0 18 0 10 C0 4.5 3.5 1 7 1 C9.5 1 11.5 2.5 14 5 C16.5 2.5 18.5 1 21 1 C24.5 1 28 4.5 28 10 C28 18 14 28 14 28Z"
              fill="#FFD0DA"
            />
            {/* Shine */}
            <ellipse cx="9" cy="8" rx="3.5" ry="4.5" fill="white" opacity="0.25" transform="rotate(-15, 9, 8)" />
          </g>

          {/* Heart balloon 2 - center (medium pink, biggest) */}
          <g transform="translate(25, -2)">
            <path
              d="M18 36 C18 36 0 23 0 13 C0 5.5 4.5 1 9 1 C12 1 15 3 18 6.5 C21 3 24 1 27 1 C31.5 1 36 5.5 36 13 C36 23 18 36 18 36Z"
              fill="#F9A8BE"
            />
            {/* Shine */}
            <ellipse cx="11" cy="10" rx="4.5" ry="6" fill="white" opacity="0.3" transform="rotate(-15, 11, 10)" />
          </g>

          {/* Heart balloon 3 - right (deep pink) */}
          <g transform="translate(45, 6)">
            <path
              d="M15 30 C15 30 0 19 0 11 C0 5 3.5 1 7.5 1 C10 1 12 2.5 15 5.5 C18 2.5 20 1 22.5 1 C26.5 1 30 5 30 11 C30 19 15 30 15 30Z"
              fill="#F48BA5"
            />
            {/* Shine */}
            <ellipse cx="10" cy="9" rx="4" ry="5" fill="white" opacity="0.2" transform="rotate(-15, 10, 9)" />
          </g>

          {/* Small heart balloon 4 - tiny back */}
          <g transform="translate(35, 15)">
            <path
              d="M8 16 C8 16 0 10.5 0 6 C0 2.5 2 0.5 4 0.5 C5.5 0.5 6.5 1.5 8 3 C9.5 1.5 10.5 0.5 12 0.5 C14 0.5 16 2.5 16 6 C16 10.5 8 16 8 16Z"
              fill="#FFCCD8"
            />
          </g>
        </motion.svg>
      </motion.div>
    </div>
  );
}
