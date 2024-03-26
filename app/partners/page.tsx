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
    <div className="min-h-screen bg-backfum py-16 px-4 lg:px-20 xl:px-32 space-y-10">
      <div className="bg-backblueOpacity h-72 lg:h-96 rounded-lg flex items-center justify-center">
        <div className="font-bold text-4xl lg:text-6xl text-[#2D8CF0E5]">
          Browse our partners
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center lg:justify-start space-y-2 lg:space-y-0 lg:space-x-4 xl:space-x-8">
          {labelButtons.map((label, i) => (
            <Button
              key={i}
              className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>



      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {assurances.map((assurance, i) => (
          <div
            key={i}
            className="bg-[#2D8CF0E5] font-bold text-white text-lg lg:text-xl px-4 lg:px-6 py-6 rounded-xl flex flex-col items-center justify-between relative"
          >
            <div className="absolute top-2 right-2 bg-white text-black rounded-full text-xs lg:text-sm p-1">
              Starting at ${assurance.price}
            </div>
            <div className="text-center">{assurance.name}</div>
            <div className="mt-4">
              <Image src={assurance.img} alt="imgAssurance" />
            </div>
            <div className="text-center">{assurance.country}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl">
          See more...
        </Button>
      </div>
    </div>
  );
};

export default page;
