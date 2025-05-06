import { TProfile } from "@/features/auth";

export type TTotpLoginFormState = {
    pin: string;
};

export type TTotpLoginResponse = TProfile & {
    token: string;
};
