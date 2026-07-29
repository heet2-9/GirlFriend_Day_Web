"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface ScratchCardProps {
  revealText: string;
  width?: number;
  height?: number;
  index: number;
}

export default function ScratchCard({
  revealText,
  width = 340,
  height = 80,
  index,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMouseDown = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

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
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
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

    // Sample every 4th pixel for performance
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
    ctx.fillText("Scratch Me", width / 2, height / 2);
  }, [width, height]);

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
      // Check reveal every 8 scratch moves for perf
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
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
      style={{ width, height }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Hidden message underneath */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #FFF5F7 0%, #FFFFFF 50%, #FFF0F3 100%)",
          border: "1px solid rgba(249, 184, 203, 0.3)",
          boxShadow: isRevealed ? "0 4px 15px rgba(249, 184, 203, 0.2)" : "none",
          transition: "box-shadow 0.5s ease",
        }}
      >
        <p className="font-[var(--font-cursive)] text-lg md:text-xl text-[#D4607A] text-center px-6 font-semibold">
          {revealText}
        </p>
      </div>

      {/* Scratch canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-2xl"
        style={{
          width,
          height,
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
    </motion.div>
  );
}
