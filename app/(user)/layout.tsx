import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/custom/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Friends Auto Cars",
    default: "Friends Auto Car | Quality Second-Hand Cars ",
  },
  description:
    "Discover a wide selection of quality second-hand cars at Friends Auto Cars, one of the best car sellers in the area.",
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
      <body className={`${inter.className}  flex  max-h-screen  flex-col overflow-clip  `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
