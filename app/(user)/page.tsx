"use client";

import React from "react";
import Overlay from "@/components/home/overlay";

// useGLTF.preload("/toyota.glb");

export default function Home() {
  return (
    <div className="mx-1">
      {/* <ExploreButton/> */}
      <Overlay />
    </div>
  );
}

// <section className=" absolute z-10 h-screen flex w-full ">
// <Suspense fallback={<Loader />}>
//   <Canvas  >
//     <ambientLight />
//     <spotLight position={[0, 30, 20]} color="white" intensity={2} />
//     <pointLight position={[-10, -10, -10]} />
//     <spotLight
//       color={[1, 0.25, 0.7]}
//       intensity={1.5}
//       angle={0.6}
//       penumbra={0.5}
//       position={[5, 5, 0]}
//       castShadow
//       shadow-bias={-0.0001}
//     />
//     <spotLight
//       color={[0.14, 0.5, 1]}
//       intensity={2}
//       angle={0.6}
//       penumbra={0.5}
//       position={[-5, 5, 0]}
//       castShadow
//       // shadow-bias={-0.0001}

//     />
//     <ScrollControls pages={3} damping={0.25}>
//     <Car />
//     </ScrollControls>
//   <OrbitControls
//       target={[0, 0.25, 0]}
//       // minPolarAngle={1.5}
//       // maxPolarAngle={1.5}
//       enableZoom={false}
//     />

//     <PerspectiveCamera makeDefault fov={80} position={[0, 16, 10]} />

//     <Ground />
//   </Canvas>
// </Suspense>
// </section>
