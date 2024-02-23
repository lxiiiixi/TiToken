import { http, createConfig } from "wagmi";
import { blastSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { PROJECT_ID } from "./envs";

export const config = createConfig({
    chains: [blastSepolia],
    connectors: [injected(), walletConnect({ projectId: PROJECT_ID })],
    transports: {
        [blastSepolia.id]: http(),
    },
});
