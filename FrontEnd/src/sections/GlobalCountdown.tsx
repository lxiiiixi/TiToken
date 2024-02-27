import { useContractTimeData } from "@/hooks/useReadTokenContract";
import type { CountdownProps } from "antd";
import { Statistic } from "antd";
import { SECONDS_IN_DAY } from "@/configs/constants";

const { Countdown } = Statistic;

function GlobalCountdown() {
    const { currentContractDay, genesisTs } = useContractTimeData();

    const CountDownDisplay = () => {
        if (!genesisTs) return <>00h:00m:00s</>;

        const deadline =
            genesisTs + currentContractDay * BigInt(SECONDS_IN_DAY) + BigInt(SECONDS_IN_DAY);

        const onFinish: CountdownProps["onFinish"] = () => {
            console.log("finished!");
        };

        return <Countdown value={Number(deadline * 1000n)} onFinish={onFinish} />;
    };

    return <CountDownDisplay />;
}

export default GlobalCountdown;
