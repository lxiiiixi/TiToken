import type { MinerInputData } from "@/hooks/useMiningCalculator";
import TCard from "@/components/TCard";
import TButton from "@/components/TButton";
import MaxInputRender from "@/components/MaxInputRender";

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

    // const renderInput = (label: string, key: keyof MinerInputData, min: number, max: number) => (
    //     <div className="flex-between my-4">
    //         <span>{label}</span>
    //         <span>
    //             <InputNumber
    //                 min={min}
    //                 max={max}
    //                 value={minerData[key]}
    //                 onChange={value => value && handleInput(key, value)}
    //             />
    //             <Button className="ml-2" onClick={() => handleInput(key, max)} type="primary">
    //                 MAX
    //             </Button>
    //         </span>
    //     </div>
    // );

    return (
        <div className="relative">
            <TCard number={1} width="100%" />
            <div className="absolute-top w-[86%] py-[12%]">
                <h2 className="text-xl">
                    {type === "batch" ? "Batch Create Miners" : "Create TITAN X Miner"}
                </h2>
                <div className="p-5">
                    {/* {type === "batch" && renderInput("Number of Miners", "number", 1, 100)}
                    {renderInput("Miner Length", "length", 1, 280)}
                    {renderInput("Miner Power", "power", 1, 100)} */}
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
                {/* <TButton className="mx-auto my-8">test testtesttest</TButton> */}
            </div>
        </div>
    );
}

export default CreateMiner;
