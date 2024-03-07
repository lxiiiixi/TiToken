import { InputNumber, Button } from "antd";
import type { MinerInputData } from "@/hooks/useMiningCalculator";
import TCard from "@/components/TCard";

function CreateMiner({
    type,
    minerData,
    changeMinerData,
    onSubmit,
}: {
    type: "single" | "batch";
    minerData: MinerInputData;
    changeMinerData: (data: MinerInputData) => void;
    onSubmit: (type: "single" | "batch", data: MinerInputData) => void;
}) {
    const handleInput = (key: keyof MinerInputData, value: number) => {
        changeMinerData({
            ...minerData,
            [key]: value,
        });
    };

    const renderInput = (label: string, key: keyof MinerInputData, min: number, max: number) => (
        <div className="flex-between my-2">
            <span>{label}</span>
            <span>
                <InputNumber
                    min={min}
                    max={max}
                    value={minerData[key]}
                    onChange={value => value && handleInput(key, value)}
                />
                <Button className="ml-2" onClick={() => handleInput(key, max)}>
                    MAX
                </Button>
            </span>
        </div>
    );

    return (
        <div className="relative">
            <TCard number={1} width="100%" className="absolute top-0 left-0 -z-10" />
            <div className="px-8 py-12">
                <h2 className="text-xl">
                    {type === "batch" ? "Batch Create Miners" : "Create TITAN X Miner"}
                </h2>
                <div>
                    {type === "batch" && renderInput("Number of Miners", "number", 1, 100)}
                    {renderInput("Miner Length", "length", 1, 280)}
                    {renderInput("Miner Power", "power", 1, 100)}
                </div>
                <Button block onClick={() => onSubmit(type, minerData)}>
                    {type === "batch" ? "Batch Create Miners" : "Create Miner"}
                </Button>
            </div>
        </div>
    );
}

export default CreateMiner;
