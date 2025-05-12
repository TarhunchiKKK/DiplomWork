"use client";

import { authCredentialsManager, TProfile, useProfileStore } from "@/features/auth";
import { routes } from "@/shared/routing";
import {
    Avatar,
    AvatarImage,
    Button,
    SidebarHeader,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/shared/ui";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

export function Header() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const resetProfile = useProfileStore(state => state.resetProfile);

    const handleClick = () => {
        resetProfile();
        authCredentialsManager.jwt.remove();
        redirect(routes.auth.login);
    };

    return (
        <SidebarHeader>
            <div className="space-y-4 rounded-md border px-4 py-2">
                <div className="flex justify-between items-center">
                    <Avatar>
                        <AvatarImage src="/avatar.jpeg" />
                    </Avatar>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="link" className="cursor-pointer" onClick={handleClick}>
                                    <ExternalLink />
                                </Button>
                            </TooltipTrigger>

                            <TooltipContent>Выйти из аккаунта</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <p className="text-base italic">{profile.username || profile.email}</p>
            </div>
        </SidebarHeader>
    );
}
