import { ReactNode } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

type InfoCardDataType = {
    key: string;
    label: string;
    value: string;
    subValue?: string;
    tips?: string;
};

export default function TInfoGroup({
    data,
    title,
}: {
    data: InfoCardDataType[];
    title: string | ReactNode;
}) {
    return (
        <div className="text-lg">
            <span className="text-primary1">{title}</span>
            <div className="px-6 py-2 text-sm">
                {data.map(content => (
                    <div key={content.key} className="flex-between my-2">
                        <span>
                            {content.label}
                            {content.tips && (
                                <Tooltip title={content.tips}>
                                    <QuestionCircleOutlined className="w-[14px] ml-2" />
                                </Tooltip>
                            )}
                        </span>
                        <span>
                            {content.value}
                            {content.subValue && (
                                <span className="text-white">{content.subValue}</span>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
