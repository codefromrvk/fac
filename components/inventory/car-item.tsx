"use client";
import { CarItemType } from "@/types/inventory.types";

import Image from "next/image";
import Price from "./price";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

const CarItem: React.FC<CarItemType> = ({
  id,
  title,
  url,
  price,
  className,
}) => {
  return (
    <Link href={`/inventory/${id}`}>
      <Card>
        <div
          className={cn(
            " relative   max-h-60 overflow-hidden  rounded-t-lg border-2 ",
            className
          )}
        >
          <Image
          className="mx-auto"
            src={url}
            alt={title}
            // height and width wont matter coz of object contain
            height={400}
            width={400}
            priority={true}
          />
          <Price amount={price} />
        </div>
        <div className="top-0 m-2  px-2 text-lg uppercase">{title}</div>
      </Card>
    </Link>
  );
};

export default CarItem;
