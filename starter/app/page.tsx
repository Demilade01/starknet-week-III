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

      {/* Add padding-top to prevent content from hiding under navbar */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-28 sm:pt-32 relative overflow-hidden">
        {/* Modern Dapp Background: Animated purple orb and grid */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[160px] opacity-60 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background opacity-80" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 max-w-md w-full">
          <div className="text-center space-y-2">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-primary via-accent to-foreground bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(139,92,246,0.7)]">
              Counter
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your count on Starknet.
            </p>
          </div>

          <div className="w-full aspect-square max-w-[320px] bg-card/70 backdrop-blur-2xl border-2 border-primary/40 rounded-3xl shadow-[0_8px_32px_0_rgba(139,92,246,0.25)] flex items-center justify-center relative group">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60" />

            {isReadingCount ? (
              <Loader2 className="h-16 w-16 animate-spin text-primary/60" />
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-8xl font-bold tracking-tighter tabular-nums text-primary drop-shadow-[0_2px_32px_rgba(139,92,246,0.7)]"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            )}
          </div>

          {/* Input field for custom value */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[220px]">
            <label htmlFor="amount" className="text-sm text-muted-foreground">
              Amount to add/subtract
            </label>
            <div className="relative w-full">
              <input
                id="amount"
                type="number"
                min="1"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-center text-xl font-semibold bg-card/80 border-2 border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-[0_2px_16px_rgba(139,92,246,0.15)] appearance-none pr-16"
                disabled={isWriting}
                style={{ MozAppearance: 'textfield' }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <button
                  type="button"
                  className="w-7 h-6 flex items-center justify-center rounded-t-md bg-primary/20 hover:bg-primary/40 text-primary text-lg font-bold transition-colors disabled:opacity-50"
                  onClick={() => setInputValue((v) => Math.max(1, v + 1))}
                  disabled={isWriting}
                  tabIndex={-1}
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="w-7 h-6 flex items-center justify-center rounded-b-md bg-primary/20 hover:bg-primary/40 text-primary text-lg font-bold transition-colors disabled:opacity-50"
                  onClick={() => setInputValue((v) => Math.max(1, v - 1))}
                  disabled={isWriting || inputValue <= 1}
                  tabIndex={-1}
                >
                  ▼
                </button>
              </div>
            </div>
            <style jsx global>{`
              /* Hide default number input arrows for all browsers */
              input[type=number]::-webkit-inner-spin-button,
              input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type=number] {
                -moz-appearance: textfield;
              }
            `}</style>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-6">
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
                className="h-12 w-12 rounded-full border-2 border-primary/40 bg-background/80 hover:rotate-180 hover:border-accent transition-transform duration-500 shadow-[0_2px_16px_rgba(139,92,246,0.15)]"
                disabled={isReadingCount}
              >
                {isReadingCount ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                ) : (
                  <RotateCcw className="h-5 w-5 text-primary" />
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
