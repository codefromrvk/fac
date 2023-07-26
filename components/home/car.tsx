import {
  ContactShadows,
  Decal,
  Gltf,
  Shadow,
  SoftShadows,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Group, Object3D, Vector3 } from "three";

const Car: React.FC = () => {
  const { scene } = useGLTF("/toyota.glb");
  const ref = useRef<Object3D | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const scroll = useScroll();
  const { viewport } = useThree();
  const scaleMobile =new Vector3(0.3, 0.3, 0.3);
  //  [0.5, 0.5, 0.5];
  const scaleDesktop = new Vector3(0.5, 0.5, 0.5);
  // [0.75, 0.75, 0.75];
  console.log("wid", viewport.width);
  

  // Determine the current device type based on the viewport size
  const isMobile = viewport.width <= 14.14; // Adjust the breakpoint as needed

  // useFrame(() => {
  //   tl.current?.seek(scroll.offset * tl.current?.duration());
  // });

  // useLayoutEffect(() => {
  //   tl.current = gsap.timeline();

  //   if (ref.current?.rotation) {
  //     tl.current.to(
  //       ref.current.rotation,
  //       {
  //         duration: 2,
  //         y: -Math.PI / 3,
  //       },
  //       0
  //     );
  //   }
  // }, []);

  // const handleScroll = () => {
  //   // const model = gltf.scene;
  //   const scrollY = window.scrollY;
  // };

  // useEffect(() => {
  //   // Attach the scroll event listener when the component mounts
  //   window.addEventListener("scroll", handleScroll);

  //   // Remove the scroll event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // console.log({nodes});

  return (

      <Gltf
        src="/toyota.glb"
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 16, 0]}
        receiveShadow
        castShadow
        scale={isMobile ? scaleMobile : scaleDesktop}
      />

  );
};

export default Car;

{
  /* <mesh castShadow  geometry={nodes} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} />
    </mesh> 
    // <primitive 
    //   // ref={ref}
    //   object={scene}
    //   rotation={[0, Math.PI / 2, 0]}
    //   position={[0, 5, 0]}
    //   scale={isMobile ? scaleMobile : scaleDesktop}
    // />
    );
*/
}
