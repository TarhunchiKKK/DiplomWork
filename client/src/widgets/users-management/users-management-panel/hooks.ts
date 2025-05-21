import { useOrganizationUsers, useChangeAccountStatus, AccountStatus } from "@/entities/users";

export function useUsersManagementPanel() {
    const { users } = useOrganizationUsers();

    const { mutate: changeStatus } = useChangeAccountStatus();

    const activate = (userId: string) => {
        changeStatus({ userId, status: AccountStatus.ACTIVE });
    };

    const deactivate = (userId: string) => {
        changeStatus({ userId, status: AccountStatus.DEACTIVATED });
    };

    return { users, activate, deactivate };
}
