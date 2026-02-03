"use client";

import React from "react";
import { Button } from "./ui/button";
import { Plus, Loader2 } from "lucide-react";

interface IncreaseButtonProps {
  onClick: () => void;
  value?: number;
  disabled?: boolean;
  loading?: boolean;
}

export function IncreaseButton({
  onClick,
  value = 1,
  disabled = false,
  loading = false,
}: IncreaseButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={disabled}
      className="h-auto min-h-16 px-6 py-3 rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/60 via-accent/40 to-background hover:border-accent/60 hover:bg-primary/20 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col gap-1 shadow-[0_2px_16px_rgba(139,92,246,0.15)]"
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      ) : (
        <>
          <Plus className="h-6 w-6 text-primary" />
          <span className="text-xs font-medium text-primary">+{value}</span>
        </>
      )}
    </Button>
  );
}
