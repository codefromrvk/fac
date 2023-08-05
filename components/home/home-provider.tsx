"use client";
import { useScroll } from "@react-three/drei";
import { Wrapper } from "./box";
import { useEffect, useState } from "react";

export default function HomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Wrapper />
      {children}
    </>
  );
}
