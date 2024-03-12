import { formatEther } from "viem";
import { useETHPrice } from "./useTokenPrice";
import { useGetPayoutCyclesData, useGetActiveShares } from "@/hooks/useReadTokenContract";
import { formatPrice } from "@/configs/utils";
import { calculateUserPayoutByShares } from "@/configs/calculate";

export default function useStakerPayoutsCalculator(userShare: bigint) {
    const { globalCyclePayout } = useGetPayoutCyclesData();
    const { globalActiveShares } = useGetActiveShares();

    const ethUsdPrice = useETHPrice();

    console.log("——————————————————————————");

    const getCyclePayout = (dayNum: 8 | 28 | 90 | 369 | 888) => {
        const cyclePayoutByDay = globalCyclePayout ? globalCyclePayout[dayNum] : 0n;
        const payoutValueByDay = ethUsdPrice * parseFloat(formatEther(cyclePayoutByDay));

        const userPayoutByShares = globalActiveShares
            ? calculateUserPayoutByShares(userShare, globalActiveShares, cyclePayoutByDay)
            : 0n;
        const userPayoutValueByShares = ethUsdPrice * parseFloat(formatEther(userPayoutByShares));

        console.log(
            dayNum,
            cyclePayoutByDay,
            `${formatPrice(formatEther(cyclePayoutByDay), 4)} ETH`
        );
        console.log(
            dayNum,
            userPayoutByShares,
            `${formatPrice(formatEther(userPayoutByShares), 4)} ETH`
        );
        console.log(
            dayNum,
            userPayoutByShares,
            `${formatPrice(formatEther(userPayoutByShares), 4)} ETH`
        );
        console.log(dayNum, userPayoutValueByShares, formatPrice(userPayoutValueByShares));

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

    // 这里对 TiTanX 代币可以获得的支付计算是基于当前每个周期的比例和用户的份额占全局份额的百分比计算得到
    // 对于 payout 页面也是如此，只不过计算页面是基于用户的输入模拟计算的
    // 现在的问题主要在于：用户的份额如何计算

    return {
        day8CyclePayout,
        day28CyclePayout,
        day90CyclePayout,
        day369CyclePayout,
        day888CyclePayout,
    };
}
