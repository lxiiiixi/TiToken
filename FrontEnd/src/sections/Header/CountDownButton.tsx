import { useGlobalInfoData } from "@/hooks/useReadTokenContract";
import { useManualDailyUpdate } from "@/hooks/useWriteTokenContract";
import GlobalCountdown from "../GlobalCountdown";
import { useEffect } from "react";
import useNotification from "@/hooks/useNotification";

export default function CountDownButton() {
    const { currentContractDay } = useGlobalInfoData();
    const { manualDailyUpdateHash, manualDailyUpdatePending, manualDailyUpdate } =
        useManualDailyUpdate();
    const openNotification = useNotification();

    const handleOnClick = () => {
        if (manualDailyUpdate) manualDailyUpdate();
    };

    useEffect(() => {
        // after pending
        if (manualDailyUpdateHash && !manualDailyUpdatePending)
            openNotification("success", "", manualDailyUpdateHash);
    }, [manualDailyUpdatePending, manualDailyUpdateHash, openNotification]);

    console.log("manualDailyUpdatePending", manualDailyUpdatePending);
    console.log("manualDailyUpdateHash", manualDailyUpdateHash);

    return (
        <div
            className="border border-solid h-full border-white/15 bg-[#87828C]/15 px-5 rounded-lg text-center cursor-pointer py-1 antd-costom"
            onClick={handleOnClick}
        >
            <div>Day {currentContractDay ? currentContractDay.toString() : 0}</div>
            <GlobalCountdown />
            {/* <div>Genesis: {new Date(Number(genesisTs) * 1000).toLocaleString()}</div> */}
        </div>
    );
}
