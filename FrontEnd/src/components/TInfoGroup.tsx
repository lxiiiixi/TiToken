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
            <div className="px-6 text-base">
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
                        <div className="flex-col items-end justify-end">
                            <span className="text-primary-400">{content.value} </span>
                            {content.subValue && (
                                <span className="text-white text-xs">{content.subValue}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
