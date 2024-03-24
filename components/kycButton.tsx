"use client";
import { BadgeCheck, Minus } from "lucide-react";
import React from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Button } from "./ui/button";
import { useTokensSDKManagement } from "@/lib/stores/tokenSDK.store";
import { useRouter } from "next/navigation";

const KycButton = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { setTokenSDK } = useTokensSDKManagement();
  const { signMessage } = useSignMessage({
    mutation: {
      async onSuccess(data) {
        await handleVerify();
        await getAccessToken(data);
        router.push("/kyc");
      },
    },
  });

  const handleVerify = async () => {
    try {
      const response = await fetch(
        `http://localhost:6002/verify/createApplicant/${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to verify applicant");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAccessToken = async (signature: string) => {
    try {
      const response = await fetch(
        `http://localhost:6002/verify/getAccessToken/${signature}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTokenSDK(data.token);
      } else {
        throw new Error("Failed to verify applicant");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      className="min-w-[153px]  px-[25px] rounded-full font-light text-[20px] gap-2"
      variant={"destructive"}
      onClick={() =>
        signMessage({
          message:
            "You consent to the collection, storage, and processing of your personal data in accordance with our Privacy Policy",
        })
      }
    >
      <Minus /> KYC
    </Button>
  );
};

export default KycButton;
