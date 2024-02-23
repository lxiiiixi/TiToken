import { useConnect, useAccount, useDisconnect, useBalance, useSwitchChain } from "wagmi";
import { shortAddress } from "@/configs/utils";
import { Button } from "antd";
// import { CHAIN_IDS } from "@/configs/configs";
import { SUPPORTED_CHAINS } from "@/configs/constants";

function WalletConnect() {
    const { address, isConnected, chainId } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const { connectors, connect } = useConnect();
    const { chains, switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();

    console.log(balanceData, chainId);
    console.log(chains, SUPPORTED_CHAINS.includes(chainId));

    if (!chainId) {
        return connectors.map(connector => (
            <Button key={connector.uid} onClick={() => connect({ connector })} className="mx-2">
                {connector.name}
            </Button>
        ));
    }

    if (!SUPPORTED_CHAINS.includes(chainId)) {
        console.log(!SUPPORTED_CHAINS.includes(chainId));

        return (
            <div>
                Switch Network:{" "}
                {chains.map(chain => (
                    <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                        {chain.name}
                    </button>
                ))}
            </div>
        );
    }

    console.log(isConnected && address);

    if (isConnected && address) {
        return (
            <div className="flex-center gap-3">
                <div>{`${shortAddress(address)}`}</div>
                <Button onClick={() => disconnect()}>Disconnect</Button>
            </div>
        );
    }
}

export default WalletConnect;
