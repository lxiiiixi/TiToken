import { useWriteContract, useAccount } from "wagmi";
import { TOKEN_MANAGER_CONTRACT_CONFIT } from "@/configs/constants";
import { parseEther } from "viem";

export function useManualDailyUpdate() {
    const {
        data: manualDailyUpdateHash,
        isPending: manualDailyUpdatePending,
        writeContract,
    } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const manualDailyUpdate = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "manualDailyUpdate",
        });
    };
    return { manualDailyUpdate, manualDailyUpdateHash, manualDailyUpdatePending };
}

export function useStartMint() {
    const { data: startMintHash, isPending: startMintPending, writeContract } = useWriteContract();
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

    return { startMint, startBatchMint, startMintHash, startMintPending };
}

/**
 * start a new stake
 * @param amount
 * @param numOfDays
 * @returns
 */
export function useStartStake() {
    const {
        writeContract,
        data: startStakeHash,
        isPending: startStakePending,
    } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const startStake = (amount: number, numOfDays: number) => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "startStake",
            args: [parseEther(String(amount)), numOfDays],
        });
    };
    return { startStake, startStakeHash, startStakePending };
}

export function useEndStake() {
    const { writeContract, data: endStakeHash, isPending: endStakePending } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const endStake = (id: number) => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "endStake",
            args: [id],
        });
    };
    return { endStake, endStakeHash, endStakePending };
}

export function useDistributeETH() {
    const {
        writeContract,
        data: distributeETHHash,
        isPending: distributeETHPending,
    } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const distributeETH = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "distributeETH",
        });
    };
    return { distributeETH, distributeETHHash, distributeETHPending };
}

export function usePayouts() {
    const { writeContract, data: payoutsHash, isPending: payoutsPending } = useWriteContract();
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
    return {
        triggerPayouts,
        claimUserAvailableETHPayouts,
        claimUserAvailableETHBurnPool,
        payoutsHash,
        payoutsPending,
    };
}

export function useClaimMint() {
    const { writeContract, data: claimMintHash, isPending: claimMintPending } = useWriteContract();
    const { address } = useAccount();

    if (!address) return {};

    const claimMint = (id: number) => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "claimMint",
            args: [id], // mint id
        });
    };

    const batchClaimMint = () => {
        writeContract({
            ...TOKEN_MANAGER_CONTRACT_CONFIT,
            functionName: "batchClaimMint",
        });
    };

    return { claimMint, batchClaimMint, claimMintHash, claimMintPending };
}
