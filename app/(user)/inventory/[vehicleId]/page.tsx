"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks";
import { getVehicleById } from "@/sanity/api";
import { urlForImage } from "@/sanity/lib/image";
import { VehicleType } from "@/types/inventory.types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type VehiclePropsType = {
  params: {
    vehicleId: string;
  };
};
const VehicleProfile = ({ params }: VehiclePropsType) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { vehicleId } = params;
  const getData = useCallback(
    () => getVehicleById({ id: vehicleId }),
    [vehicleId]
  );
  const { data: vehicle }: { data: VehicleType } = useFetchData(getData);

  const handlePhotoClick = (idx: number) => {
    setSelectedPhotoIndex(idx);
  };

  if (!vehicle) {
    return (
      <div>
        <Skeleton className="h-[50vh] w-[100%] " />
        <div className="mt-3 flex gap-2">
          <Skeleton className="h-24 w-[25%] " />
          <Skeleton className="h-24 w-[25%] " />
          <Skeleton className="h-24 w-[25%] " />
          <Skeleton className="h-24 w-[25%] " />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Skeleton className="h-6  " />
          <Skeleton className="h-6 w-[50%] " />
        </div>
      </div>
    );
  }

  const {
    photo,
    name,
    price,
    details,
    fuel,
    kmDriven,
    ownerNumber,
    transmission,
    year,
    user,
  } = vehicle;
  return (
    <div className="flex h-full flex-col py-2">
      <Card className="px-3 py-2">
        <div>
          <div className="h-72 ">
            <Image
              className="h-full rounded-lg object-contain"
              src={urlForImage(photo[selectedPhotoIndex]).fit("clip").url()}
              alt="Car main image"
              // height and width wont matter coz of object contain
              height={600}
              width={1250}
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {photo.map((photoItem, i) => {
              return (
                <Image
                  className="aspect-square rounded-lg "
                  src={urlForImage(photoItem).url()}
                  alt="Car unselected image"
                  // height and width wont matter coz of object contain
                  height={80}
                  width={80}
                  onClick={() => handlePhotoClick(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <h4 className=" my-3 text-3xl font-semibold">{name}</h4>
          <div className="flex h-5 items-center   space-x-2 my-1">
            <div className="flex items-center ">
              <label htmlFor="fuel" className=" font-medium">
                Fuel:
              </label>
              <div id="fuel" className="uppercase ml-1">
                {fuel}
              </div>
            </div>
            <Separator orientation="vertical" />

            <div className="flex items-center">
              <label htmlFor="fuel" className=" font-medium">
                Km Driven :{" "}
              </label>
              <div id="fuel" className="ml-1">{kmDriven}</div>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center">
              <label htmlFor="year" className=" font-medium">
                Year :
              </label>
              <div id="year">{year}</div>
            </div>
          </div>

          <div className="flex items-center my-1">
            <label htmlFor="ownerNumber" className=" font-medium">
              No. of owners :{" "}
            </label>
            <div id="ownerNumber">{ownerNumber}</div>
          </div>
          <div className="flex items-center my-1">
            <label htmlFor="transmission" className=" font-medium">
              Transmission :{" "}
            </label>
            <div id="transmission">{transmission}</div>
          </div>

          <div className="flex items-center my-1">
            <label htmlFor="details" className=" font-medium">
              Details :{" "}
            </label>
            <div id="details">{details}</div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-xl font-medium py-2">
            Rs. {price.toLocaleString("en-IN")}
          </div>
          <Button className="my-2">
            <Link href={`tel:+91${user.phoneNumber}`}>Contact now</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VehicleProfile;
