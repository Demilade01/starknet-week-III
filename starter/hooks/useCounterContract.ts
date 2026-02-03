"use client";

import { useMemo, useState } from "react";
import {
  useReadContract,
  useAccount,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";
import { COUNTER_ABI, COUNTER_ADDRESS } from "@/abi/counter_abi";

export function useCounterContract() {
  const { address } = useAccount();
  const [isWriting, setIsWriting] = useState(false);

  // Read current count
  const {
    data: countData,
    isLoading: isReadingCount,
    refetch: refetchCount,
    error: readError,
  } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: COUNTER_ABI,
    functionName: "get_current_count",
    args: [],
    watch: true,
  });

  // Get contract instance
  const { contract } = useContract({
    address: COUNTER_ADDRESS,
    abi: COUNTER_ABI,
  });

  // Send transaction hook
  const { sendAsync } = useSendTransaction({
    calls: undefined,
  });

  // Increase count by amount (calls increase_count_by_one multiple times)
  const increaseCountBy = async (amount: number) => {
    if (!address || !contract) throw new Error("Wallet not connected");

    setIsWriting(true);
    try {
      // Create array of calls - one for each increment
      const calls = Array.from({ length: amount }, () =>
        contract.populate("increase_count_by_one", [])
      );
      await sendAsync(calls);
      // Refetch count after transaction
      setTimeout(() => refetchCount(), 3000);
    } finally {
      setIsWriting(false);
    }
  };

  // Decrease count by amount (calls decrease_count_by_one multiple times)
  const decreaseCountBy = async (amount: number) => {
    if (!address || !contract) throw new Error("Wallet not connected");

    setIsWriting(true);
    try {
      // Create array of calls - one for each decrement
      const calls = Array.from({ length: amount }, () =>
        contract.populate("decrease_count_by_one", [])
      );
      await sendAsync(calls);
      // Refetch count after transaction
      setTimeout(() => refetchCount(), 3000);
    } finally {
      setIsWriting(false);
    }
  };

  // Parse count from response
  const count = useMemo(() => {
    if (!countData) return 0;
    // countData is a bigint or number
    return Number(countData);
  }, [countData]);

  return {
    count,
    isReadingCount,
    isWriting,
    increaseCountBy,
    decreaseCountBy,
    refetchCount,
    error: readError,
  };
}
