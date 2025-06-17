import { expect } from "chai";
import { ethers } from "hardhat";
import { Donation } from "../typechain-types"; // auto-generated types

describe("Donation", function () {
  it("Should Accept Donations and Allow Withdrawal", async function() {
    const [owner, donor] = await ethers.getSigners()
    const DonationFactory = await ethers.getContractFactory("Donation")
    const donation = await DonationFactory.deploy() as Donation
    await donation.waitForDeployment();

    // Donor donates 1 ETH
    await donation.connect(donor).donate({ value: ethers.parseEther("1.0") });

    expect(await donation.getDonation(donor.address)).to.equal(ethers.parseEther("1.0"));

    // Owner Withdraws
    const balanceBefore = await ethers.provider.getBalance(owner.address);
    const tx = await donation.connect(owner).withdraw();
    await tx.wait();
    const balanceAfter = await ethers.provider.getBalance(owner.address);

    expect(balanceAfter > balanceBefore).to.be.true;
  })
});
