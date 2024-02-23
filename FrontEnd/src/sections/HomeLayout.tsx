import React from "react";

import WalletConnect from "@/sections/Header/WalletConnect";
import Logo from "@/sections/Header/Logo";
import NavMenu from "@/sections/Header/NavMenu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="h-[80px] bg-red-50 dark:bg-black flex-between p-4">
                <div className="flex-center gap-4">
                    <Logo />
                    <NavMenu />
                </div>
                <div>
                    <WalletConnect />
                </div>
            </div>
            <div>{children}</div>
            <div className="h-[100px] bg-blue-50 flex-center">footer</div>
        </div>
    );
}
