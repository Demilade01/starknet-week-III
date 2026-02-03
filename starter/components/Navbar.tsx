"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useWallet } from "@/context/WalletContext";
import { ConnectModal } from "./ConnectModal";
import { TokenBalance } from "./TokenBalance";
import { UsdcBalance } from "./UsdcBalance";
import { DisconnectModal } from "./DisconnectModal";
import { Wallet } from "lucide-react";

export function Navbar() {
  const { isConnected, address } = useWallet();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);

  const handleWalletClick = () => {
    if (isConnected) {
      setIsDisconnectOpen(true);
    } else {
      setIsConnectOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">
              Starknet Africa
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && (
              <div className="hidden sm:flex items-center gap-2">
                <TokenBalance />
                <UsdcBalance />
              </div>
            )}

            <Button
              onClick={handleWalletClick}
              variant={isConnected ? "outline" : "default"}
              className="rounded-full font-semibold gap-2 transition-all duration-300"
            >
              <Wallet className="h-4 w-4" />
              {isConnected && address ? (
                <span className="font-mono">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
        </div>
      </nav>

      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />
      <DisconnectModal
        isOpen={isDisconnectOpen}
        onClose={() => setIsDisconnectOpen(false)}
      />
    </>
  );
}
