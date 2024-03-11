import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import TInfoGroup from "@/components/TInfoGroup";
import useStakingCalculator from "@/hooks/useStakingCalculator";
import { useETHPrice, useTokenPrice } from "@/hooks/useTokenPrice";
import { formatEther } from "viem";
import { useGetPayoutCyclesData } from "@/hooks/useReadTokenContract";
import { formatPrice } from "@/configs/utils";

export default function Staking() {
    const [stakingData, setStakingData] = React.useState({
        amount: 100000000,
        length: 3500,
    });

    const { newShareDisplay, percentOfGlobalActiveSharesDisplay } = useStakingCalculator({
        amount: stakingData.amount,
        length: stakingData.length,
    });

    const { globalCyclePayout } = useGetPayoutCyclesData();
    const ethUsdPrice = useETHPrice();
    const tokenPrice = useTokenPrice();

    const getCyclePayout = (dayNum: 8 | 28 | 90 | 369 | 888) => {
        const cyclePayoutByDay = globalCyclePayout ? globalCyclePayout[dayNum] : 0n;
        const payoutValueByDay = ethUsdPrice * parseFloat(formatEther(cyclePayoutByDay));
        return {
            cyclePayoutByDay: `${formatPrice(formatEther(cyclePayoutByDay), 4)} ETH`,
            payoutValueByDay: formatPrice(payoutValueByDay),
        };
    };

    const day8CyclePayout = getCyclePayout(8);
    const day28CyclePayout = getCyclePayout(28);
    const day90CyclePayout = getCyclePayout(90);
    const day369CyclePayout = getCyclePayout(369);
    const day888CyclePayout = getCyclePayout(888);

    const handleChange = (key: string, value: number) =>
        setStakingData(old => ({ ...old, [key]: value }));

    return (
        <div>
            <MaxInputRender
                index="amount"
                label="Stake Amount"
                value={stakingData.amount}
                min={0}
                handleChangeValue={handleChange}
            />
            <MaxInputRender
                index="length"
                label="Stake Length"
                value={stakingData.length}
                min={0}
                max={3500}
                handleChangeValue={handleChange}
            />
            <Divider />
            <TInfoGroup
                title="Share Details"
                data={[
                    {
                        key: "Effective Share Rate",
                        label: "Effective Share Rate",
                        value: newShareDisplay,
                    },
                    {
                        key: "Effective Shares",
                        label: "Effective Shares",
                        value: "~ 5.41",
                    },
                    {
                        key: "% of Global Active Shares",
                        label: "% of Global Active Shares",
                        value: percentOfGlobalActiveSharesDisplay,
                    },
                ]}
            />
            <Divider />
            <TInfoGroup
                title="Summary & Your % of Staker Payouts"
                data={[
                    {
                        key: "TITAN X Value",
                        label: "TITAN X Value",
                        value: `$${formatEther(tokenPrice || 0n)}`,
                    },
                    {
                        key: "Next 8-Day Payout",
                        label: "Next 8-Day Payout",
                        value: `$${day8CyclePayout.payoutValueByDay}`,
                        subValue: `≈ ${day8CyclePayout.cyclePayoutByDay}`,
                    },
                    {
                        key: "Next 28-Day Payout",
                        label: "Next 28-Day Payout",
                        value: `$${day28CyclePayout.payoutValueByDay}`,
                        subValue: `≈ ${day28CyclePayout.cyclePayoutByDay}`,
                    },
                    {
                        key: "Next 90-Day Payout",
                        label: "Next 90-Day Payout",
                        value: `$${day90CyclePayout.payoutValueByDay}`,
                        subValue: `≈ ${day90CyclePayout.cyclePayoutByDay}`,
                    },
                    {
                        key: "Next 369-Day Payout",
                        label: "Next 369-Day Payout",
                        value: `$${day369CyclePayout.payoutValueByDay}`,
                        subValue: `≈ ${day369CyclePayout.cyclePayoutByDay}`,
                    },
                    {
                        key: "Next 888-Day Payout",
                        label: "Next 888-Day Payout",
                        value: `$${day888CyclePayout.payoutValueByDay}`,
                        subValue: `≈ ${day888CyclePayout.cyclePayoutByDay}`,
                    },
                ]}
            />
            <Divider />
            <div className="text-center mt-8">
                Est. ROI % at End of Miner(s)
                {/* <div className="text-3xl">{`${Number(roi) / 100}%`}</div> */}
                <div className="text-3xl">{`101.86%`}</div>
            </div>
        </div>
    );
}
