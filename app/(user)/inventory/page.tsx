import React from "react";
import img1 from "@/public/assets/cars/img1.jpg";
import Image from "next/image";
import { CarItem } from "@/components/inventory";
import { getAllVehicles } from "@/sanity/api";
import { VehicleType } from "@/types/inventory.types";
import urlBuilder from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

const Inventory = async () => {
  const allVehicles = await getAllVehicles();

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input id="search" className="my-4 " placeholder="Search by name..." />
        <Label htmlFor="search" className=" h-full">
          <MagnifyingGlassIcon
            width={40}
            height={40}
            className=" my-3 rounded-lg p-2 hover:bg-gray-100  "
          />
        </Label>
      </div>
      <div className=" grid gap-3 lg:grid-cols-4 ">
        {/* <h1 className="text-xl font-semibold text-center ">All Cars</h1> */}
        {allVehicles.map((vehicle: VehicleType) => {
          const { _id, name, photo, price } = vehicle;
          return (
            <CarItem
              key={_id}
              id={_id}
              url={urlForImage(photo[0]).url()}
              title={name}
              price={price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
