import { environment } from "@/shared/config";

export const authCredentialsManager = {
    jwt: {
        set: (jwt: string) => localStorage.setItem(environment.jwtLocalStorageKey, jwt),
        get: () => localStorage.getItem(environment.jwtLocalStorageKey),
        remove: () => localStorage.removeItem(environment.jwtLocalStorageKey)
    }
};
