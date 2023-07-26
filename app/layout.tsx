import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Friends Auto Car | Quality Second-Hand Cars ",
  description:
    "Looking to buy or sell a car in Mangalore? Discover a wide selection of quality second-hand cars at Friends Auto Cars, one of the best car sellers in the area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="keywords"
          content="Mangalore, secondhand cars, cheap , best place, cars and bikes, friends auto cars,nanthoor, pumpwell"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <h1 className="hidden">
            Trusted car dealership in Mangalore | Udupi
          </h1>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
