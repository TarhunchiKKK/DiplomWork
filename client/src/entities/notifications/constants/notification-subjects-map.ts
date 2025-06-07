import { NotificationSubject } from "../enums";

export const notificationSubjectsMap: Record<NotificationSubject, string> = {
    // Users
    [NotificationSubject.USER_INVITATION]: "Приглашение в E-Doc-Hub",
    [NotificationSubject.PASSWORD_RECOVERY]: "Подтверждение сброса пароля",
    [NotificationSubject.ACCOUNT_ACTIVATION]: "Активация аккаунта",
    [NotificationSubject.ACCOUNT_DEACTIVATION]: "Деактивация аккаунта",

    // Documents
    [NotificationSubject.COMMENT_CREATED]: "Комментарий добавлен",
    [NotificationSubject.COMMENT_UPDATED]: "Комментарий изменен",
    [NotificationSubject.COMMENT_DELETED]: "Комментарий удален",

    // Workflows
    [NotificationSubject.WORKFLOW_DELETED]: "Маршрут согласования удален",
    [NotificationSubject.WORKFLOW_COMPLETED]: "Маршрут согласования завершен",

    [NotificationSubject.PARTICIPANT_ADDED]: "Добавление к маршруту согласования",
    [NotificationSubject.PARTICIPANT_DELETED]: "Исключение из маршрута согласования",
    [NotificationSubject.DOCUMENT_APPROVED]: "Документ утвержден участником маршрута",
    [NotificationSubject.DOCUMENT_SIGNED]: "Документ подписан участником маршрута",
    [NotificationSubject.DOCUMENT_REJECTED]: "Документ отклонен участником маршрута"
};
