import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { StarknetProvider } from "@/providers/StarknetProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starknet Africa Counter",
  description: "A counter app for the Starknet Africa community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background text-foreground antialiased")}>
        <StarknetProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
