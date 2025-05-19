"use client";

import { Sidebar, SidebarContent, SidebarFooter } from "@/shared/ui";
import { Header, Group, DocumentsGroup } from "./ui";
import { footerGroup, notificationsGroup, workflowsGroup } from "./constants";

export function DashboardSidebar() {
    return (
        <Sidebar>
            {/* <Header /> */}

            <SidebarContent>
                <Group {...notificationsGroup} />

                <DocumentsGroup />

                <Group {...workflowsGroup} />
            </SidebarContent>

            <SidebarFooter>
                <Group {...footerGroup} />
            </SidebarFooter>
        </Sidebar>
    );
}
