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
        key: "stake",
        label: "Stake",
        route: "/stake",
    },
    {
        key: "payouts",
        label: "Payouts",
        route: "/payouts",
    },
    {
        key: "buyandburn",
        label: "Buy & Burn",
        route: "/buyandburn",
    },
    {
        key: "more",
        label: "More",
        subMenu: [
            {
                key: "burnpool",
                label: "Burn Pool",
                route: "/burnpool",
            },
            // {
            //     key: "4.2",
            //     label: "Stats",
            //     route: "/stats",
            // },
            {
                key: "docs",
                label: "Docs",
                link: "#",
            },
        ],
    },
    {
        key: "5",
        label: "Tools",
        subMenu: [
            // {
            //     key: "5.1",
            //     label: "Share",
            //     route: "/share",
            // },
            {
                key: "invitation",
                label: "Invitation",
                route: "/invitation",
            },
            {
                key: "calculator",
                label: "Calculator",
                route: "/calculator",
            },
            {
                key: "buy",
                label: "Buy",
                route: "/buy",
            },
            {
                key: "portfolio",
                label: "Portfolio",
                route: "/portfolio",
            },
        ],
    },
] as const;

export default menu;
