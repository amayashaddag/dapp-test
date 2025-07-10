import { ethers, artifacts } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const NftFactory = await ethers.getContractFactory("NftFactory");
  const contract = await NftFactory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  const artifact = await artifacts.readArtifact("NftFactory");
  const frontendPath = path.join(__dirname, "..", "..", "client", "src");

  fs.mkdirSync(path.join(frontendPath, "abi"), { recursive: true });

  fs.writeFileSync(
    path.join(frontendPath, "abi", "NftFactory.json"),
    JSON.stringify(artifact, null, 2)
  );

  fs.writeFileSync(
    path.join(frontendPath, "config.js"),
    `export const NFT_FACTORY_ADDRESS = "${address}";\n`
  );

  console.log(`NftFactory deployed to ${address}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});