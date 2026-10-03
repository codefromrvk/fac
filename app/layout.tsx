import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Friends Auto Car | Quality Second-Hand Cars ",
  description:
    "Looking to buy or sell a car in Mangalore? Discover a wide selection of quality second-hand cars at Friends Auto Cars, one of the best car sellers in the area.",
};

// Tints the mobile browser chrome to match the page in either theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="ahrefs-site-verification"
          content="b50078f15f79994fc28290237a5ce6268035f3cc15b0b5fc787373398519c174"
        />
           <meta
      name="keywords"
      content="Mangalore, secondhand cars, cheap , best place, cars and bikes, friends auto cars,nanthoor, pumpwell"
    />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {/* The home page copy renders client-side inside the 3D scene. */}
          <h1 className="sr-only">
            Trusted car dealership in Mangalore | Udupi
          </h1>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
