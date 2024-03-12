import { useGlobalInfoData, useGetUserCurrentActiveShares } from "@/hooks/useReadTokenContract";
import {
    calculateLongerPaysMoreBonus,
    calculateBiggerPaysMoreBonus,
    calculateShares,
} from "@/configs/calculate";
import { SCALING_FACTOR_1e18, SCALING_FACTOR_1e11 } from "@/configs/constants";
import { formatEther } from "viem";
import { formatPercentage, formatPrice } from "@/configs/utils";

import type { StakeData } from "@/pages/Stake";

export default function useStakingCalculator(stakeData: StakeData) {
    const { currentShareRate, globalActiveShares } = useGlobalInfoData();
    const { userCurrentActiveShares } = useGetUserCurrentActiveShares();

    // 根据用户输入的 amount， 计算的时候需要转换精度，通过用户输入的代币数量是 format 之后的，计算时则需要转换过来

    const parsedAmount = BigInt(stakeData.amount.toString());

    console.log(stakeData.amount, parsedAmount);

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
            ? (newShareWithBonus * BigInt(SCALING_FACTOR_1e18) * BigInt(SCALING_FACTOR_1e18)) /
              globalActiveShares
            : 0n;

    console.log(biggerPaysMoreBonus);

    // display
    const baseSharesDisplay = formatPrice(Number(baseShareWithoutBonus));
    const currentShareRateDisplay = formatPrice(Number(formatEther(currentShareRate || 0n)));
    const percentOfGlobalActiveSharesDisplay = formatPercentage(
        Number(formatEther(percentOfGlobalActiveShares))
    );
    const longerPaysMoreBonusDisplay = formatPrice(Number(longerPaysMoreBonus));
    const biggerPaysMoreBonusDisplay = formatPrice(Number(biggerPaysMoreBonus));
    const newShareWithBonusDisplay = formatPrice(Number(newShareWithBonus));
    // const userCurrentActiveSharesDisplay = formatPrice(Number(formatEther(userCurrentActiveShares || 0n)));

    console.log(111, baseShareWithoutBonus);

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
