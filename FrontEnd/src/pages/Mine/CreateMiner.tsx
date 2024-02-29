import { InputNumber, Button } from "antd";

export type MineData = {
    length: number;
    power: number;
    number?: number;
};

function CreateMiner({
    type,
    minerData,
    changeMinerData,
    onSubmit,
}: {
    type: "single" | "batch";
    minerData: MineData;
    changeMinerData: (data: MineData) => void;
    onSubmit: (type: "single" | "batch", data: MineData) => void;
}) {
    const handleInput = (key: keyof MineData, value: number) => {
        changeMinerData({
            ...minerData,
            [key]: value,
        });
    };

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
    );
}

export default CreateMiner;
