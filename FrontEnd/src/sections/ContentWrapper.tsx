import { ReactNode } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function ContentWrapper({
    title,
    subTitle,
    children,
    tips,
}: {
    title: string;
    subTitle: ReactNode;
    children: ReactNode;
    tips?: string;
}) {
    return (
        <>
            <h1 className="text-3xl md:text-5xl">{title}</h1>
            <p className="text-base md:text-xl">
                {subTitle}{" "}
                {tips && (
                    <Tooltip title={tips}>
                        <QuestionCircleOutlined className="w-[14px] ml-2" />
                    </Tooltip>
                )}
            </p>
            {children}
        </>
    );
}

export default ContentWrapper;
