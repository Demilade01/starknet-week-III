"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Loader2, DollarSign } from "lucide-react";
import { useWallet } from "../context/WalletContext";
import { RpcProvider, CallData } from "starknet";
import { USDC_SEPOLIA } from "@/lib/coins";

export function UsdcBalance() {
  const { isConnected, address } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    setError(null);

    try {
      // Create provider for Sepolia
      const provider = new RpcProvider({
        nodeUrl: "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/demo",
      });

      // Call balanceOf using provider.callContract
      const result = await provider.callContract({
        contractAddress: USDC_SEPOLIA,
        entrypoint: "balanceOf",
        calldata: CallData.compile({ account: address }),
      });

      // USDC has 6 decimals - result is a u256 (low, high)
      const balanceValue = BigInt(result[0]);
      const formattedBalance = (Number(balanceValue) / 1e6).toFixed(2);

      setBalance(formattedBalance);
    } catch (err) {
      console.error("Failed to fetch USDC balance:", err);
      setError("Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && address) {
      fetchBalance();

      // Refresh every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [isConnected, address, fetchBalance]);

  if (!isConnected) return null;

  if (loading && !balance) {
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
          -- USDC
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-border/50 hover:bg-secondary/70 transition-colors">
      <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
        <DollarSign className="h-3 w-3 text-green-500" />
      </div>
      <span className="text-sm font-medium font-mono">{balance} USDC</span>
    </div>
  );
}
