import { formatEther } from "viem";
import { PERCENT_BPS } from "@/configs/constants";
import { formatPrice, formatPercentage } from "@/configs/utils";
import { calculateROI } from "@/configs/calculate";

export default function getMineInfoDisplay(
    mintReward: bigint,
    ethCost: bigint,
    ethUsdPrice: number,
    tokenPrice: bigint,
    marketValue: number,
    globalTRank: bigint,
    currentMintableTitan: bigint,
    currentMintPowerBonus: bigint,
    userBurnAmplifierBonus: bigint,
    currentEAABonus: bigint
) {
    const ethUsdValue = (ethCost * BigInt(ethUsdPrice * 1e18)) / BigInt(1e18);

    console.log(currentEAABonus / BigInt(PERCENT_BPS));

    const mintRewardWithBonus =
        mintReward + (mintReward * currentEAABonus) / BigInt(PERCENT_BPS) / 10000n;

    const roi = calculateROI(marketValue, parseFloat(formatEther(ethUsdValue)));

    return [
        {
            key: "1",
            label: "Summary & Estimated ROI",
            content: [
                {
                    key: "1.1",
                    label: "Est. TITAN X at End of Miner",
                    value: `${formatPrice(formatEther(mintRewardWithBonus))}`,
                    tips: "Est. TITAN X at End of Miner",
                },
                {
                    key: "1.2",
                    label: "ETH to Start Miner",
                    value: `${formatPrice(formatEther(ethCost), 4)} ETH (~$${formatPrice(
                        formatEther(ethUsdValue)
                    )})`,
                    tips: "ETH to Start Miner",
                },
                {
                    key: "1.3",
                    label: "$ Market Value of Miner",
                    value: `$${formatPrice(marketValue, 4)}`,
                    tips: "Market Value of Miner",
                },
                {
                    key: "1.4",
                    label: "Est. ROI % at End of Miner",
                    value: `${formatPercentage(roi * PERCENT_BPS)}`,
                    tips: "Est. ROI % at End of Miner",
                },
            ],
        },
        {
            key: "2",
            label: "TITAN X Details",
            content: [
                {
                    key: "2.1",
                    label: "TITAN X Market Price",
                    value: `$${formatEther(tokenPrice)}`,
                    tips: "TITAN X Market Price",
                },
            ],
        },
        {
            key: "3",
            label: "TITAN X Miner Details",
            content: [
                {
                    key: "3.1",
                    label: "Global TRank",
                    value: `${formatPrice(globalTRank)}`,
                    tips: "Global TRank",
                },
                {
                    key: "3.2",
                    label: "Current Titan Per Day of Mining",
                    value: `${formatPrice(formatEther(currentMintableTitan))}`,
                    tips: "Current Titan Per Day of Mining",
                },
                {
                    key: "3.3",
                    label: "🚀 Early Adoption Amplifier",
                    value: `+${formatPercentage(currentEAABonus)}`,
                    tips: "🚀 Early Adoption Amplifier",
                },
                {
                    key: "3.4",
                    label: "🔥 Burn Bonus Amplifier",
                    value: `+${formatPercentage(userBurnAmplifierBonus)}`,
                    tips: "🔥 Burn Bonus Amplifier",
                },
            ],
        },
    ];
}
