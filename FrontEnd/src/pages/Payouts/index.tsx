import ContentWrapper from "@/sections/ContentWrapper";
import { Divider, Progress } from "antd";
import {
    useGetUserETHClaimableTotal,
    useGetPayoutCyclesData,
    useGlobalInfoData,
} from "@/hooks/useReadTokenContract";
import { formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import { useETHPrice } from "@/hooks/useTokenPrice";
import TInfoGroup from "@/components/TInfoGroup";
import type { CardNumber } from "@/components/TCard";
import CardBgWrapper from "@/sections/CardBgWrapper";
import TButton from "@/components/TButton";
import { useAccount } from "wagmi";

function Index() {
    const { userETHClaimableTotal } = useGetUserETHClaimableTotal();
    const { globalCyclePayout, currentCycleIndex } = useGetPayoutCyclesData();
    const { currentContractDay } = useGlobalInfoData();
    const ethUsdPrice = useETHPrice();
    const { address } = useAccount();

    console.log(currentCycleIndex);

    const PayoutCycleCard = ({
        dayNum,
        globalCyclePayout,
    }: {
        dayNum: number;
        globalCyclePayout: bigint;
    }) => {
        const payoutValue = ethUsdPrice * parseFloat(formatEther(globalCyclePayout));

        // 这里不是很确定的是，这个天数是从项目部署开始计算的，还是质押开始的

        const cycleDays = [8, 28, 90, 369, 888];
        const nextDay = cycleDays.reduce((acc: { [key: number]: bigint }, day) => {
            acc[day] = (currentCycleIndex && (currentCycleIndex[day] + 1n) * BigInt(day)) || 0n;
            return acc;
        }, {});
        const countdownPercent = cycleDays.reduce((acc: { [key: number]: number }, day) => {
            acc[day] =
                (currentCycleIndex &&
                    currentContractDay &&
                    Math.round(((day - Number(nextDay[day] - currentContractDay)) / day) * 100)) ||
                100;
            return acc;
        }, {});

        return (
            <CardBgWrapper number={`${dayNum}Day` as CardNumber}>
                <h2>{`${dayNum}-Day Payout Cycles`}</h2>
                <div className="flex-between my-2">
                    <span>Global Cycle Payout</span>
                    <span className="flex flex-col items-end">
                        <span className="text-primary-400">${formatPrice(payoutValue)}</span>
                        <span className="text-white text-xs">
                            ≈ {formatPrice(formatEther(globalCyclePayout), 4)} ETH
                        </span>
                    </span>
                </div>
                <div className="flex-between my-2">
                    <span>Your Est. Payout</span>
                    <span>No Stakes</span>
                </div>
                <Divider />
                <div>
                    <p>Countdown</p>
                    <Progress percent={countdownPercent[dayNum]} />
                    <p>— Next Payout Day: {nextDay[dayNum].toString()}</p>
                </div>
            </CardBgWrapper>
            // <div className="relative">
            //     <TCard number={`${dayNum}Day` as CardNumber} width="100%" />
            //     <div className="absolute-center w-[88%]">
            //         <h2>{`${dayNum}-Day Payout Cycles`}</h2>
            //         <div className="flex-between my-2">
            //             <span>Global Cycle Payout</span>
            //             <span className="flex flex-col items-end">
            //                 <span className="text-primary-400">${formatPrice(payoutValue)}</span>
            //                 <span className="text-white text-xs">
            //                     ≈ {formatPrice(formatEther(globalCyclePayout), 4)} ETH
            //                 </span>
            //             </span>
            //         </div>
            //         <div className="flex-between my-2">
            //             <span>Your Est. Payout</span>
            //             <span>No Stakes</span>
            //         </div>
            //         <Divider />
            //         <div>
            //             <p>Countdown</p>
            //             <Progress percent={countdownPercent[dayNum]} />
            //             <p>— Next Payout Day: {nextDay[dayNum].toString()}</p>
            //         </div>
            //     </div>
            // </div>
        );
    };
    return (
        <ContentWrapper
            title="Rolling Payout Cycles"
            subTitle="Earn ETH passively based on your % of the TITAN X staking pool"
        >
            <CardBgWrapper number={3}>
                <TInfoGroup
                    data={[
                        {
                            key: "1",
                            label: "Your Active Shares",
                            value: "0",
                            subValue: "0",
                        },
                        {
                            key: "2",
                            label: "ETH Claimable",
                            value: `${userETHClaimableTotal.toString()}`,
                            subValue: "0",
                        },
                    ]}
                    title={<h2 className="text-white">Your Claimable ETH Payouts</h2>}
                />
                {!address && (
                    <TButton type="secondary" width="90%" className="my-8">
                        Connect Wallet
                    </TButton>
                )}
                {address && userETHClaimableTotal > 0 && (
                    <TButton width="90%" className="my-8" handleClick={() => {}}>
                        Claim Payout
                    </TButton>
                )}
                {address && userETHClaimableTotal <= 0 && (
                    <TButton type="secondary" width="90%" className="my-8">
                        No Payout Claimable Yet
                    </TButton>
                )}
                <p className=" text-primary1 text-xs text-center my-2">
                    don't have any active shares? stake your TITAN X tokens to earn ETH passive
                    income.
                </p>
            </CardBgWrapper>
            {/* <div className="relative">
                <TCard number={3} width="100%" />
                <div className="absolute-center w-[90%]"></div>
            </div> */}
            <div className="h-[2px] bg-black/20 rounded-sm my-6"></div>
            {/* <Button block>Triggle Avaliable Cycle payouts</Button> */}
            <TButton width="98%" className="my-8">
                Triggle Avaliable Cycle payouts
            </TButton>
            <div className="flex flex-wrap my-4">
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={8}
                        globalCyclePayout={globalCyclePayout ? globalCyclePayout[8] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={28}
                        globalCyclePayout={globalCyclePayout ? globalCyclePayout[28] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={90}
                        globalCyclePayout={globalCyclePayout ? globalCyclePayout[90] : 0n}
                    />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard
                        dayNum={369}
                        globalCyclePayout={globalCyclePayout ? globalCyclePayout[369] : 0n}
                    />
                </div>
                <div className="w-full p-2">
                    <PayoutCycleCard
                        dayNum={888}
                        globalCyclePayout={globalCyclePayout ? globalCyclePayout[888] : 0n}
                    />
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Index;
