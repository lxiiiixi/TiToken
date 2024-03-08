import WalletConnect from "@/sections/Header/WalletConnect";
import Logo from "@/sections/Header/Logo";
import NavMenu from "@/sections/Header/NavMenu";
import NavDrawer from "@/sections/Header/NavDrawer";
import CountDownButton from "@/sections/Header/CountDownButton";

export default function Header() {
    return (
        <>
            <div className="hidden lg:flex-center gap-0 md:gap-4">
                <Logo />
                <NavMenu />
            </div>
            <div className="lg:hidden">
                <NavDrawer />
            </div>
            <div className="flex-center gap-4 h-[50px]">
                <CountDownButton />
                <WalletConnect />
            </div>
        </>
    );
}
