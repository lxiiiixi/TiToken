import { useConnect, useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { shortAddress } from "@/configs/utils";
import { Button, Dropdown } from "antd";
// import { CHAIN_IDS } from "@/configs/configs";
import { SUPPORTED_CHAINS } from "@/configs/constants";

function WalletConnect() {
    const { address, isConnected, chainId } = useAccount();
    // const { data: balanceData } = useBalance({ address });
    const { connectors, connect } = useConnect();
    const { chains, switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();

    // console.log(balanceData, chainId);
    // console.log(chains, SUPPORTED_CHAINS.includes(chainId));

    const menu = connectors.map(connector => ({
        key: connector.uid,
        label: (
            <Button key={connector.uid} onClick={() => connect({ connector })} className="mx-2">
                {connector.name}
            </Button>
        ),
    }));

    // connectors.map(connector => (
    //         <Button key={connector.uid} onClick={() => connect({ connector })} className="mx-2">
    //             {connector.name}
    //         </Button>
    //     ));

    if (!chainId) {
        return (
            <Dropdown menu={{ items: menu }}>
                <a onClick={e => e.preventDefault()}>
                    <Button type="primary" className="cursor-pointer">
                        Connect Wallet
                    </Button>
                </a>
            </Dropdown>
        );
    }

    if (!SUPPORTED_CHAINS.includes(chainId)) {
        // console.log(!SUPPORTED_CHAINS.includes(chainId));

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

    if (isConnected && address) {
        return (
            <div className="flex-center gap-3">
                <div>{`${shortAddress(address)}`}</div>
                <Button type="primary" onClick={() => disconnect()}>
                    Disconnect
                </Button>
            </div>
        );
    }
}

export default WalletConnect;
