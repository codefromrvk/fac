import React from "react";
import img1 from "@/public/assets/cars/img1.jpg";
import Image from "next/image";
import { CarItem } from "@/components/inventory";
import { getAllVehicles } from "@/sanity/api";
import { VehicleType } from "@/types/inventory.types";
import urlBuilder from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";

const Inventory = async () => {
  const allVehicles = await getAllVehicles();

  const cars = [
    {
      title: "test",
      img: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    },
    {
      title: "humag",
      img: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    },
    {
      title: "beyblade",
      img: "https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    },
  ];

  return (
    <div className=" grid gap-3 lg:grid-cols-4">
      {allVehicles.map((vehicle: VehicleType) => {
        const {_id, name, photo, price } = vehicle;


        // return (
        //   <div className="flex flex-col flex-wrap">
        //     <div>Name: {name}</div>
        //     <div>Price: {price}</div>
        //     <div>Year: {year}</div>
        //     <img src={urlForImage(vehicle.photo[0]).width(200).url()} className=""/>
        //   </div>
        // );

        return <CarItem  key={_id} id={_id} url={urlForImage(photo[0]).url()} title={name} price={price} />;
      })}
    </div>
  );
};

export default Inventory;
