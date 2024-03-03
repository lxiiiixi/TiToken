const { ethers } = require('ethers');

// const PROVIDER_URL = "https://empty-sleek-energy.blast-sepolia.quiknode.pro/1e64c41913116b897b3440be813b591aad6d96b5/"
const PROVIDER_URL = "https://eth-mainnet.g.alchemy.com/v2/Z2xliWVjYToNgU62-55w8-UuY28l79Zq"
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const contractAddress = '0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1';
// const contractAddress = '0xD1Eb23B8a9AE7FE2426cf8093253fe17e4f604E8';
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
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const data = contract.interface.encodeFunctionData("startMint", [100, 10]);
// const data = contract.interface.encodeFunctionData("symbol");

async function estimateGas() {

    // console.log(await contract.symbol());

    const tx = {
        to: contractAddress,
        data,
        value: ethers.parseEther("1")
    };
    const estimatedGas = await provider.estimateGas(tx);
    console.log(`Estimated gas: ${estimatedGas.toString()}`);
}

estimateGas().catch(console.error);
