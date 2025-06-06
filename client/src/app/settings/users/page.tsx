import { RequireAdminRole } from "@/features/auth";
import { Separator } from "@/shared/ui";
import { InviteUsersForm, UsersManagementPanel, UsersManagementPanelSkeleton } from "@/widgets/users-management";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | Users",
    description: "This page will allow you to manage users in your organization."
};

export default function UsersManagementPage() {
    return (
        <RequireAdminRole>
            <div className="space-y-4">
                <InviteUsersForm />

                <Separator />

                <Suspense fallback={<UsersManagementPanelSkeleton />}>
                    <UsersManagementPanel />
                </Suspense>
            </div>
        </RequireAdminRole>
    );
}
