"use client";

import React from "react";
import Image from "next/image";
import boulImg from "@/lib/assets/logos/landingPage/3d_model_hero.png";
import { Lexend } from "next/font/google";
import Spline from '@splinetool/react-spline';

export const lexend = Lexend({ subsets: ["latin"] });

const Stat = ({ stat, description }: { stat: string; description: string }) => {
  return (
    <div className="not-italic">
      <span className="text-textBlue text-3xl sm:text-4xl font-light leading-snug sm:leading-none">
        {stat}
      </span>{" "}
      <br />
      {description}
    </div>
  );
};

const TopLanding = () => {
  return (
    <div className={`bg-backBlue min-h-[719px] py-12 sm:py-24 lg:py-32 center flex flex-col sm:flex-row ${lexend.className}`}>
      <div className="flex flex-col justify-center space-y-6 sm:mr-12">
        <div className="font-bold text-4xl sm:text-7xl leading-[86px] sm:leading-[104px]">
          Making{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(#1E1E1E, #2D8CF0E5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline",
            }}
          >
            Insurance <br /> Subscription
          </span>{" "}
          Easier
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:w-[526px] sm:h-[211px]">
          <Stat stat={"100"} description="Partners Onboarded" />
          <Stat stat={"$12.5M"} description="Total Claims Paid" />
          <Stat stat={"$427.5M"} description="Total Value available through Proof-of-Reserve" />
          <Stat stat={"+19,000"} description="Clients around the World" />
        </div>
        <button className="bg-textBlue text-white h-[55px] text-xl sm:text-2xl font-light rounded-full py-3 px-6 sm:px-10">
          Get Started
        </button>
      </div>
      <div className="mt-6 sm:mt-0 flex justify-center">
        <Spline scene="https://prod.spline.design/XcBsfoS1dk-iZ3SD/scene.splinecode" />
      </div>
    </div>
  );
};

export default TopLanding;
