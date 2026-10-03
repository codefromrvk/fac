"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Scene from "@/components/home/scene";
import { INTRO_CAMERA } from "@/components/home/choreography";

export default function Home() {
  return (
    <main className="fixed inset-0">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: INTRO_CAMERA, fov: 35 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
    </main>
  );
}
