import ContentWrapper from "@/sections/ContentWrapper";
import { Divider, Tooltip } from "antd";
import { useState } from "react";
import {
    useErc20MetaData,
    useGetUserStakes,
    useGlobalInfoData,
} from "@/hooks/useReadTokenContract";
import { useStartStake } from "@/hooks/useWriteTokenContract";
import NextDifficultIncrease from "@/sections/NextDifficultIncrease";
import { SCALING_FACTOR_1e18 } from "@/configs/constants";
import { calculateShares } from "@/configs/calculate";
import StakeTable from "@/sections/Table/StakeTable";
import TInfoGroup from "@/components/TInfoGroup";
import { TTabs, TabPanel } from "@/components/TTabs";
import { useAccount } from "wagmi";
import TButton from "@/components/TButton";
import MaxInputRender from "@/components/MaxInputRender";
import CardBgWrapper from "@/sections/CardBgWrapper";
import useNotification from "@/hooks/useNotification";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
    const [stakeData, setStakeData] = useState<StakeData>({
        amount: 0,
        length: 3500,
    });

    const { address } = useAccount();
    const { balanceOf } = useErc20MetaData();
    // const { userCurrentActiveShares } = useGetUserCurrentActiveShares();
    const { startStake } = useStartStake();
    const { userStakes } = useGetUserStakes();
    const { currentShareRate } = useGlobalInfoData();
    const openNotification = useNotification();

    const newShares = currentShareRate
        ? calculateShares(BigInt(stakeData.amount), BigInt(stakeData.length), currentShareRate)
        : 0n;

    const stakeAmount = userStakes
        ? userStakes.reduce((acc, cur) => acc + Number(cur.titanAmount), 0)
        : 0n;
    // console.log(currentShareRate);

    // Your stake should have at least 1 share

    const SingleMiner = () => {
        const handleOnclickStake = () => {
            if (newShares < 1n) {
                openNotification("warning", "", "Your stake should have at least 1 share");
            }

            if (startStake && stakeData.amount && stakeData.length)
                startStake(stakeData.amount, stakeData.length);
        };

        const handleInput = (key: string, value: number) => {
            setStakeData(old => ({
                ...old,
                [key]: value,
            }));
        };

        return (
            <>
                <h2 className="text-lg md:text-2xl">Create TITAN X Staker</h2>
                <div className="p-2 md:p-5">
                    {/* {renderInput("Stake Amount", "amount", 0, balanceOf ? Number(balanceOf) : 0)}
                    {renderInput("Stake Length", "length", 0, 3500)} */}
                    <MaxInputRender
                        index="amount"
                        label="Stake Amount"
                        value={stakeData.amount}
                        min={0}
                        max={balanceOf ? Number(balanceOf) : 0}
                        handleChangeValue={handleInput}
                    />

                    <MaxInputRender
                        index="length"
                        label="Stake Length"
                        value={stakeData.length}
                        min={0}
                        max={3500}
                        handleChangeValue={handleInput}
                    />
                </div>
                <TButton
                    type={address ? "primary" : "secondary"}
                    handleClick={() => address && handleOnclickStake()}
                    width="90%"
                    height="40px"
                    className="mx-auto my-8"
                >
                    {address ? "Start Stake" : "Connect Wallet"}
                </TButton>
                <p className="text-gray-500 text-sm text-center">
                    don't have TITAN X? buy here or mine here.
                </p>
            </>
        );
    };

    return (
        <div>
            <ContentWrapper
                title="Stake"
                subTitle="Earn ETH Passive Income by staking your TITAN X"
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <CardBgWrapper number={1}>
                            <SingleMiner />
                        </CardBgWrapper>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <CardBgWrapper number={2}>
                            {/* {infoData.map(item => (
                                <>
                                    <TInfoGroup
                                        key={item.key}
                                        data={item.content}
                                        title={item.label}
                                    />
                                    <Divider />
                                </>
                            ))} */}
                            <TInfoGroup
                                key={"Stake summary"}
                                title="Stake Summary"
                                data={[
                                    {
                                        key: "1.1",
                                        label: "TITAN X in Stake",
                                        value: `${stakeAmount}`,
                                        tips: "TITAN X in Stake",
                                    },
                                    {
                                        key: "1.2",
                                        label: "# of Shares",
                                        value: `${newShares}`,
                                        tips: "# of Shares",
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
                                        value: `${
                                            currentShareRate
                                                ? (
                                                      Number(
                                                          currentShareRate /
                                                              BigInt(SCALING_FACTOR_1e18 / 100)
                                                      ) / 100
                                                  ).toFixed(2)
                                                : 0
                                        }`,
                                        tips: "Current Share Rate (excl. Bonuses)",
                                    },
                                    {
                                        key: "2.2",
                                        label: "Base Shares (excl. Bonuses)",
                                        value: "+0",
                                        tips: "Base Shares (excl. Bonuses)",
                                    },
                                    {
                                        key: "2.3",
                                        label: "Stake Share Bonuses",
                                        value: 0,
                                        tips: "Stake Share Bonuses",
                                    },
                                ]}
                            />
                            <div className="pl-4 md:pl-12 md:pr-6 text-white/70">
                                <div className="flex-between my-2">
                                    <span>
                                        Longer Pays More (350.00%)
                                        <Tooltip
                                            title={
                                                "The longer you stake for, the more shares you get. This bonus starts at 0% and goes all the way up to 350% more shares at day 2888, you can go up to day 3500 to keep your shares for longer (called share preservation)."
                                            }
                                        >
                                            <QuestionCircleOutlined className="w-[14px] ml-2" />
                                        </Tooltip>
                                    </span>
                                    <span>+ 0</span>
                                </div>
                                <div className="flex-between my-2">
                                    <span>
                                        Bigger Pays More (0.00%)
                                        <Tooltip
                                            title={
                                                "The bigger your stake is, you get more shares. This goes up to 8% max at 100B TITAN X in 1 stake. This is linear - so if you stake 12.5B for example, it would be 1%."
                                            }
                                        >
                                            <QuestionCircleOutlined className="w-[14px] ml-2" />
                                        </Tooltip>{" "}
                                    </span>
                                    <span>+ 0</span>
                                </div>
                            </div>
                            <TInfoGroup
                                key={"More"}
                                title=""
                                data={[
                                    {
                                        key: "2.4",
                                        label: "Effective Share Rate (incl. Bonuses)",
                                        value: "+0",
                                        tips: "Effective Share Rate (incl. Bonuses)",
                                    },
                                    {
                                        key: "2.5",
                                        label: "Effective Shares (incl. Bonuses)",
                                        value: "0",
                                        tips: "Effective Shares (incl. Bonuses)",
                                    },
                                ]}
                            />
                            <Divider />
                            <NextDifficultIncrease />
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
