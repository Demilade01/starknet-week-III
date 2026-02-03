export const COUNTER_ADDRESS =
  "0x0070c4689c7c2357a75efb62cadf39ebc0b076c7ac7261d577312ae9fe8a4ac2";

export const COUNTER_ABI = [
  {
    name: "CounterImpl",
    type: "impl",
    interface_name: "session_1::ICounter",
  },
  {
    name: "session_1::ICounter",
    type: "interface",
    items: [
      {
        name: "get_current_count",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "increase_count",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "decrease_count",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "increase_count_by_one",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "decrease_count_by_one",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
] as const;