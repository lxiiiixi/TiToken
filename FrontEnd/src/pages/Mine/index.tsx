import { useState } from "react";
import ContentWrapper from "@/sections/ContentWrapper";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import InfoCard from "@/components/InfoCard";
import CreateMiner from "./CreateMiner";
import type { MinerInputData } from "@/hooks/useMiningCalculator";
import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";
import { useGetCurrentMintCost, useGetGlobalTRank } from "@/hooks/useReadTokenContract";
import getMineInfoDisplay from "./getMineInfoDisplay";
import NextDifficultIncrease from "@/sections/NextDifficultIncrease";
import MinerTable from "@/sections/Table/MinerTable";
import useMiningCalculator from "@/hooks/useMiningCalculator";

function Index() {
    const [minerData, setMinerData] = useState<MinerInputData>({
        length: 280,
        power: 100,
        number: 1,
    });
    const {
        mintRewardWithBonus,
        ethCost,
        ethUsdValue,
        ethUsdPrice,
        tokenPrice,
        marketValue,
        roi,
        currentMintableTitan,
        currentMintPowerBonus,
        userBurnAmplifierBonus,
        currentEAABonus,
    } = useMiningCalculator(minerData);

    const { currentMintCost } = useGetCurrentMintCost();
    const { globalTRank } = useGetGlobalTRank();

    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();

    const mineInfoDisplay = getMineInfoDisplay(
        mintRewardWithBonus,
        ethCost,
        ethUsdPrice,
        tokenPrice || 0n,
        marketValue || 0n,
        globalTRank,
        currentMintableTitan,
        currentMintPowerBonus,
        userBurnAmplifierBonus,
        currentEAABonus,
        roi,
        ethUsdValue
    );

    const handleSubmitMiner = async (type: "single" | "batch", data: MinerInputData) => {
        if (!currentMintCost) return;

        if (type === "single" && address) {
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length],
                    value: ethCost,
                });
            } catch (err) {
                console.log(err);
            }
        }
        if (type === "batch" && address) {
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length, data.number],
                    value: ethCost,
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const changeMinerData = (data: MinerInputData) => {
        setMinerData(data);
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Single Miner",
            children: (
                <CreateMiner
                    type="single"
                    minerData={minerData}
                    changeMinerData={changeMinerData}
                    onSubmit={handleSubmitMiner}
                />
            ),
        },
        {
            key: "2",
            label: "Batch Create Miners",
            children: (
                <CreateMiner
                    type="batch"
                    minerData={minerData}
                    changeMinerData={changeMinerData}
                    onSubmit={handleSubmitMiner}
                />
            ),
        },
    ];

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={key => {
                                if (key === "1") {
                                    setMinerData({
                                        ...minerData,
                                        number: 1,
                                    });
                                } else {
                                    setMinerData({
                                        ...minerData,
                                        number: 10,
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className="w-1/2">
                        <InfoCard data={mineInfoDisplay} />
                        <NextDifficultIncrease />
                    </div>
                </div>
                <MinerTable />
            </ContentWrapper>
        </div>
    );
}

export default Index;
