import Image from "next/image";
import React from "react";
import firstImg from "@/lib/assets/logos/landingPage/3D_model_trust.png";
import SecondtImg from "@/lib/assets/logos/landingPage/3d_model_transparent.png";
import thirdImg from "@/lib/assets/logos/landingPage/3d_model_non_custodial.png";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const ContentLanding = () => {
  return (
    <div className="bg-backfum">
      <div className="center flex flex-row">
        <div className="space-y-4">
          <div className=" text-[40px] font-bold leading-tight">
            We bring <br />{" "}
            <span className="text-textBlue font-light ">Trust</span>
          </div>
          <div className=" max-w-[418px] leading-[1.2]">
            We provide reliable, robust, and secure protection services to
            actual and futures insured users,mechanism to insure that the
            insurance company you are going for has everything in order to cover
            you.
          </div>
          <div>
            <div className=" font-normal text-[19px]">
              <span className="text-textBlue">➔</span> Proof-of-Reserve
            </div>
            <div className=" font-normal text-[19px]">
              <span className="text-textBlue">➔</span> Transparent payments
              using the Blockchain
            </div>
            <div className=" font-normal text-[19px]">
              <span className="text-textBlue">➔</span> Self Custodial
            </div>
          </div>
          <Button
            variant={"outline"}
            className=" font-light text-[19px] rounded-full gap-2 bg-backfum"
          >
            Get Covered <ArrowRight />
          </Button>
        </div>
        <div>
          <Image src={firstImg} alt="boulimg" />
        </div>
      </div>

      <div className="center flex flex-row">
        <Image src={SecondtImg} alt="boulimg" />
        <div className="space-y-5">
          <div className=" text-[40px] font-bold mb-8 ">
            Everything <br />{" "}
            <div className="text-textBlue font-light leading-none">
              Transparent and <br /> Compliant
            </div>
          </div>
          <div className=" max-w-[411px] leading-[1.2]">
            We make sure that every transactions goes where it should be and we
            prevent the fraud by applying a mandatory KYC for each user.
          </div>

          <Button
            variant={"outline"}
            className=" font-light text-[19px] rounded-full gap-2 bg-backfum"
          >
            Get Started <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="center flex flex-row">
        <div className="space-y-5">
          <div className=" text-[40px] font-bold mb-8 ">
            Your keys your <br />{" "}
            <div className="text-textBlue font-light leading-none">Funds</div>
          </div>
          <div className=" max-w-[411px] leading-[1.2]">
            We offer a instant transfer non-custodial service where your have
            fully access to your wallet and thus we don’t have access to it.
          </div>

          <Button
            variant={"outline"}
            className=" font-light text-[19px] rounded-full gap-2 bg-backfum"
          >
            Get Secured <ArrowRight />
          </Button>
        </div>
        <Image src={thirdImg} alt="boulimg" />
      </div>
    </div>
  );
};

export default ContentLanding;
