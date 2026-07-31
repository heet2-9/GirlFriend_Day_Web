"use client";
// Trigger HMR module refresh

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import BalloonCluster from "@/components/BalloonCluster";
import BackgroundMusic from "@/components/BackgroundMusic";
import EnvelopeScreen from "@/components/EnvelopeScreen";
import HeartBalloonScreen from "@/components/HeartBalloonScreen";
import ScratchCardScreen from "@/components/ScratchCardScreen";
import MemoryJarScreen from "@/components/MemoryJarScreen";
import LoveLetterScreen from "@/components/LoveLetterScreen";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = useCallback(() => {
    setCurrentScreen((prev) => Math.min(prev + 1, 4));
  }, []);

  return (
    <main className="relative min-h-screen bg-cream bg-grid-pattern overflow-hidden">
      {/* Persistent decorative elements */}
      <FloatingHearts />
      <BalloonCluster />
      <BackgroundMusic />

      {/* Watermark */}
      <div className="fixed bottom-3 right-4 z-50 pointer-events-none">
        <span className="text-[10px] text-text-muted/40 font-sans tracking-wide">

        </span>
      </div>

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <EnvelopeScreen key="envelope" onNext={nextScreen} />
        )}
        {currentScreen === 1 && (
          <HeartBalloonScreen key="heart" onNext={nextScreen} />
        )}
        {currentScreen === 2 && (
          <ScratchCardScreen key="scratch" onNext={nextScreen} />
        )}
        {currentScreen === 3 && (
          <MemoryJarScreen key="memory" onNext={nextScreen} />
        )}
        {currentScreen === 4 && (
          <LoveLetterScreen key="letter" />
        )}
      </AnimatePresence>
    </main>
  );
}
