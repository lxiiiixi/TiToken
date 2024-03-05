import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import { calculateMintCost, calculateMintReward } from "@/configs/calculate";
import { formatPrice } from "@/configs/utils";
import { formatEther, parseEther } from "viem";
import { PERCENT_BPS } from "@/configs/constants";
import {
    useGetCurrentEAABonus,
    useGetUserBurnAmplifierBonus,
    useGetCurrentMintableTitan,
    useGetCurrentMintCost,
} from "@/hooks/useReadTokenContract";
import { useETHPrice, useTokenPrice } from "@/hooks/useTokenPrice";

export default function Mining() {
    const [miningData, setMiningData] = React.useState({
        number: 0,
        length: 280,
        power: 100,
    });

    const { currentEAABonus } = useGetCurrentEAABonus();
    const { currentMintableTitan } = useGetCurrentMintableTitan();
    const { userBurnAmplifierBonus } = useGetUserBurnAmplifierBonus();
    const { currentMintCost } = useGetCurrentMintCost();
    const ethUsdPrice = useETHPrice();
    const tokenPrice = useTokenPrice();

    const handleChange = (key: keyof typeof miningData, value: number) =>
        setMiningData(old => ({ ...old, [key]: value }));

    let mintReward = calculateMintReward(
        miningData.power,
        miningData.length,
        currentMintableTitan,
        userBurnAmplifierBonus,
        currentEAABonus
    );

    const ethCost = calculateMintCost(currentMintCost, miningData.power);

    if (miningData.number) mintReward = mintReward * BigInt(miningData.number);
    const mintRewardWithBonus =
        mintReward + (mintReward * currentEAABonus) / BigInt(PERCENT_BPS) / 10000n;
    const ethUsdValue = (ethCost * parseEther(ethUsdPrice.toString())) / BigInt(1e18);
    const marketValue = tokenPrice ? (tokenPrice * mintReward) / BigInt(1e18) : 0n;

    return (
        <div>
            <MaxInputRender
                index="number"
                label="Number of Miners"
                value={miningData.number}
                min={0}
                max={100}
                handleChangeValue={handleChange}
            />
            <MaxInputRender
                index="length"
                label="Miner Length"
                value={miningData.length}
                min={0}
                max={280}
                handleChangeValue={handleChange}
            />
            <MaxInputRender
                index="power"
                label="Miner Powers"
                value={miningData.power}
                min={0}
                max={100}
                handleChangeValue={handleChange}
            />
            <Divider />
            <div>
                <div className="flex-between">
                    <div>Est. TITAN X at End</div>
                    <div>{`${formatPrice(formatEther(mintRewardWithBonus))}`}</div>
                </div>
                <div className="flex-between">
                    <div>ETH to Start Miner(s)</div>
                    <div>{`${formatPrice(formatEther(ethCost), 4)} ETH (~$${formatPrice(
                        formatEther(ethUsdValue)
                    )})`}</div>
                </div>
                <div className="flex-between">
                    <div>$ Market Value of Miner(s)</div>
                    <div>{`$${formatPrice(formatEther(marketValue), 4)}`}</div>
                </div>
            </div>
        </div>
    );
}
