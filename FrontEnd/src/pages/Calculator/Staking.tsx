import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider } from "antd";
import TInfoGroup from "@/components/TInfoGroup";
import useStakingCalculator from "@/hooks/useStakingCalculator";
import { useTokenUsdValue } from "@/hooks/useTokenPrice";
import useStakerPayoutsCalculator from "@/hooks/useStakerPayoutsCalculator";
import { formatPrice } from "@/configs/utils";
import TIPS from "@/configs/tips";

export default function Staking() {
    const StakingTips = TIPS.calculator.staking;
    const [stakingData, setStakingData] = React.useState({
        amount: 1000000,
        length: 3500,
    });

    const {
        newShareWithBonus,
        newShareWithBonusDisplay,
        percentOfGlobalActiveSharesDisplay,
        effectiveShareRateDisplay,
    } = useStakingCalculator(stakingData);

    const tokenValue = useTokenUsdValue(BigInt(stakingData.amount));

    const {
        day8CyclePayout,
        day28CyclePayout,
        day90CyclePayout,
        day369CyclePayout,
        day888CyclePayout,
        payoutValueSum,
    } = useStakerPayoutsCalculator(newShareWithBonus);

    const handleChange = (key: string, value: number) =>
        setStakingData(old => ({ ...old, [key]: value }));

    const roi = payoutValueSum && tokenValue ? payoutValueSum / Number(tokenValue) : 0;

    return (
        <div>
            <MaxInputRender
                index="amount"
                label="Stake Amount"
                value={stakingData.amount}
                min={0}
                format
                tips={StakingTips.amount}
                handleChangeValue={handleChange}
            />
            <MaxInputRender
                index="length"
                label="Stake Length"
                value={stakingData.length}
                min={0}
                max={3500}
                tips={StakingTips.length}
                handleChangeValue={handleChange}
            />
            <Divider />
            <TInfoGroup
                title="Share Details"
                data={[
                    {
                        key: "Effective Share Rate",
                        label: "Effective Share Rate",
                        value: `${effectiveShareRateDisplay}`,
                        tips: StakingTips.effectiveShareRate,
                    },
                    {
                        key: "Effective Shares",
                        label: "Effective Shares",
                        value: `~ ${newShareWithBonusDisplay}`,
                        tips: StakingTips.effectiveShares,
                    },
                    {
                        key: "% of Global Active Shares",
                        label: "% of Global Active Shares",
                        value: `~ ${percentOfGlobalActiveSharesDisplay}`,
                        tips: StakingTips.globalActiveShares,
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
                        value: `$${formatPrice(tokenValue, 4)}`,
                    },
                    {
                        key: "Next 8-Day Payout",
                        label: "Next 8-Day Payout",
                        value: `$${day8CyclePayout.userPayoutValueByShares}`,
                        subValue: `≈ ${day8CyclePayout.userPayoutByShares}`,
                    },
                    {
                        key: "Next 28-Day Payout",
                        label: "Next 28-Day Payout",
                        value: `$${day28CyclePayout.userPayoutValueByShares}`,
                        subValue: `≈ ${day28CyclePayout.userPayoutByShares}`,
                    },
                    {
                        key: "Next 90-Day Payout",
                        label: "Next 90-Day Payout",
                        value: `$${day90CyclePayout.userPayoutValueByShares}`,
                        subValue: `≈ ${day90CyclePayout.userPayoutByShares}`,
                    },
                    {
                        key: "Next 369-Day Payout",
                        label: "Next 369-Day Payout",
                        value: `$${day369CyclePayout.userPayoutValueByShares}`,
                        subValue: `≈ ${day369CyclePayout.userPayoutByShares}`,
                    },
                    {
                        key: "Next 888-Day Payout",
                        label: "Next 888-Day Payout",
                        value: `$${day888CyclePayout.userPayoutValueByShares}`,
                        subValue: `≈ ${day888CyclePayout.userPayoutByShares}`,
                    },
                ]}
            />
            <Divider />
            <div className="text-center mt-8">
                Est. ROI % Throughout Stake
                {/* <div className="text-3xl">{`${Number(roi) / 100}%`}</div> */}
                <div className="text-3xl">{`${(roi * 100).toFixed(2)}%`}</div>
            </div>
        </div>
    );
}
