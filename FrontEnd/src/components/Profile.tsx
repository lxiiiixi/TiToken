import { useAccount, useEnsName, useBalance, useSwitchChain } from "wagmi";

function Profile() {
    const { address } = useAccount();
    const { data: ensData } = useEnsName({ address });
    const { data: balanceData, isSuccess } = useBalance({ address });
    const { chains, switchChain } = useSwitchChain();

    console.log(ensData);
    console.log(chains);
    console.log(address);
    console.log(isSuccess, balanceData);

    return (
        <div>
            {chains.map(chain => (
                <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
                    {chain.name}
                </button>
            ))}
        </div>
    );
}

export default Profile;
