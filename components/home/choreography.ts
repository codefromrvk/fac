// One pose per overlay section. Scroll offset blends between neighbouring
// poses, so the car and camera move as a single choreographed shot.
export const SECTIONS = 4;
// How much further back the camera sits on narrow screens.
export const NARROW_ZOOM = 2.1;

type Vec3 = [number, number, number];

export type Pose = {
  carX: number;
  carRotY: number;
  camera: Vec3;
  lookAt: Vec3;
};

// Where the camera waits behind the loading splash before settling into the
// hero pose: higher and further back, so the intro reads as a crane-in.
export const INTRO_CAMERA: Vec3 = [0, 4.5, 17];

const POSES: Pose[] = [
  // Hero: low side profile under the headline.
  { carX: 0, carRotY: Math.PI / 2 - 0.35, camera: [0, 1.3, 9], lookAt: [0, 1.5, 0] },
  // Text on the left, front three-quarter on the right.
  { carX: 1.6, carRotY: 0.45, camera: [-0.6, 1.1, 8], lookAt: [0.4, 0.9, 0] },
  // Text on the right, rear three-quarter on the left.
  { carX: -1.6, carRotY: Math.PI + 0.75, camera: [0.6, 1.6, 8], lookAt: [-0.4, 0.9, 0] },
  // Contact: head-on hero shot, car sits below the cards.
  { carX: 0, carRotY: Math.PI * 2, camera: [0, 2.4, 10.5], lookAt: [0, 2.35, 0] },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export function samplePose(offset: number, narrow: boolean): Pose {
  const s = Math.min(Math.max(offset, 0), 1) * (SECTIONS - 1);
  const i = Math.min(Math.floor(s), SECTIONS - 2);
  const t = smoothstep(s - i);
  const a = POSES[i];
  const b = POSES[i + 1];
  // Portrait screens can't fit text beside the car, so keep it centred, pull
  // the camera back to fit the whole car, and aim higher so it sits below the
  // copy at the bottom of the screen.
  const spread = narrow ? 0 : 1;
  const zoom = narrow ? NARROW_ZOOM : 1;
  const lift = narrow ? 3 : 0;
  return {
    carX: mix(a.carX, b.carX, t) * spread,
    carRotY: mix(a.carRotY, b.carRotY, t),
    camera: [
      mix(a.camera[0], b.camera[0], t),
      mix(a.camera[1], b.camera[1], t),
      mix(a.camera[2], b.camera[2], t) * zoom,
    ],
    lookAt: [
      mix(a.lookAt[0], b.lookAt[0], t) * spread,
      mix(a.lookAt[1], b.lookAt[1], t) + lift,
      mix(a.lookAt[2], b.lookAt[2], t),
    ],
  };
}

// The car's heading in the hero pose, where every visit starts.
export const HERO_ROT_Y = POSES[0].carRotY;

// Written by the car each frame so the ground can scroll along its heading.
// Module-level, so the car resets it on mount rather than inheriting the angle
// from a previous visit to the home page.
export const carHeading = { rotY: HERO_ROT_Y };
