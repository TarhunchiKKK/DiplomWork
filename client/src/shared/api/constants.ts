import { QueryClient } from "@tanstack/react-query";
import { environment } from "../config";

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
        registerAdmin: `${environment.apiUrl}/users/auth/register-admin`,
        login: `${environment.apiUrl}/users/auth/login`,
        confirmInvitation: `${environment.apiUrl}/users/invitations/confirm`,
        profile: `${environment.apiUrl}/users/auth/me`,
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
        changeStatus: (userId: string) => `${environment.apiUrl}/users/account-deactivation/change-stus/${userId}`,
        updateProfile: `${environment.apiUrl}/users/profile`,
        find: {
            organization: `${environment.apiUrl}/users/organization`,
            ids: `${environment.apiUrl}/users`,
            one: (userId: string) => `${environment.apiUrl}/users/${userId}`
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
            findAll: `${environment.apiUrl}/favourite`,
            add: (documentId: string) => `${environment.apiUrl}/favourite/${documentId}`,
            remove: (userId: string) => `${environment.apiUrl}/favourite/${userId}`
        },
        hash: {
            verify: (versionId: string) => `${environment.apiUrl}/hashing/verify/${versionId}`
        },
        versions: {
            findAll: (documentId: string) => `${environment.apiUrl}/versions/all/${documentId}`,
            findLast: (documentId: string) => `${environment.apiUrl}/versions/last/${documentId}`,
            findOne: (versionId: string) => `${environment.apiUrl}/versions/${versionId}`,
            create: `${environment.apiUrl}/versions`
        },
        comments: {
            findAll: (versionId: string) => `${environment.apiUrl}/comments/${versionId}`,
            create: `${environment.apiUrl}/comments`,
            update: (commentId: string) => `${environment.apiUrl}/comments/${commentId}`,
            delete: (commentId: string) => `${environment.apiUrl}/comments/${commentId}`
        }
    },
    workflows: {
        create: `${environment.apiUrl}/workflows`,
        // start: (documentId: string, workflowId: string) =>
        //     `${environment.apiUrl}/workflows/start/${documentId}/${workflowId}`,
        start: `${environment.apiUrl}/workflows/start`,
        findAll: {
            my: `${environment.apiUrl}/workflows/my`,
            byParticipation: `${environment.apiUrl}/workflows/participants/user-workflows`
        },
        findOne: {
            byDocumentId: (documentId: string) => `${environment.apiUrl}/workflows/documents/${documentId}`
        },
        delete: (workflowId: string) => `${environment.apiUrl}/workflows/${workflowId}`,
        signing: {
            updateSigner: (workflowId: string) => `${environment.apiUrl}/workflows/signer/${workflowId}`,
            sign: (workflowId: string) => `${environment.apiUrl}/workflows/sign/${workflowId}`
        },
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
        base: ["users"],
        byOrganization: ["users", "organzation"],
        findOne: (userId: string) => ["users", userId],
        findMany: (usersIds: string[]) => ["users"].concat(usersIds)
    },
    documents: {
        base: ["documents"],
        findAll: (queryParams: Record<string, unknown>) => ["documents", queryParams],
        findOne: (documentId: string) => ["documents", documentId],
        favourite: ["favourite-documents"],
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
            my: ["workflows", "my"],
            byParticipation: ["workflows", "invited"]
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
