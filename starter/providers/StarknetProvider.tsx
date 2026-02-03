"use client";

import { ReactNode, useMemo } from "react";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  jsonRpcProvider,
  argent,
  braavos,
  voyager,
} from "@starknet-react/core";

function rpc() {
  return {
    nodeUrl: "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_10/2-rD0zPcF5-cGxLipvjwt",
  };
}

export function StarknetProvider({ children }: { children: ReactNode }) {
  // Create connectors inside the component to avoid SSR issues
  const connectors = useMemo(() => [braavos(), argent()], []);

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({ rpc })}
      connectors={connectors}
      explorer={voyager}
      autoConnect={true}
    >
      {children}
    </StarknetConfig>
  );
}
