"use client";

import { TagsCloud } from "@/shared/ui";
import { useOrganizationUsers } from "../../hooks";
import { AccountStatus } from "@/entities/users";
import { getActiveUserTagRenderer, getDeactivatedUserTagRenderer } from "./ui";
import { useChangeUserStatus } from "./hooks";

export function UsersManagementPanel() {
    const { users } = useOrganizationUsers();

    const { activate, deactivate } = useChangeUserStatus();

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
