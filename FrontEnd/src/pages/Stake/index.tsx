import ContentWrapper from "@/sections/ContentWrapper";
import { Divider, Tooltip } from "antd";
import { useState } from "react";
import { useStartStake } from "@/hooks/useWriteTokenContract";
import NextDifficultIncrease from "@/sections/NextDifficultIncrease";
import StakeTable from "@/sections/Table/StakeTable";
import TInfoGroup from "@/components/TInfoGroup";
import { TTabs, TabPanel } from "@/components/TTabs";
import { useAccount } from "wagmi";

import CardBgWrapper from "@/sections/CardBgWrapper";
import useNotification from "@/hooks/useNotification";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useStakingCalculator from "@/hooks/useStakingCalculator";
import TIPS from "@/configs/tips";
import { formatPrice } from "@/configs/utils";
import SingleMiner from "./SingleMiner";
import useContractHashNotification from "@/hooks/useContractHashNotification";

export type StakeData = {
    amount: number;
    length: number;
};

export type UserStakesInfo = {
    titanAmount: bigint;
    shares: bigint;
    numOfDays: bigint;
    stakeStartTs: bigint;
    maturityTs: bigint;
    // StakeStatus status;
};

function Index() {
    const openNotification = useNotification();

    const [stakeData, setStakeData] = useState<StakeData>({
        amount: 0,
        length: 3500,
    });

    const {
        newShareWithBonus,
        currentShareRateDisplay,
        baseSharesDisplay,
        newShareWithBonusDisplay,
        longerPaysMoreBonusDisplay,
        biggerPaysMoreBonusDisplay,
        effectiveShareRateDisplay,
    } = useStakingCalculator(stakeData);

    const { address } = useAccount();

    // const { userCurrentActiveShares } = useGetUserCurrentActiveShares();
    const { startStake, startStakeHash, startStakePending } = useStartStake();
    useContractHashNotification(startStakePending, startStakeHash);
    // const { userStakes } = useGetUserStakes();
    // const stakeAmount = userStakes
    //     ? userStakes.reduce((acc, cur) => acc + Number(cur.titanAmount), 0)
    //     : 0n;

    const handleOnclickStake = () => {
        if (newShareWithBonus < 1n) {
            //  if (shares / SCALING_FACTOR_1e18 < 1) revert TitanXErrors.TitanX_RequireOneMinimumShare();
            openNotification("warning", "", "Your stake should have at least 1 share");
        }

        if (startStake && stakeData.amount && stakeData.length)
            startStake(stakeData.amount, stakeData.length);
    };

    const changeStakeData = (data: StakeData) => {
        setStakeData(data);
    };

    return (
        <div>
            <ContentWrapper
                title="Stake"
                subTitle="Earn ETH Passive Income by staking your TITAN X"
                tips={TIPS.stake.pageHeadingTips}
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <CardBgWrapper number={1}>
                            <SingleMiner
                                stakeData={stakeData}
                                changeStakeData={changeStakeData}
                                isWalletConnected={!!address}
                                handleOnclickStake={handleOnclickStake}
                            />
                        </CardBgWrapper>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <CardBgWrapper number={2}>
                            <TInfoGroup
                                key={"Stake summary"}
                                title="Stake Summary"
                                data={[
                                    {
                                        key: "1.1",
                                        label: "TITAN X in Stake",
                                        value: `${formatPrice(stakeData.amount)}`,
                                        tips: TIPS.stake.inStake,
                                    },
                                    {
                                        key: "1.2",
                                        label: "# of Shares",
                                        value: newShareWithBonusDisplay,
                                        tips: TIPS.stake.shares,
                                    },
                                ]}
                            />
                            <Divider />
                            <TInfoGroup
                                key={"TITAN X Stake Details (Estimations)"}
                                title="TITAN X Stake Details (Estimations)"
                                data={[
                                    {
                                        key: "2.1",
                                        label: "Current Share Rate (excl. Bonuses)",
                                        value: currentShareRateDisplay,
                                        tips: TIPS.stake.currentShareRate,
                                    },
                                    {
                                        key: "2.2",
                                        label: "Base Shares (excl. Bonuses)",
                                        value: `${baseSharesDisplay}`,
                                        tips: TIPS.stake.baseShares,
                                    },
                                    {
                                        key: "2.3",
                                        label: "Stake Share Bonuses",
                                        value: "",
                                    },
                                ]}
                            />
                            <div className="pl-4 md:pl-12 md:pr-6 text-white/70">
                                <div className="flex-between my-2">
                                    <span>
                                        Longer Pays More (350.00%)
                                        <Tooltip title={TIPS.stake.longerPaysMore}>
                                            <QuestionCircleOutlined className="w-[14px] ml-2" />
                                        </Tooltip>
                                    </span>
                                    <span className="text-nowrap">
                                        + {longerPaysMoreBonusDisplay}
                                    </span>
                                </div>
                                <div className="flex-between my-2">
                                    <span>
                                        Bigger Pays More (0.00%)
                                        <Tooltip title={TIPS.stake.biggerPaysMore}>
                                            <QuestionCircleOutlined className="w-[14px] ml-2" />
                                        </Tooltip>
                                    </span>
                                    <span className="text-nowrap">
                                        + {biggerPaysMoreBonusDisplay}
                                    </span>
                                </div>
                            </div>
                            <TInfoGroup
                                key={"More"}
                                title=""
                                data={[
                                    {
                                        key: "2.4",
                                        label: "Effective Share Rate (incl. Bonuses)",
                                        value: effectiveShareRateDisplay,
                                        tips: TIPS.stake.effectiveShareRate,
                                    },
                                    {
                                        key: "2.5",
                                        label: "Effective Shares (incl. Bonuses)",
                                        value: newShareWithBonusDisplay,
                                        tips: TIPS.stake.effectiveShares,
                                    },
                                ]}
                            />
                            <Divider />
                            <NextDifficultIncrease tips={TIPS.stake.increase} />
                        </CardBgWrapper>
                    </div>
                </div>
                <div className="mt-20">
                    <TTabs>
                        <TabPanel title="Active Stakers">
                            <StakeTable />
                        </TabPanel>
                        <TabPanel title="Claimable Stakers">
                            <StakeTable />
                        </TabPanel>
                        <TabPanel title="Ended Stakers">
                            <StakeTable />
                        </TabPanel>
                    </TTabs>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
