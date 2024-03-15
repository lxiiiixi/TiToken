import { Button } from "antd";
import ConnectWalletButton from "@/sections/ConnectWalletButton";
import { useAccount } from "wagmi";
import useNotification from "@/hooks/useNotification";
import { useGetActiveShares, useGetInvitaionInfo } from "@/hooks/useReadTokenContract";
import CardBgWrapper from "@/sections/CardBgWrapper";
import TInfoGroup from "@/components/TInfoGroup";
import { formatPercentage, formatPrice } from "@/configs/utils";
import { formatEther } from "viem";
import { PERCENT_BPS } from "@/configs/constants";

export default function Index() {
    const { address } = useAccount();
    const openNotification = useNotification();
    const { userCurrentActiveShares, globalActiveShares } = useGetActiveShares();
    const { inviterBonusPercent } = useGetInvitaionInfo();

    const handleGenerateLink = () => {
        const bastUrl = "https://ti-token.vercel.app/inviter?";
        const link = `${bastUrl}${address}`;
        navigator.clipboard.writeText(link);
        openNotification(
            "success",
            "Successfully copied",
            "Share link generated successfully, share it with your friends now!"
        );
    };

    // const userCurrentActiveShares = 11617937870935325308703330000n;
    // const globalActiveShares = 116179378709353253087033308656n;
    // console.log(userCurrentActiveShares / globalActiveShares);

    return (
        <div className="w-[550px] m-auto my-4">
            <CardBgWrapper number={5}>
                <TInfoGroup
                    title="Invitation"
                    data={[
                        {
                            key: "1",
                            label: "Global Active share",
                            value: formatPrice(formatEther(userCurrentActiveShares)),
                        },
                        {
                            key: "2",
                            label: "My Active share",
                            value: formatPrice(formatEther(globalActiveShares)),
                        },
                        {
                            key: "My current shareholding",
                            label: "My current shareholding",
                            value:
                                globalActiveShares && userCurrentActiveShares
                                    ? formatPercentage(
                                          (userCurrentActiveShares * BigInt(PERCENT_BPS)) /
                                              globalActiveShares,
                                          true
                                      )
                                    : 0,
                        },
                        {
                            key: "3",
                            label: "My Invitaion Bonus percent",
                            value: inviterBonusPercent?.toString(),
                        },
                    ]}
                />
                <div className="p-4 text-center">
                    {!address && <ConnectWalletButton />}
                    {address && (
                        <Button type="primary" onClick={handleGenerateLink}>
                            Generate a share link
                        </Button>
                    )}
                </div>
            </CardBgWrapper>
            {/* Once someone creates a miner using your link, then you will be rewarded with an invitation to create a miner in the future */}
        </div>
    );
}
