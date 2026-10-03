import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import { carHeading } from "./choreography";

// Large enough that the fogged far edge hides the horizon line, so stars and
// sky never show through below it.
const SIZE = 200;
const REPEAT = 33;
// World units per second the road slides under the car.
const SPEED = 2.2;

type GroundProps = {
  color: readonly [number, number, number];
  reflection: number;
};

function Ground({ color, reflection }: GroundProps) {
  // https://polyhaven.com/a/rough_plasterbrick_05
  const [roughness, normal] = useLoader(TextureLoader, [
    "/textures/terrain-roughness.jpg",
    "/textures/terrain-normal.jpg",
  ]);

  useLayoutEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(REPEAT, REPEAT);
    });
  }, [normal, roughness]);

  // Slide the texture along the car's heading so it always looks like it is
  // driving forward, whichever way the scroll has turned it.
  const reduced = useReducedMotion() ?? false;

  useFrame((_, delta) => {
    if (reduced) return;
    const step = (SPEED * delta * REPEAT) / SIZE;
    const du = Math.sin(carHeading.rotY) * step;
    const dv = -Math.cos(carHeading.rotY) * step;
    for (const t of [roughness, normal]) {
      t.offset.set((t.offset.x + du) % 1, (t.offset.y + dv) % 1);
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[SIZE, SIZE]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        roughnessMap={roughness}
        dithering
        color={color as [number, number, number]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={reflection}
        mixContrast={1}
        resolution={512}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}

export default Ground;
