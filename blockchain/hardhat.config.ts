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
      chainId: 88882,                          // Exemple de chainId Chiliz Testnet (à confirmer)                  // Optionnel : clé privée pour déployer, si nécessaire
      accounts : ["df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"]
    },

  },
};

export default config;
