"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useGLTF,
  useScroll,
} from "@react-three/drei";

import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Group, Object3D, RepeatWrapping, TextureLoader } from "three";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Loader from "@/components/Loader";
import wheel from "@/public/wheel.png";
import Overlay from "@/components/home/overlay";
import Ground from "@/components/home/ground";
import Car from "@/components/home/car";

useGLTF.preload("/toyota.glb");

export default function Home() {
  // return <Overlay />;
  const createRotatedGroup = (angle: number): Group => {
    const group = new Group();
    group.rotateY(angle);
    return group;
  };
  return (
    <div>
      <section className=" absolute h-screen flex w-full  overflow-hidden  ">
        <Suspense fallback={<Loader />}>
          <Canvas  >
            <ambientLight />
            <spotLight position={[0, 30, 20]} color="white" intensity={2} />
            <pointLight position={[-10, -10, -10]} />
            <spotLight
              color={[1, 0.25, 0.7]}
              intensity={1.5}
              angle={0.6}
              penumbra={0.5}
              position={[5, 5, 0]}
              castShadow
              shadow-bias={-0.0001}
            />
            <spotLight
              color={[0.14, 0.5, 1]}
              intensity={2}
              angle={0.6}
              penumbra={0.5}
              position={[-5, 5, 0]}
              castShadow
              // shadow-bias={-0.0001}
            
            />
            {/* <ScrollControls pages={3} damping={0.25}> */}
            {/* <Overlay /> */}
            <Car />
            {/* </ScrollControls> */}
            {/* <OrbitControls
              target={[0, 0.25, 0]}
              // minPolarAngle={1.5}
              // maxPolarAngle={1.5}
              enableZoom={false}
            /> */}
 

            <PerspectiveCamera makeDefault fov={80} position={[0, 16, 10]} />

            {/* <Ground /> */}
          </Canvas>
        </Suspense>
      </section>
      <Overlay />
    </div>
  );
}
