import { PropsWithChildren } from "react";
import { isDev, isProd } from "./helpers";

export function ProdOnly({ children }: PropsWithChildren) {
    const isProdMode = isProd();

    return <>{isProdMode && children}</>;
}

export function DevOnly({ children }: PropsWithChildren) {
    const isDevMode = isDev();

    return <>{isDevMode && children}</>;
}
