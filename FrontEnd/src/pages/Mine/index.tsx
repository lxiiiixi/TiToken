import { useState } from "react";
import ContentWrapper from "@/sections/ContentWrapper";
// import type { TabsProps } from "antd";
// import { Tabs } from "antd";
import CreateMiner from "./CreateMiner";
import type { MinerInputData } from "@/hooks/useMiningCalculator";
import { useWriteContract, useAccount, useBalance } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";
import { useGetCurrentMintCost, useGetGlobalTRank } from "@/hooks/useReadTokenContract";
import getMineInfoDisplay from "./getMineInfoDisplay";
import NextDifficultIncrease from "@/sections/NextDifficultIncrease";
import MinerTable from "@/sections/Table/MinerTable";
import useMiningCalculator from "@/hooks/useMiningCalculator";
import TInfoGroup from "@/components/TInfoGroup";
import { TTabs, TabPanel } from "@/components/TTabs";
import { Button, Divider } from "antd";
import useNotification from "@/hooks/useNotification";
import CardBgWrapper from "@/sections/CardBgWrapper";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { formatEther } from "viem";

function Index() {
    const [minerData, setMinerData] = useState<MinerInputData>({
        length: 280,
        power: 100,
        number: 1,
    });

    const openNotification = useNotification();

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
    const { data: balance } = useBalance({ address });

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

        if (balance?.value === undefined) {
            openNotification("error", "", `Please connect your wallet`);
            return;
        }

        if (ethCost > balance?.value) {
            openNotification(
                "error",
                "Insufficient balance",
                `A minimum of ${formatEther(ethCost)} ETH is required for this transaction`
            );
            return;
        }
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
                    functionName: "batchMint",
                    args: [data.power, data.length, data.number],
                    value: ethCost,
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleBatchClaim = async () => {
        if (address) {
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "batchClaimMint",
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
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
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
                    <div className="w-full lg:w-1/2">
                        <CardBgWrapper number={2}>
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
                        </CardBgWrapper>
                        {/* <TCard number={2} className="w-full" />
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
                        </div> */}
                    </div>
                </div>
                <div className="mt-20">
                    <TTabs>
                        <TabPanel title="Active Miners">
                            <MinerTable data={[]} />
                        </TabPanel>
                        <TabPanel title="Claimable Miners">
                            <div>
                                <h2>
                                    Batch Claim
                                    <Tooltip title={"Batch Claim"}>
                                        <QuestionCircleOutlined className="w-[14px] ml-2" />
                                    </Tooltip>
                                </h2>
                                <Button
                                    block
                                    type="primary"
                                    className="mb-4"
                                    onClick={handleBatchClaim}
                                    disabled={!address || [].length === 0}
                                >
                                    Batch Claim Finished Miners (Claims up to 100 at a time)
                                </Button>
                            </div>
                            <MinerTable data={[]} />
                        </TabPanel>
                        <TabPanel title="Ended Miners">
                            <MinerTable data={[]} />
                        </TabPanel>
                    </TTabs>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
