// wallet.js

let web3;
let account;
let contract;
let usdtContract;
let kjcContract;
let routerContract;

let isConnecting = false;
const BSC_CHAIN_ID = "0x38"; // BNB Smart Chain Mainnet

async function connectWallet() {
  if (isConnecting) return;
  isConnecting = true;

  if (window.ethereum) {
    try {
      // 🔄 ตรวจว่าอยู่บน BSC หรือไม่
      const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== BSC_CHAIN_ID) {
        try {
          // 🔁 พยายามสลับ chain ไป BSC
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_CHAIN_ID }]
          });
        } catch (switchError) {
          // หาก chain ยังไม่ถูกเพิ่ม → ขอเพิ่มเข้าไป
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: BSC_CHAIN_ID,
                chainName: "BNB Smart Chain",
                nativeCurrency: {
                  name: "BNB",
                  symbol: "BNB",
                  decimals: 18
                },
                rpcUrls: ["https://bsc-dataseed.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com"]
              }]
            });
          } else {
            throw switchError;
          }
        }
      }

      // ✅ ขอสิทธิ์เชื่อมกระเป๋า
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];

      document.getElementById("walletAddress").innerText = `✅ ${account}`;

      // ✅ เตรียม contract instance
      contract = new web3.eth.Contract(stakingABI, contractAddress);
      usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
      kjcContract = new web3.eth.Contract(kjcABI, kjcAddress);
      routerContract = new web3.eth.Contract(routerABI, routerAddress);

      // ✅ โหลดข้อมูล staking/referral
      await initApp();
    } catch (err) {
      console.error("⚠️ Wallet connect error:", err);
      alert("❌ ไม่สามารถเชื่อมต่อกระเป๋าได้");
    }
  } else {
    alert("⚠️ กรุณาติดตั้ง MetaMask หรือ Bitget Wallet");
  }

  isConnecting = false;
}
