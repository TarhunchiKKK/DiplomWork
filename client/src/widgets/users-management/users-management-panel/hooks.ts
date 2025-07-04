import { useOrganizationUsers, useChangeAccountStatus, AccountStatus } from "@/entities/users";
import { useProfileStore } from "@/features/auth";

export function useUsersManagementPanel() {
    const { data: users } = useOrganizationUsers();

    const profile = useProfileStore(state => state.profile);

    const { mutate: changeStatus } = useChangeAccountStatus();

    const activate = (userId: string) => {
        changeStatus({ userId, status: AccountStatus.ACTIVE });
    };

    const deactivate = (userId: string) => {
        changeStatus({ userId, status: AccountStatus.DEACTIVATED });
    };

    return {
        users: users?.filter(user => user.id !== profile?.id),
        activate,
        deactivate
    };
}
