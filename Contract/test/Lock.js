const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { calculateMintCost, calculateMintReward, calculateShares } = require("./calculate.js");
const { formatEther, ZeroAddress, parseEther } = require("ethers");

const getAndFormatBalance = async (address, ifFormat) => {
  if (ifFormat) {
    return ethers.formatEther(await ethers.provider.getBalance(address));
  } else {
    return await ethers.provider.getBalance(address);
  }
}

describe("Lock", function () {
  let owner, alice, bob;

  async function deployOneYearLockFixture() {
    [owner, alice, bob] = await ethers.getSigners();

    const GlobalTITANX = await ethers.getContractFactory("GlobalManager");
    const tokenManager = await GlobalTITANX.deploy(owner.address, owner.address);

    const TITANX = await ethers.getContractFactory("TITANX");
    const token = TITANX.attach(await tokenManager.token());

    const BuyAndBurnV2 = await ethers.getContractFactory("BuyAndBurnV2")
    const buyAndBurn = await BuyAndBurnV2.deploy(token.target, tokenManager.target);

    const Blast = await ethers.getContractFactory("Blast");
    const blast = Blast.attach("0x4300000000000000000000000000000000000002");

    await tokenManager.setBuyAndBurnContractAddress(buyAndBurn.target)

    return { tokenManager, token };
  }

  describe("Invitation test", function () {
    it("If no inviter", async function () {
      const { tokenManager } = await loadFixture(deployOneYearLockFixture);
      const currentMintCost = await tokenManager.getCurrentMintCost()

      await tokenManager.startMint(100, 280, ethers.ZeroAddress, { value: ethers.parseEther("1") });
      const mintCost = calculateMintCost(100, currentMintCost, 1)
      const undistributedEth = await tokenManager.getUndistributedEth()
      expect(undistributedEth).to.equal(mintCost);
    });

    it("Inviter will get bonus", async function () {
      const { tokenManager } = await loadFixture(deployOneYearLockFixture);
      const currentMintCost = await tokenManager.getCurrentMintCost()

      const balance1 = await getAndFormatBalance(owner.address);
      const balance3 = await getAndFormatBalance(alice.address);
      await tokenManager.startMint(100, 280, alice.address, { value: ethers.parseEther("1") });
      const balance2 = await getAndFormatBalance(owner.address);
      const balance4 = await getAndFormatBalance(alice.address);
      const undistributedEth = await tokenManager.getUndistributedEth()

      const mintCost = calculateMintCost(100, currentMintCost, 1)
      const inviterBonus = mintCost * 2n / 100n
      expect(balance1 - balance2).to.lt(mintCost); // cost some gas
      expect(balance4 - balance3).to.equal(inviterBonus);
      expect(undistributedEth).to.equal(mintCost - inviterBonus);
    });

    it("Inviter bonus will update if user stake more and longer", async function () {
      const { token, tokenManager } = await loadFixture(deployOneYearLockFixture);
      const mintableTitan = await tokenManager.getCurrentMintableTitan()
      const EAABonus = await tokenManager.getCurrentEAABonus()
      const burnBonus = await tokenManager.getUserBurnAmplifierBonus(owner.address)
      const mintReward = calculateMintReward(100, 280, mintableTitan, EAABonus, burnBonus)
      await tokenManager.connect(alice).startMint(100, 280, owner.address, { value: ethers.parseEther("1") });
      await time.increase(60 * 60 * 24 * 280); // 280 day
      // claim
      await tokenManager.connect(alice).batchClaimMint()
      expect(await token.balanceOf(alice.address)).to.equal(mintReward);
      expect(await token.balanceOf(owner.address)).to.equal(mintReward * 800n / 10000n);

      // console.log(mintReward, "mintReward"); // 1707798400000000000000000000n

      // stake
      await tokenManager.connect(alice).startStake(mintReward, 100)
      await tokenManager.startStake(mintReward * 800n / 10000n, 100)

      const shareRate = await tokenManager.getCurrentShareRate()
      const aliceStakingInfo = await tokenManager.getUserStakeInfo(alice.address, 1)
      const ownerStakingInfo = await tokenManager.getUserStakeInfo(owner.address, 1)

      expect(aliceStakingInfo[1]).to.equal(calculateShares((mintReward), 100n, shareRate));
      expect(ownerStakingInfo[1]).to.equal(calculateShares(mintReward * 800n / 10000n, 100n, shareRate));
      expect(await tokenManager.getInviterBonusPercent(owner.address)).to.equal(2);
      expect(await tokenManager.getInviterBonusPercent(alice.address)).to.equal(5);

      const aliceEthBalance = await getAndFormatBalance(alice.address)
      // bob mint 
      await tokenManager.connect(bob).startMint(100, 280, alice.address, { value: ethers.parseEther("1") });
      await time.increase(60 * 60 * 24 * 280); // 280 day
      const aliceEthBalanceNew = await getAndFormatBalance(alice.address)
      const currentMintCost = await tokenManager.getCurrentMintCost()
      const mintCost = calculateMintCost(100, currentMintCost, 1)
      expect(aliceEthBalanceNew - aliceEthBalance).to.equal(mintCost * 500n / 10000n);
    });

    it("Check user active share and global active share", async function () {
      const { token, tokenManager } = await loadFixture(deployOneYearLockFixture);
      await tokenManager.connect(alice).startMint(100, 280, owner.address, { value: ethers.parseEther("1") });
      await time.increase(60 * 60 * 24 * 280); // 280 day
      await tokenManager.connect(alice).batchClaimMint()
      const tokenBalance = await token.balanceOf(alice.address);
      await tokenManager.connect(alice).startStake(tokenBalance, 100)
      const shareRate = await tokenManager.getCurrentShareRate()
      const share = calculateShares((tokenBalance), 100n, shareRate)
      expect(await tokenManager.getUserCurrentActiveShares(alice.address)).to.equal(share);
      expect(await tokenManager.getGlobalActiveShares()).to.equal(share);

      expect(await tokenManager.getInviterBonusPercent(alice.address)).to.equal(5);
      await time.increase(60 * 60 * 24 * 100);
      await tokenManager.connect(alice).endStake(1)
      expect(await tokenManager.getInviterBonusPercent(alice.address)).to.equal(2);

      expect(await tokenManager.getUserCurrentActiveShares(alice.address)).to.equal(0);
      expect(await tokenManager.getGlobalActiveShares()).to.equal(0);

      // stake again
      await tokenManager.connect(alice).startStake(tokenBalance / 2n, 100)
      const shareRateNew = await tokenManager.getCurrentShareRate()
      const shareNew = calculateShares((tokenBalance / 2n), 100n, shareRateNew)
      expect(await tokenManager.getUserCurrentActiveShares(alice.address)).to.equal(shareNew);
      expect(await tokenManager.getGlobalActiveShares()).to.equal(shareNew);

      time.increase(60 * 60 * 24 * 10);
      await tokenManager.connect(alice).startStake(tokenBalance / 2n, 100)
      const shareRateNew2 = await tokenManager.getCurrentShareRate()
      const shareNew2 = calculateShares((tokenBalance / 2n), 100n, shareRateNew2)
      expect(await tokenManager.getUserCurrentActiveShares(alice.address)).to.equal(shareNew + shareNew2);
      expect(await tokenManager.getGlobalActiveShares()).to.equal(shareNew + shareNew2);

      time.increase(60 * 60 * 24 * 100);
      await tokenManager.connect(alice).endStake(2)
      expect(await tokenManager.getUserCurrentActiveShares(alice.address)).to.equal(shareNew2);
      expect(await tokenManager.getGlobalActiveShares()).to.equal(shareNew2);
    });
  });

  describe("Calculate Share", function () {
    it("Should record correct share", async function () {
      const { token, tokenManager } = await loadFixture(deployOneYearLockFixture);
      const mintableTitan = await tokenManager.getCurrentMintableTitan()
      const EAABonus = await tokenManager.getCurrentEAABonus()
      const burnBonus = await tokenManager.getUserBurnAmplifierBonus(owner.address)
      const mintReward = calculateMintReward(100, 137, mintableTitan, EAABonus, burnBonus)
      await tokenManager.connect(alice).startMint(100, 137, ZeroAddress, { value: ethers.parseEther("1") });
      await time.increase(60 * 60 * 24 * 137); // 137 day
      // claim
      await tokenManager.connect(alice).batchClaimMint()
      expect(await token.balanceOf(alice.address)).to.equal(mintReward);
      expect(await token.balanceOf(owner.address)).to.equal(mintReward * 800n / 10000n);

      console.log("mintReward", mintReward, formatEther(mintReward));

      // stake
      const stakeAmount = parseEther("10000000")
      await tokenManager.connect(alice).startStake(stakeAmount, 3500)
      const shareRate = await tokenManager.getCurrentShareRate()
      const aliceStakingInfo = await tokenManager.getUserStakeInfo(alice.address, 1)

      console.log("shareRate", shareRate, formatEther(shareRate));
      console.log("aliceStakingInfo", aliceStakingInfo[1], formatEther(aliceStakingInfo[1]));
      console.log("calculateShares", calculateShares(stakeAmount, 3500n, shareRate), formatEther(calculateShares(stakeAmount, 3500n, shareRate)));

    });
  });

  describe("Mint and claim test", function () {
    it("Claim before maturity day", async function () {
      const { token, tokenManager } = await loadFixture(deployOneYearLockFixture);
      const mintableTitan = await tokenManager.getCurrentMintableTitan()
      const EAABonus = await tokenManager.getCurrentEAABonus()
      const burnBonus = await tokenManager.getUserBurnAmplifierBonus(owner.address)
      const mintReward = calculateMintReward(100, 280, mintableTitan, EAABonus, burnBonus)
      await tokenManager.connect(alice).startMint(100, 280, owner.address, { value: ethers.parseEther("1") });
      await time.increase(60 * 60 * 24 * 100); // 100 day

      const mintId = await tokenManager.getUserLatestMintId(alice.address)
      await expect(tokenManager.connect(alice).claimMint(mintId))
        .to.be.revertedWithCustomError(tokenManager, "TitanX_MintNotMature()")

      await time.increase(60 * 60 * 24 * 180); // 180 day
      await tokenManager.connect(alice).claimMint(mintId)
      expect(await token.balanceOf(alice.address)).to.equal(mintReward);
      expect(await token.balanceOf(owner.address)).to.equal(mintReward * 800n / 10000n);
    });
  });

  // describe("Claim ETH payout test", function () {
  //   it("Claim before maturity day", async function () {
  //     const { token, tokenManager } = await loadFixture(deployOneYearLockFixture);

  //     await tokenManager.connect(alice).startMint(100, 280, owner.address, { value: ethers.parseEther("1") });
  //     await tokenManager.connect(bob).startMint(100, 280, owner.address, { value: ethers.parseEther("1") });
  //     await tokenManager.connect(owner).startMint(100, 280, ethers.ZeroAddress, { value: ethers.parseEther("1") });

  //     // const aliceEthBalance = await getAndFormatBalance(alice.address, true)
  //     // const bobEthBalance = await getAndFormatBalance(bob.address, true)
  //     // const ownerEthBalance = await getAndFormatBalance(owner.address, true)
  //     // console.log(aliceEthBalance, bobEthBalance, ownerEthBalance);

  //     await time.increase(60 * 60 * 24 * 280); // 280 day

  //     await tokenManager.connect(alice).claimMint(1)
  //     await tokenManager.connect(bob).claimMint(1)
  //     await tokenManager.connect(owner).claimMint(1)

  //     const mintableTitan = await tokenManager.getCurrentMintableTitan()
  //     const EAABonus = await tokenManager.getCurrentEAABonus()
  //     const burnBonus = await tokenManager.getUserBurnAmplifierBonus(owner.address)
  //     const mintReward = calculateMintReward(100, 280, mintableTitan, EAABonus, burnBonus)

  //     await tokenManager.connect(alice).startStake(mintReward, 30)
  //     await tokenManager.connect(bob).startStake(mintReward, 90)
  //     await tokenManager.connect(owner).startStake(mintReward, 369)

  //     // await time.increase(60 * 60 * 24 * 6); // 8 day

  //     expect(await tokenManager.getUserETHClaimableTotal(alice.address)).to.equal(0);
  //     await tokenManager.triggerPayouts()

  //     const aliceETHClaimable = await tokenManager.getUserETHClaimableTotal(alice.address)
  //     const bobETHClaimable = await tokenManager.getUserETHClaimableTotal(bob.address)
  //     const ownerETHClaimable = await tokenManager.getUserETHClaimableTotal(owner.address)

  //     await expect(tokenManager.connect(alice).claimUserAvailableETHPayouts())
  //       .to.emit(tokenManager, "RewardClaimed")
  //       .withArgs(alice.address, aliceETHClaimable)
  //     await expect(tokenManager.connect(bob).claimUserAvailableETHPayouts())
  //       .to.emit(tokenManager, "RewardClaimed")
  //       .withArgs(bob.address, bobETHClaimable)
  //     await expect(tokenManager.connect(owner).claimUserAvailableETHPayouts())
  //       .to.emit(tokenManager, "RewardClaimed")
  //       .withArgs(owner.address, ownerETHClaimable)
  //   });
  // });
});