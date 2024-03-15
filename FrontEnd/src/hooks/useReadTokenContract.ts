import { useReadContract, useReadContracts, useAccount } from "wagmi";
import {
    TOKEN_CONTRACT_CONFIT,
    TOKEN_MANAGER_CONTRACT_CONFIT,
    BUYANDBURN_CONTRACT_CONFIG,
} from "@/configs/constants";
import type { UserStakesInfo } from "@/pages/Stake";
import { UserMint } from "@/configs/interfaces";

export function useGetCurrentMintCost() {
    const { data: currentMintCost } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getCurrentMintCost",
    });

    if (typeof currentMintCost === "bigint") {
        return { currentMintCost };
    }
    return { currentMintCost: 0n };
}

export function useGetCurrentMintableTitan() {
    const { data: currentMintableTitan } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getCurrentMintableTitan",
    });

    if (typeof currentMintableTitan === "bigint") {
        return { currentMintableTitan };
    }
    return { currentMintableTitan: 0n };
}

export function useGetCurrentMintPowerBonus() {
    const { data: currentMintPowerBonus } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getCurrentMintPowerBonus",
    });

    if (typeof currentMintPowerBonus === "bigint") {
        return { currentMintPowerBonus };
    }
    return { currentMintPowerBonus: 0n };
}

export function useGetGlobalMintPower() {
    const { data: globalMintPower } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getGlobalMintPower",
    });

    if (typeof globalMintPower === "bigint") {
        return { globalMintPower };
    }
    return { globalMintPower: 0n };
}

export function useGetUserBurnAmplifierBonus() {
    const { address } = useAccount();
    const { data: userBurnAmplifierBonus } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
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
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getCurrentEAABonus",
    });

    if (typeof currentEAABonus === "bigint") {
        return { currentEAABonus };
    }
    return { currentEAABonus: 0n };
}

export function useGetGlobalTRank() {
    const { data: globalTRank } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
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
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentContractDay", // current contract day
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "genesisTs", // contract deployment block timestamp (in seconds)
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentShareRate", // current share rate
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getGlobalActiveShares", // get global active shares
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "token",
            },
        ],
    });

    if (!result.data) return {};

    const keys = [
        "currentContractDay",
        "genesisTs",
        "currentShareRate",
        "globalActiveShares",
        "token",
    ];
    return result.data.reduce((acc: { [key: string]: bigint }, curr, index) => {
        acc[keys[index]] = curr.status === "success" ? (curr.result as bigint) : 0n;
        return acc;
    }, {});
}

export function useGetActiveShares() {
    const { address } = useAccount();
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserCurrentActiveShares",
                args: [address],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getGlobalActiveShares", // get global active shares
            },
        ],
    });

    if (!result.data || !result.isSuccess) return {};

    return {
        userCurrentActiveShares:
            result.data[0].status === "success" ? (result.data[0].result as bigint) : 0n,
        globalActiveShares:
            result.data[1].status === "success" ? (result.data[1].result as bigint) : 0n,
    };
}

export function useGetUserStakes() {
    const { data: userStakes } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getUserStakes",
        args: [useAccount()?.address],
    });

    return { userStakes: userStakes as UserStakesInfo[] };
}

export function useGetUserMints() {
    const { data: userMints } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getUserMints", // Return all mints info of an address
        args: [useAccount()?.address],
    });

    return { userMints: userMints ? (userMints as UserMint[]) : [] };
}

export function useGetUserETHClaimableTotal() {
    const { data: userETHClaimableTotal } = useReadContract({
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
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
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool", // 获取不同周期的奖金池中ETH的数量
                args: [8],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [28],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [90],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [369],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCyclePayoutPool",
                args: [888],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex", // 获取当前周期是第几轮
                args: [8],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [28],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [90],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getCurrentCycleIndex",
                args: [369],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
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
        ...TOKEN_MANAGER_CONTRACT_CONFIT,
        functionName: "getUndistributedEth",
    });

    if (typeof undistributedEth === "bigint") {
        return { undistributedEth: undistributedEth as bigint };
    }

    return { undistributedEth: 0n };
}

export function useStatsSupply() {
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_CONTRACT_CONFIT,
                functionName: "totalSupply",
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getTotalTitanStaked",
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getTotalPenalties",
            },
            {
                ...BUYANDBURN_CONTRACT_CONFIG,
                functionName: "getTotalTitanBuyAndBurnV2",
            },
        ],
    });
    if (!result.data || !result.isSuccess) return {};

    const keys = ["liquid", "staked", "penalties", "buyAndBurn"];
    return result.data.reduce((acc: { [key: string]: bigint }, curr, index) => {
        acc[keys[index]] = curr.status === "success" ? (curr.result as bigint) : 0n;
        return acc;
    }, {});
}

export function useBurnPoolBonuses() {
    const { address } = useAccount();
    const result = useReadContracts({
        contracts: [
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserBurnPoolETHClaimableTotal",
                args: [address],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserCycleBurnTotal", // get user current cycle total titan burned
                args: [address],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserBurnTotal", // return user address total burned titan
                args: [address],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserBurnAmplifierBonus", // The burn amplifier percentage is applied to all future mints. Capped at MAX_BURN_AMP_PERCENT (8%)
                args: [address],
            },
            {
                ...TOKEN_MANAGER_CONTRACT_CONFIT,
                functionName: "getUserLastBurnClaimIndex", // Returns user's last claimed burn payout index for the specified cycle day
                args: [address, 28],
            },
        ],
    });
    if (!result.data || !result.isSuccess) return {};

    const keys = [
        "userBurnPoolETHClaimableTotal",
        "userCycleBurnTotal",
        "userBurnTotal",
        "userLastBurnClaimIndex",
    ];
    return result.data.reduce((acc: { [key: string]: bigint }, curr, index) => {
        acc[keys[index]] = curr.status === "success" ? (curr.result as bigint) : 0n;
        return acc;
    }, {});
}
