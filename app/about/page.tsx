import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen   pt-28 ">
 
      <div className=" mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Who We Are</h2>
        <p className="text-slate-400">
          We are a trusted and reliable secondhand car selling company. With
          years of experience in the automotive industry, we provide
          high-quality pre-owned cars at affordable prices.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Our Mission</h2>
        <p className="text-slate-400">
          Our mission is to make the car-buying process easy and hassle-free for
          our customers. We strive to offer a wide selection of vehicles and
          provide excellent customer service to ensure a positive buying
          experience.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Why Choose Us</h2>
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
