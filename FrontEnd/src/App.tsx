// import Profile from "@/components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeLayout from "@/sections/HomeLayout";

import Mine from "@/pages/Mine";
import Payouts from "@/pages/Payouts";
import Stake from "@/pages/Stake";
import NotFound from "@/pages/NotFound";
import BuyAndBurn from "@/pages/BuyAndBurn";
import Stats from "@/pages/Stats";
import Calculator from "@/pages/Calculator";

function App() {
    return (
        <Router>
            <HomeLayout>
                <Routes>
                    <Route path="/" element={<Mine />} />
                    <Route path="payouts" element={<Payouts />} />
                    <Route path="stake" element={<Stake />} />
                    <Route path="buyandburn" element={<BuyAndBurn />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="calculator" element={<Calculator />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HomeLayout>
        </Router>
    );
}

export default App;
