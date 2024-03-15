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
  etherscan: {
    apiKey: {
      blast_sepolia: "blast_sepolia", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "blast_sepolia",
        chainId: 168587773,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://testnet.blastscan.io"
        }
      }
    ]
  },
  networks: {
    "blast_sepolia": {
      url: `https://empty-sleek-energy.blast-sepolia.quiknode.pro/${process.env.QUICKNODE_API}/`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // 0x19759366933CaF4f4A0A6AEc01A4D6bFf3e520FE
      gasPrice: 1000000000,
    },
    hardhat: {
      forking: {
        enabled: true,
        // url: `https://empty-sleek-energy.blast-sepolia.quiknode.pro/${process.env.QUICKNODE_API}/`,
        url: "https://rpc.ankr.com/blast"
      },
    }
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
