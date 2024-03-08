import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeLayout from "@/sections/HomeLayout";
import Mine from "@/pages/Mine";
import Payouts from "@/pages/Payouts";
import Stake from "@/pages/Stake";
import NotFound from "@/pages/NotFound";
import BuyAndBurn from "@/pages/BuyAndBurn";
import BurnPool from "@/pages/BurnPool";
import Stats from "@/pages/Stats";
import Calculator from "@/pages/Calculator";
import Component from "@/pages/Component";

import { App as AntdApp } from "antd";

function App() {
    // const { notification } = AntdApp.useApp();
    return (
        <div className={`${process.env.NODE_ENV === "development" ? "debug-screens" : ""}`}>
            <AntdApp notification={{ placement: "bottomLeft" }}>
                <Router>
                    <HomeLayout>
                        <Routes>
                            <Route path="/" element={<Mine />} />
                            <Route path="payouts" element={<Payouts />} />
                            <Route path="stake" element={<Stake />} />
                            <Route path="buyandburn" element={<BuyAndBurn />} />
                            <Route path="burnpool" element={<BurnPool />} />
                            <Route path="stats" element={<Stats />} />
                            <Route path="calculator" element={<Calculator />} />
                            <Route path="component" element={<Component />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </HomeLayout>
                </Router>
            </AntdApp>
        </div>
    );
}

export default App;
