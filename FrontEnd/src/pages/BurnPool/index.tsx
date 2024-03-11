import ContentWrapper from "@/sections/ContentWrapper";
import TInfoGroup from "@/components/TInfoGroup";
import { Divider } from "antd";
import CardBgWrapper from "@/sections/CardBgWrapper";
import ConnectWalletButton from "@/sections/ConnectWalletButton";
import { useAccount } from "wagmi";
import TButton from "@/components/TButton";
import { usePayouts } from "@/hooks/useWriteTokenContract";

export default function Index() {
    const { address } = useAccount();
    const { claimUserAvailableETHBurnPool } = usePayouts();
    return (
        <ContentWrapper title="Burn Pool Bonuses" subTitle="Earn ETH bonuses when you burn TITAN X">
            <CardBgWrapper number={3}>
                <TInfoGroup
                    title={<h2 className="text-white text-base md:text-2xl">Your Burn Bonus</h2>}
                    data={[
                        {
                            key: "1",
                            label: "28-Day Burn Pool Payout",
                            value: "$0",
                            subValue: "≈ 0 ETH",
                        },
                        {
                            key: "2",
                            label: "Your TITAN X Burned This Cycle",
                            value: "$0",
                            subValue: "≈ 0 ETH",
                        },
                        {
                            key: "3",
                            label: "Your Est. Burn Bonus This Cycle",
                            value: "$0",
                            subValue: "≈ 0 ETH",
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
                            value: "$0",
                            subValue: "≈ 0 ETH",
                        },
                    ]}
                />
                {address ? (
                    <TButton
                        width="90%"
                        className="my-8"
                        handleClick={claimUserAvailableETHBurnPool}
                    >
                        Claim Bonus ETH
                    </TButton>
                ) : (
                    <ConnectWalletButton text="Connect Wallet to Claim Bonus ETH" />
                )}
                <p className="text-center text-primary1 text-xs">burn pool not enabled yet</p>
            </CardBgWrapper>
            {/* <div className="relative">
                <TCard number={3} className="w-full" />
                <div className="absolute-center w-[88%]"></div>
            </div> */}
        </ContentWrapper>
    );
}
