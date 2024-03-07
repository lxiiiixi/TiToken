import { BgCard1, BgCard2, BgCard3, BgCard4, BgCard5 } from "@/assets";

const cardNumber = {
    1: BgCard1,
    2: BgCard2,
    3: BgCard3,
    4: BgCard4,
    5: BgCard5,
};

export default function TCard({
    number,
    width,
    height,
    className,
}: {
    number: keyof typeof cardNumber;
    width?: string;
    height?: string;
    className?: string;
}) {
    const IconComponent = cardNumber[number];
    if (!IconComponent) return null;
    return <IconComponent style={{ width, height, zIndex: -20 }} className={className} />;
}
