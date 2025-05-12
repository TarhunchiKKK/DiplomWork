import { environment } from "@/shared/config";
import { PropsWithChildren } from "react";

export function ProdOnly({ children }: PropsWithChildren) {
    const isProd = environment.projectEnv === "production";

    return <>{isProd && children}</>;
}
