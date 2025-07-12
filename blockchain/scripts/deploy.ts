import { ethers, artifacts } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const Ticketing = await ethers.getContractFactory("Ticketing");
  const contract = await Ticketing.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();

  const artifact = await artifacts.readArtifact("Ticketing");
  const frontendPath = path.join(__dirname, "..", "..", "client", "src");

  fs.mkdirSync(path.join(frontendPath, "abi"), { recursive: true });

  fs.writeFileSync(
    path.join(frontendPath, "abi", "Ticketing.json"),
    JSON.stringify(artifact, null, 2)
  );

  fs.writeFileSync(
    path.join(frontendPath, "config.js"),
    `export const TICKETING_ADDRESS = "${address}";\n`
  );

  console.log(`Ticketing deployed to ${address}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});