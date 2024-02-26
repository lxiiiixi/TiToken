import { useEffect, useState } from "react";
import ContentWrapper from "@/sections/ContentWrapper";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import InfoCard from "@/components/InfoCard";
import CreateMiner from "./CreateMiner";
import type { MineData } from "./CreateMiner";
import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";
import { useGetCurrentMintCost } from "@/hooks/useReadTokenContract";
import useMineInfoData from "@/hooks/useMineInfoData";
import { calculateMintCost } from "@/configs/calculate";
import { formatEther } from "viem";

function Index() {
    const [minerData, setMinerData] = useState<MineData>({
        length: 280,
        power: 100,
        number: 10,
    });
    const { currentMintCost } = useGetCurrentMintCost();
    const [ethCost, setEthCost] = useState(calculateMintCost(currentMintCost, minerData.power));
    const [ifSingleMiner, setIfSingleMiner] = useState(true);

    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();

    const { displayData } = useMineInfoData(formatEther(ethCost));

    useEffect(() => {
        if (ifSingleMiner) {
            const newValue = calculateMintCost(currentMintCost, minerData.power);
            setEthCost(newValue);
            console.log(newValue);
            console.log(formatEther(newValue));
        } else {
            const newValue = calculateMintCost(currentMintCost, minerData.power, minerData.number);
            setEthCost(newValue);
            console.log(newValue);
            console.log(formatEther(newValue));
        }
    }, [ifSingleMiner, currentMintCost, minerData.number, minerData.power]);

    const handleSubmitMiner = async (type: "single" | "batch", data: MineData) => {
        if (!currentMintCost) return;

        if (type === "single" && address) {
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length],
                    value: ethCost,
                });
            } catch (err) {
                console.log(err);
            }
        }
        if (type === "batch" && address) {
            try {
                await writeContractAsync({
                    ...TOKEN_CONTRACT_CONFIT,
                    address,
                    functionName: "startMint",
                    args: [data.power, data.length, data.number],
                    value: ethCost,
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const changeMinerData = (data: MineData) => {
        setMinerData(data);
    };

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Single Miner",
            children: (
                <CreateMiner
                    type="single"
                    minerData={minerData}
                    changeMinerData={changeMinerData}
                    onSubmit={handleSubmitMiner}
                />
            ),
        },
        {
            key: "2",
            label: "Batch Create Miners",
            children: (
                <CreateMiner
                    type="batch"
                    minerData={minerData}
                    changeMinerData={changeMinerData}
                    onSubmit={handleSubmitMiner}
                />
            ),
        },
    ];

    return (
        <div>
            <ContentWrapper title="Mine" subTitle="Create your TITAN X virtual miners">
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={key => {
                                if (key === "1") {
                                    setIfSingleMiner(true);
                                } else {
                                    setIfSingleMiner(false);
                                }
                            }}
                        />
                    </div>
                    <div className="w-1/2">
                        <InfoCard data={displayData || []} />
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default Index;
