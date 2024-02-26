import {
    useGetCurrentMintCost,
    useGetCurrentMintableTitan,
    useGetCurrentMintPowerBonus,
    useGetUserBurnAmplifierBonus,
    useGetCurrentEAABonus,
    useGetGlobalTRank,
} from "@/hooks/useReadTokenContract";
import { formatEther } from "viem";

function useMineInfoData(ethCost: string) {
    const { currentMintCost } = useGetCurrentMintCost();
    const { currentMintableTitan } = useGetCurrentMintableTitan();
    const { currentMintPowerBonus } = useGetCurrentMintPowerBonus();
    const { userBurnAmplifierBonus } = useGetUserBurnAmplifierBonus();
    const { currentEAABonus } = useGetCurrentEAABonus();
    const { globalTRank } = useGetGlobalTRank();

    console.log(currentMintCost);
    console.log(currentMintableTitan);
    console.log(currentMintPowerBonus);
    console.log(userBurnAmplifierBonus);

    // console.log(currentMintCost);

    const displayData = [
        {
            key: "1",
            label: "Summary & Estimated ROI",
            content: [
                {
                    key: "1.1",
                    label: "Est. TITAN X at End of Miner",
                    value: "0",
                    tips: "Est. TITAN X at End of Miner",
                },
                {
                    key: "1.2",
                    label: "ETH to Start Miner",
                    value: `${ethCost} ETH`,
                    tips: "ETH to Start Miner",
                },
                {
                    key: "1.3",
                    label: "$ Market Value of Miner",
                    value: "3",
                    tips: "Market Value of Miner",
                },
                {
                    key: "1.4",
                    label: "Est. ROI % at End of Miner",
                    value: "3",
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
                    value: "$0.000000744",
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
                    value: `${globalTRank}`,
                    tips: "Global TRank",
                },
                {
                    key: "3.2",
                    label: "Current Titan Per Day of Mining",
                    value: `${formatEther(currentMintableTitan)}`,
                    tips: "Current Titan Per Day of Mining",
                },
                {
                    key: "3.3",
                    label: "🚀 Early Adoption Amplifier",
                    value: `${currentEAABonus}`,
                    tips: "🚀 Early Adoption Amplifier",
                },
                {
                    key: "3.4",
                    label: "🔥 Burn Bonus Amplifier",
                    value: `${userBurnAmplifierBonus}`,
                    tips: "🔥 Burn Bonus Amplifier",
                },
                {
                    key: "4.5",
                    label: "Next Difficulty Increase",
                    value: "$0.000000744",
                    tips: "Next Difficulty Increase",
                },
            ],
        },
    ];

    return { displayData };
}

export default useMineInfoData;
