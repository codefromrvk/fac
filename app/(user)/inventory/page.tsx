"use client";
import React, { useCallback, useMemo, useState } from "react";
import { CarItem } from "@/components/inventory";
import { getAllVehicles } from "@/sanity/api";
import { VehicleType } from "@/types/inventory.types";
import urlBuilder from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useFetchData } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { BiSad } from "react-icons/bi";

const Inventory = () => {
  const [searchText, setSearchText] = useState("");
  const getData = useCallback(() => getAllVehicles(), []);

  const {
    data: allVehicles,
    loading,
  }: { data: VehicleType[]; loading: Boolean } = useFetchData(getData, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filteredVehicles = useMemo(() => {
    return allVehicles.filter((vehicle) =>
      vehicle.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, allVehicles]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Skeleton className="h-[7vh] w-[75vw] " />
          <Skeleton className="h-[7vh] w-[15vw] " />
        </div>
        <Skeleton className="h-[30vh] w-full" />
        <Skeleton className="h-[30vh] w-full" />
        <Skeleton className="h-[30vh] w-full" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className=" flex w-full max-w-sm items-center ">
        <Input
          id="search"
          className="peer my-4 rounded-r-none  "
          placeholder="Search by name..."
          onChange={handleSearch}
        />
        {/* <Label htmlFor="search" className=" h-full "> */}
        <MagnifyingGlassIcon
          width={36}
          height={36}
          // onClick={handleSearch}
          className=" h-full rounded-r-lg  border-b-[1px] border-r-[1px] border-t-[1px] py-[0.3rem] pl-1 peer-focus:ring-[1.5px] peer-focus:ring-ring "
        />
        {/* hover:dark:text-secondary hover:bg-gray-100
            hover:ring-1 hover:ring-slate-100 */}
        {/* </Label> */}
      </div>
      {Boolean(filteredVehicles.length) ? (
        <div className=" grid gap-3 lg:grid-cols-4 ">
          {/* <h1 className="text-xl font-semibold text-center ">All Cars</h1> */}
          {filteredVehicles.map((vehicle: VehicleType) => {
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
      ) : (
        <div className="mt-10 text-center text-lg">No cars found !</div>
      )}
    </div>
  );
};

export default Inventory;
