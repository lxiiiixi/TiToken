import { InputNumber, Button } from "antd";

const MaxInputRender = ({
    index,
    label,
    value,
    handleChangeValue,
    min,
    max,
}: {
    index: "number" | "length" | "power";
    label: string;
    value: number;
    handleChangeValue: (key: "number" | "length" | "power", value: number) => void;
    min: number;
    max: number;
}) => (
    <div className="flex-between my-2">
        <span>{label}</span>
        <span>
            <InputNumber
                min={min}
                max={max}
                value={value}
                onChange={value => {
                    return value && handleChangeValue(index, value);
                }}
            />
            <Button className="ml-2" onClick={() => handleChangeValue(index, max)}>
                MAX
            </Button>
        </span>
    </div>
);

export default MaxInputRender;
