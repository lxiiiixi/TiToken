import { useConnect, useAccount, useDisconnect, useSwitchChain, useBalance } from "wagmi";
import { shortAddress } from "@/configs/utils";
import { Button, Dropdown } from "antd";
// import { CHAIN_IDS } from "@/configs/configs";
import { SUPPORTED_CHAINS } from "@/configs/constants";

function WalletConnect() {
    const { address, isConnected, chainId } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const { connectors, connect } = useConnect();
    const { chains, switchChain } = useSwitchChain();
    const { disconnect } = useDisconnect();

    // console.log(balanceData, chainId);
    // console.log(chains, SUPPORTED_CHAINS.includes(chainId));

    const menu = connectors.map(connector => ({
        key: connector.uid,
        label: (
            <div
                key={connector.uid}
                onClick={() => {
                    localStorage.setItem("preferredWallet", connector.uid);
                    connect({ connector });
                }}
                className="mx-2"
            >
                {connector.name}
            </div>
        ),
    }));

    if (!chainId) {
        return (
            <Dropdown menu={{ items: menu }}>
                <a onClick={e => e.preventDefault()}>
                    <Button type="primary" className="cursor-pointer h-[48px]">
                        Connect Wallet
                    </Button>
                </a>
            </Dropdown>
        );
    }

    if (!SUPPORTED_CHAINS.includes(chainId)) {
        return (
            <Dropdown
                menu={{
                    items: chains.map(chain => ({
                        key: chain.id + 100,
                        label: (
                            <div key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                                {chain.name}
                            </div>
                        ),
                    })),
                }}
            >
                <Button type="primary" className="cursor-pointer h-[48px]">
                    <a onClick={e => e.preventDefault()}>Switch Network</a>
                </Button>
            </Dropdown>
        );
    }

    if (isConnected && address) {
        return (
            <div className="flex-center gap-3">
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: <div onClick={() => disconnect()}>Disconnect</div>,
                            },
                        ],
                    }}
                >
                    <Button type="primary" className="cursor-pointer h-[48px] px-2 pr-1">
                        <a onClick={e => e.preventDefault()}>
                            {`${balanceData?.formatted?.substring(0, 6) || 0} ${
                                balanceData?.symbol || "ETH"
                            }`}
                            <span className=" bg-yellow-200 p-2 ml-2 rounded-md">{`${shortAddress(
                                address
                            )}`}</span>
                        </a>
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default WalletConnect;
