import ContentWrapper from "@/sections/ContentWrapper";
import { InputNumber, Button } from "antd";
import InfoCard from "@/components/InfoCard";

function index() {
    const SingleMiner = () => {
        return (
            <div className="p-6">
                <h2 className="text-xl">Create TITAN X Miner</h2>
                <div>
                    <div className="flex-between my-2">
                        <span>Stake Amount</span>
                        <span>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={() => {}} />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                    <div className="flex-between my-2">
                        <span>Stake Length</span>
                        <span>
                            <InputNumber
                                min={1}
                                max={3500}
                                defaultValue={3500}
                                onChange={() => {}}
                            />
                            <Button className="ml-2">MAX</Button>
                        </span>
                    </div>
                </div>
                <Button block className="my-4">
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
                    value: "0",
                    tips: "TITAN X in Stake",
                },
                {
                    key: "1.2",
                    label: "# of Shares",
                    value: "3",
                    tips: "# of Shares",
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
            label: "TITAN X Stake Details (Estimations)",
            content: [
                {
                    key: "2.1",
                    label: "Current Share Rate (excl. Bonuses)",
                    value: "828.57",
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
                        <InfoCard data={infoData} />
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default index;
