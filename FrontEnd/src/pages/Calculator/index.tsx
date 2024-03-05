import { Tabs } from "antd";
import Mining from "./Mining";
import Staking from "./Staking";

export default function Index() {
    const itme = [
        {
            key: "1",
            label: "Mining",
            children: <Mining />,
        },
        {
            key: "2",
            label: "Staking",
            children: <Staking />,
        },
    ];
    return (
        <div className="w-[650px] m-auto bg-pink-50 p-4 rounded-lg">
            <h1 className="text-center">Calculator</h1>
            <Tabs defaultActiveKey="1" centered items={itme} />
        </div>
    );
}
