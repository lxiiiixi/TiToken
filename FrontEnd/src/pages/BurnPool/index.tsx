import ContentWrapper from "@/sections/ContentWrapper";
import TInfoGroup from "@/components/TInfoGroup";
import TButton from "@/components/TButton";
import { Divider } from "antd";
import CardBgWrapper from "@/sections/CardBgWrapper";

export default function Index() {
    return (
        <ContentWrapper title="Burn Pool Bonuses" subTitle="Earn ETH bonuses when you burn TITAN X">
            <CardBgWrapper number={3}>
                <TInfoGroup
                    title={"Your Burn Bonus"}
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
                <TButton type="secondary" height="40px" className="mt-4">
                    connect
                </TButton>
                <p className="text-center text-primary1 text-xs">burn pool not enabled yet</p>
            </CardBgWrapper>
            {/* <div className="relative">
                <TCard number={3} className="w-full" />
                <div className="absolute-center w-[88%]"></div>
            </div> */}
        </ContentWrapper>
    );
}
