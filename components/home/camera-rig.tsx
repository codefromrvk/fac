import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { easing } from "maath";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { claimIntro, useIntroReady } from "@/lib/intro";
import { INTRO_CAMERA, NARROW_ZOOM, samplePose } from "./choreography";

// Seconds for the camera to catch up with the scroll pose. Scroll offset is
// already damped by ScrollControls, so keep this short to avoid stacked lag.
const SETTLE = 0.25;
// Slower settle for the one-off crane-in after the loading splash.
const INTRO_SETTLE = 0.9;
const INTRO_SECONDS = 2.5;

// Moves the camera through the scroll poses, with a slight drift toward the
// pointer so the scene feels alive even when the page is still.
const CameraRig = () => {
  const scroll = useScroll();
  const narrow = useThree((state) => state.size.width < 768);
  const reduced = useReducedMotion() ?? false;
  const introReady = useIntroReady();
  const lookAt = useRef(new Vector3(0, 1, 0));
  const introStartedAt = useRef<number | null>(null);
  const snapped = useRef(false);
  const [playIntro] = useState(claimIntro);

  useFrame((state, delta) => {
    const pose = samplePose(scroll.offset, narrow);
    const camera = state.camera.position;

    // Always aim at the hero target from the first frame; only the camera
    // position takes part in the crane-in.
    if (!snapped.current) {
      lookAt.current.set(...pose.lookAt);
      if (reduced || !playIntro) camera.set(...pose.camera);
      snapped.current = true;
    }

    // Reduced motion: no crane-in and no parallax, just follow the scroll.
    if (reduced) {
      easing.damp3(camera, pose.camera, SETTLE, delta);
      easing.damp3(lookAt.current, pose.lookAt, SETTLE, delta);
      state.camera.lookAt(lookAt.current);
      return;
    }

    let target = pose.camera;
    let settle = SETTLE;
    // Repeat visits skip the crane-in and just follow the scroll.
    if (playIntro && !introReady) {
      const [x, y, z] = INTRO_CAMERA;
      target = [x, y, narrow ? z * NARROW_ZOOM : z];
    } else if (playIntro) {
      introStartedAt.current ??= state.clock.elapsedTime;
      if (state.clock.elapsedTime - introStartedAt.current < INTRO_SECONDS) {
        settle = INTRO_SETTLE;
      }
    }

    const parallax = narrow ? 0 : 1;
    const [x, y, z] = target;
    easing.damp3(
      camera,
      [x + state.pointer.x * 0.5 * parallax, y + state.pointer.y * 0.25 * parallax, z],
      settle,
      delta,
    );
    easing.damp3(lookAt.current, pose.lookAt, settle, delta);
    state.camera.lookAt(lookAt.current);
  });

  return null;
};

export default CameraRig;
