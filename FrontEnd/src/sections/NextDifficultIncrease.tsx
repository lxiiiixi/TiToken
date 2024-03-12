import GlobalCountdown from "./GlobalCountdown";
import CountDownProgress from "./CountDownProgress";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export default function NextDifficultIncrease({ tips }: { tips?: string }) {
    return (
        <div>
            <div className="flex-between text-xs md:text-base">
                <div className="">
                    Next Difficulty Increase{" "}
                    {tips && (
                        <Tooltip title={tips}>
                            <QuestionCircleOutlined className="w-[14px] ml-2" />
                        </Tooltip>
                    )}
                </div>
                <GlobalCountdown />
            </div>
            <CountDownProgress />
        </div>
    );
}
