import { Role } from "@/entities/users";

export type TLoginDto = {
    login: string;

    password: string;
};

export type TLoginResponse = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;

    token: string;
};
