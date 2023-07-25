import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Friends Auto Car | Sell Car in Mangalore | Quality Second-Hand Cars | Friends Auto Cars | Best Sellers",
  description:
    "Looking to buy or sell a car in Mangalore? Discover a wide selection of quality second-hand cars at Friends Auto Cars, one of the best car sellers in the area. Trusted dealers offering top-notch vehicles and exceptional customer service. Get a great price for your used car today! A true OLX alternative",
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
          name="ahrefs-site-verification"
          content="b50078f15f79994fc28290237a5ce6268035f3cc15b0b5fc787373398519c174"
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
