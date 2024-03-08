import { InputNumber, Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
    max: number;
    tips?: string;
}) => (
    <div className="flex-between my-4">
        <span>
            {label}
            {tips && (
                <Tooltip title={tips}>
                    <QuestionCircleOutlined className="w-[14px] ml-2" />
                </Tooltip>
            )}
        </span>
        <span>
            <InputNumber
                min={min}
                max={max}
                value={value}
                onChange={value => {
                    return value && handleChangeValue(index, value);
                }}
            />
            <Button className="ml-2" type="primary" onClick={() => handleChangeValue(index, max)}>
                MAX
            </Button>
        </span>
    </div>
);

export default MaxInputRender;
