import ContentWrapper from "@/sections/ContentWrapper";
import TInfoGroup from "@/components/TInfoGroup";
import { Divider } from "antd";
import CardBgWrapper from "@/sections/CardBgWrapper";
import ConnectWalletButton from "@/sections/ConnectWalletButton";
import { useAccount } from "wagmi";
import TButton from "@/components/TButton";
import { usePayouts } from "@/hooks/useWriteTokenContract";
import { useBurnPoolBonuses } from "@/hooks/useReadTokenContract";
import TIPS from "@/configs/tips";
import EthAndUsdDisplay from "@/sections/EthAndUsdDisplay";
import { useETHPrice } from "@/hooks/useTokenPrice";
import { formatEther } from "viem";

export default function Index() {
    const { address } = useAccount();
    const { claimUserAvailableETHBurnPool } = usePayouts();
    const ethUsdPrice = useETHPrice();

    const { userBurnPoolETHClaimableTotal, userCycleBurnTotal } = useBurnPoolBonuses();

    return (
        <ContentWrapper
            title="Burn Pool Bonuses"
            subTitle="Earn ETH bonuses when you burn TITAN X"
            tips={TIPS.burnPoolBonuses.pageHeadingTips}
        >
            <CardBgWrapper number={3}>
                <TInfoGroup
                    title={<h2 className="text-white text-base md:text-2xl">Your Burn Bonus</h2>}
                    data={[
                        {
                            key: "1",
                            label: "28-Day Burn Pool Payout",
                            value: (
                                <EthAndUsdDisplay
                                    ethAmount={userBurnPoolETHClaimableTotal || 0n}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            ),
                            tips: TIPS.burnPoolBonuses.poolPayout,
                        },
                        {
                            key: "2",
                            label: "Your TITAN X Burned This Cycle",
                            value: formatEther(userCycleBurnTotal || 0n),
                            tips: TIPS.burnPoolBonuses.tokenBurnThisCycle,
                        },
                        {
                            key: "3",
                            label: "Your Est. Burn Bonus This Cycle",
                            value: "$0",
                            subValue: "≈ 0 ETH",
                            tips: TIPS.burnPoolBonuses.estBonusThisCycle,
                        },
                    ]}
                />
                <Divider />
                <TInfoGroup
                    title=""
                    data={[
                        {
                            key: "4",
                            label: "Your Claimable ETH from Prev. Cycles",
                            value: (
                                <EthAndUsdDisplay
                                    ethAmount={userBurnPoolETHClaimableTotal || 0n}
                                    ethUsdPrice={ethUsdPrice}
                                />
                            ),
                            // subValue: `≈ ${formatPrice(
                            //     formatEther(userBurnPoolETHClaimableTotal)
                            // )} ETH`,
                            tips: TIPS.burnPoolBonuses.claimableETH,
                        },
                    ]}
                />

                {/* userBurnPoolETHClaimableTotal */}
                {!address && <ConnectWalletButton text="Connect Wallet to Claim Bonus ETH" />}
                {address && userBurnPoolETHClaimableTotal === 0n && (
                    <TButton width="90%" className="mt-8" type="secondary">
                        No Burn Pool ETH Bonus to Claim
                    </TButton>
                )}
                {address && userBurnPoolETHClaimableTotal > 0n && (
                    <TButton
                        width="90%"
                        className="mt-8"
                        handleClick={claimUserAvailableETHBurnPool}
                    >
                        Claim Bonus ETH
                    </TButton>
                )}
                <p className="text-center text-primary1 text-xs">burn pool not enabled yet</p>
            </CardBgWrapper>
        </ContentWrapper>
    );
}
