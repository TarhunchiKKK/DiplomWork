"use client";

import { useOrganization } from "@/entities/organizations";
import { routes } from "@/shared/routing";
import {
    activeLinkClassName,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/shared/ui";
import { Timer, Star, ChevronDown, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TLink } from "../types";

const staticLinks: TLink[] = [
    {
        title: "Мои",
        url: routes.dashboard.index,
        icon: Home
    },
    {
        title: "Избранные",
        url: routes.dashboard.documents.favourite,
        icon: Star
    },
    {
        title: "Срочные",
        url: routes.dashboard.documents.urgent,
        icon: Timer
    }
];

export function DocumentsGroup() {
    const pathname = usePathname();

    const { data: organization } = useOrganization();

    const documentAims =
        organization?.documentAims.map(aim => ({
            title: aim.value,
            url: routes.dashboard.documents.withDocumentAim(aim._id)
        })) || [];

    const documentTypes =
        organization?.documentTypes.map(type => ({
            title: type.value,
            url: routes.dashboard.documents.withDocumentType(type._id)
        })) || [];

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Документы</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {staticLinks.map(link => (
                        <SidebarMenuItem key={link.url}>
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

                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    Цели документов
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                {documentAims.map((item, index) => (
                                    <DropdownMenuItem key={index}>
                                        <Link
                                            href={item.url}
                                            className={pathname === item.url ? activeLinkClassName : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    Типы документов
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                {documentTypes.map((item, index) => (
                                    <DropdownMenuItem key={index}>
                                        <Link
                                            href={item.url}
                                            className={pathname === item.url ? activeLinkClassName : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
