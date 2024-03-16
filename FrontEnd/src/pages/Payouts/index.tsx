import ContentWrapper from "@/sections/ContentWrapper";
import { Divider, Progress } from "antd";
import {
    useGetUserETHClaimableTotal,
    useGetPayoutCyclesData,
    useGlobalInfoData,
    useGetActiveShares,
} from "@/hooks/useReadTokenContract";
import { formatPercentage, formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import { useETHPrice } from "@/hooks/useTokenPrice";
import TInfoGroup from "@/components/TInfoGroup";
import type { CardNumber } from "@/components/TCard";
import CardBgWrapper from "@/sections/CardBgWrapper";
import TButton from "@/components/TButton";
import { useAccount } from "wagmi";
import { usePayouts } from "@/hooks/useWriteTokenContract";
import ConnectWalletButton from "@/sections/ConnectWalletButton";
import TIPS from "@/configs/tips";
import { PERCENT_BPS } from "@/configs/constants";
import { calculateUserPayoutByShares } from "@/configs/calculate";
import useContractHashNotification from "@/hooks/useContractHashNotification";

function Index() {
    const { userETHClaimableTotal } = useGetUserETHClaimableTotal();
    const { currentContractDay } = useGlobalInfoData();
    const { address } = useAccount();
    const { triggerPayouts, claimUserAvailableETHPayouts, payoutsHash, payoutsPending } =
        usePayouts();

    useContractHashNotification(payoutsPending, payoutsHash);

    const ethUsdPrice = useETHPrice();
    const { globalCyclePayout, currentCycleIndex } = useGetPayoutCyclesData();
    const cycleDays = [8, 28, 90, 369, 888];
    const nextDay = cycleDays.reduce((acc: { [key: number]: bigint }, day) => {
        acc[day] = (currentCycleIndex && (currentCycleIndex[day] + 1n) * BigInt(day)) || 0n;
        return acc;
    }, {});

    const ableToTriggle = currentContractDay && Object.values(nextDay).includes(currentContractDay);

    const { userCurrentActiveShares, globalActiveShares } = useGetActiveShares();
    const percentOfUserShare =
        userCurrentActiveShares && globalActiveShares
            ? userCurrentActiveShares / globalActiveShares
            : 0n;

    const ethPriceBigInt = BigInt(Math.round(ethUsdPrice));
    const ethClaimableUsd = formatEther(userETHClaimableTotal * ethPriceBigInt);

    const PayoutCycleCard = ({ dayNum }: { dayNum: number }) => {
        // const { globalCyclePayout, currentCycleIndex } = useGetPayoutCyclesData();
        const cyclePayout = globalCyclePayout ? globalCyclePayout[dayNum] : 0n;
        const payoutValue = ethUsdPrice * parseFloat(formatEther(cyclePayout));

        const userPayoutByShares = userCurrentActiveShares
            ? calculateUserPayoutByShares(userCurrentActiveShares, globalActiveShares, cyclePayout)
            : 0n;
        const userPayoutValue = ethUsdPrice * parseFloat(formatEther(userPayoutByShares));

        // const demo = calculateUserPayoutByShares(
        //     116179378709353253087033865n,
        //     globalActiveShares,
        //     cyclePayout
        // );
        // console.log(demo, formatPrice(formatEther(demo), 4));

        // const cycleDays = [8, 28, 90, 369, 888];
        // const nextDay = cycleDays.reduce((acc: { [key: number]: bigint }, day) => {
        //     acc[day] = (currentCycleIndex && (currentCycleIndex[day] + 1n) * BigInt(day)) || 0n;
        //     return acc;
        // }, {});
        const countdownPercent = cycleDays.reduce((acc: { [key: number]: number }, day) => {
            acc[day] =
                (currentCycleIndex &&
                    currentContractDay &&
                    Math.round(((day - Number(nextDay[day] - currentContractDay)) / day) * 1000)) ||
                100;
            return acc;
        }, {});

        return (
            <CardBgWrapper number={`${dayNum}Day` as CardNumber}>
                {/* <h2>{`${dayNum}-Day Payout Cycles`}</h2>
                <div className="flex-between my-2">
                    <span>Global Cycle Payout</span>
                    <span className="flex flex-col items-end">
                        <span className="text-primary-400">${formatPrice(payoutValue)}</span>
                        <span className="text-white text-xs">
                            ≈ {formatPrice(formatEther(cyclePayout), 4)} ETH
                        </span>
                    </span>
                </div> */}
                {/* <div className="flex-between my-2">
                    <span>Your Est. Payout</span>
                    <span>No Stakes</span>
                </div> */}
                <TInfoGroup
                    data={[
                        {
                            key: "Global Cycle Payout",
                            label: "Global Cycle Payout",
                            value: `$ ${formatPrice(payoutValue)}`,
                            subValue: `≈ ${formatPrice(formatEther(cyclePayout), 4)} ETH`,
                            tips: TIPS.payout.globalCyclePayout,
                        },
                        {
                            key: "Your Est. Payout",
                            label: "Your Est. Payout",
                            value: `${
                                userCurrentActiveShares === 0n
                                    ? "No Stakes"
                                    : formatPrice(formatEther(userPayoutByShares), 4)
                            }`,
                            subValue: `≈ ${userPayoutValue || "-"} ETH`,
                            tips: TIPS.payout.yourEstPayout,
                        },
                    ]}
                    title={<h2 className="text-lg md:text-3xl">{`${dayNum}-Day Payout Cycles`}</h2>}
                />

                <Divider />
                <div>
                    <p>Countdown</p>
                    <Progress percent={countdownPercent[dayNum] / 10} status="active" />
                    <p>— Next Payout Day: {nextDay[dayNum].toString()}</p>
                </div>
            </CardBgWrapper>
        );
    };

    return (
        <ContentWrapper
            title="Rolling Payout Cycles"
            subTitle="Earn ETH passively based on your % of the TITAN X staking pool"
            tips={TIPS.payout.pageHeadingTips}
        >
            <CardBgWrapper number={3}>
                <TInfoGroup
                    data={[
                        {
                            key: "1",
                            label: "Your Active Shares",
                            value: `${userCurrentActiveShares?.toString()}`,
                            subValue: `≈ ${formatPercentage(
                                percentOfUserShare,
                                false,
                                6
                            )} of global shares`,
                            tips: TIPS.payout.yourActiveShares,
                        },
                        {
                            key: "2",
                            label: "ETH Claimable",
                            value: `${ethClaimableUsd || "-"}`,
                            subValue: `≈ ${userETHClaimableTotal.toString() || "-"} ETH`,
                            tips: TIPS.payout.ethClaimable,
                        },
                    ]}
                    title={
                        <h2 className="text-white text-base md:text-2xl">
                            Your Claimable ETH Payouts
                        </h2>
                    }
                />
                {!address && <ConnectWalletButton text="Connect Wallet to Claim ETH Payouts" />}
                {address && userETHClaimableTotal > 0 && (
                    <TButton
                        width="90%"
                        className="my-8"
                        handleClick={claimUserAvailableETHPayouts}
                    >
                        Claim Payout
                    </TButton>
                )}
                {address && userETHClaimableTotal <= 0 && (
                    <TButton type="secondary" width="90%" className="my-6">
                        No Payout Claimable Yet
                    </TButton>
                )}
                <p className=" text-primary1 text-xs text-center">
                    don't have any active shares? stake your TITAN X tokens to earn ETH passive
                    income.
                </p>
            </CardBgWrapper>
            {/* <div className="relative">
                <TCard number={3} width="100%" />
                <div className="absolute-center w-[90%]"></div>
            </div> */}
            {/* <Button block>Triggle Avaliable Cycle payouts</Button> */}
            {!address && <ConnectWalletButton text="Connect Wallet to Claim ETH Payouts" />}
            {address && (
                <TButton
                    width="98%"
                    className={`mt-6 md:my-8`}
                    type={ableToTriggle ? "primary" : "secondary"}
                    handleClick={() => {
                        if (ableToTriggle && triggerPayouts) triggerPayouts();
                    }}
                >
                    Triggle Avaliable Cycle payouts
                </TButton>
            )}
            <div className="flex flex-wrap my-4">
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={8}
                        // globalCyclePayout={globalCyclePayout ? globalCyclePayout[8] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={28}
                        // globalCyclePayout={globalCyclePayout ? globalCyclePayout[28] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={90}
                        // globalCyclePayout={globalCyclePayout ? globalCyclePayout[90] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={369}
                        // globalCyclePayout={globalCyclePayout ? globalCyclePayout[369] : 0n}
                    />
                </div>
                <div className="w-full p-2">
                    <PayoutCycleCard
                        dayNum={888}
                        // globalCyclePayout={globalCyclePayout ? globalCyclePayout[888] : 0n}
                    />
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Index;
