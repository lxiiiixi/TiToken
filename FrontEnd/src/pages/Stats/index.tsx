import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import TCard from "@/components/TCard";
import ContentWrapper from "@/sections/ContentWrapper";
// import TInfoGroup from "@/components/TInfoGroup";
// import TButton from "@/components/TButton";
// import { Divider } from "antd";

export default function Index() {
    const StatsChart = () => {
        const data = [
            { name: "Group A", value: 400 },
            { name: "Group B", value: 300 },
            { name: "Group C", value: 300 },
            { name: "Group D", value: 200 },
        ];
        const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
        // const RADIAN = Math.PI / 180;
        // const renderCustomizedLabel = ({
        //     cx,
        //     cy,
        //     midAngle,
        //     innerRadius,
        //     outerRadius,
        //     percent,
        //     index,
        // }) => {
        //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
        //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

        //     return (
        //         <text
        //             x={x}
        //             y={y}
        //             fill="white"
        //             textAnchor={x > cx ? "start" : "end"}
        //             dominantBaseline="central"
        //         >
        //             {`${(percent * 100).toFixed(0)}%`}
        //         </text>
        //     );
        // };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    };

    return (
        <ContentWrapper title="Stats" subTitle="">
            <div className="flex gap-6">
                <div className="relative w-1/2">
                    <TCard number={1} className="w-full" />
                    <div className="absolute-center w-full h-full">
                        <StatsChart />
                    </div>
                </div>
                <div className="relative w-1/2 h-auto">
                    <TCard number={2} className="w-full" />
                    <div className="absolute-center w-[88%]">111</div>
                </div>
            </div>
        </ContentWrapper>
    );
}
