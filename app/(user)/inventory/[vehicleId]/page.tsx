import { CarItem } from "@/components/inventory";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";

const VehicleProfile = () => {
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
    <div className="">
      <div>
        <CarItem url={cars[0].img} title={cars[0].title} />
      </div>
      <div className="flex overflow-x-auto">
        <div className=" h-44 w-44 flex-none border-2"></div>
        <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
          <div className="flex  gap-3">
            <img
              className="w-18 h-18 rounded-full"
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
            />
            <strong className="text-xs font-medium text-slate-900 dark:text-slate-200">
              Andrew
            </strong>
          </div>
        </div>
        {/* <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              className="w-18 h-18 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
            />
            <strong className="text-xs font-medium text-slate-900 dark:text-slate-200">
              Emily
            </strong>
          </div>
        </div> */}
        <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
        <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
        </div>
        <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
        <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
        </div>
        <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
        <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
        </div>
        <div className="flex-none px-3 py-6 first:pl-6 last:pr-6">
        <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
        </div>
      </div>

      <div className=" overflow-auto">
        <div className="overflow-x flex max-w-3xl  rounded-md border p-4">
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
          <CarItem
            className="flex-none"
            url={cars[0].img}
            title={cars[0].title}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleProfile;
