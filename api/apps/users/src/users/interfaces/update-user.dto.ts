import { Role, AccountStatus, AuthType } from "common/enums";

export interface IUpdateUserDto {
    username?: string;

    email?: string;

    password?: string;

    status?: AccountStatus;

    role?: Role;

    authType?: AuthType;

    totpSecret?: string;
}
