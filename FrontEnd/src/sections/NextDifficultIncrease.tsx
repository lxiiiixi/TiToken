import { Progress } from "antd";
import GlobalCountdown from "./GlobalCountdown";

export default function NextDifficultIncrease() {
    return (
        <div>
            <div className="flex-between">
                <div>Next Difficulty Increase</div>
                <GlobalCountdown />
            </div>
            <Progress percent={30} />
        </div>
    );
}
