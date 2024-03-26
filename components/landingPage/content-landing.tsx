import Image from "next/image";
import React from "react";
import firstImg from "@/lib/assets/logos/landingPage/3D_model_trust.png";
import SecondtImg from "@/lib/assets/logos/landingPage/3d_model_transparent.png";
import thirdImg from "@/lib/assets/logos/landingPage/3d_model_non_custodial.png";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const ContentLanding = () => {
  return (
    <div className="bg-backfum p-6 sm:p-12 lg:p-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div className="md:w-1/2">
          <div className="text-3xl md:text-5xl font-bold leading-tight">
            We bring <br />{" "}
            <span className="text-textBlue font-light">Trust</span>
          </div>
          <div className="max-w-md md:max-w-lg leading-relaxed mt-4 md:mt-6">
            We provide reliable, robust, and secure protection services to
            actual and futures insured users, mechanism to insure that the
            insurance company you are going for has everything in order to cover
            you.
          </div>
          <div className="mt-4 md:mt-6">
            <div className="font-normal text-lg md:text-xl">
              <span className="text-textBlue">➔</span> Proof-of-Reserve
            </div>
            <div className="font-normal text-lg md:text-xl">
              <span className="text-textBlue">➔</span> Transparent payments
              using the Blockchain
            </div>
            <div className="font-normal text-lg md:text-xl">
              <span className="text-textBlue">➔</span> Self Custodial
            </div>
          </div>
          <Button
            variant={"outline"}
            className="font-light text-lg md:text-xl rounded-full gap-2 bg-backfum mt-6"
          >
            Get Covered <ArrowRight />
          </Button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <Image src={firstImg} alt="boulimg" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div className="md:w-1/2 mt-6 md:mt-0">
          <Image src={SecondtImg} alt="boulimg" />
        </div>
        <div className="md:w-1/2">
          <div className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">
            Everything <br />{" "}
            <span className="text-textBlue font-light leading-none">
              Transparent and <br /> Compliant
            </span>
          </div>
          <div className="max-w-md md:max-w-lg leading-relaxed">
            We make sure that every transaction goes where it should be and we
            prevent fraud by applying mandatory KYC for each user.
          </div>

          <Button
            variant={"outline"}
            className="font-light text-lg md:text-xl rounded-full gap-2 bg-backfum mt-6"
          >
            Get Started <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="md:w-1/2">
          <div className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">
            Your keys your <br />{" "}
            <span className="text-textBlue font-light leading-none">Funds</span>
          </div>
          <div className="max-w-md md:max-w-lg leading-relaxed">
            We offer an instant transfer non-custodial service where you have
            full access to your wallet and thus we don’t have access to it.
          </div>

          <Button
            variant={"outline"}
            className="font-light text-lg md:text-xl rounded-full gap-2 bg-backfum mt-6"
          >
            Get Secured <ArrowRight />
          </Button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <Image src={thirdImg} alt="boulimg" />
        </div>
      </div>
    </div>
  );
};

export default ContentLanding;
