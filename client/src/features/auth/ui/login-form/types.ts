import { TProcessProps } from "@/shared/types";
import { TAuthResponse } from "../../types";

export type TFormState = {
    login: string;

    password: string;
};

export type TProps = TProcessProps<TAuthResponse, null>;
