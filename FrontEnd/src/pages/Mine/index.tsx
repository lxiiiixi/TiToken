import ContentWrapper from "@/sections/ContentWrapper";
import type { TabsProps } from "antd";
import { Tabs, InputNumber, Button } from "antd";
import InfoCard from "@/components/InfoCard";

function index() {
    const SingleMiner = () => {
        return (
            <div className="p-6">
                <h2 className="text-xl">Create TITAN X Miner</h2>
                <div>
                    <div className="flex-between my-2">
                        <span>Miner Length</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                    <div className="flex-between my-2">
                        <span>Miner Power</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                </div>
                <Button block>Create Miner</Button>
            </div>
        );
    };

    const BatchCreateMiners = () => {
        return (
            <div className="p-6">
                <h2 className="text-xl"> Batch Create Miners</h2>
                <div>
                    <div className="flex-between my-2">
                        <span>Number of Miners</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                    <div className="flex-between my-2">
                        <span>Miner Length</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                    <div className="flex-between my-2">
                        <span>Miner Power</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                </div>
                <Button block>Batch Create Miners</Button>
            </div>
        );
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Single Miner",
            children: <SingleMiner />,
        },
        {
            key: "2",
            label: "Batch Create Miners",
            children: <BatchCreateMiners />,
        },
    ];

    const infoData = [
        {
            key: "1",
            label: "Summary & Estimated ROI",
            content: [
                {
                    key: "1.1",
                    label: "Est. TITAN X at End of Miner",
                    value: "0",
                    tips: "Est. TITAN X at End of Miner",
                },
                {
                    key: "1.2",
                    label: "ETH to Start Miner",
                    value: "3",
                    tips: "ETH to Start Miner",
                },
                {
                    key: "1.3",
                    label: "$ Market Value of Miner",
                    value: "3",
                    tips: "Market Value of Miner",
                },
                {
                    key: "1.4",
                    label: "Est. ROI % at End of Miner",
                    value: "3",
                    tips: "Est. ROI % at End of Miner",
                },
            ],
        },
        {
            key: "2",
            label: "TITAN X Details",
            content: [
                {
                    key: "2.1",
                    label: "TITAN X Market Price",
                    value: "$0.000000744",
                    tips: "TITAN X Market Price",
                },
            ],
        },
        {
            key: "3",
            label: "TITAN X Miner Details",
            content: [
                {
                    key: "3.1",
                    label: "Global TRank",
                    value: "$0.000000744",
                    tips: "Global TRank",
                },
                {
                    key: "3.2",
                    label: "Current Titan Per Day of Mining",
                    value: "$0.000000744",
                    tips: "Current Titan Per Day of Mining",
                },
                {
                    key: "3.3",
                    label: "🚀 Early Adoption Amplifier",
                    value: "$0.000000744",
                    tips: "🚀 Early Adoption Amplifier",
                },
                {
                    key: "3.4",
                    label: "🔥 Burn Bonus Amplifier",
                    value: "$0.000000744",
                    tips: "🔥 Burn Bonus Amplifier",
                },
                {
                    key: "4.5",
                    label: "Next Difficulty Increase",
                    value: "$0.000000744",
                    tips: "Next Difficulty Increase",
                },
            ],
        },
    ];

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
                    </div>
                    <div className="w-1/2">
                        <InfoCard data={infoData} />
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default index;
