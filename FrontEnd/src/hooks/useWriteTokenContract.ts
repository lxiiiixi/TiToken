import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_MANAGER_CONTRACT_CONFIT } from "@/configs/constants";
import { parseEther } from "viem";

export function useManualDailyUpdate() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const manualDailyUpdate = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "manualDailyUpdate",
        });
    };
    return { manualDailyUpdate };
}

export function useStartMint() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();
    if (!address) return {};

    const startMint = (power: number, length: number, inviter: string, ethCost: bigint) => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "startMint",
            args: [power, length, inviter],
            value: ethCost,
        });
    };

    const startBatchMint = (
        power: number,
        length: number,
        number: number,
        inviter: string,
        ethCost: bigint
    ) => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "batchMint",
            args: [power, length, number, inviter],
            value: ethCost,
        });
    };

    return { startMint, startBatchMint };
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
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "startStake",
            args: [parseEther(String(amount)), numOfDays],
        });
    };
    return { startStake };
}

export function useDistributeETH() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const distributeETH = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "distributeETH",
        });
    };
    return { distributeETH };
}

export function usePayouts() {
    const { writeContract } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const triggerPayouts = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "triggerPayouts",
        });
    };

    const claimUserAvailableETHPayouts = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "claimUserAvailableETHPayouts",
        });
    };
    const claimUserAvailableETHBurnPool = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "claimUserAvailableETHBurnPool",
        });
    };
    return { triggerPayouts, claimUserAvailableETHPayouts, claimUserAvailableETHBurnPool };
}
