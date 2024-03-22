import Image from "next/image";
import React from "react";
import logo from "@/lib/assets/logos/navbar/Logo.png";
import { Button } from "./ui/button";
import { lexend } from "@/app/layout";

const Navbar = () => {
  return (
    <div
      className={` ${lexend.className} h-[87px] flex flex-row justify-between items-center p-9`}
    >
      <div>
        <Image src={logo} alt="mainlogo" />
      </div>
      <div>
        <Button className=" text-[19px] font-light" variant={"ghost"}>
          Browse
        </Button>
        <Button className="  text-[19px] font-light" variant={"ghost"}>
          Partners
        </Button>
        <Button className="  text-[19px] font-light" variant={"ghost"}>
          Getting Listed ?
        </Button>
        <Button className="rounded-full text-[19px] font-light px-6 bg-textBlue">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
