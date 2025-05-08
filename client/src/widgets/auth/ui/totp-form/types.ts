import { TProfile } from "@/features/auth";
import { TProcessProps } from "@/shared/types";

export type TTotpLoginFormState = {
    pin: string;
};

export type TTotpLoginResponse = TProfile & {
    token: string;
};

export type TProps = TProcessProps<TTotpLoginResponse, { userId: string; userEmail: string }>;
