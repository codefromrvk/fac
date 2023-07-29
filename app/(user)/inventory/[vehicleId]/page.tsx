"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchData } from "@/hooks";
import { getAllVehicles, getVehicleById } from "@/sanity/api";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const VehicleProfile = ({ params }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { vehicleId } = params;
  const getData = useCallback(
    () => getVehicleById({ id: vehicleId }),
    [vehicleId]
  );
  const { data: vehicle } = useFetchData(getData);

  const handlePhotoClick = (idx) => {
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

  const { photo } = vehicle;
  return (
    <div className="flex flex-col">
      <Card className="p-1">
        <div>
          <div className="h-72 ">
            <Image
              className="h-full rounded-lg object-contain"
              src={urlForImage(photo[selectedPhotoIndex]).fit("clip").url()}
              alt=""
              // height and width wont matter coz of object contain
              height={600}
              width={1250}
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {photo.map((photoItem, i) => {
              return (
                <Image
                  className="rounded-lg "
                  src={urlForImage(photoItem).url()}
                  alt=""
                  // height and width wont matter coz of object contain
                  height={80}
                  width={80}
                  onClick={() => handlePhotoClick(i)}
                />
              );
            })}
          </div>
        </div>
        <div className=" p-2">
          <h4 className=" text-3xl">Maruti Suzuki ED54321</h4>
          <div>Rs. 435660</div>
          <Button className="my-2">
            <Link href={`tel:+917338213553`}>Contact now</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VehicleProfile;
