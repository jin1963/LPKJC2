// config.js

// Contract address
const contractAddress = "0xFf77E7b8f574f31BeBF43F3348122a8331da0d47";
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
const kjcAddress = "0xd479ae350dc24168e8db863c5413c35fb2044ecd";
const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

// LP token ที่ใช้จริง (KJC-USDT LP)
const lpTokenAddress = "0xdF0d76046E72C183142c5208Ea0247450475A0DF";

// Minimal ERC20 ABI
const usdtABI = [
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], type: "function" },
  { constant: true, inputs: [{ name: "_owner", type: "address" }], name: "balanceOf", outputs: [{ name: "balance", type: "uint256" }], type: "function" },
  { constant: false, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }], name: "approve", outputs: [{ name: "success", type: "bool" }], type: "function" }
];

const kjcABI = usdtABI; // ใช้โครงเดียวกัน

// PancakeSwap Router ABI (เฉพาะที่ใช้)
const routerABI = [
  {
    name: "getAmountsOut",
    type: "function",
    constant: true,
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" }
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }]
  }
];

// Staking Contract ABI (ตัดเฉพาะที่จำเป็น)
const stakingABI = [
  { name: "buyAndStake", type: "function", inputs: [{ name: "usdtAmount", type: "uint256" }, { name: "amountOutMin", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { name: "claimStakingReward", type: "function", inputs: [], outputs: [], stateMutability: "nonpayable" },
  { name: "claimReferralReward", type: "function", inputs: [], outputs: [], stateMutability: "nonpayable" },
  { name: "withdrawLP", type: "function", inputs: [], outputs: [], stateMutability: "nonpayable" },
  { name: "setReferrer", type: "function", inputs: [{ name: "ref", type: "address" }], outputs: [], stateMutability: "nonpayable" },

  { name: "referralReward", type: "function", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "getPendingReward", type: "function", inputs: [{ name: "user", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { name: "canWithdraw", type: "function", inputs: [{ name: "user", type: "address" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  {
    name: "stakers", type: "function", inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "lastClaim", type: "uint256" },
      { name: "startTime", type: "uint256" }
    ], stateMutability: "view"
  }
];
