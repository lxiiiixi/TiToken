import { useState, useEffect } from "react";
import useNotification from "@/hooks/useNotification";
const blockExplorerUrl =
    process.env.NODE_ENV === "development"
        ? "https://testnet.blastscan.io/"
        : "https://blastscan.io/";

const useContractHashNotification = (pending: boolean, hash: string | undefined) => {
    const [isNotified, setIsNotified] = useState(false);
    const openNotification = useNotification();

    useEffect(() => {
        // Displays a notification when the operation is complete and the notification has not yet been displayed
        if (hash && !pending && !isNotified) {
            openNotification(
                "success",
                "",
                <a href={`${blockExplorerUrl}tx/${hash}`} target="_blank" rel="noopener noreferrer">
                    Check on block explorer
                </a>
            );
            // openNotification("success", "", `Transaction Hash: ${hash}`);
            setIsNotified(true);
        }
        // When the pending state changes back to true, reset the notification status so that the notification can be displayed again for the next operation
        if (pending) {
            setIsNotified(false);
        }
    }, [pending, hash, isNotified, openNotification]);
};

export default useContractHashNotification;
