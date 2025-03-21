export const localStorageService = {
    token: {
        set: (jwt: string) => localStorage.setItem("jwt", jwt),
        get: () => localStorage.getItem("jwt"),
        remove: () => localStorage.removeItem("jwt")
    }
};
