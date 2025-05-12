import { Sidebar, SidebarContent, SidebarFooter } from "@/shared/ui";
import { Header, Group, DocumentsGroup } from "./ui";
import { footerGroup, groups } from "./constants";

export function DashboardSidebar() {
    return (
        <Sidebar>
            <Header />

            <SidebarContent>
                {groups.map(group => (
                    <Group key={group.label} {...group} />
                ))}

                <DocumentsGroup />
            </SidebarContent>

            <SidebarFooter>
                <Group {...footerGroup} />
            </SidebarFooter>
        </Sidebar>
    );
}
