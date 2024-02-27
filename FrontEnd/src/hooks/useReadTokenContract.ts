import { useReadContract, useReadContracts, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";

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

export function useContractTimeData() {
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
        ],
    });

    if (!result.data) return {};

    return {
        currentContractDay:
            result.data[0].status === "success" ? (result.data[0].result as bigint) : 0n,
        genesisTs: result.data[1].status === "success" ? (result.data[1].result as bigint) : 0n,
    };
}
