"use client";

import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import wheel from "@/public/assets/wheel.png";
import { markIntroReady } from "@/lib/intro";

// Full-screen splash shown while the car model and textures stream in.
const Loader = () => {
  const { active, progress } = useProgress();
  const [hidden, setHidden] = useState(false);
  const done = !active && progress === 100;

  useEffect(() => {
    if (!done) return;
    // Start the hero entrance and intro camera move as the splash fades out.
    markIntroReady();
    const timeout = setTimeout(() => setHidden(true), 500);
    return () => clearTimeout(timeout);
  }, [done]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background transition-opacity duration-500 ease-out ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        className="object-contain [animation-duration:1.4s] motion-safe:animate-spin dark:invert"
        src={wheel}
        alt=""
        width={64}
        height={64}
        loading="eager"
        priority
      />
      <div className="h-px w-48 overflow-hidden bg-foreground/10">
        <div
          className="h-full origin-left bg-red-500 transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Warming up · {Math.round(progress)}%
      </p>
    </div>
  );
};

export default Loader;
