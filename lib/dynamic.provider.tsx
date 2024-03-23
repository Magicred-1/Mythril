"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
// import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { sepolia } from "viem/chains";

const config = createConfig({
    chains: [sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {
      [sepolia.id]: http()
    },
});

const evmNetworks = [
  {
    blockExplorerUrls: ['https://testnet-explorer.etherlink.com'],
    chainId: 128123,
    chainName: 'Etherlink Testnet',
    iconUrls: ["https://www.etherlink.com/_next/image?url=%2Fimg%2Fhome%2Flogo.png&w=256&q=75"],
    name: 'Etherlink Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Tezos',
      symbol: 'XTZ',
    },
    networkId: 128123,
    rpcUrls: ['https://node.ghostnet.etherlink.com'],    
    vanityName: 'Etherlink Testnet',
  },
];

const queryClient = new QueryClient();

const environmentId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "7c2d8840-84cd-41ea-a446-e9030fd029a9";

export const DynamicProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DynamicContextProvider
          settings={{
            environmentId,
            walletConnectors: [
              EthereumWalletConnectors,
              // ZeroDevSmartWalletConnectors,
            ],
            overrides: {
              evmNetworks
            },
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                  {children}
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
  );
};
