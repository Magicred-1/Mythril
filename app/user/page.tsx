import { Button } from "@/components/ui/button";
import { BadgeCheck, Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import arthur from "@/lib/assets/person/arthur.png";
import { Badge } from "@/components/ui/badge";
import { ActiveSubscription } from "@/lib/types/global.type";
import imgMutuelleEtudiante from "@/lib/assets/logos/insuraces/mutuelleEtudiante.png";
import imgSwissCare from "@/lib/assets/logos/insuraces/swissCare.png";
import imgSaintAntoine from "@/lib/assets/logos/insuraces/saintchristophe.png";
import KycButton from "@/components/kycButton";

const activeSubcriptions: ActiveSubscription[] = [
  {
    name: "La Mutuelle des Étudiants",
    logo: imgMutuelleEtudiante,
    subscriptionDate: "2024-02-23",
    expiredDate: "2024-03-22",
    payedPrice: 23,
    lastPayment: "2024-02-23",
    expired: false,
  },
  {
    name: "SwissCare",
    logo: imgSwissCare,
    subscriptionDate: "2024-04-01",
    expiredDate: "2025-03-31",
    payedPrice: 30,
    lastPayment: "2024-04-01",
    expired: true,
  },
  {
    name: "Mutuelle Saint-Christophe",
    logo: imgSaintAntoine,
    subscriptionDate: "2024-05-15",
    expiredDate: "2025-05-14",
    payedPrice: 25,
    lastPayment: "2024-05-15",
    expired: false,
  },
];

const page = () => {
  return (
    <div className="min-h-screen bg-backfum py-16 px-4 lg:px-20 xl:px-32 space-y-10">
      <div className="flex justify-end gap-2">
        <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl">
          Withdraw
        </Button>
        <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl">
          Deposit
        </Button>
      </div>

      <div className="bg-backblueOpacity h-72 lg:h-96 rounded-lg grid grid-cols-3 items-center px-4 lg:px-10">
        <div className="flex justify-center items-center">
          <div
            className="flex flex-col gap-2 p-4 center"
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(45, 140, 240, 0.90)",
              background: "rgba(45, 140, 240, 0.12)",
            }}
          >
            <Image src={arthur} alt="arthur" />
            <div className="text-center">Current Balance</div>
            <Button className="px-6 rounded-full bg-textBlue font-light text-lg">
              10$ eUSD
            </Button>
            <Badge variant={"secondary"}>0x98cEA...e2E84e</Badge>
          </div>
        </div>
        <div className="font-bold text-2xl lg:text-4xl text-[#2D8CF0E5] text-center">
          Arthur Breitman
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl flex items-center gap-2">
            <BadgeCheck /> Verified
          </Button>
          <div>
            <KycButton />
          </div>
        </div>
      </div>

      <div className="font-bold text-2xl lg:text-4xl text-[#2D8CF0E5] text-center">
        Insurance Subscriptions
      </div>

      <div className="center">
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl flex items-center gap-2">
            <Check /> Active
          </Button>
          <Button className="px-6 lg:px-8 rounded-full bg-textBlue font-light text-lg lg:text-xl flex items-center gap-2">
            Expired
          </Button>
        </div>
      </div>

      <div className="center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {activeSubcriptions.map((activeAssurance, i) => (
            <div
              key={i}
              className="bg-[#2D8CF0E5] font-bold text-white text-lg lg:text-xl px-4 lg:px-6 py-6 rounded-xl flex flex-col gap-4 items-center"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={activeAssurance.logo}
                  alt="imgAssurance"
                  height={80}
                />
                <div>{activeAssurance.name}</div>
              </div>
              <div className="flex gap-2">
                <div>Subscription Date:</div>
                <div className="font-light">
                  {activeAssurance.subscriptionDate}
                </div>
              </div>
              <div className="flex gap-2">
                <div>Expiration Date:</div>
                <div className="font-light">
                  {activeAssurance.expiredDate}
                </div>
              </div>
              <div className="flex gap-2">
                <div>Payed Price:</div>
                <div className="font-light">
                  {activeAssurance.payedPrice} eUSD / Month
                </div>
              </div>
              <div className="flex gap-2">
                <div>Last Payment:</div>
                <div className="font-light">
                  {activeAssurance.lastPayment}
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <Button className="px-4 lg:px-6 rounded-full bg-[#2D8CF0] font-light text-lg lg:text-xl flex-1 items-center gap-2">
                  Expired
                </Button>
                <Button
                  variant="destructive"
                  className="px-4 lg:px-6 rounded-full font-light text-lg lg:text-xl flex-1 items-center gap-2"
                >
                  Expired
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
