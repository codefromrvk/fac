import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ExploreButton = () => {
  const router = useRouter();
  const handleExploreNow = () => {
    console.log("clicked");

    router.push("/inventory");
  };
  console.log("rendered");
  
  return (
    <Button className="mt-4" onClick={()=>handleExploreNow()}>
      Explore now
    </Button>
  );
};

export default ExploreButton;
