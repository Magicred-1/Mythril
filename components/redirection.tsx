"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const Redirection = () => {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    console.log("Redirection");
    if (isConnected) {
      router.push("/user");
    }
  }, [isConnected, address]);

  return <div></div>;
};

export default Redirection;
