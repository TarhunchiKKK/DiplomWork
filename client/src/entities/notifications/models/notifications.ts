import { NotificationStatus, NotificationSubject } from "../enums";

export type TNotification = {
    id: string;

    subject: NotificationSubject;

    status: NotificationStatus;

    message?: string;

    createdAt: Date;
};
