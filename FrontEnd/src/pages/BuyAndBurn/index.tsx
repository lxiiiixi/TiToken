import ContentWrapper from "@/sections/ContentWrapper";
import Card from "@/components/Card";
import { Button } from "antd";

function index() {
    return (
        <ContentWrapper
            title="Staker Payouts + Buy & Burn"
            subTitle="Decentralized functions to pay Stakers and Buy & Burn TITAN X"
        >
            <div className="flex gap-4">
                <div className="w-1/2">
                    <Card title="Distribute into Payouts + Buy & Burn">
                        <div className="flex-between my-2">
                            <span>To Be Distributed</span>
                            <span>$26,795.04</span>
                        </div>
                        <div className="flex-between my-2">
                            <span>User Reward</span>
                            <span>$5.04</span>
                        </div>
                        <Button block>Distribute ETH</Button>
                    </Card>
                </div>
                <div className="w-1/2">
                    <Card title="Buy & Burn V2">
                        <div className="flex-between my-2">
                            <span>Buy & Burn Balance</span>
                            <span>$26,795.04</span>
                        </div>
                        <div className="flex-between my-2">
                            <span>User Reward</span>
                            <span>$5.04</span>
                        </div>
                        <Button block>Trigger Buy And Burn</Button>
                        <p className=" text-sm text-gray-400 p-4 text-center">
                            current cap per swap is 3.33 ETH & is callable every 60 minute(s), no
                            global cap. Total TITANX buy & burned so far: 19,728,025,995,103.56
                            Total ETH used so far: 23,826.28 ETH
                        </p>
                    </Card>
                </div>
            </div>
        </ContentWrapper>
    );
}

export default index;
