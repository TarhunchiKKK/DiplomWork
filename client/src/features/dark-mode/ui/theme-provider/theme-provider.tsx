"use client";

import { PropsWithChildren, useEffect } from "react";
import { defaultTheme } from "./constants";
import { setDocumentTheme, themeLocalStorageService } from "../../utils";

export function ThemeProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const theme = themeLocalStorageService.get() ?? defaultTheme;

        setDocumentTheme(theme);

        themeLocalStorageService.set(theme);
    }, []);

    return <>{children}</>;
}
