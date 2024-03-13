import { formatEther } from "viem";
import { useETHPrice } from "./useTokenPrice";
import { useGetPayoutCyclesData, useGetActiveShares } from "@/hooks/useReadTokenContract";
import { formatPrice } from "@/configs/utils";
import { calculateUserPayoutByShares } from "@/configs/calculate";

export default function useStakerPayoutsCalculator(userShare: bigint) {
    const { globalCyclePayout } = useGetPayoutCyclesData();
    const { globalActiveShares } = useGetActiveShares();

    const ethUsdPrice = useETHPrice();

    let payoutValueSum = 0;

    const getCyclePayout = (dayNum: 8 | 28 | 90 | 369 | 888) => {
        const cyclePayoutByDay = globalCyclePayout ? globalCyclePayout[dayNum] : 0n;
        const payoutValueByDay = ethUsdPrice * parseFloat(formatEther(cyclePayoutByDay));

        const userPayoutByShares = globalActiveShares
            ? calculateUserPayoutByShares(userShare, globalActiveShares, cyclePayoutByDay)
            : 0n;
        const userPayoutValueByShares = ethUsdPrice * parseFloat(formatEther(userPayoutByShares));

        payoutValueSum += userPayoutValueByShares;

        // console.log(
        //     dayNum,
        //     cyclePayoutByDay,
        //     `${formatPrice(formatEther(cyclePayoutByDay), 4)} ETH`
        // );
        // console.log(
        //     dayNum,
        //     userPayoutByShares,
        //     `${formatPrice(formatEther(userPayoutByShares), 4)} ETH`
        // );
        // console.log(
        //     dayNum,
        //     userPayoutByShares,
        //     `${formatPrice(formatEther(userPayoutByShares), 4)} ETH`
        // );
        // console.log(dayNum, userPayoutValueByShares, formatPrice(userPayoutValueByShares));

        return {
            cyclePayoutByDay: `${formatPrice(formatEther(cyclePayoutByDay), 4)} ETH`,
            payoutValueByDay: formatPrice(payoutValueByDay),
            userPayoutByShares: `${formatPrice(formatEther(userPayoutByShares), 4)} ETH`,
            userPayoutValueByShares: formatPrice(userPayoutValueByShares),
        };
    };
    const day8CyclePayout = getCyclePayout(8);
    const day28CyclePayout = getCyclePayout(28);
    const day90CyclePayout = getCyclePayout(90);
    const day369CyclePayout = getCyclePayout(369);
    const day888CyclePayout = getCyclePayout(888);

    return {
        day8CyclePayout,
        day28CyclePayout,
        day90CyclePayout,
        day369CyclePayout,
        day888CyclePayout,
        payoutValueSum,
    };
}
