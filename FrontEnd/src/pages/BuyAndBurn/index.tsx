import ContentWrapper from "@/sections/ContentWrapper";
import { useWethBalance } from "@/hooks/useReadBuyAndBurnContract";
import { useETHPrice } from "@/hooks/useTokenPrice";
import EthAndUsdDisplay from "@/sections/EthAndUsdDisplay";
import { useGetUndistributedEth } from "@/hooks/useReadTokenContract";
import { useDistributeETH } from "@/hooks/useWriteTokenContract";
import { useBuynBurn } from "@/hooks/useWriteBuyAndBurnContract";
import TInfoGroup from "@/components/TInfoGroup";
import CardBgWrapper from "@/sections/CardBgWrapper";
import TButton from "@/components/TButton";
import { useAccount } from "wagmi";

function Index() {
    const { wethBalance } = useWethBalance();
    const { address } = useAccount();
    const ethUsdPrice = useETHPrice();
    const { undistributedEth } = useGetUndistributedEth();
    const { distributeETH } = useDistributeETH();
    const { buynBurn } = useBuynBurn();

    return (
        <ContentWrapper
            title="Staker Payouts + Buy & Burn"
            subTitle="Decentralized functions to pay Stakers and Buy & Burn TITAN X"
        >
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 flex-1">
                    <CardBgWrapper number={4}>
                        <TInfoGroup
                            title={
                                <h2 className="text-white text-xl">
                                    Distribute into Payouts + Buy & Burn
                                </h2>
                            }
                            data={[
                                {
                                    key: "To Be Distributed",
                                    label: "To Be Distributed",
                                    value: (
                                        <EthAndUsdDisplay
                                            ethAmount={undistributedEth}
                                            ethUsdPrice={ethUsdPrice}
                                        />
                                    ),
                                },
                                {
                                    key: "User Reward",
                                    label: "User Reward",
                                    value: (
                                        <EthAndUsdDisplay
                                            ethAmount={(undistributedEth * 33n) / 10000n}
                                            ethUsdPrice={ethUsdPrice}
                                        />
                                    ),
                                },
                            ]}
                        />
                        {/* <Button block onClick={distributeETH}>
                            Distribute ETH
                        </Button> */}
                        {address ? (
                            <TButton width="90%" className="my-8" handleClick={distributeETH}>
                                Distribute ETH
                            </TButton>
                        ) : (
                            <TButton type="secondary" width="90%" className="my-8">
                                Connect Wallet
                            </TButton>
                        )}
                    </CardBgWrapper>
                    {/* <div className="relative">
                        <TCard number={4} className="w-full" />
                        <div className="absolute-top w-[88%] py-10"></div>
                    </div> */}
                </div>
                <div className="w-full lg:w-1/2">
                    <CardBgWrapper number={2}>
                        <TInfoGroup
                            title={<h2 className="text-white text-xl">Buy & Burn</h2>}
                            data={[
                                {
                                    key: "Buy & Burn Balance",
                                    label: "Buy & Burn Balance",
                                    value: (
                                        <EthAndUsdDisplay
                                            ethAmount={wethBalance}
                                            ethUsdPrice={ethUsdPrice}
                                        />
                                    ),
                                },
                                {
                                    key: "User Reward",
                                    label: "User Reward",
                                    value: (
                                        <EthAndUsdDisplay
                                            ethAmount={(wethBalance * 33n) / 10000n}
                                            ethUsdPrice={ethUsdPrice}
                                        />
                                    ),
                                },
                            ]}
                        />
                        {address ? (
                            <TButton width="90%" className="my-8" handleClick={buynBurn}>
                                Trigger Buy And Burn
                            </TButton>
                        ) : (
                            <TButton type="secondary" width="90%" className="my-8">
                                Connect Wallet
                            </TButton>
                        )}
                        {/* <Button block onClick={buynBurn}>
                            Trigger Buy And Burn
                        </Button> */}
                        <p className="text-xs leading-5 text-gray-400 px-6 text-center">
                            <span className="text-primary1 mt-6">
                                current cap per swap is 3.33 ETH & is callable every 60 minute(s),
                                no global cap. Total TITANX buy & burned so far:
                                19,728,025,995,103.56 Total ETH used so far: 23,826.28 ETH
                            </span>
                            <span className="inline-block mt-4 text-white/80">
                                Required: use MEVBlocker.io RPC network when calling the Buy & Burn.
                                It makes the buy & burn a lot more lucrative and effective. It's
                                also a security best practice. Learn more here — it's 1-click, takes
                                2 seconds & only needs to be done once.
                            </span>
                        </p>
                    </CardBgWrapper>
                    {/* <div className="relative">
                        <TCard number={2} className="w-full" />
                        <div className="absolute-top w-[88%] py-10"></div>
                    </div> */}
                </div>
            </div>
        </ContentWrapper>
    );
}

export default Index;
