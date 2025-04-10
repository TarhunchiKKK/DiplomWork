import { Role } from "common/enums";

export type TJwtInfo = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;
};

export type TUserInvitationTokenInfo = {
    id: string;

    email: string;

    role: Role;

    organizationId: string;
};
