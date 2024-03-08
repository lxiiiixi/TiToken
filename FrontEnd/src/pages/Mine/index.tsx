import { useState } from "react";
import ContentWrapper from "@/sections/ContentWrapper";
// import type { TabsProps } from "antd";
// import { Tabs } from "antd";
import CreateMiner from "./CreateMiner";
import type { MinerInputData } from "@/hooks/useMiningCalculator";
import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";
import { useGetCurrentMintCost, useGetGlobalTRank } from "@/hooks/useReadTokenContract";
import getMineInfoDisplay from "./getMineInfoDisplay";
import NextDifficultIncrease from "@/sections/NextDifficultIncrease";
import MinerTable from "@/sections/Table/MinerTable";
import useMiningCalculator from "@/hooks/useMiningCalculator";
import TCard from "@/components/TCard";
import TInfoGroup from "@/components/TInfoGroup";
import { TTabs, TabPanel } from "@/components/TTabs";
import { Divider } from "antd";
// import useNotification from "@/hooks/useNotification";

function Index() {
    const [minerData, setMinerData] = useState<MinerInputData>({
        length: 280,
        power: 100,
        number: 1,
    });

    // const openNotification = useNotification();

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

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex-row lg:flex gap-4">
                    <div className="w-full lg:w-1/2 flex-1">
                        <TTabs>
                            <TabPanel title="Single Miner">
                                <CreateMiner
                                    type="single"
                                    isWalletConnected={!!address}
                                    minerData={minerData}
                                    changeMinerData={changeMinerData}
                                    onSubmit={handleSubmitMiner}
                                />
                            </TabPanel>
                            <TabPanel title="Batch Create Miners">
                                <CreateMiner
                                    type="batch"
                                    isWalletConnected={!!address}
                                    minerData={minerData}
                                    changeMinerData={changeMinerData}
                                    onSubmit={handleSubmitMiner}
                                />
                            </TabPanel>
                        </TTabs>
                    </div>
                    <div className="w-full lg:w-1/2 flex-1 relative">
                        <TCard number={2} className="w-full" />
                        <div className="absolute-top w-[88%] py-[5%]">
                            {mineInfoDisplay.map((item, index) => (
                                <>
                                    <TInfoGroup
                                        key={item.key}
                                        title={item.label}
                                        data={item.content}
                                    />
                                    {index !== mineInfoDisplay.length - 1 && <Divider />}
                                </>
                            ))}
                            <NextDifficultIncrease />
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <TTabs>
                        <TabPanel title="Active Miners">
                            <MinerTable />
                        </TabPanel>
                        <TabPanel title="Claimable Miners">1</TabPanel>
                        <TabPanel title="Ended Miners">1</TabPanel>
                    </TTabs>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
