import { Button } from "@/components/ui/button";
import React from "react";
import { TextInput } from "sanity";

const MultiSelectImages = () => {
  return <div>
    
   {/* <Button
      fontSize={[2, 2, 3]}
      padding={[3, 3, 4]}
      text="Publish"
      tone="primary"
    >Add images</Button> */}
   <input type="file" multiple onChange={()=>{
    // console.log("selected");
    
   }}/>
   
  </div>;
};

export default MultiSelectImages;
