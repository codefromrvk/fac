"use client";

import { urlForImage } from "@/sanity/lib/image";
import { PhotoType } from "@/types/inventory.types";
import Image from "next/image";
import { useState } from "react";

const Gallery = ({ photo }:{photo:PhotoType[]}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handlePhotoClick = (idx: number) => {
    setSelectedPhotoIndex(idx);
  };
  return (
    <div>
      <div className="h-72 ">
        <Image
          className="h-full rounded-lg object-contain"
          src={urlForImage(photo[selectedPhotoIndex]).fit("clip").url()}
          alt="Car main image"
          // height and width wont matter coz of object contain
          height={600}
          width={1250}
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {photo.map((photoItem, i) => {
          return (
            <Image
              key={i}
              className="aspect-square rounded-lg "
              src={urlForImage(photoItem).url()}
              alt="Car unselected image"
              // height and width wont matter coz of object contain
              height={80}
              width={80}
              onClick={() => handlePhotoClick(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
