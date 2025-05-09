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
            organization: `${environment.apiUrl}/users/organization`
        }
    },
    organizations: {
        updateUrgencyInterval: `${environment.apiUrl}/organizations/urgency-interval`,
        updateDocumentTypes: `${environment.apiUrl}/organizations/document-types`,
        updateDocumentAims: `${environment.apiUrl}/organizations/document-aims`,
        updateAdministrativeDivisions: `${environment.apiUrl}/organizations/administrative-divisions`
    }
};

export const queryKeys = {
    profile: {
        base: ["profile"],
        withJwt: (jwt: string) => ["profile", jwt]
    },
    organizations: {
        base: ["organizations"],
        withJwt: (jwt: string) => ["organizations", jwt]
    },
    users: {
        base: ["users"],
        withJwt: (jwt: string) => ["users", jwt]
    }
};
