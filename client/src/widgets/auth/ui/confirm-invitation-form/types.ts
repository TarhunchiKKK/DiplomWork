import { TProfile } from "@/features/auth";

export type TConfirmInvitationFormState = {
    username: string;

    password: string;
};

export type TConfirmInvitationDto = {
    username: string;

    password: string;

    token: string;
};

export type TConfirmInvitationResponse = TProfile & {
    token: string;
};
