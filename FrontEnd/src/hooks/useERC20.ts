import { useReadContracts, useAccount } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";

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
