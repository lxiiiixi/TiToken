const { ethers } = require('ethers');

const PROVIDER_URL = "https://empty-sleek-energy.blast-sepolia.quiknode.pro/1e64c41913116b897b3440be813b591aad6d96b5/"
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const contractAddress = '0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1';

const contractABI = [{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "mintPower",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "numOfDays",
            "type": "uint256"
        }
    ],
    "name": "startMint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}];

const accounts = [
    {
        address: "0x123...",
        privateKey: "0xkjsbf..."
    },
];

async function startMintForAccounts() {
    for (const account of accounts) {
        const wallet = new ethers.Wallet(account.privateKey, provider);
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        try {
            const transaction = await contract.startMint(mintPower, numOfDays, ethers.ZeroAddress, {
                value: ethers.utils.parseEther("1"),
                gasLimit: 1000000
            });
            const receipt = await transaction.wait();
            console.log(`Transaction successful for ${account.address} with hash: ${receipt.transactionHash}`);
        } catch (error) {
            console.error(`Error with address ${account.address}: ${error.message}`);
        }
    }
}

startMintForAccounts().then(() => console.log("Done!"));