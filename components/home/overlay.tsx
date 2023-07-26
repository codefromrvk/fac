import { Scroll, useIntersect } from "@react-three/drei";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "framer-motion";

const Overlay = () => {
  return (
    <>
      {/* <Scroll html> */}
      <HeroText />
      <Business />
      <Team />
      {/* </Scroll> */}
    </>
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
        Trusted car dealership in Mangalore | Udupi
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
  const contactList = [
    { name: "Raghava", number: "7829314381" },
    {
      name: "Padmanabha",
      number: "9880717324",
    },
    {
      name: "Deepak",
      number: "9886670718",
    },
    {
      name: "Charan",
      number: "9964071065",
    },
  ];
  return (
    <section className=" mx-auto  lg:max-w-[600px]">
      <h2 className="gradient-text mb-4 mt-8 pt-10  text-4xl ">Contact us</h2>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {contactList.map((contact) => {
          return (
            <ContactCard
              key={contact.number}
              name={contact.name}
              number={+contact.number}
            />
          );
        })}
      </div>
    </section>
  );
};

const ContactCard: React.FC<{ name: string; number: number }> = ({
  name,
  number,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  console.log({ isInView });
  const tailwindStyle = "-translate-y-400 transform ";
  return (
    <Card
      ref={ref}
      className={`${isInView ? "transform-none" : tailwindStyle} ${
        isInView ? "opacity-100" : "opacity-0"
      } duration-900 ease-cubic-bezier(0.17, 0.55, 0.55, 1) bg-black bg-opacity-40 text-gray-200 transition-all delay-500 `}
    >
      <Link href={`tel:+91${number}`}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>Ph: {number}</CardContent>
      </Link>
    </Card>
  );
};
export default Overlay;
