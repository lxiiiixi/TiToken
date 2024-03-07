import React from "react";

import WalletConnect from "@/sections/Header/WalletConnect";
import Logo from "@/sections/Header/Logo";
import NavMenu from "@/sections/Header/NavMenu";
import CountDownButton from "@/sections/Header/CountDownButton";

import Footer from "./Footer";
import { GradientBg } from "@/assets";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen flex flex-col justify-between ">
            <div className="absolute top-0 right-0">
                <GradientBg />
            </div>
            <div className="absolute bottom-0 left-0 rotate-180">
                <GradientBg />
            </div>
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
            <div className="h-[200px] flex-center">
                <Footer />
            </div>
        </div>
    );
}
