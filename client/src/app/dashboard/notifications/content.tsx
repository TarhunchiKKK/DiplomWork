"use client";

import { useNotifications } from "@/entities/notifications";
import { EmptyListMessage } from "@/shared/ui";
import { NotificationsList } from "@/widgets/notifications";

export const PageContent = () => {
    const { data: notifications } = useNotifications();

    return (
        <>
            {notifications && <NotificationsList notifications={notifications} />}

            <EmptyListMessage items={notifications} message="Уведомлений нет" />
        </>
    );
};
