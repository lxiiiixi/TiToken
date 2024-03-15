import React, { ReactElement, useState } from "react";

interface TabPanelProps {
    title: string;
    children: React.ReactNode;
}

interface TabsProps {
    type?: "primary" | "center";
    children: ReactElement<TabPanelProps>[] | ReactElement<TabPanelProps>;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
    return <div>{children}</div>;
};

export const TTabs: React.FC<TabsProps> = ({ type = "primary", children }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Ensure children is an array
    const tabsArray = React.Children.toArray(children);

    return (
        <div>
            <ul
                className={`list-none flex border-solid pr-0 ${
                    type === "primary" && "border-b border-white/20 border-0"
                } ${type === "center" && " border-0 flex-center"}`}
                style={{ paddingInlineStart: 0 }}
            >
                {tabsArray.map((child, index) => {
                    if (React.isValidElement(child)) {
                        const id = String(child.props.title + (index + 1));
                        const box = document.querySelector(`#${id}`) as HTMLElement;
                        let w = "80%";
                        if (box) {
                            const boxWidth = box.offsetWidth;
                            w = String(boxWidth - 35) + "px";
                        }
                        return (
                            <li
                                key={index}
                                id={id}
                                style={{
                                    clipPath: `polygon(0 0, ${w} 0, 100% 100%, 0 100%)`,
                                }}
                                className={
                                    index === activeTab
                                        ? "cursor-pointer py-2 px-1 md:px-2 text-xs md:text-sm rounded-sm md:rounded pr-8 md:pr-10 bg-primary-400 text-black"
                                        : "cursor-pointer py-2 px-1 md:px-2 text-xs md:text-sm rounded-sm md:rounded pr-8 md:pr-10 bg-primary2"
                                }
                                onClick={() => setActiveTab(index)}
                            >
                                {child.props.title}
                            </li>
                        );
                    }
                })}
            </ul>
            <div className="tab-content">{tabsArray[activeTab]}</div>
        </div>
    );
};
