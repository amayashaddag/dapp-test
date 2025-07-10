import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    testnet: {
      url: "https://spicy-rpc.chiliz.com/ ",  // Exemple d'URL RPC Chiliz Testnet (à vérifier)
      chainId: 88882,                          // Exemple de chainId Chiliz Testnet (à confirmer)
      accounts: ["3d1a89cd9877e8efd2946130f964ec8979370afc20ac737d73b28aa30928a793"]                     // Optionnel : clé privée pour déployer, si nécessaire
    },

  },
};

export default config;
