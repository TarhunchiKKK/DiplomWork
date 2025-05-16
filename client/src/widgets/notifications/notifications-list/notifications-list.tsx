"use client";

import { Notification, NotificationSkeleton } from "../notification";
import { useNotifications } from "@/entities/notifications/hooks";

export function NotificationsList() {
    const { notifications } = useNotifications();

    return (
        <div className="space-y-2">
            {notifications?.map(notification => <Notification key={notification.id} notification={notification} />)}
        </div>
    );
}

export function NotificationsListSkeleton() {
    return (
        <div className="space-y-2">
            {new Array(12).fill(null).map((_, index) => (
                <NotificationSkeleton key={index} />
            ))}
        </div>
    );
}
