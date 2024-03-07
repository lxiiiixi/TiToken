import ContentWrapper from "@/sections/ContentWrapper";
import { InputNumber, Button } from "antd";
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

    const { balanceOf } = useErc20MetaData();
    // const { userCurrentActiveShares } = useGetUserCurrentActiveShares();
    const { startStake } = useStartStake();
    const { userStakes } = useGetUserStakes();
    const { currentShareRate } = useGlobalInfoData();

    const newShares = currentShareRate
        ? calculateShares(BigInt(stakeData.amount), BigInt(stakeData.length), currentShareRate)
        : 0n;

    const stakeAmount = userStakes
        ? userStakes.reduce((acc, cur) => acc + Number(cur.titanAmount), 0)
        : 0n;
    // console.log(currentShareRate);

    const SingleMiner = () => {
        const handleOnclickStake = () => {
            if (startStake && stakeData.amount && stakeData.length)
                startStake(stakeData.amount, stakeData.length);
        };

        const handleInput = (key: keyof StakeData, value: number) => {
            setStakeData(old => ({
                ...old,
                [key]: value,
            }));
        };

        const renderInput = (label: string, key: keyof StakeData, min: number, max: number) => (
            <div className="flex-between my-2">
                <span>{label}</span>
                <span>
                    <InputNumber
                        min={min}
                        max={max}
                        value={stakeData[key]}
                        onChange={value => value && handleInput(key, value)}
                    />
                    <Button
                        className="ml-2"
                        onClick={() => handleInput(key, max)}
                        disabled={max === 0}
                    >
                        MAX
                    </Button>
                </span>
            </div>
        );

        return (
            <div className="p-6">
                <h2 className="text-xl">Create TITAN X Staker</h2>
                <div>
                    {renderInput("Stake Amount", "amount", 0, balanceOf ? Number(balanceOf) : 0)}
                    {renderInput("Stake Length", "length", 0, 3500)}
                </div>
                <Button block className="my-4" onClick={handleOnclickStake}>
                    Start Stake
                </Button>
                <p className="text-gray-500 text-sm text-center my-2">
                    don't have TITAN X? buy here or mine here.
                </p>
            </div>
        );
    };

    const infoData = [
        {
            key: "1",
            label: "Stake Summary",
            content: [
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
            ],
        },
        {
            key: "2",
            label: "TITAN X Stake Details (Estimations)",
            content: [
                {
                    key: "2.1",
                    label: "Current Share Rate (excl. Bonuses)",
                    value: `${
                        currentShareRate
                            ? (
                                  Number(currentShareRate / BigInt(SCALING_FACTOR_1e18 / 100)) / 100
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
                    value: "+0",
                    tips: "Stake Share Bonuses",
                },
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
            ],
        },
    ];

    return (
        <div>
            <ContentWrapper
                title="Stake"
                subTitle="Earn ETH Passive Income by staking your TITAN X"
            >
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <SingleMiner />
                    </div>
                    <div className="w-1/2">
                        {/* <InfoCard data={infoData} /> */}
                        {infoData.map(item => (
                            <TInfoGroup key={item.key} data={item.content} title={item.label} />
                        ))}
                        <NextDifficultIncrease />
                    </div>
                </div>
                <StakeTable />
            </ContentWrapper>
        </div>
    );
}

export default Index;
