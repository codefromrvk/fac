import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Inventory",
  description:
    "List of wide variety of cars available",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-4">{children}</div>;
}
