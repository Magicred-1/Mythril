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
  },
  {
    name: "SwissCare",
    logo: imgSwissCare,
    subscriptionDate: "2024-04-01",
    expiredDate: "2025-03-31",
    payedPrice: 30,
    lastPayment: "2024-04-01",
  },
  {
    name: "Mutuelle Saint-Christophe",
    logo: imgSaintAntoine,
    subscriptionDate: "2024-05-15",
    expiredDate: "2025-05-14",
    payedPrice: 25,
    lastPayment: "2024-05-15",
  },
];

const page = () => {
  return (
    <div
      style={{ minHeight: "calc(100% - 83px)" }}
      className="bg-backfum py-[89px] px-[104px] space-y-10 "
    >
      <div className="flex justify-end gap-2">
        <Button className="px-[45px] rounded-full bg-textBlue font-light text-[20px]">
          withdraw
        </Button>
        <Button className="px-[45px] rounded-full bg-textBlue font-light text-[20px]">
          Desposit
        </Button>
      </div>
      <div className="bg-backblueOpacity h-[281px] rounded-lg grid grid-cols-3 items-center px-[37px]">
        <div className="flex  ">
          <div
            className="flex flex-col  gap-2 px-4 py-2 center"
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(45, 140, 240, 0.90)",
              background: "rgba(45, 140, 240, 0.12)",
            }}
          >
            <Image src={arthur} alt="arthur" />
            <div>Current Balance</div>
            <Button className="  px-[25px] rounded-full bg-textBlue font-light text-[20px] gap-2">
              10$ eUSD
            </Button>
            <Badge variant={"secondary"}>0x98cEA...e2E84e</Badge>
          </div>
        </div>
        <div className="font-bold text-[50px] text-[#2D8CF0E5] center">
          Arthur Breitman
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div>
            <Button className=" min-w-[153px] px-[25px] rounded-full bg-textBlue font-light text-[20px] gap-2">
              <BadgeCheck /> Verified
            </Button>
          </div>
          <div>
            <KycButton />
          </div>
        </div>
      </div>
      <div className="font-bold text-[50px] text-[#2D8CF0E5] center">
        Insurance Subcriptions
      </div>
      <div className="center ">
        <div className="min-w-[1000px] grid grid-cols-2 gap-2">
          <Button className="min-w-[153px]  px-[25px]  flex-1 bg-textBlue font-light text-[20px] gap-2">
            <Check /> Active
          </Button>
          <Button className="min-w-[153px]  px-[25px] flex-1  bg-textBlue font-light text-[20px] gap-2">
            Expired
          </Button>
        </div>
      </div>
      <div className="center ">
        <div className="max-w-[1000px] grid grid-cols-3 gap-2">
          {activeSubcriptions.map((activeAssurance, i) => {
            return (
              <div
                key={i}
                className="gap-4 bg-[#2D8CF0E5] font-bold text-white text-[24px] px-[24px] py-[30px] rounded-xl flex flex-col justify-between relative"
              >
                <div className="flex word-wrap gap-2  center">
                  <Image
                    src={activeAssurance.logo}
                    alt="imgAssurance"
                    height={80}
                  />
                  <div>{activeAssurance.name}</div>
                </div>

                <div className="text-[18px] flex gap-2 ">
                  <div>Subscription Date : </div>
                  <div className="font-light">
                    {activeAssurance.subscriptionDate}
                  </div>
                </div>

                <div className="text-[18px] flex gap-2">
                  <div>Expiration Date : </div>
                  <div className="font-light">
                    {activeAssurance.expiredDate}
                  </div>
                </div>

                <div className="text-[18px] flex gap-2">
                  <div>Payed Price :</div>
                  <div className="font-light">
                    {activeAssurance.payedPrice} eUSD / Month
                  </div>
                </div>

                <div className="text-[18px] flex gap-2">
                  <div>Last Payment :</div>
                  <div className="font-light">{activeAssurance.payedPrice}</div>
                </div>

                <div className="flex gap-2">
                  <Button className=" flex-1 rounded-full   bg-[#2D8CF0] font-light text-[20px] gap-2">
                    Expired
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 rounded-full  font-light text-[20px] gap-2"
                  >
                    Expired
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
