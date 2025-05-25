const LOCAL_STORAGE_KEY = "jwt";

export const credentialsManager = {
    jwt: {
        set: (jwt: string) => localStorage.setItem(LOCAL_STORAGE_KEY, jwt),

        get: () => localStorage.getItem(LOCAL_STORAGE_KEY),

        remove: () => localStorage.removeItem(LOCAL_STORAGE_KEY),

        have: () => !!localStorage.getItem(LOCAL_STORAGE_KEY)
    }
};
