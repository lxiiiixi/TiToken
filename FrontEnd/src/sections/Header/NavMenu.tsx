import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

type RouteItem = {
    key: string;
    route: string;
    label: string;
    icon?: string;
};

type SubMenuItem = {
    key: string;
    label: string;
    subMenu: {
        key: string;
        label: string;
    }[];
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
            },
            {
                key: "4.2",
                label: "Stats",
            },
            {
                key: "4.3",
                label: "Docs",
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
            },
            {
                key: "5.2",
                label: "Calculator",
            },
            {
                key: "5.3",
                label: "Buy",
            },
            {
                key: "5.4",
                label: "Portfolio",
            },
        ],
    },
] as const;

function NavMenu() {
    const location = useLocation();

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
        } else {
            return (
                <Dropdown menu={{ items: item.subMenu }}>
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
