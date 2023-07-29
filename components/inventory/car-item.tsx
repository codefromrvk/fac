"use client"
import { CarItemType } from "@/types/inventory.types";

import Image from "next/image";
import Price from "./price";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CarItem: React.FC<CarItemType> = ({
  id,
  title,
  url,
  price,
  className,
}) => {
  return (
    <Link href={`/inventory/${id}`}>
      <div
        // max-h-60
        className={cn(
          " min-h-60 relative max-h-60 flex-none overflow-hidden rounded-lg border-2 ",
          className
        )}
      >
        <div className="absolute top-0 m-2 rounded-lg  bg-popover bg-opacity-10 px-2 text-lg uppercase">
          {title}
        </div>
        {/* object-contain */}
        <Image
          className=" h-full w-full object-contain"
          src={url}
          alt=""
          // height and width wont matter coz of object contain
          height={400}
          width={400}
          priority={true}
        />
        <Price amount={price} />
      </div>
    </Link>
  );
};

export default CarItem;
