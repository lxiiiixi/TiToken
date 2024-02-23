import ContentWrapper from "@/sections/ContentWrapper";
import { Button, Divider, Progress } from "antd";
import Card from "@/components/Card";

function index() {
    const PayoutCycleCard = ({ dayNum }: { dayNum: number }) => {
        return (
            <Card title={`${dayNum}-Day Payout Cycles`}>
                <div className="flex-between my-2">
                    <span>Global Cycle Payout</span>
                    <span>$26,795.04</span>
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
                    <span>$0</span>
                </div>
                <Button block className="my-2">
                    No Payout Claimable Yet
                </Button>
                <p className="text-gray-500 text-sm text-center my-2">
                    don't have any active shares? stake your TITAN X tokens to earn ETH passive
                    income.
                </p>
            </Card>
            <div className="h-1 bg-black/30 rounded-sm my-6"></div>
            <Button block>Triggle Avaliable Cycle payouts</Button>
            <div className="flex flex-wrap my-4">
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard dayNum={8} />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard dayNum={28} />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard dayNum={90} />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <PayoutCycleCard dayNum={369} />
                </div>
                <div className="w-full p-2">
                    <PayoutCycleCard dayNum={888} />
                </div>
            </div>
        </ContentWrapper>
    );
}

export default index;
