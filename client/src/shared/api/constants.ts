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
        registerAdmin: `${environment.apiUrl}/auth/register/admin`
    },
    organizations: {
        updateUrgencyInterval: `${environment.apiUrl}/organizations/urgency-interval`,
        updateDocumentTypes: `${environment.apiUrl}/organizations/document-types`
    }
};

export const queryKeys = {
    organizations: {
        base: ["organizations"],
        withJwt: (jwt: string) => ["organizations", jwt]
    }
};
