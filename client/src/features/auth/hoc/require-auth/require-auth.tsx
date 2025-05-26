"use client";

import { PropsWithChildren } from "react";
import { credentialsManager } from "../../utils";
import { useRouter } from "next/navigation";
import { useProfileStore } from "../../lib";
import { routes } from "@/shared/routing";

export function RequireAuth({ children }: PropsWithChildren) {
    const router = useRouter();

    const resetProfile = useProfileStore(state => state.resetProfile);

    if (!credentialsManager.jwt.have()) {
        credentialsManager.jwt.remove();

        resetProfile();

        router.replace(routes.auth.login);
    }

    return children;
}
