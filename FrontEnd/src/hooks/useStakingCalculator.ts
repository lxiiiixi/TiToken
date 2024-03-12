import { useGlobalInfoData, useGetActiveShares } from "@/hooks/useReadTokenContract";
import {
    calculateLongerPaysMoreBonus,
    calculateBiggerPaysMoreBonus,
    calculateShares,
} from "@/configs/calculate";
import { SCALING_FACTOR_1e18, SCALING_FACTOR_1e11 } from "@/configs/constants";
import { formatEther, parseEther } from "viem";
import { formatPrice } from "@/configs/utils";

import type { StakeData } from "@/pages/Stake";

export default function useStakingCalculator(stakeData: StakeData) {
    const { currentShareRate, globalActiveShares } = useGlobalInfoData();
    const { userCurrentActiveShares } = useGetActiveShares();

    const parsedAmount = parseEther(stakeData.amount.toString());

    const baseShareWithoutBonus = currentShareRate
        ? parsedAmount / (currentShareRate / BigInt(SCALING_FACTOR_1e18))
        : 0n;

    const longerPaysMoreBonus =
        (baseShareWithoutBonus * calculateLongerPaysMoreBonus(BigInt(stakeData.length))) /
        BigInt(SCALING_FACTOR_1e11);
    const biggerPaysMoreBonus =
        (baseShareWithoutBonus * calculateBiggerPaysMoreBonus(parsedAmount)) /
        BigInt(SCALING_FACTOR_1e11);
    const shareBonus = longerPaysMoreBonus + biggerPaysMoreBonus;

    const newShareWithBonus = currentShareRate
        ? calculateShares(parsedAmount, BigInt(length), currentShareRate)
        : 0n;

    const percentOfGlobalActiveShares =
        newShareWithBonus && globalActiveShares
            ? (newShareWithBonus * BigInt(SCALING_FACTOR_1e18)) / globalActiveShares
            : 0n;

    // display
    const baseSharesDisplay = formatPrice(Number(formatEther(baseShareWithoutBonus)));
    const currentShareRateDisplay = formatPrice(Number(formatEther(currentShareRate || 0n)));
    const percentOfGlobalActiveSharesDisplay =
        (Number(formatEther(percentOfGlobalActiveShares)) * 100).toFixed(8) + " %";
    const longerPaysMoreBonusDisplay = formatPrice(Number(longerPaysMoreBonus));
    const biggerPaysMoreBonusDisplay = formatPrice(Number(biggerPaysMoreBonus));
    const newShareWithBonusDisplay = formatPrice(Number(formatEther(newShareWithBonus)));
    // const userCurrentActiveSharesDisplay = formatPrice(Number(formatEther(userCurrentActiveShares || 0n)));

    return {
        baseShareWithoutBonus,
        shareBonus,
        newShareWithBonus,
        currentShareRate,
        longerPaysMoreBonus,
        biggerPaysMoreBonus,
        userCurrentActiveShares,
        globalActiveShares,
        baseSharesDisplay,
        currentShareRateDisplay,
        percentOfGlobalActiveSharesDisplay,
        newShareWithBonusDisplay,
        longerPaysMoreBonusDisplay,
        biggerPaysMoreBonusDisplay,
    };
}
