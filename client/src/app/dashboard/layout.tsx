import { RequireAuth } from "@/features/auth";
import { SidebarProvider } from "@/shared/ui";
import { DashboardSidebar } from "@/widgets/navigation";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <RequireAuth>
            <SidebarProvider defaultOpen={true}>
                <DashboardSidebar />

                <main className="w-full p-4">{children}</main>
            </SidebarProvider>
        </RequireAuth>
    );
}
