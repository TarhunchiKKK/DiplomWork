import { Role } from "@/entities/users";

export type TRegisterDto = {
    username: string;

    email: string;

    password: string;
};

export type TRegisterResponse = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;

    token: string;
};
