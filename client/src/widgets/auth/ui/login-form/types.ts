import { TProfile } from "@/features/auth";

export type TLoginDto = {
    login: string;

    password: string;
};

export type TLoginResponse = TProfile & {
    token: string;
};
