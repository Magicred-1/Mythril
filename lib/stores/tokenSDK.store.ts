import { create } from "zustand";

interface useTokensSDKManagementStore {
  tokenSDK: string;
  setTokenSDK: (tokenSDK: string) => void;
}

export const useTokensSDKManagement = create<useTokensSDKManagementStore>(
  (set) => ({
    tokenSDK: "",
    setTokenSDK: (tokenSDK: string) => set({ tokenSDK: tokenSDK }),
  })
);
