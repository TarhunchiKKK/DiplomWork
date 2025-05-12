import { SidebarProvider } from "@/shared/ui";
import { DashboardSidebar, SettingsMenubar } from "@/widgets/navigation";
import { PropsWithChildren } from "react";

export default function SettingsLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider defaultOpen={true}>
            <DashboardSidebar />

            <main className="p-4 space-y-4">
                <SettingsMenubar />

                {children}
            </main>
        </SidebarProvider>
    );
}
