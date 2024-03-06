import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import { formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import useMiningCalculator from "@/hooks/useMiningCalculator";

export default function Mining() {
    const [miningData, setMiningData] = React.useState({
        number: 1,
        length: 280,
        power: 100,
    });

    const { mintRewardWithBonus, ethCost, ethUsdValue, marketValue, roi } =
        useMiningCalculator(miningData);
    const handleChange = (key: string, value: number) =>
        setMiningData(old => ({ ...old, [key]: value }));

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
            <Divider />
            <div className="text-center">
                Est. ROI % at End of Miner(s)
                <div className="text-3xl">{`${Number(roi) / 100}%`}</div>
            </div>
        </div>
    );
}
