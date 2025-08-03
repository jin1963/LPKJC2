// app.js

async function initApp() {
  if (!account || !web3) return;

  // โหลดข้อมูล staking
  await updateStakingInfo();

  // โหลดข้อมูล referral
  await updateReferralInfo();

  // สร้างลิงก์แนะนำ
  const currentUrl = window.location.origin + window.location.pathname;
  const referralLink = `${currentUrl}?ref=${account}`;
  document.getElementById("refLink").href = referralLink;
  document.getElementById("refLink").innerText = referralLink;
}

async function updateReferralInfo() {
  try {
    const reward = await contract.methods.referralReward(account).call();
    const formatted = web3.utils.fromWei(reward, "ether");
    document.getElementById("refReward").innerText = formatted;
  } catch (err) {
    console.error("❌ ไม่สามารถโหลดข้อมูล referral:", err);
  }
}
