import React from "react";
import Image from "next/image";
import boulImg from "@/lib/assets/logos/landingPage/3d_model_hero.png";
import { lexend } from "@/app/layout";

const Stat = ({ stat, description }: { stat: string; description: string }) => {
  return (
    <div className="not-italic ">
      <span className="text-textBlue text-[37px] font-light leading-[51.84px] ">
        {stat}
      </span>{" "}
      <br />
      {description}
    </div>
  );
};

const TopLanding = () => {
  return (
    <div
      className={`bg-backBlue h-[719px] center flex flex-row ${lexend.className}`}
    >
      <div className=" space-y-6">
        <div className="font-bold text-7xl leading-[86px]">
          Making{" "}
          <span
            style={{
              backgroundImage: "linear-gradient( #1E1E1E, #2D8CF0E5)",
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
        <div className="grid grid-cols-2 w-[526px] h-[211px]">
          <Stat stat={"100"} description="Partners Onboarded" />
          <Stat stat={"$12.5M"} description="Total Claims Paid" />
          <Stat
            stat={"$427.5M"}
            description="Total Value available through Proof-of-Reserve"
          />
          <Stat stat={"+19 000"} description="Clients around the World" />
        </div>
        <button className="bg-textBlue text-white h-[55px] text-[21px] center font-light rounded-full py-[15px] px-[23px] ">
          Get Started
        </button>
      </div>
      <div>
        <Image src={boulImg} alt="boulimg" />
      </div>
    </div>
  );
};

export default TopLanding;
