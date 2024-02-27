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
