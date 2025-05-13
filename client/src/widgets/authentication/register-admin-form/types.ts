import { TProfile } from "@/features/auth";

export type TRegisterDto = {
    username: string;

    email: string;

    password: string;
};

export type TRegisterResponse = TProfile & {
    token: string;
};
