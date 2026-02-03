"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-background via-primary/10 to-background opacity-90 backdrop-blur-2xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-primary/40 bg-card/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(139,92,246,0.25)] sm:p-8 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              {title && <h2 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent">{title}</h2>}
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-primary/20 transition-colors opacity-70 hover:opacity-100 border border-primary/30"
              >
                <X className="h-5 w-5 text-primary" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
