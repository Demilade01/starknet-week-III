"use client";

import React, { useState } from "react";
import { Modal } from "./ui/modal";
import { useWallet } from "@/context/WalletContext";
import { Loader2, Wallet } from "lucide-react";
import { Connector } from "@starknet-react/core";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const { connect, connectors, isConnecting } = useWallet();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = async (connector: Connector) => {
    setConnectingId(connector.id);
    connect(connector);
    // Close modal after a short delay to allow connection to process
    setTimeout(() => {
      setConnectingId(null);
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet">
      <div className="grid gap-4">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            disabled={isConnecting}
            className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent hover:border-primary/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {connector.icon ? (
                  <img
                    src={typeof connector.icon === 'string' ? connector.icon : connector.icon.dark}
                    alt={connector.name}
                    className="h-6 w-6"
                  />
                ) : (
                  <Wallet className="h-5 w-5 text-primary" />
                )}
              </div>
              <span className="font-medium">{connector.name}</span>
            </div>
            {connectingId === connector.id && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
          </button>
        ))}
        {connectors.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No wallets detected.</p>
            <p className="text-sm mt-2">
              Please install{" "}
              <a
                href="https://braavos.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Braavos
              </a>{" "}
              or{" "}
              <a
                href="https://www.argent.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ArgentX
              </a>
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
