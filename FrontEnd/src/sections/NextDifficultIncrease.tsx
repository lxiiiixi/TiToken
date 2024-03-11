import GlobalCountdown from "./GlobalCountdown";
import CountDownProgress from "./CountDownProgress";

export default function NextDifficultIncrease() {
    return (
        <div>
            <div className="flex-between text-xs md:text-base">
                <div className="">Next Difficulty Increase</div>
                <GlobalCountdown />
            </div>
            <CountDownProgress />
        </div>
    );
}
