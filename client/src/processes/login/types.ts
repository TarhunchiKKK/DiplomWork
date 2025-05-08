import { TProfile } from "@/features/auth";

export type TLoginResult = TProfile & {
    token: string;
};

export type TTotpLoginPayload = {
    userId: string;

    userEmail: string;
};
