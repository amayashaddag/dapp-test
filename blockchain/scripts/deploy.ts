import { ethers, artifacts } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const unlockTime = Math.floor(Date.now() / 1000) + 60; // 1 minute later

  const Lock = await ethers.getContractFactory("Lock");
  const contract = await Lock.deploy(unlockTime, { value: ethers.parseEther("0.001") });
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Lock deployed to:", address);

  const artifact = await artifacts.readArtifact("Lock");
  const frontendPath = path.join(__dirname, "..", "..", "client", "src");

  fs.mkdirSync(path.join(frontendPath, "abi"), { recursive: true });

  fs.writeFileSync(
    path.join(frontendPath, "abi", "Lock.json"),
    JSON.stringify(artifact, null, 2)
  );

  fs.writeFileSync(
    path.join(frontendPath, "config.js"),
    `export const LOCK_ADDRESS = "${address}";\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});