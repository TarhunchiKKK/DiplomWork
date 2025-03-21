import { environment } from "@/shared/config";
import { TTheme } from "../types";

export const themeLocalStorageService = {
    set: (theme: TTheme) => localStorage.setItem(environment.themeLocalStorageKey, theme),

    get: () => localStorage.getItem(environment.themeLocalStorageKey) as TTheme | null
};
