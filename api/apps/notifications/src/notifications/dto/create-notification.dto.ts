import { NotificationSubject } from "../../../../../common/enums/notifications/notification-subjects.enum";

export class CreateNotificationdto {
    public subject: NotificationSubject;

    public message?: string;

    public receiverId: string;
}
