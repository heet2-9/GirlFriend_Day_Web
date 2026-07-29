"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ScratchCardProps {
  leftText: string;
  rightText: string;
  batteryLevel: 0 | 50 | 100;
  batteryColor: string;
  batteryFaceColor: string;
  index: number;
}

// Battery face SVG component
function BatteryFace({
  level,
  color,
  faceColor,
}: {
  level: 0 | 50 | 100;
  color: string;
  faceColor: string;
}) {
  const fillWidth = level === 0 ? 12 : level === 50 ? 30 : 48;

  return (
    <div className="relative flex flex-col items-center">
      {/* Vibration / energy lines above battery */}
      <motion.div
        className="flex items-end justify-center gap-[3px] mb-1"
        animate={level === 100 ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M3 10 L3 6"
            stroke={faceColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={level >= 50 ? 0.8 : 0.3}
          />
          <path
            d="M9 10 L9 3"
            stroke={faceColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={level >= 50 ? 1 : 0.4}
          />
          <path
            d="M15 10 L15 6"
            stroke={faceColor}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={level >= 50 ? 0.8 : 0.3}
          />
        </svg>
      </motion.div>

      {/* Battery body */}
      <svg
        width="64"
        height="34"
        viewBox="0 0 64 34"
        fill="none"
        className="shrink-0"
      >
        {/* Battery terminal (right nub) */}
        <rect x="56" y="10" width="6" height="14" rx="2" fill="#D1D5DB" />

        {/* Battery outline */}
        <rect
          x="1"
          y="1"
          width="54"
          height="32"
          rx="6"
          stroke="#9CA3AF"
          strokeWidth="2"
          fill="white"
        />

        {/* Battery fill level */}
        <rect
          x="5"
          y="5"
          width={fillWidth}
          height="24"
          rx="3"
          fill={color}
        />

        {/* Face on battery */}
        {level === 0 && (
          /* Sad face */
          <g>
            {/* Eyes — > shape (concerned) */}
            <text
              x="16"
              y="20"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            <text
              x="26"
              y="20"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            {/* Sad mouth */}
            <path
              d="M14 24 Q21 20 28 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}
        {level === 50 && (
          /* Neutral / slight smile face */
          <g>
            <text
              x="22"
              y="20"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            <text
              x="34"
              y="20"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            {/* Slight smile */}
            <path
              d="M20 24 Q28 27 36 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}
        {level === 100 && (
          /* Happy face */
          <g>
            <text
              x="22"
              y="19"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            <text
              x="36"
              y="19"
              fontSize="9"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              •
            </text>
            {/* Big smile */}
            <path
              d="M19 22 Q28 29 39 22"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {/* Percentage text */}
      <p className="text-xs sm:text-sm text-[#5C4033] font-sans font-semibold mt-1">
        {level}%
      </p>
    </div>
  );
}

export default function ScratchCard({
  leftText,
  rightText,
  batteryLevel,
  batteryColor,
  batteryFaceColor,
  index,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 340, height: 100 });

  // Measure container and set canvas size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getPos = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e && e.touches.length > 0) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY,
        };
      }
      if ("clientX" in e) {
        return {
          x: ((e as MouseEvent).clientX - rect.left) * scaleX,
          y: ((e as MouseEvent).clientY - rect.top) * scaleY,
        };
      }
      return { x: 0, y: 0 };
    },
    []
  );

  const scratchAt = useCallback(
    (pos: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fill();
    },
    []
  );

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) transparent++;
    }

    const sampled = total / 4;
    const percent = (transparent / sampled) * 100;

    if (percent > 45) {
      setIsRevealed(true);
    }
  }, []);

  // Draw the scratch surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvasSize;
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Pink rounded rectangle background
    const radius = 18;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#FCC5D5");
    gradient.addColorStop(0.5, "#F9B8CB");
    gradient.addColorStop(1, "#F5A8BD");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Inner dashed border
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 5]);
    const inset = 8;
    const borderR = 12;
    ctx.beginPath();
    ctx.moveTo(inset + borderR, inset);
    ctx.lineTo(width - inset - borderR, inset);
    ctx.quadraticCurveTo(width - inset, inset, width - inset, inset + borderR);
    ctx.lineTo(width - inset, height - inset - borderR);
    ctx.quadraticCurveTo(width - inset, height - inset, width - inset - borderR, height - inset);
    ctx.lineTo(inset + borderR, height - inset);
    ctx.quadraticCurveTo(inset, height - inset, inset, height - inset - borderR);
    ctx.lineTo(inset, inset + borderR);
    ctx.quadraticCurveTo(inset, inset, inset + borderR, inset);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // "Scratch Me" text
    ctx.fillStyle = "rgba(92, 64, 51, 0.75)";
    ctx.font = `italic 500 20px 'Dancing Script', cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch Me ✨", width / 2, height / 2);
  }, [canvasSize]);

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scratchCount = 0;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      isMouseDown.current = true;
      const pos = getPos(e);
      scratchAt(pos);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown.current) return;
      e.preventDefault();
      const pos = getPos(e);
      scratchAt(pos);
      scratchCount++;
      if (scratchCount % 8 === 0) {
        checkReveal();
      }
    };

    const handleEnd = () => {
      if (isMouseDown.current) {
        isMouseDown.current = false;
        checkReveal();
      }
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
    };
  }, [getPos, scratchAt, checkReveal]);

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Card container with dashed pink border */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden"
        style={{
          minHeight: "100px",
          border: "2px dashed #F9B8CB",
          background: "linear-gradient(135deg, #FFFBFC 0%, #FFFFFF 50%, #FFF8FA 100%)",
        }}
      >
        {/* Revealed battery content underneath */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-3 sm:px-5 py-4 sm:py-5">
          {/* Left text */}
          <p className="font-[var(--font-cursive)] text-sm sm:text-lg text-[#5C4033] italic text-right min-w-[60px] sm:min-w-[80px]">
            {leftText}
          </p>

          {/* Battery with face */}
          <BatteryFace
            level={batteryLevel}
            color={batteryColor}
            faceColor={batteryFaceColor}
          />

          {/* Right text */}
          <p className="font-[var(--font-cursive)] text-sm sm:text-lg text-[#5C4033] italic min-w-[30px]">
            {rightText}
          </p>
        </div>

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 rounded-2xl"
          style={{
            width: "100%",
            height: "100%",
            opacity: isRevealed ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: isRevealed ? "none" : "auto",
            cursor: isRevealed ? "default" : "crosshair",
          }}
        />

        {/* Sparkle on reveal */}
        {isRevealed && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1 }}
          >
            <span className="text-2xl">✨</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
