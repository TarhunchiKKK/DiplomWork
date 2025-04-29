import { Notification } from "../entities/notification.entity";

export const transfromNotificationsArray = (notifications: Notification[]) => {
    return {
        notifications: notifications.map(notification => ({
            ...notification,
            createdAt: notification.createdAt.toISOString()
        }))
    };
};
