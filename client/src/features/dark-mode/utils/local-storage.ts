import { TTheme } from "../types";

const LOCAL_STORAGE_KEY = "theme";

export const themeLocalStorageService = {
    set: (theme: TTheme) => localStorage.setItem(LOCAL_STORAGE_KEY, theme),

    get: () => localStorage.getItem(LOCAL_STORAGE_KEY) as TTheme | null
};
