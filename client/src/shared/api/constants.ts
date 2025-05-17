import { QueryClient } from "@tanstack/react-query";
import { environment } from "../config";
import { updateStatusLabels } from "@/widgets/notifications/notification/constants";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: environment.staleTime * 60 * 1000,
            gcTime: environment.gcTime * 60 * 1000
        }
    }
});

export const queryUrls = {
    auth: {
        registerAdmin: `${environment.apiUrl}/users/auth/register/admin`,
        login: `${environment.apiUrl}/users/auth/login`,
        confirmInvitation: `${environment.apiUrl}/users/invitations/confirm`,
        totp: {
            generate: `${environment.apiUrl}/users/auth/totp/generate`,
            enable: `${environment.apiUrl}/users/auth/totp/enable`,
            disable: `${environment.apiUrl}/users/auth/totp/disable`,
            login: `${environment.apiUrl}/users/auth/totp/login`
        }
    },
    passwordRecovery: {
        reset: `${environment.apiUrl}/users/password-recovery/reset`,
        update: `${environment.apiUrl}/users/password-recovery/update`
    },
    users: {
        invite: `${environment.apiUrl}/users/invitations/send`,
        activate: (userId: string) => `${environment.apiUrl}/users/activate/${userId}`,
        deactivate: (userId: string) => `${environment.apiUrl}/users/deactivate/${userId}`,
        updateProfile: `${environment.apiUrl}/users/profile`,
        find: {
            organization: `${environment.apiUrl}/users/organization`,
            ids: `${environment.apiUrl}/users`
        }
    },
    organizations: {
        findOne: `${environment.apiUrl}/organizations`,
        updateDocumentTypes: `${environment.apiUrl}/organizations/document-types`,
        updateDocumentAims: `${environment.apiUrl}/organizations/document-aims`,
        updateAdministrativeDivisions: `${environment.apiUrl}/organizations/administrative-divisions`
    },
    documents: {
        findAll: `${environment.apiUrl}/documents`,
        findOne: (documentId: string) => `${environment.apiUrl}/documents/${documentId}`,
        create: `${environment.apiUrl}/documents`,
        update: `${environment.apiUrl}/documents`,
        favourite: {
            findAll: `${environment.apiUrl}/documents/favourite`,
            add: (documentId: string) => `${environment.apiUrl}/documents/favourite/${documentId}`,
            remove: (userId: string) => `${environment.apiUrl}/documents/favourite/${userId}`
        },
        my: {
            findAll: `${environment.apiUrl}/documents/my`
        },
        hash: {
            verify: `${environment.apiUrl}/documents/hash`
        },
        versions: {
            findAll: (documentId: string) => `${environment.apiUrl}/documents/versions/all/${documentId}`,
            findLast: (documentId: string) => `${environment.apiUrl}/documents/versions/last/${documentId}`,
            findOne: (versionId: string) => `${environment.apiUrl}/documents/versions/${versionId}`,
            create: `${environment.apiUrl}/documents/versions`
        },
        comments: {
            findAll: (versionId: string) => `${environment.apiUrl}/documents/comments/${versionId}`,
            create: `${environment.apiUrl}/documents/comments`,
            update: (commentId: string) => `${environment.apiUrl}/documents/comments/${commentId}`,
            delete: (commentId: string) => `${environment.apiUrl}/documents/comments/${commentId}`
        }
    },
    workflows: {
        create: `${environment.apiUrl}/workflows`,
        start: (workflowId: string) => `${environment.apiUrl}/workflows/start/${workflowId}`,
        findOneByDocumentId: (documentId: string) => `${environment.apiUrl}/workflows/documents/${documentId}`,
        findAllByCreatorId: (creatorId: string) => `${environment.apiUrl}/workflows/user/${creatorId}`,
        updateSigner: (workflowId: string) => `${environment.apiUrl}/workflows/signer/${workflowId}`,
        sign: (workflowId: string) => `${environment.apiUrl}/workflows/sign/${workflowId}`,
        delete: (workflowId: string) => `${environment.apiUrl}/workflows/${workflowId}`,
        participants: {
            upsert: (workflowId: string) => `${environment.apiUrl}/workflows/participants/${workflowId}`,
            uspateStatus: (participantId: string) => `${environment.apiUrl}/workflows/participants/${participantId}`,
            findAll: {
                byWorkflowId: (workflowId: string) => `${environment.apiUrl}/workflows/participants/${workflowId}`
            }
        }
    },
    notifications: {
        findAll: `${environment.apiUrl}/notifications`,
        update: (notificationId: string) => `${environment.apiUrl}/notifications/${notificationId}`,
        delete: (notificationId: string) => `${environment.apiUrl}/notifications/${notificationId}`
    }
};

export const queryKeys = {
    profile: ["profile"],
    organizations: {
        findOne: ["organization"]
    },
    users: {
        findAll: ["users"],
        byOrganization: ["users", "organzation"],
        findOne: (userId: string) => ["users", userId],
        findMany: (usersIds: string[]) => ["users"].concat(usersIds)
    },
    documents: {
        base: ["documents"],
        findAll: (queryParams: Record<string, unknown>) => ["documents", queryParams],
        findOne: (documentId: string) => ["documents", documentId],
        favourite: ["favourite-documents"],
        my: ["my-documents"],
        versions: {
            findAll: (documentId: string) => ["versions", documentId],
            findLast: (documentId: string) => ["versions", "last", documentId],
            findOne: (versionId: string) => ["versions", versionId]
        },
        comments: {
            findAll: (versionId: string) => ["comments", "versions", versionId]
        }
    },
    workflows: {
        base: ["workflows"],
        findAll: {
            byCreatorId: (creatorId: string) => ["workflows", "user", creatorId]
        },
        findOne: {
            base: ["workflows", "one"],
            byDocumentId: (documentId: string) => ["workflows", "one", "document", documentId]
        },
        participants: {
            findAll: {
                byWorkflowId: (workflowId: string) => ["workflows", "participants", "one", workflowId]
            }
        }
    },
    notifications: {
        base: ["notifications"],
        findAll: (queryParams: Record<string, string>) => ["notifications", queryParams]
    }
};
