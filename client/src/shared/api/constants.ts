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
        favourite: {
            findAll: `${environment.apiUrl}/documents/favourite`
        },
        my: {
            findAll: `${environment.apiUrl}/documents/my`
        }
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
        findAll: ["documents"],
        findOne: (documentId: string) => ["documents", documentId],
        favourite: ["favourite-documents"],
        my: ["my-documents"]
    }
};
