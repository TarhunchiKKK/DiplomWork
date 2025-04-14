import { Role, AccountStatus } from "common/enums";

export interface ISaveUserDto {
    username?: string;

    email: string;

    password?: string;

    status?: AccountStatus;

    role?: Role;

    isTwoFactorEnabled?: boolean;

    isDeactivated?: boolean;

    organizationId: string;
}
