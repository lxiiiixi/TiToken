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
        <div className="prose">
            <h1 className="text-4xl">{title}</h1>
            <p>{subTitle}</p>
            {children}
        </div>
    );
}

export default ContentWrapper;
