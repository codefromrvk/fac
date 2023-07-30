import type { Metadata } from "next";
import BackButton from "./[vehicleId]/components/back-button";

export const metadata: Metadata = {
  title: "Inventory",
  description: "List of wide variety of cars available",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-4 px-3 min-h-screen">{children}</div>;
}
