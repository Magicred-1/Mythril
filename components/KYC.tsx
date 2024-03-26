"use client";
import { useEffect } from "react";
import snsWebSdk from "@sumsub/websdk";
import { useTokensSDKManagement } from "@/lib/stores/tokenSDK.store";

const KYCComponent = () => {
  const { tokenSDK } = useTokensSDKManagement();
  useEffect(() => {
    // Call the launchWebSdk function when the component mounts
    launchWebSdk(tokenSDK);
  }, [tokenSDK]);

  const applicantEmail = "applicant@example.com";
  const applicantPhone = "1234567890"; // Include applicant phone if needed
  const newAccessToken = "your_new_access_token"; // Store the new access token if needed

  const launchWebSdk = (accessToken: string) => {
    let snsWebSdkInstance = snsWebSdk
      .init(accessToken, () => Promise.resolve("your_new_access_token"))
      .withConf({
        lang: "en",
        email: applicantEmail,
        phone: applicantPhone,
        theme: "light", // or 'light'
      })
      .withOptions({ addViewportTag: false, adaptIframeHeight: true })
      .on("idCheck.onStepCompleted", (payload) => {
        console.log("onStepCompleted", payload);
      })
      .on("idCheck.onError", (error) => {
        console.log("onError", error);
      })
      .build();

    // Launch the WebSDK by providing the container element for it
    snsWebSdkInstance.launch("#sumsub-websdk-container");
  };

  return (
    <div>
      <div id="sumsub-websdk-container"></div>
    </div>
  );
};

export default KYCComponent;
