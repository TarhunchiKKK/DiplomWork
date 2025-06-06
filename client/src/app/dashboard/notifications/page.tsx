import { NotificationsList, NotificationsListSkeleton } from "@/widgets/notifications";
import { useNotifications } from "@/entities/notifications";
import { Suspense } from "react";
import { Metadata } from "next";
import { EmptyListMessage } from "@/shared/ui";

export const metadata: Metadata = {
    title: "Notifications",
    description: "On this page you can see your notifications."
};

export default function NotificationsPage() {
    const { data: notifications } = useNotifications();

    return (
        <Suspense fallback={<NotificationsListSkeleton />}>
            {notifications && <NotificationsList notifications={notifications} />}

            <EmptyListMessage items={notifications} message="Уведомлений нет" />
        </Suspense>
    );
}
