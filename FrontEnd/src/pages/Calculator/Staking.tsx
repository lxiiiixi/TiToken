import React from "react";
import MaxInputRender from "@/components/MaxInputRender";
import { Divider, InputNumber } from "antd";

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
            <div>
                <div className="flex-between">
                    <div>Effective Share Rate (incl. Bonuses)</div>
                    <div>184.84</div>
                </div>
                <div className="flex-between">
                    <div>Effective Shares (incl. Bonuses)</div>
                    <div>~ 5.41</div>
                </div>
                <div className="flex-between">
                    <div>% of Global Active Shares</div>
                    <div>~ 0%</div>
                </div>
            </div>
            <Divider />
            {/* calculate payout */}
        </div>
    );
}
