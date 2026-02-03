"use client";

import React, { createContext, useContext, ReactNode } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  Connector,
} from "@starknet-react/core";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  walletName: string | null;
  connectors: readonly Connector[];
  connect: (connector: Connector) => void;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: Connector) => {
    connect({ connector });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected: isConnected ?? false,
        address: address ? `0x${address.slice(2)}` : null,
        walletName: connector?.name || null,
        connectors,
        connect: handleConnect,
        disconnect: handleDisconnect,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
