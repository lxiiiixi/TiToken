const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const GlobalTITANX = await ethers.getContractFactory("GlobalTITANX");
    const token = await GlobalTITANX.deploy(owner.address, otherAccount.address, owner.address);

    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { token, owner } = await loadFixture(deployOneYearLockFixture);

      console.log(await token.token());
      const TITANX = await ethers.getContractFactory("TITANX");
      const contract = TITANX.attach(await token.token());
      console.log(await contract.symbol());

      await contract.mint(owner.address, 100);


      // expect(await lock.unlockTime()).to.equal(unlockTime);
    });

  });

});