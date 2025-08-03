// wallet.js

let web3;
let account;
let contract;
let usdtContract;
let kjcContract;
let routerContract;

async function connectWallet() {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];

      document.getElementById("walletAddress").innerText = `✅ ${account}`;

      // โหลด contract instance
      contract = new web3.eth.Contract(stakingABI, contractAddress);
      usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
      kjcContract = new web3.eth.Contract(kjcABI, kjcAddress);
      routerContract = new web3.eth.Contract(routerABI, routerAddress);

      // โหลดข้อมูลหลังเชื่อม
      await initApp();
    } catch (err) {
      console.error("⚠️ Wallet connect error:", err);
      alert("❌ ไม่สามารถเชื่อมต่อกระเป๋าได้");
    }
  } else {
    alert("⚠️ กรุณาติดตั้ง MetaMask หรือ Bitget Wallet");
  }
}
