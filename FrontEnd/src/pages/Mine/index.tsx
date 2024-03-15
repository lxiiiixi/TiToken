import { useState } from "react";
import ContentWrapper from "@/sections/ContentWrapper";
// import type { TabsProps } from "antd";
// import { Tabs } from "antd";
import CreateMiner from "./CreateMiner";
import type { MinerInputData } from "@/hooks/useMiningCalculator";
import { useAccount, useBalance } from "wagmi";
import {
    useGetCurrentMintCost,
    useGetGlobalTRank,
    useGetUserMints,
} from "@/hooks/useReadTokenContract";
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
import { formatEther, isAddress, zeroAddress } from "viem";
import { useClaimMint, useStartMint } from "@/hooks/useWriteTokenContract";
import { MintStatus, UserMint } from "@/configs/interfaces";
import { calculateProgress, formatPercentage, formatPrice, timestampToDate } from "@/configs/utils";
import TIPS from "@/configs/tips";
import { useSearchParams } from "react-router-dom";

function Index() {
    const [minerData, setMinerData] = useState<MinerInputData>({
        length: 280,
        power: 100,
        number: 1,
    });

    const [searchParams] = useSearchParams();
    const inviterAddress = searchParams.get("inviter");
    const inviter =
        typeof inviterAddress === "string" && isAddress(inviterAddress)
            ? inviterAddress
            : zeroAddress;

    const openNotification = useNotification();
    const { startMint, startBatchMint } = useStartMint();
    const { batchClaimMint } = useClaimMint();

    const {
        mintRewardWithBonus,
        ethCost,
        ethUsdValue,
        ethUsdPrice,
        tokenPrice,
        marketValue,
        roi,
        currentMintableTitan,
        userBurnAmplifierBonus,
        currentEAABonus,
    } = useMiningCalculator(minerData);
    const { currentMintCost } = useGetCurrentMintCost();
    const { globalTRank } = useGetGlobalTRank();

    const { address } = useAccount();
    const { data: balance } = useBalance({ address });

    const mineInfoDisplay = getMineInfoDisplay(
        mintRewardWithBonus,
        ethCost,
        tokenPrice || 0n,
        marketValue || 0n,
        globalTRank,
        currentMintableTitan,
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
                if (startMint) startMint(data.power, data.length, inviter, ethCost);
                // await writeContractAsync({
                //     ...TOKEN_CONTRACT_CONFIT,
                //     address,
                //     functionName: "startMint",
                //     args: [data.power, data.length, inviter],
                //     value: ethCost,
                // });
            } catch (err) {
                // console.log(err);
                openNotification("error", "Error", err as string);
            }
        }
        if (type === "batch" && address) {
            try {
                if (startBatchMint)
                    startBatchMint(data.power, data.length, data.number, inviter, ethCost);
                // await writeContractAsync({
                //     ...TOKEN_CONTRACT_CONFIT,
                //     address,
                //     functionName: "batchMint",
                //     args: [data.power, data.length, data.number, inviter],
                //     value: ethCost,
                // });
            } catch (err) {
                openNotification("error", "Error", err as string);
            }
        }
    };

    const handleBatchClaim = async () => {
        if (address) {
            try {
                if (batchClaimMint) batchClaimMint();
                // await writeContractAsync({
                //     ...TOKEN_CONTRACT_CONFIT,
                //     address,
                //     functionName: "batchClaimMint",
                // });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const changeMinerData = (data: MinerInputData) => {
        setMinerData(data);
    };

    const { userMints } = useGetUserMints();

    const filterMints = (data: UserMint[], ethPrice: number, tokenPrice: bigint) => {
        const activeData = data
            .filter(i => i.mintInfo.status === MintStatus.ACTIVE)
            .map(item => {
                const rewardTokenValue = formatEther(
                    (item.mintInfo.mintableTitan * tokenPrice) / BigInt(1e18)
                );
                const costEthValue = ethPrice * Number(formatEther(item.mintInfo.mintCost));
                const roi = (Number(rewardTokenValue) - costEthValue) / costEthValue;

                const progress = calculateProgress(
                    Number(item.mintInfo.mintStartTs),
                    Number(item.mintInfo.maturityTs)
                );

                return {
                    mid: item.mId.toString(),
                    key: item.tRank.toString(),
                    tRank: item.tRank.toString(),
                    length: item.mintInfo.numOfDays.toString(),
                    startDay: timestampToDate(item.mintInfo.mintStartTs),
                    endDay: timestampToDate(item.mintInfo.maturityTs),
                    power: item.mintInfo.mintPower.toString(),
                    estToken: formatPrice(formatEther(item.mintInfo.mintableTitan)),
                    tRankBonus: formatPrice(item.mintInfo.mintPowerBonus), // contract
                    cost: formatPrice(formatEther(item.mintInfo.mintCost), 4),
                    value: formatPrice(rewardTokenValue),
                    roi: formatPercentage(roi, false),
                    progress: progress * 100, // 根据开始时间、当前时间、结束时间计算
                    isClaimable: item.mintInfo.maturityTs < Date.now() / 1000,
                    mintInfo: item.mintInfo,
                    // share: item.tRank.toString(),
                    // action: item.mintInfo.mintableTitan.toString(), // Claim button
                };
            });

        return {
            activeData: activeData.filter(item => !item.isClaimable),
            claimedData: activeData.filter(item => item.isClaimable),
            endedData: data.filter(
                i =>
                    i.mintInfo.status === MintStatus.CLAIMED ||
                    i.mintInfo.status === MintStatus.BURNED
            ),
        };
    };

    const { activeData, claimedData } = filterMints(userMints, ethUsdPrice, tokenPrice || 0n);

    return (
        <div>
            <ContentWrapper
                title="Mine"
                subTitle="Create your TITAN X virtual miners"
                tips={TIPS.mine.pageHeadingTips}
            >
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
                                <div key={item.key}>
                                    <TInfoGroup
                                        key={item.key}
                                        title={item.label}
                                        data={item.content}
                                    />
                                    {index !== mineInfoDisplay.length - 1 && <Divider />}
                                </div>
                            ))}
                            <NextDifficultIncrease />
                        </CardBgWrapper>
                    </div>
                </div>
                <div className="mt-20">
                    <TTabs>
                        <TabPanel title="Active Miners">
                            <MinerTable type="active" data={activeData} />
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
                                    disabled={!address || claimedData.length <= 1}
                                >
                                    Batch Claim Finished Miners (Claims up to 100 at a time)
                                </Button>
                            </div>
                            <MinerTable type="claimable" data={claimedData} />
                        </TabPanel>
                        <TabPanel title="Ended Miners">
                            <MinerTable type="ended" data={[]} />
                        </TabPanel>
                    </TTabs>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
