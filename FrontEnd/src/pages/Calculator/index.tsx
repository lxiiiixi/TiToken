import Mining from "./Mining";
import Staking from "./Staking";
import { TTabs, TabPanel } from "@/components/TTabs";
import TCard from "@/components/TCard";

export default function Index() {
    const CardWrapper = ({ number, children }: { number: 5 | 6; children: React.ReactNode }) => {
        return (
            <div className="relative">
                <TCard number={number} className="w-full" />
                <div className="absolute-center w-[84%]">{children}</div>
            </div>
        );
    };

    return (
        <div className="w-[715px] m-auto p-4 rounded-lg">
            <h1 className="text-center">Calculator</h1>
            <TTabs type="center">
                <TabPanel title="TitanX.win Mining">
                    <CardWrapper number={5}>
                        <Mining />
                    </CardWrapper>
                </TabPanel>
                <TabPanel title="TitanX.win Staking">
                    <CardWrapper number={6}>
                        <Staking />
                    </CardWrapper>
                </TabPanel>
            </TTabs>
        </div>
    );
}
