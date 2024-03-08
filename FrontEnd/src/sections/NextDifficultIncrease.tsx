import GlobalCountdown from "./GlobalCountdown";
import CountDownProgress from "./CountDownProgress";

export default function NextDifficultIncrease() {
    return (
        <div>
            <div className="flex-between">
                <div>Next Difficulty Increase</div>
                <GlobalCountdown />
            </div>
            <CountDownProgress />
        </div>
    );
}
