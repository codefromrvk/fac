import {
  ContactShadows,
  Environment,
  Lightformer,
  ScrollControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import CameraRig from "./camera-rig";
import Car from "./car";
import Ground from "./ground";
import Overlay from "./overlay";
import { NARROW_ZOOM, SECTIONS } from "./choreography";
import { DAY_HORIZON, DaySky, NightSky, SUN_POSITION } from "./sky";

// Light is a sunny day after rain: a wet floor mirrors the sky. Dark is a
// night showroom under the stars where the rim lights and reflections carry the
// mood. Backdrops double as fog colour, so the floor melts into the horizon.
const LOOKS = {
  light: {
    backdrop: DAY_HORIZON,
    fog: [10, 34],
    ambient: 0.9,
    key: 1.8,
    rim: 0.35,
    floor: [0.2, 0.21, 0.23],
    reflection: 28,
    shadow: 0.7,
  },
  dark: {
    backdrop: "#09090b",
    fog: [12, 30],
    ambient: 0.4,
    key: 2.5,
    rim: 1,
    floor: [0.015, 0.015, 0.015],
    reflection: 60,
    shadow: 0.75,
  },
} as const;

const Scene = () => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const look = isLight ? LOOKS.light : LOOKS.dark;
  // The camera sits further back on narrow screens; push the fog back with it.
  const narrow = useThree((state) => state.size.width < 768);
  const fogScale = narrow ? NARROW_ZOOM : 1;

  return (
    <>
      <color attach="background" args={[look.backdrop]} />
      <fog
        attach="fog"
        args={[look.backdrop, look.fog[0] * fogScale, look.fog[1] * fogScale]}
      />

      {isLight ? <DaySky /> : <NightSky />}

      <ambientLight intensity={look.ambient} />
      {isLight && (
        <directionalLight position={SUN_POSITION} color="#fff1dc" intensity={1.6} />
      )}
      <spotLight
        position={[0, 12, 4]}
        angle={0.45}
        penumbra={1}
        intensity={look.key * Math.PI}
        decay={0}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* Brand rim lights, carried over from the original scene. */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5 * look.rim * Math.PI}
        decay={0}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2 * look.rim * Math.PI}
        decay={0}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
      />

      {/* Studio softboxes for paint reflections; built in-scene so no HDRI is fetched. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, 2, -2]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="ring" color="#ef4444" intensity={4} position={[0, 3, -9]} scale={3} />
      </Environment>

      <ScrollControls pages={SECTIONS} damping={0.25}>
        <CameraRig />
        <Car />
        <Overlay />
      </ScrollControls>

      <ContactShadows position={[0, 0.01, 0]} opacity={look.shadow} scale={12} blur={2.4} far={2} resolution={512} />
      <Ground color={look.floor} reflection={look.reflection} />
    </>
  );
};

export default Scene;
