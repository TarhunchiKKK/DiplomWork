import { NotificationsList, NotificationsListSkeleton } from "@/widgets/notifications";
import { Suspense } from "react";

export default function NotificationsPage() {
    return (
        <Suspense fallback={<NotificationsListSkeleton />}>
            <NotificationsList />
        </Suspense>
    );
}
