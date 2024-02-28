import { useReadContract, useReadContracts, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";
import type { UserStakesInfo } from "@/pages/Stake";

export function useGetCurrentMintCost() {
    const { data: currentMintCost } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getCurrentMintCost",
    });

    if (typeof currentMintCost === "bigint") {
        return { currentMintCost };
    }
    return { currentMintCost: 0n };
}

export function useGetCurrentMintableTitan() {
    const { data: currentMintableTitan } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getCurrentMintableTitan",
    });

    if (typeof currentMintableTitan === "bigint") {
        return { currentMintableTitan };
    }
    return { currentMintableTitan: 0n };
}

export function useGetCurrentMintPowerBonus() {
    const { data: currentMintPowerBonus } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getCurrentMintPowerBonus",
    });

    if (typeof currentMintPowerBonus === "bigint") {
        return { currentMintPowerBonus };
    }
    return { currentMintPowerBonus: 0n };
}

export function useGetUserBurnAmplifierBonus() {
    const { address } = useAccount();
    const { data: userBurnAmplifierBonus } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getUserBurnAmplifierBonus",
        args: [address],
    });

    if (typeof userBurnAmplifierBonus === "bigint") {
        return { userBurnAmplifierBonus };
    }
    return { userBurnAmplifierBonus: 0n };
}

export function useGetCurrentEAABonus() {
    const { data: currentEAABonus } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getCurrentEAABonus",
    });

    if (typeof currentEAABonus === "bigint") {
        return { currentEAABonus };
    }
    return { currentEAABonus: 0n };
}

export function useGetGlobalTRank() {
    const { data: globalTRank } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getGlobalTRank",
    });

    if (typeof globalTRank === "bigint") {
        return { globalTRank };
    }
    return { globalTRank: 0n };
}

export function useGlobalInfoData() {
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentContractDay", // current contract day
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "genesisTs", // contract deployment block timestamp (in seconds)
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentShareRate", // current share rate
            },
        ],
    });

    if (!result.data) return {};

    return {
        currentContractDay:
            result.data[0].status === "success" ? (result.data[0].result as bigint) : 0n,
        genesisTs: result.data[1].status === "success" ? (result.data[1].result as bigint) : 0n,
        currentShareRate:
            result.data[2].status === "success" ? (result.data[2].result as bigint) : 0n,
    };
}

export function useErc20MetaData() {
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "totalSupply",
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "balanceOf",
                args: [useAccount()?.address],
            },
        ],
    });

    if (!result.data || !result.isSuccess) return {};

    return {
        totalSupply: result.data[0].status === "success" ? (result.data[0].result as bigint) : 0n,
        balanceOf: result.data[1].status === "success" ? (result.data[1].result as bigint) : 0n,
    };
}

export function useGetUserCurrentActiveShares() {
    const { data: userCurrentActiveShares } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getUserCurrentActiveShares",
    });

    if (typeof userCurrentActiveShares === "bigint") {
        return { userCurrentActiveShares };
    }

    return { userCurrentActiveShares: 0n };
}

export function useGetUserStakes() {
    const { data: userStakes } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getUserStakes",
        args: [useAccount()?.address],
    });

    return { userStakes: userStakes as UserStakesInfo[] };
}

export function useGetUserETHClaimableTotal() {
    const { data: userETHClaimableTotal } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getUserETHClaimableTotal",
        args: [useAccount()?.address],
    });

    if (typeof userETHClaimableTotal === "bigint") {
        return { userETHClaimableTotal: userETHClaimableTotal as bigint };
    }

    return { userETHClaimableTotal: 0n };
}

export function useGetPayoutCyclesData() {
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool", // 获取不同周期的奖金池中ETH的数量
                args: [8],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [28],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [90],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [369],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [888],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex", // 获取当前周期是第几轮
                args: [8],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [28],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [90],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [369],
            },
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [888],
            },
        ],
    });

    if (!result.data || !result.isSuccess) return {};

    return {
        globalCyclePayout: [8, 28, 90, 369, 888].reduce(
            (acc: { [key: number]: bigint }, day, index) => {
                acc[day] =
                    result.data[index].status === "success"
                        ? (result.data[index].result as bigint)
                        : 0n;
                return acc;
            },
            {}
        ),
        currentCycleIndex: [8, 28, 90, 369, 888].reduce(
            (acc: { [key: number]: bigint }, day, index) => {
                acc[day] =
                    result.data[index + 5].status === "success"
                        ? (result.data[index + 5].result as bigint)
                        : 0n;
                return acc;
            },
            {}
        ),
    };
}

export function useGetUndistributedEth() {
    const { data: undistributedEth } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getUndistributedEth",
    });

    if (typeof undistributedEth === "bigint") {
        return { undistributedEth: undistributedEth as bigint };
    }

    return { undistributedEth: 0n };
}
