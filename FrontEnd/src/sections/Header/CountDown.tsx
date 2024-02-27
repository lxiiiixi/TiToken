import { useContractTimeData } from "@/hooks/useReadTokenContract";
import type { CountdownProps } from "antd";
import { Statistic } from "antd";
import { SECONDS_IN_DAY } from "@/configs/constants";
import { useManualDailyUpdate } from "@/hooks/useWriteTokenContract";

const { Countdown } = Statistic;

export default function CountDown() {
    const { currentContractDay, genesisTs } = useContractTimeData();
    const { manualDailyUpdate } = useManualDailyUpdate();

    const handleOnClick = () => {
        if (manualDailyUpdate) manualDailyUpdate();
    };

    const CountDownDisplay = () => {
        if (!genesisTs) return <>00h:00m:00s</>;

        const deadline =
            genesisTs + currentContractDay * BigInt(SECONDS_IN_DAY) + BigInt(SECONDS_IN_DAY);

        const onFinish: CountdownProps["onFinish"] = () => {
            console.log("finished!");
        };

        return <Countdown value={Number(deadline * 1000n)} onFinish={onFinish} />;
    };

    return (
        <div
            className="border border-red-200 px-4 rounded-xl text-center cursor-pointer"
            onClick={handleOnClick}
        >
            <div>Day {currentContractDay ? (currentContractDay + 1n).toString() : 0}</div>
            <CountDownDisplay />
            {/* <div>Genesis: {new Date(Number(genesisTs) * 1000).toLocaleString()}</div> */}
        </div>
    );
}
