import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider, InputNumber } from "antd";
import TInfoGroup from "@/components/TInfoGroup";

export default function Staking() {
    const [stakingData, setStakingData] = React.useState({
        amount: 0,
        length: 3500,
    });

    const handleChange = (key: string, value: number) =>
        setStakingData(old => ({ ...old, [key]: value }));

    return (
        <div>
            <div className="flex-between my-2">
                <span>Staking Amount</span>
                <span>
                    <InputNumber
                        min={0}
                        value={stakingData.amount}
                        onChange={value => {
                            return value && handleChange("amount", value);
                        }}
                    />
                </span>
            </div>
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
                        value: "184.84",
                    },
                    {
                        key: "Effective Shares",
                        label: "Effective Shares",
                        value: "~ 5.41",
                    },
                    {
                        key: "% of Global Active Shares",
                        label: "% of Global Active Shares",
                        value: "~ 0%",
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
                        value: "$0.63",
                    },
                    {
                        key: "Next 8-Day Payout",
                        label: "Next 8-Day Payout",
                        value: "12,803,856,486,039",
                        subValue: "≈ $8,099,081.62",
                    },
                    {
                        key: "Next 28-Day Payout",
                        label: "Next 28-Day Payout",
                        value: "183,425,549,385",
                        subValue: "≈ $116,025.86",
                    },
                    {
                        key: "Next 90-Day Payout",
                        label: "Next 90-Day Payout",
                        value: "11,580,844,872,333",
                        subValue: "≈ $7,325,465.41",
                    },
                    {
                        key: "Next 369-Day Payout",
                        label: "Next 369-Day Payout",
                        value: "171,416,095,233",
                        subValue: "≈ $108,429.28",
                    },
                    {
                        key: "Next 888-Day Payout",
                        label: "Next 888-Day Payout",
                        value: "23,558,951,253,591",
                        subValue: "≈ $14,902,218.66",
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
