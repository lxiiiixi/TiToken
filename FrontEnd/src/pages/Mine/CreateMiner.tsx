import type { MinerInputData } from "@/hooks/useMiningCalculator";
import TButton from "@/components/TButton";
import MaxInputRender from "@/components/MaxInputRender";
import CardBgWrapper from "@/sections/CardBgWrapper";
import ConnectWalletButton from "@/sections/ConnectWalletButton";
import TIPS from "@/configs/tips";

function CreateMiner({
    type,
    isWalletConnected,
    minerData,
    changeMinerData,
    onSubmit,
}: {
    type: "single" | "batch";
    isWalletConnected: boolean;
    minerData: MinerInputData;
    changeMinerData: (data: MinerInputData) => void;
    onSubmit: (type: "single" | "batch", data: MinerInputData) => void;
}) {
    const handleInput = (key: string, value: number) => {
        changeMinerData({
            ...minerData,
            [key]: value,
        });
    };

    return (
        <CardBgWrapper number={1}>
            <h2 className="text-lg md:text-2xl">
                {type === "batch" ? "Batch Create Miners" : "Create TITAN X Miner"}
            </h2>
            <div className="p-2 md:p-5">
                {type === "batch" && (
                    <MaxInputRender
                        index="number"
                        label="Number of Miners"
                        value={minerData.number}
                        min={1}
                        max={100}
                        handleChangeValue={handleInput}
                        tips={TIPS.mine.batchMinerNumber}
                    />
                )}
                <MaxInputRender
                    index="length"
                    label="Miner Length"
                    value={minerData.length}
                    min={0}
                    max={280}
                    handleChangeValue={handleInput}
                    tips={
                        type === "batch" ? TIPS.mine.batchMinerLength : TIPS.mine.singleMinerLength
                    }
                />
                <MaxInputRender
                    index="power"
                    label="Miner Powers"
                    value={minerData.power}
                    min={0}
                    max={100}
                    handleChangeValue={handleInput}
                    tips={type === "batch" ? TIPS.mine.batchMinerPower : TIPS.mine.singleMinerPower}
                />
            </div>
            {isWalletConnected ? (
                <TButton
                    type={"primary"}
                    handleClick={() => onSubmit(type, minerData)}
                    width="90%"
                    className="my-6"
                >
                    {type === "batch" ? "Batch Create Miners" : "Create Miner"}
                </TButton>
            ) : (
                <ConnectWalletButton text={"Connect Wallet to Create Miner"} />
            )}
        </CardBgWrapper>
    );
}

export default CreateMiner;
