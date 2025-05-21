"use client";

import { TagsCloud, TagsCloudSkeleton } from "@/shared/ui";
import { AccountStatus } from "@/entities/users";
import { getActiveUserTagRenderer, getDeactivatedUserTagRenderer } from "./ui";
import { useUsersManagementPanel } from "./hooks";

export function UsersManagementPanel() {
    const { users, activate, deactivate } = useUsersManagementPanel();

    return (
        <>
            {users && (
                <div className="flex flex-row ">
                    <TagsCloud
                        items={users?.filter(user => user.status === AccountStatus.ACTIVE)}
                        renderItem={getActiveUserTagRenderer(deactivate)}
                        className="px-2 flex-grow"
                    />

                    <TagsCloud
                        items={users?.filter(user => user.status === AccountStatus.DEACTIVATED)}
                        renderItem={getDeactivatedUserTagRenderer(activate)}
                        className="px-2 flex-grow"
                    />
                </div>
            )}
        </>
    );
}

export function UsersManagementPanelSkeleton() {
    return (
        <div className="flex justify-between items-center gap-4 h-[104px]">
            <TagsCloudSkeleton />

            <TagsCloudSkeleton />
        </div>
    );
}
