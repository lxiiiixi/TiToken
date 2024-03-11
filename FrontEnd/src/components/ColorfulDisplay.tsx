import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const textColorSet = {
    blue: "text-blue-500",
    purple: "text-fuchsia-500",
    orange: "text-orange-500",
    green: "text-green-500",
    pink: "text-rose-400",
};

export default function ColorfulDisplay({
    textColor,
    label,
    tips,
    value,
    subValue,
}: {
    textColor: keyof typeof textColorSet;
    label: string;
    tips: string;
    value: string;
    subValue: string;
}) {
    return (
        <div className="flex-between my-2">
            <span>
                <span className={`${textColorSet[textColor]} text-base`}> {label}</span>
                {tips && (
                    <Tooltip title={tips}>
                        <QuestionCircleOutlined className="w-[12px] ml-2" />
                    </Tooltip>
                )}
            </span>
            <span className="flex-col items-end justify-end">
                <span className={`${textColorSet[textColor]} text-sm`}>{value} </span>
                <span className="text-white/80 text-xs">{subValue}</span>
            </span>
        </div>
    );
}
