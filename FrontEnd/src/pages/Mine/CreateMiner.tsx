import type { MinerInputData } from "@/hooks/useMiningCalculator";
import TButton from "@/components/TButton";
import MaxInputRender from "@/components/MaxInputRender";
import CardBgWrapper from "@/sections/CardBgWrapper";

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
            <h2 className="text-2xl">
                {type === "batch" ? "Batch Create Miners" : "Create TITAN X Miner"}
            </h2>
            <div className="p-5">
                {type === "batch" && (
                    <MaxInputRender
                        index="number"
                        label="Number of Miners"
                        value={minerData.number}
                        min={1}
                        max={100}
                        handleChangeValue={handleInput}
                    />
                )}
                <MaxInputRender
                    index="length"
                    label="Miner Length"
                    value={minerData.length}
                    min={0}
                    max={280}
                    handleChangeValue={handleInput}
                    tips="Number of days you want your miner to run for before becoming claimable. This determines how much TITAN X you're getting, in general: longer is better, always."
                />
                <MaxInputRender
                    index="power"
                    label="Miner Powers"
                    value={minerData.power}
                    min={0}
                    max={100}
                    handleChangeValue={handleInput}
                    tips="Miner Powers"
                />
            </div>
            <TButton
                type={isWalletConnected ? "primary" : "secondary"}
                handleClick={() => isWalletConnected && onSubmit(type, minerData)}
                width="90%"
                height="40px"
                className="mx-auto my-8"
            >
                {isWalletConnected
                    ? type === "batch"
                        ? "Batch Create Miners"
                        : "Create Miner"
                    : "Connect Wallet"}
            </TButton>
        </CardBgWrapper>
    );
}

export default CreateMiner;
