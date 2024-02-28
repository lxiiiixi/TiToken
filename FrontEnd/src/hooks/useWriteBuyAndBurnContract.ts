import { useWriteContract } from "wagmi";
import { BUYANDBURN_CONTRACT_CONFIG } from "@/configs/constants";

export function useBuynBurn() {
    const { writeContract } = useWriteContract();

    const buynBurn = () => {
        writeContract({
            ...BUYANDBURN_CONTRACT_CONFIG,
            functionName: "buynBurn",
        });
    };
    return { buynBurn };
}
