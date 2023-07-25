import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React from "react";

const query = groq`*[_type=='author']{
    _id
  }`;

async function List() {
  const data = await client.fetch(query);
  console.log({ data });

  return (
    <div>
      <div>
        {data.map((d) => {
          return d._id;
        })}
      </div>
    </div>
  );
}

export default List;
