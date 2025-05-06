import { AuthType, Role } from "@/entities/users";

export type TProfile = {
    id: string;

    username?: string;

    email: string;

    role: Role;

    organizationId: string;

    authType: AuthType;
};
