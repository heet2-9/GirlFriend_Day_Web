"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  symbol: string;
}

const STORAGE_KEY = "gf_web_bg_music_enabled";
const TARGET_VOLUME = 0.3;
const FADE_DURATION = 1000; // 1 second fade in/out

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearIntervalSafely = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeInPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearIntervalSafely();
    setIsPlaying(true);
    localStorage.setItem(STORAGE_KEY, "true");

    if (audio.paused) {
      audio.volume = 0;
      audio.play().catch((err) => {
        console.warn("Audio playback require interaction:", err);
        setIsPlaying(false);
      });
    }

    const stepMs = 50;
    const steps = FADE_DURATION / stepMs;
    const volumeStep = TARGET_VOLUME / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume + volumeStep >= TARGET_VOLUME) {
        audioRef.current.volume = TARGET_VOLUME;
        clearIntervalSafely();
      } else {
        audioRef.current.volume = Math.min(
          TARGET_VOLUME,
          audioRef.current.volume + volumeStep
        );
      }
    }, stepMs);
  }, []);

  const fadeOutPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearIntervalSafely();
    setIsPlaying(false);
    localStorage.setItem(STORAGE_KEY, "false");

    const stepMs = 50;
    const steps = FADE_DURATION / stepMs;
    const volumeStep = (audio.volume || TARGET_VOLUME) / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume - volumeStep <= 0.02) {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        clearIntervalSafely();
      } else {
        audioRef.current.volume = Math.max(
          0,
          audioRef.current.volume - volumeStep
        );
      }
    }, stepMs);
  }, []);

  // Initialize single audio instance lazily
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/music/music.mp3");
      audio.loop = true;
      audio.volume = 0;
      audio.preload = "auto";
      audioRef.current = audio;
    }

    const savedPref = localStorage.getItem(STORAGE_KEY);
    if (savedPref === "true") {
      const handleFirstInteraction = () => {
        if (
          localStorage.getItem(STORAGE_KEY) === "true" &&
          audioRef.current &&
          audioRef.current.paused
        ) {
          fadeInPlay();
        }
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("touchstart", handleFirstInteraction, {
        once: true,
      });
    }

    return () => {
      clearIntervalSafely();
    };
  }, [fadeInPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      fadeOutPause();
    } else {
      fadeInPlay();
    }
  };

  // Emit floating particle notes/hearts periodically when playing
  useEffect(() => {
    if (!isPlaying) {
      setParticles([]);
      return;
    }

    const symbols = ["🎵", "🎶", "❤️", "💕", "✨"];
    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: (Math.random() - 0.5) * 36,
        size: Math.random() * 6 + 12,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };

      setParticles((prev) => [...prev.slice(-3), newParticle]);
    }, 1600);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-7 right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
      {/* Floating particles effect */}
      <div className="relative w-full h-0 pointer-events-none">
        <AnimatePresence>
          {isPlaying &&
            particles.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0.9, y: 0, x: p.x, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: 0,
                  y: -55 - Math.random() * 15,
                  x: p.x + (Math.random() - 0.5) * 25,
                  scale: 1.2,
                  rotate: (Math.random() - 0.5) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                style={{ fontSize: `${p.size}px` }}
                className="absolute right-4 bottom-2 select-none pointer-events-none filter drop-shadow-sm"
              >
                {p.symbol}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Gentle Tooltip prompt */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-2 mr-1 px-3.5 py-1.5 rounded-full bg-cream-light/95 backdrop-blur-md border border-pink-200/90 shadow-md shadow-pink-500/10 text-xs font-sans text-text-dark font-medium flex items-center gap-1.5 pointer-events-none whitespace-nowrap"
          >
            <span>Play Our Song</span>
            <span className="text-pink-500 text-sm animate-pulse">❤️</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Toggle Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
        className={`relative group p-3.5 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-pink-200/80 shadow-lg ${isPlaying
          ? "bg-gradient-to-br from-pink-100/90 to-cream-light/95 shadow-pink-400/30 ring-2 ring-pink-300/40"
          : "bg-cream-light/90 hover:bg-pink-50/90 shadow-pink-500/15"
          }`}
      >
        {/* Soft glowing ambient ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-pink-400 pointer-events-none" />
        )}

        {/* Music icon */}
        <div
          className={`transition-transform duration-700 flex items-center justify-center ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""
            }`}
        >
          <svg
            className={`w-6 h-6 transition-colors fill-current drop-shadow-sm ${isPlaying ? "text-pink-500" : "text-text-soft group-hover:text-pink-500"
              }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>

        {/* Active playback pulse badge */}
        {isPlaying && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
