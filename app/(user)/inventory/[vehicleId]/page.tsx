import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getVehicleById } from "@/sanity/api";
import { VehicleType } from "@/types/inventory.types";

import Gallery from "./components/gallery";
import ActionButton from "./components/action-button";
import { client } from "@/sanity/lib/client";

type VehiclePropsType = {
  params: {
    vehicleId: string;
  };
};
const VehicleProfile = async ({ params }: VehiclePropsType) => {
  const { vehicleId } = params;

  const vehicle: VehicleType = await getVehicleById({
    id: vehicleId,
  });

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
        <Gallery photo={photo} />

        <div className="flex flex-col justify-around">
          <h4 className=" my-3 text-3xl font-semibold">{name}</h4>
          <div className="my-1 flex  h-5 items-center space-x-2 ">
            <div className="flex items-center ">
              <label htmlFor="fuel" className=" font-medium">
                Fuel:
              </label>
              <div id="fuel" className="ml-1 uppercase">
                {fuel}
              </div>
            </div>
            <Separator orientation="vertical" />

            <div className="flex items-center">
              <label htmlFor="fuel" className=" font-medium">
                Km Driven :
              </label>
              <div id="fuel" className="ml-1">
                {kmDriven}
              </div>
            </div>
            {/* <Separator orientation="vertical" /> */}
          </div>
          <div className="flex items-center">
            <label htmlFor="year" className=" font-medium">
              Year :
            </label>
            <div id="year">{year}</div>
          </div>

          <div className="my-1 flex items-center">
            <label htmlFor="ownerNumber" className=" font-medium">
              No. of owners :{" "}
            </label>
            <div id="ownerNumber">{ownerNumber}</div>
          </div>
          <div className="my-1 flex items-center">
            <label htmlFor="transmission" className=" font-medium">
              Transmission :{" "}
            </label>
            <div id="transmission" className="uppercase">
              {transmission}
            </div>
          </div>

          {details && (
            <div className="my-1 flex items-center">
              <label htmlFor="details" className=" font-medium">
                Details :
              </label>
              <div id="details">{details}</div>
            </div>
          )}
        </div>
        <ActionButton price={price} phone={user.phoneNumber} />
      </Card>
    </div>
  );
};

export default VehicleProfile;
