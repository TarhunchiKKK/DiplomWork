import { TProfile } from "@/features/auth";
import { TProcessProps } from "@/shared/types";

export type TLoginDto = {
    login: string;

    password: string;
};

export type TLoginResponse = TProfile & {
    token: string;
};

export type TProps = TProcessProps<TLoginResponse, null>;
