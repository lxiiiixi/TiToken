import ContentWrapper from "@/sections/ContentWrapper";
import { Button } from "antd";
import { useWethBalance } from "@/hooks/useReadBuyAndBurnContract";
import { useETHPrice } from "@/hooks/useTokenPrice";
import EthAndUsdDisplay from "@/sections/EthAndUsdDisplay";
import { useGetUndistributedEth } from "@/hooks/useReadTokenContract";
import { useDistributeETH } from "@/hooks/useWriteTokenContract";
import { useBuynBurn } from "@/hooks/useWriteBuyAndBurnContract";
import TCard from "@/components/TCard";

function Index() {
    const { wethBalance } = useWethBalance();
    const ethUsdPrice = useETHPrice();
    const { undistributedEth } = useGetUndistributedEth();
    const { distributeETH } = useDistributeETH();
    const { buynBurn } = useBuynBurn();

    return (
        <ContentWrapper
            title="Staker Payouts + Buy & Burn"
            subTitle="Decentralized functions to pay Stakers and Buy & Burn TITAN X"
        >
            <div className="flex gap-4">
                <div className="w-1/2">
                    <div className="relative">
                        <TCard number={4} className="w-full" />
                        <div className="absolute-top w-[88%] py-10">
                            <h2>Distribute into Payouts + Buy & Burn</h2>
                            <div className="flex-between my-2">
                                <span>To Be Distributed</span>
                                <EthAndUsdDisplay
                                    ethAmount={undistributedEth}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            </div>
                            <div className="flex-between my-2">
                                <span>User Reward</span>
                                <EthAndUsdDisplay
                                    ethAmount={(undistributedEth * 33n) / 10000n}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            </div>
                            <Button block onClick={distributeETH}>
                                Distribute ETH
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="relative">
                        <TCard number={2} className="w-full" />
                        <div className="absolute-top w-[88%] py-10">
                            <div className="flex-between my-2">
                                <span>Buy & Burn Balance</span>
                                <EthAndUsdDisplay
                                    ethAmount={wethBalance}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            </div>
                            <div className="flex-between my-2">
                                <span>User Reward</span>
                                <EthAndUsdDisplay
                                    ethAmount={(wethBalance * 33n) / 10000n}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            </div>
                            <Button block onClick={buynBurn}>
                                Trigger Buy And Burn
                            </Button>
                            <p className=" text-sm text-gray-400 p-4 text-center">
                                current cap per swap is 3.33 ETH & is callable every 60 minute(s),
                                no global cap. Total TITANX buy & burned so far:
                                19,728,025,995,103.56 Total ETH used so far: 23,826.28 ETH
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Index;
