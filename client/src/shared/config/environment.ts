export const environment = {
    projectEnv: process.env.PRJECT_ENV!,
    apiUrl: process.env.API_URL!,
    jwtLocalStorageKey: process.env.LOCAL_STORAGE_JWT_KEY!,
    themeLocalStorageKey: process.env.LOCAL_STORAGE_THEME_KEY!,
    staleTime: +process.env.STALE_TIME_MINUTES!,
    gcTime: +process.env.GC_TIME_MINUTES!
};
