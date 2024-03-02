// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  // const buyandburn = await hre.ethers.deployContract("BuyAndBurnV2");
  // await buyandburn.waitForDeployment();
  // const buyAndBurnAddress = buyandburn.target

  // console.log(`BuyAndBurnV2 was deployed to ${buyAndBurnAddress}`);

  const buyAndBurnAddress = "0xD1Eb23B8a9AE7FE2426cf8093253fe17e4f604E8"

  const genesisAddress = "0x19759366933CaF4f4A0A6AEc01A4D6bFf3e520FE"
  const token = await hre.ethers.deployContract("TITANX", [genesisAddress, buyAndBurnAddress, "0x4300000000000000000000000000000000000002"]);
  await token.waitForDeployment();

  console.log(`TITANX was deployed to ${token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});