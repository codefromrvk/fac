"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ActionButton = ({ price, phone }: { price: number; phone: number }) => {
  return (
    <div className="flex flex-col ">
      <div className="py-2 text-xl font-medium">
        Rs. {price.toLocaleString("en-IN")}
      </div>
      <Button className="my-2">
        <Link href={`tel:+91${phone}`}>Contact now</Link>
      </Button>
    </div>
  );
};

export default ActionButton;
