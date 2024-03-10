import {
    BgCard1,
    BgCard2,
    BgCard3,
    BgCard4,
    BgCard5,
    BgCard6,
    BgCard1H5,
    BgCard2H5,
    BgCard3H5,
    BgCard4H5,
    // BgCard5H5,
    BgCard6H5,
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

const cardH5Number = {
    1: BgCard1H5,
    2: BgCard2H5,
    3: BgCard3H5,
    4: BgCard4H5,
    5: BgCard5,
    6: BgCard6H5,
    "8Day": BlueCard,
    "28Day": GreenCard,
    "90Day": OrangeCard,
    "369Day": PurpleCard,
    "888Day": RoseCard,
};

export type CardNumber = keyof typeof cardNumber;

export default function TCard({
    number,
    width = "100%",
    height = "100%",
    className,
}: {
    number: CardNumber;
    width?: string;
    height?: string;
    className?: string;
}) {
    return (
        <picture>
            {/* PC: 431px - 1920px */}
            <source media="(min-width: 431px)" srcSet={cardNumber[number]} />
            {/* H5: 0px - 430px */}
            <source media="(max-width: 430px)" srcSet={cardH5Number[number]} />
            <img
                src={cardNumber[number]}
                style={{ width, height, zIndex: -20 }}
                className={className}
            />
        </picture>
    );
}
{
    /* <img
    src={cardNumber[number]}
    style={{ width, height, zIndex: -20 }}
    className={className}
/> */
}
