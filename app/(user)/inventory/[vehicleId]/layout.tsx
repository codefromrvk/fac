"use client";
import React from "react";
import BackButton from "./components/back-button";

const VehicleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <BackButton/>
      {children}
    </div>
  );
};

export default VehicleLayout;
