export type RouteItem = {
    key: string;
    route: string;
    label: string;
    icon?: string;
};

export type LinkItem = {
    key: string;
    link: string;
    label: string;
    icon?: string;
};

export type SubMenuItem = {
    key: string;
    label: string;
    subMenu: (RouteItem | LinkItem)[];
    icon?: string;
};

export type MenuItem = RouteItem | SubMenuItem;

const menu: MenuItem[] = [
    {
        key: "0",
        label: "Mine",
        route: "/",
    },
    {
        key: "1",
        label: "Stake",
        route: "/stake",
    },
    {
        key: "2",
        label: "Payouts",
        route: "/payouts",
    },
    {
        key: "3",
        label: "Buy & Burn",
        route: "/buyandburn",
    },
    {
        key: "4",
        label: "More",
        subMenu: [
            {
                key: "4.1",
                label: "Burn Pool",
                route: "/burnpool",
            },
            // {
            //     key: "4.2",
            //     label: "Stats",
            //     route: "/stats",
            // },
            {
                key: "4.3",
                label: "Docs",
                link: "#",
            },
        ],
    },
    {
        key: "5",
        label: "Tools",
        subMenu: [
            {
                key: "5.1",
                label: "Share",
                route: "/share",
            },
            {
                key: "5.2",
                label: "Calculator",
                route: "/calculator",
            },
            {
                key: "5.3",
                label: "Buy",
                route: "/buy",
            },
            {
                key: "5.4",
                label: "Portfolio",
                route: "/portfolio",
            },
        ],
    },
] as const;

export default menu;
