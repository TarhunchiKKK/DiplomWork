import { QueryClient } from "@tanstack/react-query";
import { environment } from "../config";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1 * 60 * 1000,
            gcTime: 24 * 60 * 60 * 1000
        }
    }
});

export const queryUrls = {
    auth: {
        registerAdmin: `${environment.apiUrl}/auth/register/admin`
    },
    organizations: {
        updateUrgencyInterval: `${environment.apiUrl}/organizations/urgency-interval`
    }
};

export const queryKeys = {
    organizations: {
        base: ["organizations"],
        withJwt: (jwt: string) => ["organizations", jwt]
    }
};
