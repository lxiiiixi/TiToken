import { useGlobalInfoData } from "@/hooks/useReadTokenContract";
import { useManualDailyUpdate } from "@/hooks/useWriteTokenContract";
import GlobalCountdown from "../GlobalCountdown";

export default function CountDownButton() {
    const { currentContractDay } = useGlobalInfoData();
    const { manualDailyUpdate } = useManualDailyUpdate();

    const handleOnClick = () => {
        if (manualDailyUpdate) manualDailyUpdate();
    };

    console.log(currentContractDay);

    return (
        <div
            className="border border-solid h-full border-white/15 bg-[#87828C]/15 px-5 rounded-lg text-center cursor-pointer py-1 antd-costom"
            onClick={handleOnClick}
        >
            <div>Day {currentContractDay ? (currentContractDay - 1n).toString() : 0}</div>
            <GlobalCountdown />
            {/* <div>Genesis: {new Date(Number(genesisTs) * 1000).toLocaleString()}</div> */}
        </div>
    );
}
