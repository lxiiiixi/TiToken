import { formatEther } from "viem";
import { formatPrice, formatPercentage } from "@/configs/utils";
import TIPS from "@/configs/tips";

export default function getMineInfoDisplay(
    mintRewardWithBonus: bigint,
    ethCost: bigint,
    tokenPrice: bigint,
    marketValue: bigint,
    globalTRank: bigint,
    currentMintableTitan: bigint,
    userBurnAmplifierBonus: bigint,
    currentEAABonus: bigint,
    roi: bigint,
    ethUsdValue: bigint
) {
    // const ethUsdValue = (ethCost * parseEther(ethUsdPrice.toString())) / BigInt(1e18);
    // console.log(currentEAABonus / BigInt(PERCENT_BPS));
    // console.log(parseFloat(formatPrice(marketValue, 4)), marketValue);
    // console.log(parseFloat(formatPrice(ethUsdValue, 4)), ethUsdValue);

    // const roi = calculateROI(marketValue, ethUsdValue);
    const formatROI = `${Number(roi) / 100}%`;

    return [
        {
            key: "1",
            label: "Summary & Estimated ROI",
            content: [
                {
                    key: "1.1",
                    label: "Est. TITAN X at End of Miner",
                    value: `${formatPrice(formatEther(mintRewardWithBonus))}`,
                    tips: TIPS.mine.estEndOfMiner,
                },
                {
                    key: "1.2",
                    label: "ETH to Start Miner",
                    value: `${formatPrice(formatEther(ethCost), 4)} ETH (~$${formatPrice(
                        formatEther(ethUsdValue)
                    )})`,
                    tips: TIPS.mine.ethToStartMiner,
                },
                {
                    key: "1.3",
                    label: "$ Market Value of Miner",
                    value: `$${formatPrice(formatEther(marketValue), 4)}`,
                    tips: TIPS.mine.marketValue,
                },
                {
                    key: "1.4",
                    label: "Est. ROI % at End of Miner",
                    value: `${formatROI}`,
                    tips: TIPS.mine.roi,
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
                    tips: TIPS.mine.marketPrice,
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
                    tips: TIPS.mine.globalTRank,
                },
                {
                    key: "3.2",
                    label: "Current Titan Per Day of Mining",
                    value: `${formatPrice(formatEther(currentMintableTitan))}`,
                    tips: TIPS.mine.currentTokenPerDay,
                },
                {
                    key: "3.3",
                    label: "🚀 Early Adoption Amplifier",
                    value: `+${formatPercentage(Number(currentEAABonus) / 1e6 / 100, false)}`, //EAA Bonus has 1e6 scaling, so here divide by 1e6
                    tips: TIPS.mine.eaa,
                },
                {
                    key: "3.4",
                    label: "🔥 Burn Bonus Amplifier",
                    value: `+${formatPercentage(userBurnAmplifierBonus / BigInt(1e18))}`, //burnAmpBonus has 1e18 scaling
                    tips: TIPS.mine.burnAmp,
                },
            ],
        },
    ];
}
