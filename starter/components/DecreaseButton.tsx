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
      className="h-auto min-h-16 px-6 py-3 rounded-2xl border-2 hover:border-red-500 hover:bg-red-500/10 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex flex-col gap-1"
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <>
          <Minus className="h-6 w-6 text-red-500" />
          <span className="text-xs font-medium">-{value}</span>
        </>
      )}
    </Button>
  );
}
