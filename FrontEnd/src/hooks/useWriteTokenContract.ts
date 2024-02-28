import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";

export function useManualDailyUpdate() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const manualDailyUpdate = () => {
        writeContract({
            ...TOKEN_CONTRACT_CONFIT,
            address,
            functionName: "manualDailyUpdate",
        });
    };
    return { manualDailyUpdate };
}

/**
 * start a new stake
 * @param amount
 * @param numOfDays
 * @returns
 */
export function useStartStake() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const startStake = (amount: number, numOfDays: number) => {
        writeContract({
            ...TOKEN_CONTRACT_CONFIT,
            address,
            functionName: "startStake",
            args: [amount, numOfDays],
        });
    };
    return { startStake };
}

export function useDistributeETH() {
    const { writeContract } = useWriteContract();

    const distributeETH = () => {
        writeContract({
            ...TOKEN_CONTRACT_CONFIT,
            functionName: "distributeETH",
        });
    };
    return { distributeETH };
}
