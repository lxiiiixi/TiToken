import { useGlobalInfoData } from "@/hooks/useReadTokenContract";
import { SECONDS_IN_DAY } from "@/configs/constants";
import { Progress } from "antd";

export default function CountDownProgress() {
    const { currentContractDay, genesisTs } = useGlobalInfoData();
    if (!genesisTs) return <Progress percent={60} />;
    const deadline = genesisTs + currentContractDay * BigInt(SECONDS_IN_DAY);
    const gap = Number(deadline * 1000n) - Number(new Date().getTime());
    const oneDay = Number(SECONDS_IN_DAY * 1000);
    const percent = Math.round(100 - (gap * 100) / oneDay);

    return <Progress percent={percent} status="active" />;
}
