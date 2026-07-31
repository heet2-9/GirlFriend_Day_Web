"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   MemoryVideo — A Polaroid-style card that plays a video.
   Matches the look of PolaroidPhoto (white card, shadow, masking
   tape, heart sticker, caption) optimized purely for video.
   ───────────────────────────────────────────────────────────── */

interface MemoryVideoProps {
  /** Path to the video file (e.g. /videos/memory-1.mp4) */
  videoSrc: string;
  /** Optional path to a poster / thumbnail image */
  posterSrc?: string;
  /** Caption shown below the video */
  caption?: string;
  /** Rotation angle for the Polaroid tilt (-5 to 5) */
  rotation?: number;
  /** Whether this video memory is currently the active/visible one */
  isActive: boolean;
  /** Called when the video finishes playing */
  onEnded?: () => void;
}

export default function MemoryVideo({
  videoSrc,
  posterSrc,
  caption,
  rotation = -3,
  isActive,
  onEnded,
}: MemoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ── Player state ─────────────────────────────────────────── */
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  /** If the video source fails to load, we show a friendly fallback */
  const [hasError, setHasError] = useState(false);

  /** Timer to auto-hide the play/pause overlay */
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Reset error state if videoSrc changes ────────────────── */
  useEffect(() => {
    setHasError(false);
  }, [videoSrc]);

  /* ── Auto-play when this memory becomes active ────────────── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive && !hasError) {
      // Reset and autoplay silently
      v.currentTime = 0;
      v.muted = true;
      setIsMuted(true);
      
      const attemptPlay = () => {
        v.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {
          // Autoplay blocked — stay on poster/first frame
          setIsPlaying(false);
        });
      };

      if (v.readyState >= 2) {
        attemptPlay();
      } else {
        const onCanPlay = () => {
          attemptPlay();
          v.removeEventListener("canplay", onCanPlay);
        };
        v.addEventListener("canplay", onCanPlay);
        return () => v.removeEventListener("canplay", onCanPlay);
      }
    } else if (!isActive) {
      // Pause & reset when navigated away
      v.pause();
      v.currentTime = 0;
      setIsPlaying(false);
      setHasStarted(false);
      setProgress(0);
      setShowOverlay(true);
    }
  }, [isActive, hasError]);

  /* ── Cleanup on unmount ───────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    };
  }, []);

  /* ── Overlay auto-hide logic ──────────────────────────────── */
  const resetOverlayTimer = useCallback(() => {
    setShowOverlay(true);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    if (isPlaying) {
      overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 2500);
    }
  }, [isPlaying]);

  /* ── Toggle play / pause ──────────────────────────────────── */
  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
    resetOverlayTimer();
  }, [resetOverlayTimer]);

  /* ── Toggle mute ──────────────────────────────────────────── */
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  /* ── Video event: timeupdate → progress bar ───────────────── */
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (v && v.duration) {
      setProgress((v.currentTime / v.duration) * 100);
    }
  }, []);

  /* ── Video event: ended → notify parent ───────────────────── */
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setShowOverlay(true);
    onEnded?.();
  }, [onEnded]);

  /* ── Video event: error ───────────────────────────────────── */
  const handleError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
    setHasStarted(false);
  }, []);

  /* ── Tap on video area shows overlay / toggles play ───────── */
  const handleVideoAreaTap = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasStarted) {
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {});
        setIsPlaying(true);
        setHasStarted(true);
        resetOverlayTimer();
      }
    } else {
      togglePlay(e);
    }
  }, [hasStarted, togglePlay, resetOverlayTimer]);

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.2, opacity: 0, rotate: rotation * 3, y: 120 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, y: -60, rotate: rotation * -2 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 100, damping: 14 }}
    >
      <div
        className="bg-white p-3 pb-14 sm:p-4 sm:pb-16 md:p-5 md:pb-20 shadow-xl rounded-sm relative"
        style={{
          transform: `rotate(${rotation}deg)`,
          boxShadow: "0 8px 25px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Video area ────────────────────────────────────────── */}
        <div
          className="w-52 h-40 sm:w-64 sm:h-52 md:w-80 md:h-64 bg-[#F5F0E1]/40 overflow-hidden rounded-sm relative cursor-pointer flex items-center justify-center"
          onClick={handleVideoAreaTap}
          onMouseMove={resetOverlayTimer}
          role="button"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          tabIndex={0}
        >
          {!hasError ? (
            <video
              ref={videoRef}
              className="w-full h-full object-contain object-center"
              src={videoSrc}
              poster={posterSrc}
              preload="metadata"
              muted={isMuted}
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onError={handleError}
              aria-label={caption || "Video memory"}
            />
          ) : posterSrc ? (
            <img
              src={posterSrc}
              alt={caption || "Video memory"}
              className="w-full h-full object-contain object-center"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F48BA5]/20 flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#F48BA5">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
              </div>
              <p className="font-[var(--font-hand)] text-xs text-[#8B7355]">Video Memory</p>
            </div>
          )}

          {/* ── Play button overlay (before start) ─────────────── */}
          {!hasStarted && !hasError && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{
                background: "linear-gradient(180deg, rgba(92,64,51,0.05) 0%, rgba(92,64,51,0.2) 100%)",
              }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="18" height="20" viewBox="0 0 24 28" fill="none" className="ml-0.5">
                  <path
                    d="M3 1.5L22 14L3 26.5V1.5Z"
                    fill="white"
                    fillOpacity="0.95"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* ── Play/Pause overlay (while playing) ─────────────── */}
          {hasStarted && showOverlay && !hasError && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <rect x="5" y="3" width="5" height="18" rx="1" />
                    <rect x="14" y="3" width="5" height="18" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                    <path d="M6 3.5L20 12L6 20.5V3.5Z" />
                  </svg>
                )}
              </div>
            </motion.div>
          )}

          {/* ── Mute/Unmute button ─────────────────────────────── */}
          {hasStarted && !hasError && (
            <button
              className="absolute bottom-1.5 right-1.5 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-opacity focus-visible:outline-2 focus-visible:outline-white/60"
              style={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(4px)",
              }}
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.33-1.71-.7L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-3.02zM14 3.23v.06c0 .38.25.71.61.85C17.18 5.54 19 8.06 19 11s-1.82 5.46-4.39 6.86c-.36.2-.61.49-.61.85v.06c0 .63.63 1.08 1.22.85C18.6 18.11 21 14.83 21 11s-2.4-7.11-5.78-8.4C14.63 2.36 14 2.79 14 3.23z" />
                </svg>
              )}
            </button>
          )}

          {/* ── Progress bar ───────────────────────────────────── */}
          {hasStarted && !hasError && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <motion.div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #FFB6C1, #F48BA5)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          )}
        </div>

        {/* ── Caption ─────────────────────────────────────────── */}
        {caption && (
          <p className="absolute bottom-3.5 sm:bottom-4 md:bottom-5 left-0 right-0 text-center font-[var(--font-hand)] text-xs sm:text-base md:text-lg text-[#8B7355]">
            {caption}
          </p>
        )}

        {/* ── Heart sticker decoration ────────────────────────── */}
        <motion.div
          className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F48BA5" className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* ── Masking tape at top center ──────────────────────── */}
        <div
          className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-14 md:w-16 h-4 sm:h-5 rounded-sm"
          style={{
            background: "linear-gradient(135deg, #D4BFA0 0%, #C4A882 50%, #B89E78 100%)",
            opacity: 0.55,
            transform: "translateX(-50%) rotate(-2deg)",
          }}
        />

        {/* ── Small film-strip icon ──────────────────────────── */}
        <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 z-10">
          <div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #F9B8CB 0%, #F48BA5 100%)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="sm:w-3 sm:h-3">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
