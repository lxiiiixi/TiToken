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

    const Invitation = await ethers.getContractFactory("Invitation")
    const invitation = await Invitation.deploy()

    const TITANX = await ethers.getContractFactory("TITANX");

    const token = await TITANX.deploy(owner.address, otherAccount.address, "0x4300000000000000000000000000000000000002", invitation.target);

    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { token } = await loadFixture(deployOneYearLockFixture);

      console.log(token);

      // expect(await lock.unlockTime()).to.equal(unlockTime);
    });

  });

});