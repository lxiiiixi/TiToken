import ContentWrapper from "@/sections/ContentWrapper";
import { Button, Divider, Progress } from "antd";
import Card from "@/components/Card";
import { useGetUserETHClaimableTotal, useGetPayoutCyclesData } from "@/hooks/useReadTokenContract";

function Index() {
    const { userETHClaimableTotal } = useGetUserETHClaimableTotal();
    const { globalCyclePayout, currentCycleIndex } = useGetPayoutCyclesData();

    console.log(currentCycleIndex);

    const PayoutCycleCard = ({
        dayNum,
        globalCyclePayout,
    }: {
        dayNum: number;
        globalCyclePayout: bigint;
    }) => {
        return (
            <Card title={`${dayNum}-Day Payout Cycles`}>
                <div className="flex-between my-2">
                    <span>Global Cycle Payout</span>
                    <span>${globalCyclePayout.toString()}</span>
                </div>
                <div className="flex-between my-2">
                    <span>Your Est. Payout</span>
                    <span>No Stakes</span>
                </div>
                <Divider />
                <div>
                    <p>Countdown</p>
                    <Progress percent={30} />
                    <p>— Next Payout Day: 120</p>
                </div>
            </Card>
        );
    };
    return (
        <ContentWrapper
            title="Rolling Payout Cycles"
            subTitle="Earn ETH passively based on your % of the TITAN X staking pool"
        >
            <Card title="Your Claimable ETH Payouts">
                <div className="flex-between my-2">
                    <span>Your Active Shares</span>
                    <span>0</span>
                </div>
                <div className="flex-between my-2">
                    <span>ETH Claimable</span>
                    <span>${userETHClaimableTotal.toString()}</span>
                </div>
                {userETHClaimableTotal > 0 ? (
                    <Button block className="my-2">
                        Claim Payout
                    </Button>
                ) : (
                    <Button block className="my-2" disabled>
                        No Payout Claimable Yet
                    </Button>
                )}
                <p className="text-gray-500 text-sm text-center my-2">
                    don't have any active shares? stake your TITAN X tokens to earn ETH passive
                    income.
                </p>
            </Card>
            <div className="h-[2px] bg-black/20 rounded-sm my-6"></div>
            <Button block>Triggle Avaliable Cycle payouts</Button>
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
