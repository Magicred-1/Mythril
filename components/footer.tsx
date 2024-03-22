import Image from "next/image";
import React from "react";
import tezos from "@/lib/assets/logos/footer/image 1.png";
import { Mail, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className="h-[73px] bg-[#191919] text-white flex flex-row items-center justify-between px-10 py-4 ">
      <div className="text-[12.8px]">
        © 2024 Mythril. All Rights Reserved
        <br />{" "}
        <span className="flex">
          Powered by
          <div className="center">
            <Image src={tezos} alt="tezoslogo" />
          </div>
          Tezos.
        </span>
      </div>
      <div className="flex gap-2">
        <Youtube className="text-textBlue" />
        <Twitter className="text-textBlue" />
        <Mail className="text-textBlue" />
      </div>
    </div>
  );
};

export default Footer;
