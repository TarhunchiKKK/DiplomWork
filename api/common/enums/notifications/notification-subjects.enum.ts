export enum NotificationSubject {
    // Users
    USER_INVITATION = "USER_INVITATION",
    PASSWORD_RECOVERY = "PASSWORD_RECOVERY",
    ACCOUNT_ACTIVATION = "ACCOUNT_ACTIVATION",
    ACCOUNT_DEACTIVATION = "ACCOUNT_DEACTIVATION",

    // Documents
    COMMENT_CREATED = "COMMENT_CREATED",
    COMMENT_UPDATED = "COMMENT_UPDATED",
    COMMENT_DELETED = "COMMENT_DELETED",

    // Workflows
    WORKFLOW_DELETED = "WORKFLOW_DELETED",
    WORKFLOW_COMPLETED = "WORKFLOW_COMPLETED",

    PARTICIPANT_ADDED = "PARTICIPANT_ADDED",
    PARTICIPANT_DELETED = "PARTICIPANT_DELETED",
    DOCUMENT_APPROVED = "DOCUMENT_APPROVED",
    DOCUMENT_SIGNED = "DOCUMENT_SIGNED",
    DOCUMENT_REJECTED = "DOCUMENT_REJECTED"
}
