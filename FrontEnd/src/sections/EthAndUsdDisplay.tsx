import { formatPrice } from "@/configs/utils";
import { formatEther } from "viem";

export default function EthAndUsdDisplay({
    ethAmount,
    ethUsdPrice,
}: {
    ethAmount: bigint;
    ethUsdPrice: number;
}) {
    const ethValue = ethUsdPrice * parseFloat(formatEther(ethAmount));

    return (
        <div className="flex flex-col text-right">
            <span>${formatPrice(ethValue)}</span>
            <span className="text-xs text-gray-500">
                {formatPrice(formatEther(ethAmount), 4)} ETH
            </span>
        </div>
    );
}
