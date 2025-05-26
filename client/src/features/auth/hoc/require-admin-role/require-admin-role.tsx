"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useProfileStore } from "../../lib";
import { Role } from "@/entities/users";

export function RequireAdminRole({ children }: PropsWithChildren) {
    const router = useRouter();

    const profile = useProfileStore(state => state.profile);

    if (profile?.role !== Role.ADMIN) {
        router.back();
    }

    return children;
}
