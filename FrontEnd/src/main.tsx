import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConfigProvider } from "antd";
import { config } from "@/configs/wagmi.ts";
import antdTheme from "@/configs/antdTheme.ts";
import App from "./App.tsx";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={antdTheme}>
                    <App />
                </ConfigProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
