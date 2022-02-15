const address = "0x1A479F16508bB5Edf3eAf3Ce0fA5e29bf8A642f5";
const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_minContribution", type: "uint256" },
    ],
    name: "createCompaigns",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x9389b892",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "deployedCompaigns",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xe698bdf1",
  },
  {
    inputs: [],
    name: "getDeployedCompaigns",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x58c9aa44",
  },
];
