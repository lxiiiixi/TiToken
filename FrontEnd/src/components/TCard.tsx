import {
    BgCard1,
    BgCard2,
    BgCard3,
    BgCard4,
    BgCard5,
    BgCard6,
    BlueCard,
    GreenCard,
    OrangeCard,
    PurpleCard,
    RoseCard,
} from "@/assets";

const cardNumber = {
    1: BgCard1,
    2: BgCard2,
    3: BgCard3,
    4: BgCard4,
    5: BgCard5,
    6: BgCard6,
    "8Day": BlueCard,
    "28Day": GreenCard,
    "90Day": OrangeCard,
    "369Day": PurpleCard,
    "888Day": RoseCard,
};

export type CardNumber = keyof typeof cardNumber;

export default function TCard({
    number,
    width,
    height,
    className,
}: {
    number: CardNumber;
    width?: string;
    height?: string;
    className?: string;
}) {
    return (
        <img
            src={cardNumber[number]}
            style={{ width, height, zIndex: -20 }}
            className={className}
        />
    );
}
