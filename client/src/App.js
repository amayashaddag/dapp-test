import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LockABI from "./abi/Lock.json";
import { LOCK_ADDRESS } from "./config";

function App() {
  const [lockContract, setLockContract] = useState(null);
  const [unlockTime, setUnlockTime] = useState(null);
  const [owner, setOwner] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setCurrentAccount(address);

      const contract = new ethers.Contract(
        LOCK_ADDRESS,
        LockABI.abi,
        signer
      );

      setLockContract(contract);

      const unlock = await contract.unlockTime();
      const ownerAddr = await contract.owner();

      setUnlockTime(Number(unlock));
      setOwner(ownerAddr);
    };

    init();
  }, []);

  const handleWithdraw = async () => {
    try {
      const tx = await lockContract.withdraw();
      await tx.wait();
      alert("Withdraw successful");
    } catch (err) {
      alert("Withdraw failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔓 Lock Contract</h1>
      <p>🧾 Contract: {LOCK_ADDRESS}</p>
      <p>👤 Owner: {owner}</p>
      <p>👛 You: {currentAccount}</p>
      <p>⏰ Unlock time: {unlockTime ? new Date(unlockTime * 1000).toString() : "..."}</p>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default App;
