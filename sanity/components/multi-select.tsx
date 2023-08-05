// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import {
  TextInput,
  insert,
  set,
  setIfMissing,
  unset,
  getValueAtPath,
  useDocumentStore,
  useDocumentPresence,
  FieldMember,
} from "sanity";
// import { client } from "../lib/client";
import { createClient } from "next-sanity";
import { Box } from "@sanity/ui";
import { apiVersion, dataset, projectId, useCdn } from "../env";
import { randomKey } from "@sanity/util/content";
import { IoMdImages } from "react-icons/io";
import { useFetchData } from "@/hooks";
const MultiSelectImages = (props) => {
  const { document, onChange } = props;
  console.log({ document, onChange });
  const [images, setImages] = useState([]);
  const { value, members, renderField, renderInput, renderItem } = props;
  console.log("yes", value, members, renderField, renderInput, renderItem);

  // find "mediaTitle" member
  const name = members.find(
    (member): member is FieldMember =>
      member.kind === "field" && member.name === "name"
  );
  console.log("to diso", props, images, name);

  // const getData = useCallback(
  //   () => getVehicleById({ id: vehicleId }),
  //   [vehicleId]
  // );
  // const { data: vehicle }: { data: VehicleType } = useFetchData(getData);

  return (
    <div>
      {/* <Button
      fontSize={[2, 2, 3]}
      padding={[3, 3, 4]}
      text="Publish"
      tone="primary"
    >Add images</Button> */}
      <input
        type="file"
        multiple
        onChange={async (e) => {
          console.log("selected", e.target.files);
          const files = e.target.files;
          const client = createClient({
            projectId,
            dataset,
            apiVersion,
            token:
              "skFr9ilTmvsyCfM48WbvXIjb0I965G9HCSbKS5r1GtK8SmB2nKBMejCbXUqXkQ3VQdxIFSCsFqx7gw8QO1osO5A6r4ESZ5BG0dSr9X3ZTPyFQtgSBOesVIgWydgnMlSlJ0NO0qoGvDVLDRx4OH7yeC2PMWIbMiXIAlvbQ3S3OQ22Jjhubs0w",
          });
          const fileList = [];
          // console.log("bbol",Boolean(images.length));

          // if (Boolean(images.length)) {
          //   console.log("inside",[...images, ...e.target.files]);

          //   setImages(prev=>{
          //     return [...prev, ...e.target.files]
          //   });
          // } else {
          //   setImages(e.target.files);
          // }
          Array.from(files).map(async (file) => {
            console.log({ file });

            await client.assets
              .upload("image", file, {
                filename: file.name,
              })
              .then(async (imageAsset) => {
                console.log({ imageAsset });
                const nextValue = {
                  _type: "image",
                  _key: randomKey(12),
                  asset: {
                    _type: "reference",
                    _ref: imageAsset._id,
                  },
                };
                fileList.push(nextValue);

                // const val= await insert(
                //   [
                //     {
                //       _key: randomKey(12),
                //       _type: `host`,
                //       _ref: imageAsset.id,
                //     },
                //   ],
                //   "after",
                //   [-1]
                // );
                // console.log({val});

                // Here you can decide what to do with the returned asset document.
                // If you want to set a specific asset field you can to the following:
                try {
                  // onChange([setIfMissing([]), ...peoplePatches])
                  // return client
                  //   .patch("some-document-id")
                  //   .set({
                  //     theImageField: {
                  //       _type: "image",
                  //       asset: {
                  //         _type: "reference",
                  //         _ref: imageAsset._id,
                  //       },
                  //     },
                  //   })
                  //   .commit();
                } catch (error) {
                  console.log({ error });
                }
              })
              .then(() => {
                console.log("Done!");
              });
          });
          console.log({ fileList });

          onChange(fileList ? set(fileList) : unset());
          setImages(e.target.files);
        }}
      />
      <Box
        padding={2}
        marginTop={2}
        style={{
          outline: "1px solid gray",
          minHeight: "100px",
          display: "flex",
          gap: 3,
        }}
      >
        {Array.from(images)?.map((imag) => {
          return (
            <img
              width="100"
              height="100"
              style={{
                border: "1px solid red",
              }}
              src={URL.createObjectURL(imag)}
              alt="img"
              onClick={() => {
                console.log(imag);
              }}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default MultiSelectImages;
