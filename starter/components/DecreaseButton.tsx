"use client";

import React from "react";
import { Button } from "./ui/button";
import { Minus, Loader2 } from "lucide-react";

interface DecreaseButtonProps {
  onClick: () => void;
  value?: number;
  disabled?: boolean;
  loading?: boolean;
}

export function DecreaseButton({
  onClick,
  value = 1,
  disabled = false,
  loading = false,
}: DecreaseButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={disabled}
      className="h-auto min-h-16 px-6 py-3 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-background via-primary/20 to-accent/30 hover:border-accent/60 hover:bg-primary/10 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col gap-1 shadow-[0_2px_16px_rgba(139,92,246,0.10)]"
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      ) : (
        <>
          <Minus className="h-6 w-6 text-primary" />
          <span className="text-xs font-medium text-primary">-{value}</span>
        </>
      )}
    </Button>
  );
}
