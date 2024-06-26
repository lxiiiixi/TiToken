import { useGlobalInfoData } from "@/hooks/useReadTokenContract";
import type { CountdownProps } from "antd";
import { Statistic } from "antd";
import { SECONDS_IN_DAY } from "@/configs/constants";

const { Countdown } = Statistic;

function GlobalCountdown() {
    const { currentContractDay, genesisTs } = useGlobalInfoData();

    const CountDownDisplay = () => {
        if (!genesisTs) return <>00h:00m:00s</>;

        // console.log("genesisTs", new Date(Number(genesisTs * 1000n)).toLocaleString());

        const deadline = genesisTs + currentContractDay * BigInt(SECONDS_IN_DAY);

        const onFinish: CountdownProps["onFinish"] = () => {
            console.log("finished!");
        };

        // console.log("deadline", new Date(Number(deadline * 1000n)).toLocaleString());

        return (
            <Countdown
                value={Number(deadline * 1000n)}
                onFinish={onFinish}
                className="antd-costom"
            />
        );
    };

    return <CountDownDisplay />;
}

export default GlobalCountdown;
