import Fire from "@/assets/icon/Fire.svg?react";
import Docs from "@/assets/icon/Docs.svg?react";
import Stats from "@/assets/icon/Stats.svg?react";

const iconStyles = {
    primary: "#EFD003",
    black: "#24282B",
    white: "#FEFEFE",
};

const icons = {
    fire: Fire,
    docs: Docs,
    stats: Stats,
};

export default function TIcon({
    name,
    color = "primary",
    width,
    height,
}: {
    name: keyof typeof icons;
    color?: keyof typeof iconStyles;
    width?: string;
    height?: string;
}) {
    const fillColor = iconStyles[color];
    const IconComponent = icons[name];
    if (!IconComponent) return null;
    return <IconComponent style={{ fill: fillColor, width, height }} />;
}
