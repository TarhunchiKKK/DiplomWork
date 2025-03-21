import { TTheme } from "../types";

export function setDocumentTheme(theme: TTheme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
}
