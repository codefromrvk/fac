import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "About | Buy or Sell Quality Second-Hand Cars in Mangalore | Friends Auto Cars",
  description:
    "Looking to buy or sell a car in Mangalore? Discover a wide selection of quality second-hand cars at Friends Auto Cars. Trusted dealers offering top-notch vehicles and exceptional customer service. Get a great price for your used car today! The true OLX alternative!",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-28 lg:mx-56">
      <div className="mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Who We Are</h1>
        <p className="text-slate-400">
          We are a trusted and reliable secondhand car selling company. With
          years of experience in the automotive industry, we provide
          high-quality pre-owned cars at affordable prices. Whether you are
          looking to buy or sell a car in Mangalore, Friends Auto Cars is the
          perfect platform for you, offering a true OLX alternative!
        </p>

        <h1 className="mb-4 mt-8 text-2xl font-semibold">Our Mission</h1>
        <p className="text-slate-400">
          Our mission is to make the car-buying process easy and hassle-free for
          our customers. We strive to offer a wide selection of vehicles and
          provide excellent customer service to ensure a positive buying
          experience. At Friends Auto Cars, you can choose from a large
          inventory of high-quality pre-owned cars, all thoroughly inspected and
          certified for your peace of mind.
        </p>

        <h1 className="mb-4 mt-8 text-2xl font-semibold">Why Choose Us</h1>
        <ul className="list-inside list-disc text-slate-400">
          <li>Large inventory of high-quality pre-owned cars</li>
          <li>Transparent pricing and no hidden fees</li>
          <li>Professional and friendly staff</li>
          <li>Flexible financing options</li>
          <li>Thoroughly inspected and certified vehicles</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
