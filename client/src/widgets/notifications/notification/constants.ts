import { NotificationStatus } from "@/entities/notifications";

export const updateStatusLabels: Record<NotificationStatus, string> = {
    [NotificationStatus.ACTIVE]: "Пометить прочитанным",
    [NotificationStatus.CHECKED]: "Пометить непрочитанным"
};

export const newStatusMap: Record<NotificationStatus, NotificationStatus> = {
    [NotificationStatus.ACTIVE]: NotificationStatus.CHECKED,
    [NotificationStatus.CHECKED]: NotificationStatus.ACTIVE
};

export const classNamesMap: Record<NotificationStatus, string> = {
    [NotificationStatus.ACTIVE]: " bg-accent",
    [NotificationStatus.CHECKED]: ""
};
