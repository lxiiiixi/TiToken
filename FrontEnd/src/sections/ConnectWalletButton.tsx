import TButton from "@/components/TButton";
import { useConnect } from "wagmi";

export default function ConnectWalletButton({ text }: { text?: string }) {
    const { connectors, connect } = useConnect();

    return (
        <TButton
            type={"secondary"}
            handleClick={() => connect({ connector: connectors[0] })}
            width="90%"
            className="my-6"
        >
            {text || "Connect Wallet"}
        </TButton>
    );
}
