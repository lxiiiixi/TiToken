import TCard from "@/components/TCard";
import type { CardNumber } from "@/components/TCard";

export default function CardBgWrapper({
    number,
    children,
}: {
    number: CardNumber;
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <TCard number={number} className="absolute-top" />
            <div className="min-h-[350px] w-[88%] my-0 mx-auto py-10">{children}</div>
        </div>
    );
}
