import { TNotification } from "@/entities/notifications";

export type TProps = {
    notification: TNotification;
};

export type TUseNotificationHookProps = Pick<TNotification, "id" | "status">;
