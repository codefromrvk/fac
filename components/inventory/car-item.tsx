import { CarItemType } from "@/types/inventory.types";

import Image from "next/image";
import Price from "./price";
import Link from "next/link";

const CarItem: React.FC<CarItemType> = ({ title, url,className }) => {
  return (
    // <Link href="/inventory/2" className={className}>
      <div className="flex-none relative max-h-60 overflow-hidden rounded-lg border-2 shadow-2xl">
        <div className="absolute top-0 m-2 text-lg">Maruti Suzuki E3D45</div>
        <Image
          className=" object-contain h-full w-full"
          src={url}
          alt=""
          // height and width wont matter coz of object contain
          height={20}
          width={400}
        />
        <Price amount={4020000} />
      </div>
    // </Link>
  );
};

export default CarItem;
