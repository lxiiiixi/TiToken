import WalletConnect from "@/sections/Header/WalletConnect";
import Logo from "@/sections/Header/Logo";
import NavMenu from "@/sections/Header/NavMenu";
import CountDownButton from "@/sections/Header/CountDownButton";

export default function Header() {
    return (
        <>
            <div className="flex-center gap-4">
                <Logo />
                <NavMenu />
            </div>
            <div className="flex-center gap-4">
                <CountDownButton />
                <WalletConnect />
            </div>
        </>
    );
}
