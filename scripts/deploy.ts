import { ethers } from "hardhat";

async function main() {
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();
  await donation.waitForDeployment();

  const address = await donation.getAddress();
  console.log(`Donation Deployed to : ${address}`);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
})