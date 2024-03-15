import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";
import ContentWrapper from "@/sections/ContentWrapper";
import CardBgWrapper from "@/sections/CardBgWrapper";
import ColorfulDisplay from "@/components/ColorfulDisplay";
import {
    useStatsSupply,
    useGetGlobalTRank,
    useGlobalInfoData,
    useGetGlobalMintPower,
} from "@/hooks/useReadTokenContract";
import { formatEther } from "viem";
import { formatPrice } from "@/configs/utils";
import { Divider } from "antd";
import TInfoGroup from "@/components/TInfoGroup";
import { useTokenPrice } from "@/hooks/useTokenPrice";
import TIPS from "@/configs/tips";

export default function Index() {
    const { liquid, staked, penalties, buyAndBurn } = useStatsSupply();
    const { globalTRank } = useGetGlobalTRank();
    const { globalMintPower } = useGetGlobalMintPower();
    const { globalActiveShares } = useGlobalInfoData();
    const tokenValueInUSD = useTokenPrice();
    // console.log(Number(formatEther(liquid || 0n)), staked, penalties, buyAndBurn);

    const StatsChart = () => {
        const data = [
            { name: "Liquid", value: Number(formatEther(liquid || 0n)) },
            { name: "Staked", value: Number(formatEther(staked || 0n)) },
            { name: "Penalties", value: Number(formatEther(penalties || 0n)) },
            { name: "Buy & Burn", value: Number(formatEther(buyAndBurn || 0n)) },
        ];
        const COLORS = ["#3B82F6", "#D946EF", "#F97316", "#FB7185"];
        const renderCustomizedLabel = ({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
        }: any) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
            const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.1;
            const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.1;

            return (
                <text
                    x={x}
                    y={y}
                    fill={COLORS[index]}
                    dominantBaseline={"100px"}
                    textAnchor={x > cx ? "start" : "end"}
                    style={{ fontSize: "12px" }}
                >
                    {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        const renderActiveShape = (props: any) => {
            const RADIAN = Math.PI / 180;
            const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, midAngle, fill } =
                props;
            const sin = Math.sin(-RADIAN * midAngle);
            const cos = Math.cos(-RADIAN * midAngle);
            const sx = cx + (outerRadius - 70) * cos;
            const sy = cy + (outerRadius - 70) * sin;

            return (
                <Sector
                    cx={sx}
                    cy={sy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            );
        };

        return (
            <div className="w-full h-[400px] recharts-pie">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={500} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            stroke="none"
                            dataKey="value"
                            isAnimationActive={false}
                            label={renderCustomizedLabel}
                            activeShape={renderActiveShape}
                            // onMouseEnter={}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={value => formatPrice(value as any)} />
                        <Legend align="center" verticalAlign="top" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const getTokenUsdValue = (amount: bigint) => {
        if (!tokenValueInUSD) return 0n;
        return formatPrice((amount * tokenValueInUSD) / BigInt(1e18) / BigInt(1e18));
    };

    return (
        <ContentWrapper title="Stats" subTitle="" tips={TIPS.stats.pageHeadingTips}>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                    <CardBgWrapper number={1}>
                        <StatsChart />
                    </CardBgWrapper>
                </div>
                <div className="w-full lg:w-1/2">
                    <CardBgWrapper number={2}>
                        <h4 className="text-base md:text-lg text-primary-400">Supply</h4>
                        <div className="px-1 md:px-6 text-xs md:text-base">
                            <ColorfulDisplay
                                textColor="blue"
                                value={formatPrice(formatEther(liquid || 0n))}
                                label="Liquid"
                                tips="TITAN"
                                subValue={`≈ $${getTokenUsdValue(liquid)}`}
                            />
                            <ColorfulDisplay
                                textColor="purple"
                                value={formatPrice(formatEther(staked || 0n))}
                                label="Staked"
                                tips="TITAN"
                                subValue={`≈ $${getTokenUsdValue(staked)}`}
                            />
                            <ColorfulDisplay
                                textColor="orange"
                                value={formatPrice(formatEther(penalties || 0n))}
                                label="Panalties"
                                tips="TITAN"
                                subValue={`≈ $${getTokenUsdValue(penalties)}`}
                            />
                            {/* <ColorfulDisplay
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
                            /> */}
                            <ColorfulDisplay
                                textColor="pink"
                                value={formatPrice(formatEther(buyAndBurn || 0n))}
                                label="Buy & Burned"
                                tips="TITAN"
                                subValue={`≈ $${getTokenUsdValue(buyAndBurn)}`}
                            />
                        </div>
                        <Divider />
                        <TInfoGroup
                            title={
                                <h4 className="text-base md:text-lg text-primary-400">
                                    Mining & Staking
                                </h4>
                            }
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
                                    value: formatPrice(globalMintPower),
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
