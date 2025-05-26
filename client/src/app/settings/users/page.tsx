import { RequireAdminRole } from "@/features/auth";
import { Separator } from "@/shared/ui";
import { InviteUsersForm, UsersManagementPanel, UsersManagementPanelSkeleton } from "@/widgets/users-management";
import { Suspense } from "react";

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
