import { App } from "antd";

type NotificationType = "open" | "success" | "info" | "warning" | "error";

export default function useNotification() {
    const { notification } = App.useApp();

    const openNotification = (type: NotificationType, title: string, message: React.ReactNode) => {
        notification[type]({
            message: title,
            description: message,
            duration: 3,
        });
    };

    return openNotification;
}
