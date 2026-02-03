"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2 } from "lucide-react";
import { IncreaseButton } from "@/components/IncreaseButton";
import { DecreaseButton } from "@/components/DecreaseButton";
import { motion, AnimatePresence } from "framer-motion";
import { useCounterContract } from "@/hooks/useCounterContract";
import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const [inputValue, setInputValue] = useState(1);
  const { isConnected } = useWallet();
  const {
    count,
    isReadingCount,
    isWriting,
    increaseCountBy,
    decreaseCountBy,
    refetchCount,
  } = useCounterContract();

  const handleDecrease = async () => {
    if (!isConnected) return;
    try {
      await decreaseCountBy(inputValue);
    } catch (error) {
      console.error("Failed to decrease count:", error);
    }
  };

  const handleIncrease = async () => {
    if (!isConnected) return;
    try {
      await increaseCountBy(inputValue);
    } catch (error) {
      console.error("Failed to increase count:", error);
    }
  };

  const handleRefresh = () => {
    refetchCount();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setInputValue(value);
    } else if (e.target.value === "") {
      setInputValue(1);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Counter
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your count on Starknet.
            </p>
          </div>

          <div className="w-full aspect-square max-w-[280px] bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl flex items-center justify-center relative group">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-50" />

            {isReadingCount ? (
              <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-8xl font-bold tracking-tighter tabular-nums text-foreground drop-shadow-xl"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            )}
          </div>

          {/* Input field for custom value */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
            <label htmlFor="amount" className="text-sm text-muted-foreground">
              Amount to add/subtract
            </label>
            <input
              id="amount"
              type="number"
              min="1"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-center text-xl font-semibold bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isWriting}
            />
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-4">
              <DecreaseButton
                onClick={handleDecrease}
                value={inputValue}
                disabled={!isConnected || isWriting}
                loading={isWriting}
              />

              <Button
                onClick={handleRefresh}
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full hover:rotate-180 transition-transform duration-500"
                disabled={isReadingCount}
              >
                {isReadingCount ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <RotateCcw className="h-5 w-5" />
                )}
              </Button>

              <IncreaseButton
                onClick={handleIncrease}
                value={inputValue}
                disabled={!isConnected || isWriting}
                loading={isWriting}
              />
            </div>

            {!isConnected && (
              <p className="text-sm text-muted-foreground text-center">
                Connect your wallet to interact with the counter
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
