import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import menu from "./menu.ts";
import type { RouteItem, LinkItem, MenuItem } from "./menu.ts";

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
        <div className="flex gap-0 md:gap-2 lg:gap-4 text-sm">
            {menu.map(item => (
                <div key={item.key}>{renderMenuItem(item)}</div>
            ))}
        </div>
    );
}

export default NavMenu;
