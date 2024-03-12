import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import TInfoGroup from "@/components/TInfoGroup";
import useStakingCalculator from "@/hooks/useStakingCalculator";

import useStakerPayoutsCalculator from "@/hooks/useStakerPayoutsCalculator";

export default function Staking() {
    const [stakingData, setStakingData] = React.useState({
        amount: 100000000,
        length: 3500,
    });

    const { newShareWithBonusDisplay, percentOfGlobalActiveSharesDisplay } = useStakingCalculator({
        amount: stakingData.amount,
        length: stakingData.length,
    });

    const {
        tokenValue,
        day8CyclePayout,
        day28CyclePayout,
        day90CyclePayout,
        day369CyclePayout,
        day888CyclePayout,
    } = useStakerPayoutsCalculator(BigInt(stakingData.amount), BigInt(stakingData.length));

    const handleChange = (key: string, value: number) =>
        setStakingData(old => ({ ...old, [key]: value }));

    return (
        <div>
            <MaxInputRender
                index="amount"
                label="Stake Amount"
                value={stakingData.amount}
                min={0}
                format
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
                        value: "",
                    },
                    {
                        key: "Effective Shares",
                        label: "Effective Shares",
                        value: newShareWithBonusDisplay,
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
                        value: `$${tokenValue}`,
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
