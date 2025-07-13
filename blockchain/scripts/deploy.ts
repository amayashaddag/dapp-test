import { ethers, artifacts } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const Universe = await ethers.getContractFactory("Universe");
  const contract = await Universe.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  const artifact = await artifacts.readArtifact("Universe");
  const frontendPath = path.join(__dirname, "..", "..", "client", "src");

  fs.mkdirSync(path.join(frontendPath, "abi"), { recursive: true });

  fs.writeFileSync(
    path.join(frontendPath, "abi", "Universe.json"),
    JSON.stringify(artifact, null, 2)
  );

  fs.writeFileSync(
    path.join(frontendPath, "config.js"),
    `export const UNIVERSE_ADDRESS = "${address}";\n`
  );

  console.log(`Universe deployed to ${address}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});