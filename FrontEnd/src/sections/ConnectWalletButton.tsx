import TButton from "@/components/TButton";
import { useConnect } from "wagmi";

export default function ConnectWalletButton({ text }: { text?: string }) {
    const { connectors, connect } = useConnect();
    const walletInfoStr = localStorage.getItem("preferredWallet");

    return (
        <TButton
            type={"secondary"}
            handleClick={() =>
                connect({
                    connector:
                        (walletInfoStr && connectors.find(c => c.uid === walletInfoStr)) ||
                        connectors[0],
                })
            }
            width="90%"
            className="my-6"
        >
            {text || "Connect Wallet"}
        </TButton>
    );
}
