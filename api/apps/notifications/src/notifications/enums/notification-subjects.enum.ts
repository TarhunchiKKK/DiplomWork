export enum NotificationSubject {
    // Users
    USER_INVITATION = "Приглашение в E-Doc-Hub",
    PASSWORD_RECOVERY = "Подтверждение сброса пароля",
    ACCOUNT_ACTIVATION = "Активация аккаунта",
    ACCOUNT_DEACTIVATION = "Деактивация аккаунта",

    // Documents
    COMMENT_CREATED = "Комментарий добавлен",
    COMMENT_UPDATED = "Комментарий изменен",
    COMMENT_DELETED = "Комментарий удален",

    // Workflows
    WORKFLOW_DELETED = "Маршрут согласования удален",
    PARTICIPANT_ADDED = "Добавление к маршруту согласования",
    PARTICIPANT_DELETED = "Исключение из маршрута согласования",
    DOCUMENT_APPROVED = "Документ утвержден участником маршрута",
    DOCUMENT_SIGNED = "Документ подписан участником маршрута",
    DOCUMENT_REJECTED = "Документ отклонен участником маршрута"
}
