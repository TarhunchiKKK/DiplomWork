import { TProcessProps } from "@/shared/types";
import { TAuthResponse } from "../../types";

export type TFormState = {
    pin: string;
};

export type TProps = TProcessProps<TAuthResponse, { userId: string; userEmail: string }>;
