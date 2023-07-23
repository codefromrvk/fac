"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
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
import { Object3D, RepeatWrapping, TextureLoader } from "three";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Loader from "@/components/Loader";
import wheel from "@/public/wheel.png";

useGLTF.preload("/toyota.glb");

export default function Home() {




  return (
    <div>
      <section className="flex  h-screen items-center  justify-center align-middle ">
        <Suspense  fallback={<Loader />}>
          <Canvas>
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
              shadow-bias={-0.0001}
            />
            <ScrollControls pages={3} damping={0.25}>
              <Overlay />
              <Car />
            </ScrollControls>
            {/* <OrbitControls
            target={[0, 0.35, 0]}
            // minPolarAngle={1.5}
            // maxPolarAngle={1.5}
            enableZoom={false}
          /> */}

            <PerspectiveCamera makeDefault fov={100} position={[0, 7, 8]} />

            <Ground />
          </Canvas>
        </Suspense>
      </section>
    </div>
  );
}

const Car: React.FC = () => {
  const { scene } = useGLTF("/toyota.glb");

  const ref = useRef<Object3D | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const scroll = useScroll();

  useFrame(() => {
    tl.current?.seek(scroll.offset * tl.current?.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    if (ref.current?.rotation) {
      tl.current.to(
        ref.current.rotation,
        {
          duration: 2,
          y: -Math.PI / 3,
        },
        0
      );
    }
  }, []);

  const { viewport } = useThree();
  const scaleMobile = [0.5, 0.5, 0.5];
  const scaleDesktop = [0.75, 0.75, 0.75];

  // Determine the current device type based on the viewport size
  const isMobile = viewport.width <= 14.14; // Adjust the breakpoint as needed

  const handleScroll = () => {
    // const model = gltf.scene;
    const scrollY = window.scrollY;
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log({ isMobile }, viewport.width);

  return (
    <>
      <primitive
        ref={ref}
        object={scene}
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 5, 0]}
        scale={isMobile ? scaleMobile : scaleDesktop}
      />
    </>
  );
};

function Ground() {
  const { theme } = useTheme();
  // https://polyhaven.com/a/rough_plasterbrick_05 !
  const [roughness, normal] = useLoader(TextureLoader, [
    "/textures/terrain-roughness.jpg",
    "/textures/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });
  }, [normal, roughness]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  });

  return (
    <mesh
      rotation-x={-Math.PI * 0.5}
      // position={[12,11,11]}
      position={[0, 5, 0]}
      // rotateX={ 0.5}

      castShadow
      receiveShadow
    >
      <planeGeometry args={[30, 30]} />

      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        // normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        // color={[0, 0, 0]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        // debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}

const Overlay = () => {
  return (
    <Scroll html>
      <HeroText />
      <Business />
      <Team />
    </Scroll>
  );
};

const HeroText = () => {
  return (
    <section className="mt-36 flex h-screen w-screen  flex-col  items-center">
      <h1 className="gradient-text text-center text-4xl ">Friends Auto Cars</h1>
      <p className="text-sm tracking-widest text-slate-600">
        THINK . FEEL . DRIVE
      </p>
      <p className="mx-2 text-center text-xl text-muted-foreground">
        The place where you buy cars at right price
      </p>
    </section>
  );
};

const Business = () => {
  return (
    <section
      id="business"
      className="h-screen bg-slate-400 bg-opacity-10 px-2 py-10"
    >
      <div className=" flex">
        <div className="mx-auto max-w-xl  ">
          <h2 className="gradient-text  mb-4    text-4xl ">
            Find Your Dream Car at Friends Auto Cars !
          </h2>
          <p className="text-lg text-muted-foreground">
            Unbeatable prices. Quality used cars. Friendly team. Easy financing.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Your perfect car awaits. Visit us today and drive away in style!
          </p>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section className=" mx-auto  lg:max-w-[600px]">
      <h2 className="gradient-text mb-4 mt-8 pt-10  text-4xl ">Contact us</h2>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <Card className="  bg-black bg-opacity-40 text-gray-200 ">
          <Link href="tel:+917829314381">
            <CardHeader>
              <CardTitle>Raghava</CardTitle>
            </CardHeader>
            <CardContent>Ph: 7829314381</CardContent>
          </Link>
        </Card>
        <Card className="  bg-black bg-opacity-40 text-gray-200 ">
          <Link href="tel:+919880717324">
            <CardHeader>
              <CardTitle>Padmanabha</CardTitle>
            </CardHeader>
            <CardContent>Ph: 9880717324</CardContent>
          </Link>
        </Card>
        <Card className="  bg-black bg-opacity-40 text-gray-200 ">
          <Link href="tel:+919886670718">
            <CardHeader>
              <CardTitle>Deepak</CardTitle>
            </CardHeader>
            <CardContent>Ph: 9886670718</CardContent>
          </Link>
        </Card>
        <Card className="  bg-black bg-opacity-40 text-gray-200 ">
          <Link href="tel:+919964071065">
            <CardHeader>
              <CardTitle>Charan</CardTitle>
            </CardHeader>
            <CardContent>Ph: 9964071065</CardContent>
          </Link>
        </Card>
      </div>
    </section>
  );
};
