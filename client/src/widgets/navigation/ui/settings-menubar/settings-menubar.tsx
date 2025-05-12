"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/shared/ui";
import { links } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TProfile, useProfileStore } from "@/features/auth";
import { Role } from "@/entities/users";

export function SettingsMenubar() {
    const profile = useProfileStore(state => state.profile) as TProfile;

    const pathname = usePathname();

    return (
        <>
            {profile.role === Role.ADMIN && (
                <Menubar className="w-min">
                    {links.map(link => (
                        <MenubarMenu key={link.label}>
                            <MenubarTrigger>
                                <Link href={link.url} className={pathname === link.label ? "text-gray-400" : ""}>
                                    {link.label}
                                </Link>
                            </MenubarTrigger>
                        </MenubarMenu>
                    ))}
                </Menubar>
            )}
        </>
    );
}
