require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.21",
        settings: {
          optimizer: {
            enabled: true,
            runs: 20
          },
        }
      },
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
  },
  allowUnlimitedContractSize: true,
  networks: {
    "blast-sepolia": {
      url: `https://empty-sleek-energy.blast-sepolia.quiknode.pro/${process.env.QUICKNODE_API}/`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // 0x19759366933CaF4f4A0A6AEc01A4D6bFf3e520FE
      gasPrice: 1000000000,
    },
    hardhat: {
      forking: {
        enabled: true,
        url: `https://empty-sleek-energy.blast-sepolia.quiknode.pro/${process.env.QUICKNODE_API}/`,
      },
    }
  },
  etherscan: {
    apiKey: process.env.PRIVATE_KEY,
    customChains: [
      {
        network: "blast-sepolia",
        chainId: 168587773,
        urls: {
          apiURL: "https://sepolia.blast.io",
          browserURL: "https://testnet.blastscan.io/"
        }
      }
    ]
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
