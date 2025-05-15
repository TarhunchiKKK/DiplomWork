import { ProdOnly } from "@/dev";
import { SidebarProvider } from "@/shared/ui";
import { DashboardSidebar } from "@/widgets/navigation";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider defaultOpen={true}>
            <ProdOnly>
                <DashboardSidebar />
            </ProdOnly>

            <main className="w-full p-4">{children}</main>
        </SidebarProvider>
    );
}
