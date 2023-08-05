"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ExploreButton = () => {
  const router = useRouter();
  const handleExploreNow = () => {
    router.push("/inventory");
  };

  return (
    <Button className="mt-4" onClick={() => handleExploreNow()}>
      Explore now
    </Button>
  );
};

export default ExploreButton;
