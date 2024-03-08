import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { GradientBg } from "@/assets";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            <GradientBg className="absolute top-0 right-0 -z-20" />
            <GradientBg className="absolute bottom-0 left-0 rotate-180 -z-20" />
            <div className="flex flex-col justify-between max-w-[1440px] min-h-screen my-0 mx-auto">
                <div className="h-[88px] flex-between px-4">
                    <Header />
                </div>
                <div className="flex-1 p-4">{children}</div>
                <div className="h-[200px] flex-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
