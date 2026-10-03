import { Billboard, Cloud, Clouds, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  Group,
  MeshBasicMaterial,
  SRGBColorSpace,
  ShaderMaterial,
} from "three";

// Everything here is procedural: drei's <Cloud> would otherwise download its
// puff texture from a CDN, so textures are drawn on a canvas instead.

function drawCanvas(size: number, paint: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  paint(canvas.getContext("2d")!);
  return canvas;
}

function canvasTexture(size: number, paint: (ctx: CanvasRenderingContext2D) => void) {
  const texture = new CanvasTexture(drawCanvas(size, paint));
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

// Soft radial glow used for both the sun and the moon halo.
function glowTexture(inner: string, mid: string, outer: string) {
  return canvasTexture(256, (ctx) => {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, inner);
    g.addColorStop(0.18, mid);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  });
}

// A soft, lumpy cloud puff built from overlapping radial gradients.
function cloudPuffUrl() {
  return drawCanvas(256, (ctx) => {
    const blobs = [
      [128, 140, 90],
      [86, 150, 60],
      [170, 150, 64],
      [120, 104, 62],
      [160, 116, 50],
    ];
    for (const [x, y, r] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.6, "rgba(255,255,255,0.4)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
  }).toDataURL();
}

// Pale moon disc with darker "seas" so it doesn't read as a flat circle.
function moonTexture() {
  return canvasTexture(256, (ctx) => {
    ctx.fillStyle = "#f1ede2";
    ctx.fillRect(0, 0, 256, 256);
    const seas = [
      [96, 92, 38, 0.16],
      [150, 120, 30, 0.13],
      [120, 168, 26, 0.12],
      [178, 80, 16, 0.1],
      [70, 150, 14, 0.1],
    ];
    for (const [x, y, r, a] of seas) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(120,118,130,${a})`);
      g.addColorStop(1, "rgba(120,118,130,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
  });
}

// Scene fog fades the floor into the horizon; distant sky objects opt out.
class FoglessCloudMaterial extends MeshBasicMaterial {
  constructor() {
    super();
    this.fog = false;
  }
}

// Gradient dome from zenith down to the horizon. The horizon colour is also the
// scene fog colour, so the fogged floor meets the sky without a seam.
function SkyDome({ horizon, zenith }: { horizon: string; zenith: string }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        side: BackSide,
        depthWrite: false,
        fog: false,
        // Fogged geometry ends up at the raw fog colour, so the sky must skip
        // tone mapping too or the horizon shows a seam.
        toneMapped: false,
        uniforms: {
          horizon: { value: new Color(horizon) },
          zenith: { value: new Color(zenith) },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 horizon;
          uniform vec3 zenith;
          varying vec3 vDir;
          void main() {
            float t = smoothstep(0.0, 0.55, max(vDir.y, 0.0));
            gl_FragColor = vec4(mix(horizon, zenith, t), 1.0);
            #include <colorspace_fragment>
          }
        `,
      }),
    [horizon, zenith],
  );

  return (
    <mesh material={material} renderOrder={-1}>
      <sphereGeometry args={[400, 32, 16]} />
    </mesh>
  );
}

// A glowing disc plus halo, far away and always facing the camera.
function CelestialBody({
  position,
  radius,
  glowSize,
  map,
  color,
  glow,
}: {
  position: [number, number, number];
  radius: number;
  glowSize: number;
  map?: CanvasTexture;
  color: string;
  glow: CanvasTexture;
}) {
  return (
    <group position={position}>
      <Billboard>
        <mesh>
          <planeGeometry args={[glowSize, glowSize]} />
          <meshBasicMaterial
            map={glow}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            fog={false}
            toneMapped={false}
          />
        </mesh>
        <mesh position-z={0.1}>
          <circleGeometry args={[radius, 64]} />
          <meshBasicMaterial map={map} color={color} fog={false} toneMapped={false} />
        </mesh>
      </Billboard>
    </group>
  );
}

export const DAY_HORIZON = "#dbe6f0";

// Sun sits up and to the right so it backlights the car without sitting
// behind the centred headline.
export const SUN_POSITION: [number, number, number] = [110, 62, -272];

export function DaySky() {
  const texture = useMemo(() => cloudPuffUrl(), []);
  const sunGlow = useMemo(
    () => glowTexture("rgba(255,244,214,0.55)", "rgba(255,226,170,0.22)", "rgba(255,210,150,0)"),
    [],
  );
  const drift = useRef<Group>(null);
  const reduced = useReducedMotion() ?? false;

  useFrame((_, delta) => {
    const clouds = drift.current;
    if (!clouds || reduced) return;
    clouds.position.x += delta * 0.8;
    if (clouds.position.x > 60) clouds.position.x = -60;
  });

  return (
    <>
      <SkyDome horizon={DAY_HORIZON} zenith="#5b9be0" />
      <CelestialBody position={SUN_POSITION} radius={6} glowSize={80} color="#ffffff" glow={sunGlow} />
      <group ref={drift}>
        <Clouds texture={texture} material={FoglessCloudMaterial} limit={120}>
          <Cloud seed={2} segments={18} bounds={[18, 2, 3]} volume={9} position={[-55, 18, -110]} color="#ffffff" opacity={1} speed={reduced ? 0 : 0.08} fade={200} />
          <Cloud seed={7} segments={14} bounds={[14, 2, 3]} volume={8} position={[60, 26, -120]} color="#ffffff" opacity={0.95} speed={reduced ? 0 : 0.08} fade={200} />
          <Cloud seed={11} segments={10} bounds={[10, 1.5, 2]} volume={6} position={[-15, 34, -130]} color="#ffffff" opacity={0.8} speed={reduced ? 0 : 0.08} fade={200} />
        </Clouds>
      </group>
    </>
  );
}

export const MOON_POSITION: [number, number, number] = [-34, 26, -90];

export function NightSky() {
  const reduced = useReducedMotion() ?? false;
  const map = useMemo(() => moonTexture(), []);
  const glow = useMemo(
    () => glowTexture("rgba(255,250,235,0.9)", "rgba(220,230,255,0.3)", "rgba(200,215,255,0)"),
    [],
  );

  return (
    <>
      <Stars radius={110} depth={40} count={3500} factor={4} saturation={0} fade speed={reduced ? 0 : 0.4} />
      <CelestialBody position={MOON_POSITION} radius={2.6} glowSize={24} map={map} color="#ffffff" glow={glow} />
    </>
  );
}
