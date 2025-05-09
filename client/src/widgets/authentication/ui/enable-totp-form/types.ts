import { TProcessProps } from "@/shared/types";

export type TEnableTotpFormState = {
    pin: string;
};

export type TProps = TProcessProps<void, string>;
