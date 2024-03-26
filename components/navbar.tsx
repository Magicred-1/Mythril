"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/lib/assets/logos/navbar/Logo.png";
import { Button } from "./ui/button";
import { Lexend } from "next/font/google";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const lexend = Lexend({ subsets: ["latin"] });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={` ${lexend.className} h-auto flex flex-col sm:flex-row justify-between items-center p-4 sm:p-9`}>
      <div
        onClick={() => {
          window.open("/", "_self");
        }}
        className="cursor-pointer"
      >
        <Image src={logo} alt="mainlogo" />
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-xl text-textBlue focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Button className="text-lg font-light" variant={"ghost"}>
            Browse
          </Button>
          <Button
            className="text-lg font-light"
            variant={"ghost"}
            onClick={() => {
              window.open("./partners", "_self");
            }}
          >
            Partners
          </Button>
          <Button className="text-lg font-light" variant={"ghost"}>
            Getting Listed ?
          </Button>
          <DynamicWidget
            buttonClassName="rounded-full text-lg font-light px-6 bg-textBlue"
            variant="dropdown"
            innerButtonComponent={
              <Button
                className="rounded-full text-lg font-light px-6 bg-textBlue"
              >
                Sign In
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;