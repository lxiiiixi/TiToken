import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ContentWrapper from "@/sections/ContentWrapper";
import CardBgWrapper from "@/sections/CardBgWrapper";
import ColorfulDisplay from "@/components/ColorfulDisplay";
import {
    useStatsSupply,
    useGetGlobalTRank,
    useGlobalInfoData,
    useGetCurrentMintPowerBonus,
} from "@/hooks/useReadTokenContract";
import { formatEther } from "viem";
import { formatPrice } from "@/configs/utils";
import { Divider } from "antd";
import TInfoGroup from "@/components/TInfoGroup";

export default function Index() {
    const { liquid, staked, penalties, buyAndBurn } = useStatsSupply();
    const { globalTRank } = useGetGlobalTRank();
    const { currentMintPowerBonus } = useGetCurrentMintPowerBonus();
    const { globalActiveShares } = useGlobalInfoData();

    console.log(Number(formatEther(liquid || 0n)), staked, penalties, buyAndBurn);

    const StatsChart = () => {
        const data = [
            { name: "Group A", value: Number(formatEther(liquid || 0n)) },
            { name: "Group B", value: Number(formatEther(staked || 0n)) },
            { name: "Group C", value: Number(formatEther(penalties || 0n)) },
            { name: "Group D", value: Number(formatEther(buyAndBurn || 0n)) },
        ];
        // const data = [
        //     { name: "Group A", value: 1000 },
        //     { name: "Group B", value: 2000 },
        //     { name: "Group C", value: 3000 },
        //     { name: "Group D", value: 4000 },
        // ];
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

        return (
            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={500} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend align="center" verticalAlign="top" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <ContentWrapper title="Stats" subTitle="">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                    <CardBgWrapper number={1}>
                        <StatsChart />
                    </CardBgWrapper>
                </div>
                <div className="w-full lg:w-1/2">
                    <CardBgWrapper number={2}>
                        <h4>Supply</h4>
                        <ColorfulDisplay
                            textColor="blue"
                            value={formatPrice(formatEther(liquid || 0n))}
                            label="Liquid"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <ColorfulDisplay
                            textColor="purple"
                            value={formatPrice(formatEther(staked || 0n))}
                            label="Staked"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <ColorfulDisplay
                            textColor="orange"
                            value={formatPrice(formatEther(penalties || 0n))}
                            label="Panalties"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <ColorfulDisplay
                            textColor="green"
                            value="1,000,000"
                            label="BoT Protocols"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <ColorfulDisplay
                            textColor="pink"
                            value="1,000,000"
                            label="User Burned"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <ColorfulDisplay
                            textColor="pink"
                            value={formatPrice(formatEther(buyAndBurn || 0n))}
                            label="Buy & Burned"
                            tips="TITAN"
                            subValue="1,000"
                        />
                        <Divider />
                        <TInfoGroup
                            title="Mining & Staking"
                            data={[
                                {
                                    key: "TRank",
                                    label: "Global TRank",
                                    value: formatPrice(globalTRank.toString()),
                                    tips: "TITAN",
                                },
                                {
                                    key: "MiningPower",
                                    label: "Global Mining Power",
                                    value: formatPrice(currentMintPowerBonus),
                                    tips: "TITAN",
                                },
                                {
                                    key: "ActiveShares",
                                    label: "Global Active Shares",
                                    value: formatPrice(formatEther(globalActiveShares || 0n)),
                                    tips: "TITAN",
                                },
                            ]}
                        />
                    </CardBgWrapper>
                </div>
            </div>
        </ContentWrapper>
    );
}
