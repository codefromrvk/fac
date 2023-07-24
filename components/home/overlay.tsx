import { Scroll, useIntersect } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "framer-motion";

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
        <Card className="animate-[wiggle_1s_ease-in-out_infinite] bg-black bg-opacity-40 text-gray-200 ">
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

const ContactCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Card
      ref={ref}
      className={`${
        isInView ? "transform-none" : "-translate-y-200 transform"
      } ${
        isInView ? "opacity-100" : "opacity-0"
      } duration-900 ease-cubic-bezier(0.17, 0.55, 0.55, 1) bg-black bg-opacity-40 text-gray-200 transition-all delay-500 `}
    >
      <Link href="tel:+917829314381">
        <CardHeader>
          <CardTitle>Raghava</CardTitle>
        </CardHeader>
        <CardContent>Ph: 7829314381</CardContent>
      </Link>
    </Card>
  );
};
export default Overlay;
