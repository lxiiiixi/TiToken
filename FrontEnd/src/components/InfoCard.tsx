import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

type InfoCardDataType = {
    key: string;
    label: string;
    content: {
        key: string;
        label: string;
        value: string;
        tips?: string;
    }[];
}[];

export default function InfoCard({ data }: { data: InfoCardDataType }) {
    return (
        <div className="border border-white/90 rounded-md p-4">
            {data.map(item => (
                <div key={item.key} className="my-2">
                    <span className="text-gray-500">{item.label}</span>
                    <div className="p-4">
                        {item.content.map(content => (
                            <div key={content.key} className="flex-between my-2">
                                <span>
                                    {content.label}{" "}
                                    <Tooltip title="prompt text">
                                        <QuestionCircleOutlined className="w-3 h-3" />
                                    </Tooltip>
                                </span>
                                <span>{content.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
