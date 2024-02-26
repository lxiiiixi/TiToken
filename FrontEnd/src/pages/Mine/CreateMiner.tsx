import { useState, useCallback } from "react";
import { InputNumber, Button } from "antd";

export type MineData = {
    length: number;
    power: number;
    number?: number;
};

function CreateMiner({
    type,
    onSubmit,
}: {
    type: "single" | "batch";
    onSubmit: (type: "single" | "batch", data: MineData) => void;
}) {
    const [minerData, setMinerData] = useState<MineData>({
        length: 280,
        power: 100,
        number: 10,
    });

    const handleInput = useCallback((key: keyof MineData, value: number) => {
        setMinerData(prev => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const renderInput = (label: string, key: keyof MineData, min: number, max: number) => (
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
        <div className="p-6">
            <h2 className="text-xl">
                {type === "batch" ? "Create TITAN X Miner" : "Batch Create Miners"}
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
    );
}

export default CreateMiner;
