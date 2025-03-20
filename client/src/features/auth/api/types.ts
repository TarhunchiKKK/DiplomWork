import { Role } from "@/entities/users";

export type TRegisterAdminDto = {
    username: string;

    email: string;

    password: string;
};

export type TRegisterAdmiResponse = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;

    token: string;
};
