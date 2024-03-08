import { X, Telegram, Youtube, Logo } from "@/assets";

export default function Footer() {
    return (
        <div className="prose-s text-xs text-center flex-center flex-col gap-1">
            <Logo />
            <div className="flex-center gap-4">
                <Telegram width="25px" />
                <X width="25px" />
                <Youtube width="25px" />
            </div>
            <span>Litepaper/Docs</span>
            <span className="text-white/80">TitanX Buy & Burn V1: 0x1393ad...d25c23a5</span>
            <span>
                <span className=" bg-white/30 rounded-md p-1">
                    TitanX Token: 0xF19308...EC6665B1
                </span>
            </span>
            <span className="text-white/70">TitanX Buy & Burn V2: 0x410e10...5e7D5404</span>
            <span className="text-white/50">Copyright © 2023, All Rights Reserved</span>
            <span className="text-white/30">Disclaimer</span>
        </div>
    );
}
