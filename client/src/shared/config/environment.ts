export const environment = {
    projectEnv: process.env.PRJECT_ENV!,
    apiUrl: process.env.API_URL!,
    staleTime: +process.env.STALE_TIME_MINUTES!,
    gcTime: +process.env.GC_TIME_MINUTES!
};
