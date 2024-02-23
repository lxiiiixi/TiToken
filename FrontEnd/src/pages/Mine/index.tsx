import React from "react";
import ContentWrapper from "@/sections/ContentWrapper";
import { Tabs, InputNumber, Button } from "antd";
import type { TabsProps } from "antd";

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

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
                    </div>
                    <div className="w-1/2 bg-slate-50">right</div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default index;
