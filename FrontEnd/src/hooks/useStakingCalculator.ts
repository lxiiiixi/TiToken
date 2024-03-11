import { useGlobalInfoData, useGetUserCurrentActiveShares } from "@/hooks/useReadTokenContract";
import { calculateShares } from "@/configs/calculate";
import { SCALING_FACTOR_1e18 } from "@/configs/constants";
import { formatEther } from "viem";
import { formatPercentage } from "@/configs/utils";

export default function useStakingCalculator({
    amount,
    length,
}: {
    amount: number;
    length: number;
}) {
    const { currentShareRate, globalActiveShares } = useGlobalInfoData();
    const { userCurrentActiveShares } = useGetUserCurrentActiveShares();

    const newShare = currentShareRate
        ? calculateShares(BigInt(amount), BigInt(length), currentShareRate)
        : 0n;

    const newShareDisplay = currentShareRate
        ? (Number(currentShareRate / BigInt(SCALING_FACTOR_1e18 / 100)) / 100).toFixed(2)
        : 0;

    console.log(currentShareRate);

    console.log(1111, newShare, newShare * BigInt(SCALING_FACTOR_1e18), globalActiveShares);
    const percentOfGlobalActiveShares =
        newShare && globalActiveShares
            ? (newShare * BigInt(SCALING_FACTOR_1e18) * BigInt(SCALING_FACTOR_1e18)) /
              globalActiveShares
            : 0n;
    // 这里不确定关于单位和精度的问题

    const percentOfGlobalActiveSharesDisplay = formatPercentage(
        Number(formatEther(percentOfGlobalActiveShares))
    );

    // console.log(percentOfGlobalActiveShares / BigInt(SCALING_FACTOR_1e18));

    return {
        newShare,
        newShareDisplay,
        userCurrentActiveShares,
        globalActiveShares,
        percentOfGlobalActiveSharesDisplay,
    };
}
