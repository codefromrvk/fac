import type { Metadata } from "next";
import BackButton from "./[vehicleId]/components/back-button";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Inventory",
  description: "List of wide variety of cars available",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="my-4 min-h-screen px-3 ">{children}</div>;
}
