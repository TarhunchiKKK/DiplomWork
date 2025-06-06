"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { credentialsManager } from "../../utils";
import { useRouter } from "next/navigation";
import { useProfileStore } from "../../lib";
import { routes } from "@/shared/routing";

export function RequireAuth({ children }: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    const resetProfile = useProfileStore(state => state.resetProfile);

    useEffect(() => {
        if (!credentialsManager.jwt.have()) {
            credentialsManager.jwt.remove();

            resetProfile();

            router.replace(routes.auth.login);
        } else {
            setIsAuthenticated(true);
        }
    }, [resetProfile, router]);

    if (!isAuthenticated) {
        return null;
    }

    return children;
}
