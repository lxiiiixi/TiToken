import { ReactNode } from "react";

function ContentWrapper({
    title,
    subTitle,
    children,
}: {
    title: string;
    subTitle: ReactNode;
    children: ReactNode;
}) {
    return (
        <div>
            <h1 className="text-3xl">{title}</h1>
            <p>{subTitle}</p>
            {children}
        </div>
    );
}

export default ContentWrapper;
