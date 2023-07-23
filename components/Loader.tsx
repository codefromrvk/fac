import React from "react";
import Image from "next/image";
import { ColorWheelIcon } from "@radix-ui/react-icons";

import wheel from "public/assets/wheel.png";
const Loader = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
        <Image
          className=" animate-spin object-contain"
          src={wheel}
          alt="Loading"
          width={100} //automatically provided
          height={100} //automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      <div className="text-lg font-semibold mt-4">Loading...</div>

    </div>
  );
};

export default Loader;
