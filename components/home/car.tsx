import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";
import { HERO_ROT_Y, carHeading, samplePose } from "./choreography";

// Length of the car in world units; the scene is laid out around this.
const CAR_LENGTH = 4.6;

const Car = () => {
  const { scene } = useGLTF("/toyota.glb");
  const ref = useRef<Group>(null);
  const scroll = useScroll();
  const narrow = useThree((state) => state.size.width < 768);

  // Normalise the model so it is CAR_LENGTH long, centred, and resting on y=0.
  // useGLTF caches the scene, so on a repeat visit it still carries the scale
  // and offset from last time; measure an untransformed copy instead.
  const { scale, offset } = useMemo(() => {
    const model = scene.clone();
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    model.updateMatrixWorld(true);
    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = CAR_LENGTH / Math.max(size.x, size.z);
    return {
      scale,
      offset: new Vector3(-center.x, -box.min.y, -center.z).multiplyScalar(scale),
    };
  }, [scene]);

  // Coming back from another page, start from the hero angle instead of
  // spinning back from wherever the car was left.
  useLayoutEffect(() => {
    carHeading.rotY = HERO_ROT_Y;
  }, []);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    const car = ref.current;
    if (!car) return;
    const pose = samplePose(scroll.offset, narrow);
    easing.damp(car.position, "x", pose.carX, 0.2, delta);
    easing.damp(car.rotation, "y", pose.carRotY, 0.2, delta);
    carHeading.rotY = car.rotation.y;
  });

  return (
    <group ref={ref} rotation={[0, HERO_ROT_Y, 0]}>
      <primitive object={scene} scale={scale} position={offset} />
    </group>
  );
};

useGLTF.preload("/toyota.glb");

export default Car;
