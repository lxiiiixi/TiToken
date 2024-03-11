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
        <>
            <h1 className="text-3xl md:text-5xl">{title}</h1>
            <p className="text-base md:text-xl">{subTitle}</p>
            {children}
        </>
    );
}

export default ContentWrapper;
