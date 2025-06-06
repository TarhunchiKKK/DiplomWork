"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { useProfileStore } from "../../lib";
import { Role } from "@/entities/users";

export function RequireAdminRole({ children }: PropsWithChildren) {
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();

    const profile = useProfileStore(state => state.profile);

    useEffect(() => {
        if (profile?.role !== Role.ADMIN) {
            router.back();
        } else {
            setIsAdmin(true);
        }
    }, [router, profile]);

    if (profile?.role !== Role.ADMIN) {
        router.back();
    }

    if (!isAdmin) {
        return null;
    }

    return children;
}
