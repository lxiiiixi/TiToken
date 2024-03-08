import { useState } from "react";
import { Drawer } from "antd";
import menu from "./menu.ts";
import { Link, useLocation } from "react-router-dom";
import type { MenuItem } from "./menu.ts";
import { CaretDownOutlined, MenuOutlined } from "@ant-design/icons";

export default function NavDrawer() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    function renderMenuItem(item: MenuItem) {
        if ("route" in item) {
            const isActive = location.pathname === item.route;
            return (
                <Link to={item.route}>
                    <div
                        className={`text-nowrap p-2 border-0 border-b border-solid h-[60px] flex justify-start items-center ${
                            isActive ? " border-primary-400" : "border-white/60"
                        }`}
                    >
                        {item.label}
                    </div>
                </Link>
            );
        } else if ("subMenu" in item) {
            return (
                <>
                    <div
                        className={`text-nowrap p-2 border-0 border-b border-solid h-[60px] flex-between border-white/60`}
                    >
                        {item.label}
                        <CaretDownOutlined />
                    </div>
                    {item.subMenu.map(subItem => {
                        const isActive = "route" in subItem && location.pathname === subItem.route;
                        return (
                            <div
                                className={`text-nowrap p-2 border-0 border-b border-solid h-[60px] flex justify-start items-center px-10 ${
                                    isActive ? " border-primary-400" : "border-white/20"
                                }`}
                            >
                                {"route" in subItem ? (
                                    <Link to={subItem.route}>{subItem.label}</Link>
                                ) : (
                                    <a
                                        href={subItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {subItem.label}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </>
            );
        }
    }

    return (
        <>
            <MenuOutlined onClick={showDrawer} className="text-3xl" />
            <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                key="left"
                className="backdrop-blur-sm"
                style={{ backgroundColor: "#000000B3", width: "60vw" }}
            >
                {menu.map(item => (
                    <div key={item.key}>{renderMenuItem(item)}</div>
                ))}
            </Drawer>
        </>
    );
}
