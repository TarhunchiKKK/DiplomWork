import { environment } from "../config";

export const localStorageService = {
    token: {
        set: (jwt: string) => localStorage.setItem(environment.jwtLocalStorageKey, jwt),
        get: () => localStorage.getItem(environment.jwtLocalStorageKey),
        remove: () => localStorage.removeItem(environment.jwtLocalStorageKey)
    }
};
