import { Metadata } from "next";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title:
    "About | Buy or Sell Quality Second-Hand Cars in Mangalore | Friends Auto Cars",
  description:
    "Looking to buy or sell a car in Mangalore? Discover a wide selection of quality second-hand cars at Friends Auto Cars. Trusted dealers offering top-notch vehicles and exceptional customer service. Get a great price for your used car today! The true OLX alternative!",
};

const AboutPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 pt-32">
      <div className="flex-1 py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
          About us
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Who We Are</h1>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          We are a trusted and reliable secondhand car selling company. With
          years of experience in the automotive industry, we provide
          high-quality pre-owned cars at affordable prices. Whether you are
          looking to buy or sell a car in Mangalore, Friends Auto Cars is the
          perfect platform for you, offering a true OLX alternative!
        </p>

        <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">Our Mission</h2>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
          Our mission is to make the car-buying process easy and hassle-free for
          our customers. We strive to offer a wide selection of vehicles and
          provide excellent customer service to ensure a positive buying
          experience. At Friends Auto Cars, you can choose from a large
          inventory of high-quality pre-owned cars, all thoroughly inspected and
          certified for your peace of mind.
        </p>

        <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight">Why Choose Us</h2>
        <ul className="list-inside list-disc space-y-1 leading-relaxed text-zinc-600 dark:text-zinc-400">
          <li>Large inventory of high-quality pre-owned cars</li>
          <li>Transparent pricing and no hidden fees</li>
          <li>Professional and friendly staff</li>
          <li>Flexible financing options</li>
          <li>Thoroughly inspected and certified vehicles</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
