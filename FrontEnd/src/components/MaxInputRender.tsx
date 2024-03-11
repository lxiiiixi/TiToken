import { InputNumber, Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const LabelWithTooltip = ({ label, tips }: { label: string; tips?: string }) => (
    <>
        {label}
        {tips && (
            <Tooltip title={tips}>
                <QuestionCircleOutlined className="w-[14px] ml-2" />
            </Tooltip>
        )}
    </>
);

const MaxInputRender = ({
    index,
    label,
    value,
    handleChangeValue,
    min,
    max,
    tips,
}: {
    index: string;
    label: string;
    value: number;
    handleChangeValue: (key: string, value: number) => void;
    min: number;
    max?: number;
    tips?: string;
}) => (
    <div className="flex flex-col sm:flex-row justify-between my-4">
        <div className="text-sm md:text-lg flex items-center">
            <LabelWithTooltip label={label} tips={tips} />
        </div>
        <div className="flex items-center mt-3 sm:mt-0">
            <InputNumber
                min={min}
                max={max}
                value={value}
                className="w-full sm:w-auto"
                onChange={value => value && handleChangeValue(index, value)}
            />
            {max && (
                <Button
                    className="ml-2"
                    type="primary"
                    onClick={() => handleChangeValue(index, max)}
                >
                    MAX
                </Button>
            )}
        </div>
    </div>
);

export default MaxInputRender;
