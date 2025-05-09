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
        totpLogin: `${environment.apiUrl}/users/auth/totp/login`,
        confirmInvitation: `${environment.apiUrl}/users/invitations/confirm`
    },
    passwordRecovery: {
        reset: `${environment.apiUrl}/users/password-recovery/reset`,
        update: `${environment.apiUrl}/users/password-recovery/update`
    },
    users: {
        invite: `${environment.apiUrl}/users/invitations/send`
    },
    organizations: {
        updateUrgencyInterval: `${environment.apiUrl}/organizations/urgency-interval`,
        updateDocumentTypes: `${environment.apiUrl}/organizations/document-types`,
        updateDocumentAims: `${environment.apiUrl}/organizations/document-aims`,
        updateAdministrativeDivisions: `${environment.apiUrl}/organizations/administrative-divisions`
    }
};

export const queryKeys = {
    organizations: {
        base: ["organizations"],
        withJwt: (jwt: string) => ["organizations", jwt]
    },
    users: {
        base: ["users"],
        withJwt: (jwt: string) => ["users", jwt]
    }
};
