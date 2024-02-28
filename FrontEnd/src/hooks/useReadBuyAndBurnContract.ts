import { useReadContract } from "wagmi";
import { BUYANDBURN_CONTRACT_CONFIG } from "@/configs/constants";

export function useWethBalance() {
    const { data: wethBalance } = useReadContract({
        ...BUYANDBURN_CONTRACT_CONFIG,
        functionName: "getWethBalance",
        args: [BUYANDBURN_CONTRACT_CONFIG.address],
    });
    if (typeof wethBalance === "bigint") {
        return { wethBalance };
    }
    return { wethBalance: 0n };
}
