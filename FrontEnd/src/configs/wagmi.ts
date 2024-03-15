import { http, createConfig } from "wagmi";
// import { blastSepolia, mainnet } from "wagmi/chains";
import { blastSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { PROJECT_ID } from "./envs";

export const config = createConfig({
    chains: [ blastSepolia],
    // chains: [mainnet, blastSepolia],
    connectors: [injected(), walletConnect({ projectId: PROJECT_ID })],
    transports: {
        // [mainnet.id]: http(),
        [blastSepolia.id]: http(),
    },
});
