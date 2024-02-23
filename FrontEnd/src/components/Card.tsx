import { ReactNode } from "react";

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
    return (
        <div className="p-6 border border-red-300 rounded-lg">
            <h1 className="text-3xl">{title}</h1>
            <div className="p-4">{children}</div>
        </div>
    );
};

export default Card;
