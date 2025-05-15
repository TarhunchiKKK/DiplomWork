"use client";

import { useEffect } from "react";
import { isDev } from "./helpers";

export function useDevEffect(fun: () => void, deps: unknown[]) {
    useEffect(() => {
        if (isDev()) {
            fun();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
