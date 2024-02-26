import { useReadContract } from "wagmi";
import { TOKEN_CONTRACT_CONFIT } from "@/configs/constants";

export function useGetCurrentMintCost() {
    const { data: currentMintCost } = useReadContract({
        ...TOKEN_CONTRACT_CONFIT,
        functionName: "getCurrentMintCost",
    });

    return { currentMintCost };
}
