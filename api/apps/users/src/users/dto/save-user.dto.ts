import { Role } from "common/enums";
import { AccountStatus } from "../enums/account-status.enum";

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
