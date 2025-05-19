"use client";

import {
    activeLinkClassName,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/shared/ui";
import { TGroup } from "../types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Group({ label, links }: TGroup) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}

            <SidebarGroupContent>
                <SidebarMenu>
                    {links.map(link => (
                        <SidebarMenuItem key={link.title}>
                            <SidebarMenuButton asChild>
                                <Link
                                    href={link.url}
                                    className={pathname === link.url ? activeLinkClassName : undefined}
                                >
                                    <link.icon />

                                    <span>{link.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
