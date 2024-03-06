import { useGlobalInfoData } from "@/hooks/useReadTokenContract";
import { useManualDailyUpdate } from "@/hooks/useWriteTokenContract";
import GlobalCountdown from "../GlobalCountdown";

export default function CountDownButton() {
    const { currentContractDay } = useGlobalInfoData();
    const { manualDailyUpdate } = useManualDailyUpdate();

    const handleOnClick = () => {
        if (manualDailyUpdate) manualDailyUpdate();
    };

    return (
        <div
            className="border border-solid border-white/15 bg-[#87828C]/15 px-4 rounded-xl text-center cursor-pointer py-1 antd-costom"
            onClick={handleOnClick}
        >
            <div>Day {currentContractDay ? currentContractDay.toString() : 0}</div>
            <GlobalCountdown />
            {/* <div>Genesis: {new Date(Number(genesisTs) * 1000).toLocaleString()}</div> */}
        </div>
    );
}
