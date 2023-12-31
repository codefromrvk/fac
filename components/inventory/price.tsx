import { PriceType } from "@/types/inventory.types";
import React from "react";
import { IoMdPricetag } from "react-icons/io";

const Price: React.FC<PriceType> = ({ amount }) => {
  return (
    <div className="absolute bottom-0 m-3 flex items-center justify-between  rounded-lg border bg-popover px-4">
      <IoMdPricetag />
      <span className="italic">{amount.toLocaleString("en-in")}</span>
    </div>
  );
};

export default Price;
