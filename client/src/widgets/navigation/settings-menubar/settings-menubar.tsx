"use client";

import { activeLinkClassName, Menubar, MenubarMenu, MenubarTrigger } from "@/shared/ui";
import { links } from "./constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfileStore } from "@/features/auth";
import { Role } from "@/entities/users";

export function SettingsMenubar() {
    const profile = useProfileStore(state => state.profile);

    const pathname = usePathname();

    return (
        <>
            {profile?.role === Role.ADMIN && (
                <Menubar className="w-min">
                    {links.map(link => (
                        <MenubarMenu key={link.label}>
                            <MenubarTrigger className={pathname === link.url ? activeLinkClassName : undefined}>
                                <Link href={link.url}>{link.label}</Link>
                            </MenubarTrigger>
                        </MenubarMenu>
                    ))}
                </Menubar>
            )}
        </>
    );
}
