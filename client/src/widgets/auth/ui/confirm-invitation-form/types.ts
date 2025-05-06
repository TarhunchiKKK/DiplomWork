import { Role } from "@/entities/users";

export type TConfirmInvitationFormState = {
    username: string;

    password: string;
};

export type TConfirmInvitationDto = {
    username: string;

    password: string;

    token: string;
};

export type TConfirmInvitationResponse = {
    id: string;

    username: string;

    email: string;

    role: Role;

    organizationId: string;

    token: string;
};
