"use client";

import {
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
import { useOrganization } from "@/widgets/organization-settings";
import { Timer, ChevronDown } from "lucide-react";
import Link from "next/link";

export function DocumentsGroup() {
    const { organization } = useOrganization();

    const documentAims = organization?.documentAims.map(aim => ({ title: aim.value, url: "#" })) || [];
    const documentTypes = organization?.documentTypes.map(type => ({ title: type.value, url: "#" })) || [];

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Документы</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="#">
                                <Timer />

                                <span>Срочные</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

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
                                        <Link href={item.url}>{item.title}</Link>
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
                                        <Link href={item.url}>{item.title}</Link>
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
