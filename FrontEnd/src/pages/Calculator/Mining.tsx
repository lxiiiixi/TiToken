import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import { formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import useMiningCalculator from "@/hooks/useMiningCalculator";
import TInfoGroup from "@/components/TInfoGroup";
import TIPS from "@/configs/tips";

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
                <TInfoGroup
                    title="Summary & Estimated ROI"
                    data={[
                        {
                            key: "Est. TITAN X at End",
                            label: "Est. TITAN X at End",
                            tips: TIPS.calculator.mining.estTokenAtEnd,
                            value: `${formatPrice(formatEther(mintRewardWithBonus))}`,
                        },
                        {
                            key: "ETH to Start Miner(s)",
                            label: "ETH to Start Miner(s)",
                            tips: TIPS.calculator.mining.ethToStart,
                            value: `${formatPrice(formatEther(ethCost), 4)} ETH (~$${formatPrice(
                                formatEther(ethUsdValue)
                            )})`,
                        },
                        {
                            key: "$ Market Value of Miner(s)",
                            label: "$ Market Value of Miner(s)",
                            tips: TIPS.calculator.mining.marketValue,
                            value: `$${formatPrice(formatEther(marketValue), 4)}`,
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className="text-center mt-8">
                Est. ROI % at End of Miner(s)
                <div className="text-3xl">{`${Number(roi) / 100}%`}</div>
            </div>
        </div>
    );
}
