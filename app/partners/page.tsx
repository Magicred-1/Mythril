import { Button } from "@/components/ui/button";
import { Assurance } from "@/lib/types/global.type";
import React from "react";
import imgSaintChristophe from "@/lib/assets/logos/insuraces/saintchristophe.png";
import imgMutuelleEtudiante from "@/lib/assets/logos/insuraces/mutuelleEtudiante.png";
import imgSwissCare from "@/lib/assets/logos/insuraces/swissCare.png";
import imgDeutch from "@/lib/assets/logos/insuraces/deutsche.png";
import imgBrazil from "@/lib/assets/logos/insuraces/IRB.png";
import imgAxa from "@/lib/assets/logos/insuraces/AXA.png";

import Image from "next/image";

const labelButtons = [
  "All risks",
  "Student",
  "Cars",
  "House",
  "Health",
  "International",
];

const assurances: Assurance[] = [
  {
    name: "Mutuelle Saint-Christophe",
    country: "France",
    price: 25,
    img: imgSaintChristophe,
  },
  {
    name: "La Mutuelle des Étudiants",
    country: "France",
    price: 15,
    img: imgMutuelleEtudiante,
  },
  {
    name: "SwissCare",
    country: "Switzerland",
    price: 35,
    img: imgSwissCare,
  },
  {
    name: "Deutsche Rück",
    country: "Germany",
    price: 25,
    img: imgDeutch,
  },
  {
    name: "IRB Brasil Re",
    country: "Brazil",
    price: 12,
    img: imgBrazil,
  },
  {
    name: "Axa XL",
    country: "France",
    price: 19,
    img: imgAxa,
  },
];

const page = () => {
  return (
    <div
      style={{ minHeight: "calc(100% - 83px)" }}
      className="bg-backfum py-[89px] px-[104px] space-y-10 "
    >
      <div className="bg-backblueOpacity h-[281px] rounded-lg center">
        <div className="font-bold text-[50px] text-[#2D8CF0E5]">
          Browse our partners
        </div>
      </div>

      <div className="center">
        {labelButtons.map((label, i) => {
          return (
            <Button
              className="px-[45px] rounded-full bg-textBlue font-light text-[20px]"
              key={i}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="center">
        <div style={{ width: "760px" }} className="grid grid-cols-3 gap-2">
          {assurances.map((assurance, i) => {
            return (
              <div
                key={i}
                className="bg-[#2D8CF0E5] font-bold text-white text-[24px] px-[24px] py-[30px] rounded-xl flex flex-col justify-between relative"
              >
                <div className="absolute right-1 top-2 text-black bg-white rounded-full text-[10px] p-1">
                  Starting at {assurance.price} $
                </div>
                <div className="center">{assurance.name}</div>
                <div>
                  <Image src={assurance.img} alt="imgAssurance" />
                </div>
                <div className="center">{assurance.country}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="center">
        <Button className="px-[45px] rounded-full bg-textBlue font-light text-[20px]">
          See more...
        </Button>
      </div>
    </div>
  );
};

export default page;
