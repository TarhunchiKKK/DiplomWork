"use client";

import { credentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { ThemeSwitch } from "@/features/dark-mode";
import { routes } from "@/shared/routing";
import { Avatar, AvatarImage, Button, SidebarHeader } from "@/shared/ui";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

export function Header() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const resetProfile = useProfileStore(state => state.resetProfile);

    const handleClick = () => {
        resetProfile();
        credentialsManager.jwt.remove();
        redirect(routes.auth.login);
    };

    return (
        <SidebarHeader>
            <div className="space-y-4 rounded-md border px-4 py-2">
                <div className="flex justify-between items-center">
                    <div>
                        <Avatar>
                            <AvatarImage src="/avatar.jpeg" />
                        </Avatar>
                    </div>

                    <ThemeSwitch />
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-base italic">{profile.username || profile.email}</p>

                    <Button variant="link" className="cursor-pointer" title="Выйти из аккаунта " onClick={handleClick}>
                        <ExternalLink />
                    </Button>
                </div>
            </div>
        </SidebarHeader>
    );
}
