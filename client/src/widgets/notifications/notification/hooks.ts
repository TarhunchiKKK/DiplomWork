import { useDeleteNotification, useUpdateNotification } from "@/entities/notifications/hooks";
import { TUseNotificationHookProps } from "./types";
import { newStatusMap, updateStatusLabels } from "./constants";

export function useNotification(notification: TUseNotificationHookProps) {
    const { mutate: updateNotification, isPending: isUpdatingPending } = useUpdateNotification();

    const { mutate: deleteNotification, isPending: isDeletingPending } = useDeleteNotification();

    return {
        menuItems: [
            {
                label: updateStatusLabels[notification.status],
                onClick: () => {
                    updateNotification({
                        id: notification.id,
                        data: {
                            status: newStatusMap[notification.status]
                        }
                    });
                }
            },
            {
                label: "Удалить",
                onClick: () => deleteNotification(notification.id)
            }
        ],
        isPending: isUpdatingPending || isDeletingPending
    };
}
