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
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-primary/30 bg-background/80 backdrop-blur-xl shadow-[0_2px_16px_rgba(139,92,246,0.10)] rounded-b-3xl sm:rounded-b-full">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary via-accent to-background flex items-center justify-center shadow-[0_2px_16px_rgba(139,92,246,0.25)]">
              <span className="font-bold text-primary-foreground drop-shadow-[0_2px_8px_rgba(139,92,246,0.7)]">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">
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
              className="rounded-full font-semibold gap-2 transition-all duration-300 border-2 border-primary/40 bg-gradient-to-br from-primary/80 via-accent/60 to-background hover:shadow-[0_2px_16px_rgba(139,92,246,0.25)] hover:border-accent/60"
            >
              <Wallet className="h-4 w-4 text-primary" />
              {isConnected && address ? (
                <span className="font-mono text-primary">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              ) : (
                <span className="bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">Connect Wallet</span>
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
