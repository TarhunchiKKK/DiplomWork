import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/shared/ui";
import { TGroup } from "../types";
import Link from "next/link";

export function Group({ label, links }: TGroup) {
    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}

            <SidebarGroupContent>
                <SidebarMenu>
                    {links.map(link => (
                        <SidebarMenuItem key={link.title}>
                            <SidebarMenuButton asChild>
                                <Link href={link.url}>
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
