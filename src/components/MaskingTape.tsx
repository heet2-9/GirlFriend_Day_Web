"use client";

interface MaskingTapeProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: "sm" | "md";
}

export default function MaskingTape({ position, className = "", size = "md" }: MaskingTapeProps) {
  const rotations: Record<string, string> = {
    "top-left": "-rotate-[38deg]",
    "top-right": "rotate-[38deg]",
    "bottom-left": "rotate-[38deg]",
    "bottom-right": "-rotate-[38deg]",
  };

  const positions: Record<string, string> = {
    "top-left": "-top-2.5 -left-3.5",
    "top-right": "-top-2.5 -right-3.5",
    "bottom-left": "-bottom-2.5 -left-3.5",
    "bottom-right": "-bottom-2.5 -right-3.5",
  };

  const sizes = {
    sm: "w-10 h-4 md:w-11 md:h-[18px]",
    md: "w-12 h-5 md:w-14 md:h-[22px]",
  };

  return (
    <div
      className={`absolute ${positions[position]} ${rotations[position]} ${className} z-10`}
    >
      <div
        className={`${sizes[size]} rounded-[1px]`}
        style={{
          background: "linear-gradient(145deg, rgba(212, 191, 160, 0.7) 0%, rgba(196, 168, 130, 0.65) 40%, rgba(184, 158, 120, 0.6) 100%)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 0 8px rgba(255,255,255,0.15)",
          backdropFilter: "blur(1px)",
        }}
      />
    </div>
  );
}
