import React from "react";
import img1 from "@/public/assets/cars/img1.jpg";
import Image from "next/image";
import { CarItem } from "@/components/inventory";

const Inventory = () => {
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

      <div className=" grid lg:grid-cols-4 gap-3">
        {cars.map((car) => {
          return <CarItem url={car.img} title={car.title} />;
        })}
      </div>
   
  );
};

export default Inventory;
