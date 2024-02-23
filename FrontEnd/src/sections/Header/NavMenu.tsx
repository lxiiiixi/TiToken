import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
    // 类型守卫
    function renderMenuItem(item: MenuItem) {
        if ("route" in item) {
            return <Link to={item.route}>{item.label}</Link>;
        } else {
            return (
                <Dropdown menu={{ items: item.subMenu }}>
                    <a onClick={e => e.preventDefault()}>
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
        <div className="flex gap-5">
            {menu.map(item => (
                <div key={item.key}>{renderMenuItem(item)}</div>
            ))}
        </div>
    );
}

export default NavMenu;
