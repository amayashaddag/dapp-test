import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NftFactoryABI from "./abi/NftFactory.json";
import { NFT_FACTORY_ADDRESS } from "./config"
import LandingPage from "./pages/LandingPage";
import { getHelloMessage } from "./api/backend";

function App() {
  const [nftContract, setNftContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    //connection to express server
    getHelloMessage()
      .then((res) => setData(res.data.message))
      .catch((err) => console.error("API error:", err));

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
        NFT_FACTORY_ADDRESS,
        NftFactoryABI.abi,
        signer
      );

      setNftContract(contract);
    };

    init();
  }, []);


  const handleMint = async () => {
    if (!nftContract) return;

    setLoading(true);
    setStatus("Minting NFT...");
    try {
      const tx = await nftContract.mint();
      await tx.wait();
      setStatus("🎉 NFT minted successfully!");
    } catch (err) {
      setStatus("❌ Minting failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   /* <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🖼️ NFT Factory</h1>
        <p className="text-sm text-gray-500 mb-6">
          Mint your own NFT on the blockchain
        </p>

        <div className="mb-6">
          <p className="text-gray-700 text-sm">📄 Contract Address</p>
          <code className="block break-all text-xs text-gray-500 bg-gray-100 p-2 rounded-md mt-1">
            {NFT_FACTORY_ADDRESS}
          </code>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-sm">👛 Connected Wallet</p>
          <code className="block break-all text-xs text-gray-500 bg-gray-100 p-2 rounded-md mt-1">
            {currentAccount || "Not connected"}
          </code>
        </div>

        <button
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleMint}
          disabled={loading}
        >
          {loading ? "Minting..." : "🎨 Mint NFT"}
        </button>

        {status && (
          <p className="text-sm text-gray-600 mt-4">{status}</p>
        )}
      </div>
      <CustomButton
              width="356px"
              height="50px"
              text="Connect your Socios Wallet"
              onClick={() => alert("Bouton cliqué !")}
      />

      <footer className="mt-8 text-xs text-gray-400 text-center">
        Powered by <span className="font-semibold text-blue-500">Hardhat & Ethers.js</span>
      </footer>
    </div>*/
    <LandingPage/>

  );
}

export default App;
