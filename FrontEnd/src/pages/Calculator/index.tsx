import Mining from "./Mining";
import Staking from "./Staking";
import { TTabs, TabPanel } from "@/components/TTabs";
import CardBgWrapper from "@/sections/CardBgWrapper";

export default function Index() {
    return (
        <div className="max-w-[715px] m-auto p-4 rounded-lg">
            <h1 className="text-center">Calculator</h1>
            <TTabs type="center">
                <TabPanel title="TitanX.win Mining">
                    <CardBgWrapper number={5}>
                        <Mining />
                    </CardBgWrapper>
                    {/* <CardWrapper number={5}>
                        <Mining />
                    </CardWrapper> */}
                </TabPanel>
                <TabPanel title="TitanX.win Staking">
                    <CardBgWrapper number={6}>
                        <Staking />
                    </CardBgWrapper>
                </TabPanel>
            </TTabs>
        </div>
    );
}
