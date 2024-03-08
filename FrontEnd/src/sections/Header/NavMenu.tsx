import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

type RouteItem = {
    key: string;
    route: string;
    label: string;
    icon?: string;
};

type LinkItem = {
    key: string;
    link: string;
    label: string;
    icon?: string;
};

type SubMenuItem = {
    key: string;
    label: string;
    subMenu: (RouteItem | LinkItem)[];
    icon?: string;
};

type MenuItem = RouteItem | SubMenuItem;

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
            {
                key: "4.2",
                label: "Stats",
                route: "/stats",
            },
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

function NavMenu() {
    const location = useLocation();

    const renderSubMenuItem = (subItem: RouteItem | LinkItem) => {
        if ("route" in subItem) {
            return {
                ...subItem,
                label: (
                    // <Menu.Item key={subItem.key}>
                    <Link to={subItem.route}>{subItem.label}</Link>
                    // </Menu.Item>
                ),
            };
        } else {
            return {
                ...subItem,
                label: (
                    // <Menu.Item key={subItem.key}>
                    <a href={subItem.link} target="_blank" rel="noopener noreferrer">
                        {subItem.label}
                    </a>
                    // </Menu.Item>
                ),
            };
        }
    };

    function renderMenuItem(item: MenuItem) {
        const isActive = "route" in item && location.pathname === item.route;

        if ("route" in item) {
            return (
                <Link to={item.route}>
                    <span
                        className={`text-nowrap p-2 rounded-md hover:bg-primary2 ${
                            isActive ? "bg-primary2" : ""
                        }`}
                    >
                        {item.label}
                    </span>
                </Link>
            );
        } else if ("subMenu" in item) {
            return (
                <Dropdown menu={{ items: item.subMenu.map(subItem => renderSubMenuItem(subItem)) }}>
                    <a onClick={e => e.preventDefault()} className={isActive ? "active" : ""}>
                        <Space>
                            {item.label}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            );
        }
    }

    return (
        <div className="flex gap-5 text-sm">
            {menu.map(item => (
                <div key={item.key}>{renderMenuItem(item)}</div>
            ))}
        </div>
    );
}

export default NavMenu;
