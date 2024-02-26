import ContentWrapper from "@/sections/ContentWrapper";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import InfoCard from "@/components/InfoCard";
import CreateMiner from "./CreateMiner";
import type { MineData } from "./CreateMiner";
import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT, MAX_MINT_POWER_CAP } from "@/configs/constants";
import { useGetCurrentMintCost } from "@/hooks/useReadTokenContract";

function Index() {
    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();
    const { currentMintCost } = useGetCurrentMintCost();

    const handleSubmitMiner = async (type: "single" | "batch", data: MineData) => {
        // getCurrentMintCost
        if (!currentMintCost) return;

        // getBatchMintCost in contract
        // (mintCost * mintPower * count) / MAX_MINT_POWER_CAP
        const neededValue =
            (BigInt(currentMintCost as number) * BigInt(data.power)) / BigInt(MAX_MINT_POWER_CAP);

        if (type === "single" && address) {
            console.log(1, data, neededValue);
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length],
                    value: BigInt(neededValue),
                });
            } catch (err) {
                console.log(err);
            }
        }
        if (type === "batch" && address) {
            const value = neededValue * BigInt(data.length);
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length, data.number],
                    value: BigInt(value),
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Single Miner",
            children: <CreateMiner type="single" onSubmit={handleSubmitMiner} />,
        },
        {
            key: "2",
            label: "Batch Create Miners",
            children: <CreateMiner type="batch" onSubmit={handleSubmitMiner} />,
        },
    ];

    const infoData = [
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
                    value: "3",
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
                    value: "$0.000000744",
                    tips: "Global TRank",
                },
                {
                    key: "3.2",
                    label: "Current Titan Per Day of Mining",
                    value: "$0.000000744",
                    tips: "Current Titan Per Day of Mining",
                },
                {
                    key: "3.3",
                    label: "🚀 Early Adoption Amplifier",
                    value: "$0.000000744",
                    tips: "🚀 Early Adoption Amplifier",
                },
                {
                    key: "3.4",
                    label: "🔥 Burn Bonus Amplifier",
                    value: "$0.000000744",
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

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
                    </div>
                    <div className="w-1/2">
                        <InfoCard data={infoData} />
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
