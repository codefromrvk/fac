"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const BackButton = () => {
  const router = useRouter();
  return (
    <span
      className="mb-2 inline-block  rounded-full border   p-4"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeftIcon />
    </span>
  );
};

export default BackButton;
