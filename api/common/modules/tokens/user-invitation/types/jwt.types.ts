import { Role } from "common/enums";

export type TUserInvitationTokenInfo = {
    id: string;

    email: string;

    role: Role;

    organizationId: string;
};
