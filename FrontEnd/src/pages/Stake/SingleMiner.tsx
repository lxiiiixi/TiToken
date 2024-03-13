import TButton from "@/components/TButton";
import MaxInputRender from "@/components/MaxInputRender";
import type { StakeData } from "./index";
import TIPS from "@/configs/tips";
import { useErc20MetaData } from "@/hooks/useReadTokenContract";

const SingleMiner = ({
    stakeData,
    isWalletConnected,
    changeStakeData,
    handleOnclickStake,
}: {
    stakeData: StakeData;
    isWalletConnected: boolean;
    changeStakeData: (data: StakeData) => void;
    handleOnclickStake: () => void;
}) => {
    const { balanceOf } = useErc20MetaData();
    const handleInput = (key: string, value: number) => {
        changeStakeData({
            ...stakeData,
            [key]: value,
        });
    };

    return (
        <>
            <h2 className="text-lg md:text-2xl">Create TITAN X Staker</h2>
            <div className="p-2 md:p-5">
                {/* {renderInput("Stake Amount", "amount", 0, balanceOf ? Number(balanceOf) : 0)}
                {renderInput("Stake Length", "length", 0, 3500)} */}
                <MaxInputRender
                    index="amount"
                    label="Stake Amount"
                    value={stakeData.amount}
                    min={0}
                    max={balanceOf ? Number(balanceOf) : 0}
                    handleChangeValue={handleInput}
                    format
                    tips={TIPS.stake.amount}
                />
                <MaxInputRender
                    index="length"
                    label="Stake Length"
                    value={stakeData.length}
                    min={0}
                    max={3500}
                    handleChangeValue={handleInput}
                    tips={TIPS.stake.length}
                />
            </div>
            <TButton
                type={isWalletConnected ? "primary" : "secondary"}
                handleClick={() => isWalletConnected && handleOnclickStake()}
                width="90%"
                height="40px"
                className="mx-auto my-8"
            >
                {isWalletConnected ? "Start Stake" : "Connect Wallet"}
            </TButton>
            <p className="text-gray-500 text-sm text-center">
                don't have TITAN X? buy here or mine here.
            </p>
        </>
    );
};

export default SingleMiner;
