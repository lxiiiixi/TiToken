import React from "react";

import WalletConnect from "@/sections/Header/WalletConnect";
import Logo from "@/sections/Header/Logo";
import NavMenu from "@/sections/Header/NavMenu";
import CountDownButton from "@/sections/Header/CountDownButton";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="h-[88px] flex-between px-4">
                <div className="flex-center gap-4">
                    <Logo />
                    <NavMenu />
                </div>
                <div className="flex-center gap-4">
                    <CountDownButton />
                    <WalletConnect />
                </div>
            </div>
            <div className="flex-1 p-4">{children}</div>
            <div className="h-[100px] bg-blue-50 flex-center">
                Copyright © 2023, All Rights Reserved
            </div>
        </div>
    );
}
