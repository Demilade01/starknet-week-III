"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useWallet } from "../context/WalletContext";
import { useBalance } from "@starknet-react/core";
import { STRK_SEPOLIA } from "@/lib/coins";

export function TokenBalance() {
  const { isConnected, address } = useWallet();

  const { data: balance, isLoading, error } = useBalance({
    address: address as `0x${string}` | undefined,
    token: STRK_SEPOLIA as `0x${string}`,
    watch: true,
  });

  if (!isConnected) return null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50">
        <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">
          Loading...
        </span>
      </div>
    );
  }

  if (error || !balance) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50">
        <span className="text-xs font-medium text-muted-foreground">
          -- STRK
        </span>
      </div>
    );
  }

  // Format balance to 4 decimal places
  const formattedBalance = parseFloat(balance.formatted).toFixed(4);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50 hover:bg-secondary/70 transition-colors">
      <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
        <img
          src="/starknetlogo.svg"
          alt="Starknet Logo"
          width={20}
          height={20}
        />
      </div>
      <span className="text-sm font-medium font-mono">{formattedBalance} STRK</span>
    </div>
  );
}
